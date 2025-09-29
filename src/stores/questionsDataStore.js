import { defineStore } from "pinia";
import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useQuestionsDataStore = defineStore('questions_data', {
    state: () => ({
        questions: [],
        questionsTotal: null,
        items: [],
        errorMessage: ""
    }),
    actions: {
        async getQuestions(page = 0, perPage = 5) {
            this.errorMessage = ""
            try {
                const response = await axios.get(backendUrl + '/question', {
                    params: {
                        page: page,
                        perPage: perPage
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
        }
    }
})
