import { defineStore } from "pinia";
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useQuestionsDataStore = defineStore('questions_data', {
    state: () => ({
        questions: [],
        questionsTotal: null,
        items: [],
        getLoading: false,
        errorCode: "",
        errorMessage: ""
    }),
    actions: {
        async getQuestions(page = 0, perPage = 5) {
            this.errorMessage = ""
            try {
                this.getLoading = true
                const response = await axios.get(backendUrl + '/question', {
                    params: {
                        page: page,
                        perpage: perPage
                    }
                })
                this.questions = response.data;
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message
                } else if (error.request) {
                    this.errorMessage = error.message
                }
                console.log(error)
            }
            this.getLoading = false
        },

        async getQuestionsTotal() {
            this.errorMessage = ""
            try {
                const response = await axios.get(backendUrl + '/questions_total')
                this.questionsTotal = response.data
            } catch (error) {
                if (error.response) {
                    this.errorMessage = error.response.data.message
                } else if (error.request) {
                    this.errorMessage = error.message
                }
                console.log(error)
            }
        },

        async createQuestion(formData) {
            this.errorMessage = ""
            try {
                const response = await axios.post(backendUrl + '/question', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                this.errorCode = response.data.code
                this.errorMessage = response.data.message
            } catch (error) {
                if (error.response) {
                    this.errorCode = 11
                    this.errorMessage = error.response.data.message
                } else if (error.request) {
                    this.errorCode = 12
                    this.errorMessage = error.message
                } else {
                    this.errorCode = 13
                }
                console.log(error)
            }
        }
    }
})
