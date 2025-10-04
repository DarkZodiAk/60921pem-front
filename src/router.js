import { createRouter, createWebHistory } from "vue-router"
import Questions from '@/components/Questions.vue'
import Tags from '@/components/Tags.vue'
import Answers from '@/components/Answers.vue'
import CreateQuestion from '@/components/CreateQuestion.vue'
const routes = [
    {
        path: '/questions',
        component: Questions
    },
    {
        path: '/tags',
        component: Tags
    },
    {
        path: '/answers',
        component: Answers
    },
    {
        path: '/createQuestion',
        component: CreateQuestion
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router
