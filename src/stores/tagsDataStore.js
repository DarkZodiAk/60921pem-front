import { defineStore } from "pinia";
import axios from 'axios';
import { useAuthStore } from '@/stores/authstore.js'
const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useTagsDataStore = defineStore('tags_data', {
    state: () => ({
        tags: [],
        tagsTotal: null,
        items: [],
        errorMessage: ""
    }),
    actions: {
        async getTags(page = 0, perPage = 5) {
            this.errorMessage = ""
            const token = useAuthStore().token
            try {
                const response = await axios.get(backendUrl + '/tag', {
                    params: {
                        page: page,
                        perpage: perPage,
                    },
                    headers: { Authorization: 'Bearer ' + token },
                })
                this.tags = response.data
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message
                } else if (error.request) {
                    this.errorMessage = error.message
                }
                console.log(error)
            }
        },

        async getTagsTotal() {
            this.errorMessage = ""
            try {
                const response = await axios.get(backendUrl + '/tags_total')
                this.tagsTotal = response.data
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message
                } else if (error.request) {
                    this.errorMessage = error.message
                }
                console.log(error)
            }
        }
    }
})
