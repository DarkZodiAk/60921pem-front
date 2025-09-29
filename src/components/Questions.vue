<template>
    <DataTable
        :value="questions"
        :lazy="true"
        :loading="dataStore.loading"
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
        <Column field="is_solved" header="Решен?"/>
    </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useQuestionsDataStore } from '@/stores/questionsDataStore.js'

export default {
    name: 'Questions',
    components: { DataTable, Column },
    data() {
        return {
            dataStore: useQuestionsDataStore(),
            perPage: 5,
            offset: 0,
        }
    },
    computed: {
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
