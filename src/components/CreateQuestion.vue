<template>
    <div class="w-full flex justify-center items-center">
        <form @submit.prevent="createQuestion" class="max-w-2xl w-full">
            <div>
                <label for="title" class="block mb-1">Название вопроса</label>
                <InputText
                    id="title"
                    v-model="title"
                    placeholder="Введите название вопроса"
                    class="w-full p-inputtext-lg"
                />
            </div>

            <div>
                <label for="tags" class="block mb-1">Теги</label>
                <MultiSelect
                    id="tags"
                    v-model="tags"
                    :options="availableTags"
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Выберите теги"
                    display="chip"
                    class="w-full"
                    :filter="true"
                    :showClear="true"
                />
            </div>

            <div>
                <label for="content" class="block mb-1">Содержимое вопроса</label>
                <Textarea
                    id="content"
                    v-model="content"
                    :autoResize="true"
                    rows="5"
                    class="w-full p-inputtextarea-lg"
                    placeholder="Опишите свой вопрос подробно"
                />
            </div>

            <div>
                <label for="image" class="block mb-1">Изображение (необязательно)</label>
                <FileUpload
                    mode="basic"
                    name="image"
                    :url="null"
                    :auto="true"
                    accept="image/*"
                    @select="onImageSelect"
                    :maxFileSize="2048000"
                    chooseLabel="Выберите изображение"
                    class="w-full"
                />

                <div v-if="imagePreview" class="mt-3">
                    <img :src="imagePreview" class="max-h-48 rounded object-contain border mx-auto" />
                    <Button
                        icon="pi pi-times"
                        label="Удалить"
                        class="p-button-outlined p-button-sm mt-2 mx-auto block"
                        @click="removeImage"
                    />
                </div>
            </div>

            <div class="pt-2">
                <Button
                    type="submit"
                    label="Создать вопрос"
                    icon="pi pi-plus"
                    class="w-full p-button-lg"
                    :loading="loading"
                    :disabled="loading"
                />
            </div>
        </form>
    </div>
    <Toast position="bottom-right" ref="toast"/>
</template>

<script>
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import MultiSelect from 'primevue/multiselect'
import FileUpload from 'primevue/fileupload'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import {useQuestionsStore} from '@/stores/questionsStore.js'
import {useTagsStore} from '@/stores/tagsStore.js'
export default {
    name: 'CreateQuestion',
    components: {InputText, Textarea, MultiSelect, FileUpload, Button, Toast},
    data() {
        return {
            tagsStore: useTagsStore(),
            dataStore: useQuestionsStore(),
            title: '',
            content: '',
            tags: [],
            image: null,
            imagePreview: '',
            loading: false,
        }
    },
    computed: {
        availableTags() {
            return this.tagsStore.tags || []
        },
        errorMessage() {
            return this.dataStore.errorMessage
        },
        errorCode() {
            return this.dataStore.errorCode
        }
    },
    mounted() {
        this.tagsStore.getTags()
    },
    methods: {
        onImageSelect(event) {
            const file = event.files[0]
            if (file) {
                this.image = file
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreview = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                this.image = null
            }
        },

        removeImage() {
            this.image = null;
            this.imagePreview = '';
        },

        async createQuestion() {
            const formData = new FormData()
            formData.append('title', this.title)
            formData.append('content', this.content)
            if (this.image) {
                formData.append('image', this.image);
            }
            this.tags.forEach(tagId => {
                formData.append('tags[]', tagId);
            });
            this.loading = true
            await this.dataStore.createQuestion(formData)
            if (this.errorCode > 0) {
                this.$refs.toast.add({
                    severity: 'error',
                    summary: 'Ошибка создания вопроса',
                    detail: this.errorMessage,
                    life: 4000
                })
            } else {
                this.$refs.toast.add({
                    severity: 'success',
                    summary: 'Вопрос успешно создан',
                    detail: this.errorMessage,
                    life: 4000
                })
            }

            this.loading = false
            this.title = '';
            this.content = '';
            this.tags = [];
            this.image = null;
        }
    }
}
</script>

<style scoped></style>
