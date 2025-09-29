<template>
    <DataTable
        :value="tags"
        :lazy="true"
        :loading="dataStore.loading"
        :paginator="true"
        :rows="perPage"
        :rowsPerPageOptions="[2, 5, 10]"
        :total-records="tagsTotal"
        @page="onPageChange"
        responsive-layout="scroll"
        :first="offset"
    >
        <Column field="id" header="№"/>
        <Column field="name" header="Название тега"/>
    </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useTagsDataStore } from '@/stores/tagsDataStore.js'

export default {
    name: 'Tags',
    components: { DataTable, Column },
    data() {
        return {
            dataStore: useTagsDataStore(),
            perPage: 5,
            offset: 0,
        }
    },
    computed: {
        tags() {
            return this.dataStore.tags
        },
        tagsTotal() {
            return this.dataStore.tagsTotal
        },
    },
    mounted() {
        console.log('Questions component mounted.')
        this.dataStore.getTags()
        this.dataStore.getTagsTotal()
    },
    methods: {
        onPageChange(event) {
            this.offset = event.first
            this.perPage = event.rows
            this.dataStore.getTags(this.offset / this.perPage, this.perPage)
        }
    }
}
</script>

<style scoped></style>
