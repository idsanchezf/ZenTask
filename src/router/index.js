import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import TaskListView from '../views/TaskListView.vue'

const routes = [
    { path: '/', component: DashboardView, name: 'Dashboard' },
    { path: '/tareas', component: TaskListView, name: 'Tareas' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
