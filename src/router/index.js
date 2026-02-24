import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import TaskListView from '../views/TaskListView.vue'
import CalendarioView from '../views/CalendarioView.vue'

const routes = [
    { path: '/', component: DashboardView, name: 'Dashboard' },
    { path: '/tareas', component: TaskListView, name: 'Tareas' },
    { path: '/calendario', component: CalendarioView, name: 'Calendario' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
