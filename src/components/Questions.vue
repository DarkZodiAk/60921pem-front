<template>
    <DataTable
        :value="questions"
        :lazy="true"
        :loading="dataStore.getLoading"
        :paginator="true"
        :rows="perPage"
        :rowsPerPageOptions="[2, 5, 10]"
        :total-records="questionsTotal"
        @page="onPageChange"
        responsive-layout="scroll"
        :first="offset"
    >
        <Column field="id" header="№"/>
        <Column field="title" header="Название вопроса"/>
        <Column field="content" header="Описание"/>
        <Column header="Изображение" style="width: 180px">
            <template #body="{ data }">
                <div><img :src="data.picture_url" class="max-h-24 max-w-full" /></div>
            </template>
        </Column>
        <Column header="Теги">
            <template #body="{ data }">
                <div class="flex flex-wrap gap-1">
                    <span v-for="tag in data.tags" :key="tag.id">{{ tag.name }};</span>
                </div>
            </template>
        </Column>
        <Column field="is_solved" header="Решен?"/>
        <template #footer>
            <div class="text-end" v-show="isAuthenticated">
                <Button type="button" @click="this.$router.push('createQuestion')" icon="pi pi-plus" label="Создать вопрос"/>
            </div>
        </template>
    </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable'
import Button from 'primevue/button'
import Column from 'primevue/column'
import { useQuestionsStore } from '@/stores/questionsStore.js'
import { useAuthStore } from '@/stores/authstore.js'

export default {
    name: 'Questions',
    components: { DataTable, Button, Column },
    data() {
        return {
            authStore: useAuthStore(),
            dataStore: useQuestionsStore(),
            perPage: 5,
            offset: 0,
        }
    },
    computed: {
        isAuthenticated() {
            return this.authStore.isAuthenticated
        },
        questions() {
            return this.dataStore.questions
        },
        questionsTotal() {
            return this.dataStore.questionsTotal
        },
    },
    mounted() {
        console.log('Questions component mounted.')
        this.dataStore.getQuestions()
        this.dataStore.getQuestionsTotal()
    },
    methods: {
        onPageChange(event) {
            this.offset = event.first
            this.perPage = event.rows
            this.dataStore.getQuestions(this.offset / this.perPage, this.perPage)
        }
    }
}
</script>

<style scoped></style>
