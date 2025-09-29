<template>
    <div class="flex flex-col w-full">
        <Menubar :model="items">
            <template #start>
                <span>
                    <img src="@/assets/nexus.png" width="50" alt="logo"/>
                </span>
            </template>
            <template #item="{ item, props, hasSubmenu, root }">
                <a class="flex items-center ml-6 p-4">
                    <router-link v-if="item.route" :to="item.route">
                        <span :class="item.icon"/>
                        <span class="ml-2">{{ item.label }}</span>
                    </router-link>
                </a>
            </template>
            <template #end>
                <div>
                    <div v-if="isAuthenticated && user">
                        <span class="pi pi-fw pi-user mr-4"/> {{ user.name }}
                        <Button @click="logout" class="ml-4">Выйти</Button>
                    </div>
                    <div v-else>
                        <form @submit.prevent="login" class="login-form flex items-center gap-2">
                            <InputText v-model="email" type="email" id="email" required placeholder="Логин"
                                       class="m-2 sm:w-auto" :class="{'p-invalid': authError}" />
                            <InputText v-model="password" type="password" id="password" required placeholder="Пароль"
                                       class="m-2 sm:w-auto" :class="{'p-invalid': authError}" />
                            <Button type="submit" class="ml-2">Войти</Button>
                        </form>
                        <div><small v-if="authError" class="error">{{ authError }}</small></div>
                    </div>
                </div>
            </template>
        </Menubar>
        <router-view></router-view>
    </div>
</template>

<script>
import { useAuthStore } from "@/stores/authstore.js";
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import InputText from 'primevue/inputtext'
export default {
    components: {Button, Menubar, InputText},
    data() {
        return {
            date: '',
            email: '',
            password: '',
            authStore: useAuthStore(),
            items: [
                {
                    label: 'Вопросы',
                    icon: 'pi pi-fw pi-question',
                    route: '/questions'
                },
                {
                    label: 'Теги',
                    icon: 'pi pi-fw pi-tag',
                    route: '/tags'
                },
                {
                    label: 'Ответы',
                    icon: 'pi pi-fw pi-envelope',
                    route: '/answers'
                },
            ]
        }
    },
    computed: {
        isAuthenticated() {
            return this.authStore.isAuthenticated
        },
        user() {
            return this.authStore.user
        },
        authError() {
            return this.authStore.errorMessage
        }
    },
    methods: {
        logout() {
            this.authStore.logout()
        },
        login() {
            this.authStore.login({email: this.email, password: this.password})
        }
    },
    mounted() {
        const token = localStorage.getItem("token")
        if (token) {
            this.authStore.isAuthenticated = true
            this.authStore.getUser()
        }
    }
}
</script>

<style scoped>
.error {
    color: red;
}
a {
    color: black;
}
@media (max-width: 768px) {
    .login-form {
        flex-direction: column;
    }
}
</style>
