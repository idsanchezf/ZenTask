/**
 * useTasks – Composable centralizado de tareas
 * Compartido entre DashboardView, TaskListView y CalendarioView
 */
import { ref, computed } from 'vue'

// ── Datos iniciales ─────────────────────────────────────────────────────────
const now = new Date()
const yr = now.getFullYear()
const mo = String(now.getMonth() + 1).padStart(2, '0')
const dd = String(now.getDate()).padStart(2, '0')
const tomorrow = String(now.getDate() + 1).padStart(2, '0')

// Array único de tareas con status + dueDate
const tasks = ref([
    { id: 1, title: 'Diseñar arquitectura base', priority: 'Alta', status: 'pending', tags: ['Diseño', 'Dev'], description: 'Definir la estructura de carpetas y el patrón de diseño.', dueDate: `${yr}-${mo}-${dd}` },
    { id: 2, title: 'Configurar entorno BDD', priority: 'Media', status: 'pending', tags: ['Dev', 'QA'], description: 'Instalar Cypress y Cucumber preprocessor.', dueDate: `${yr}-${mo}-${tomorrow}` },
    { id: 3, title: 'Implementar HU2 Kanban', priority: 'Alta', status: 'inProgress', tags: ['Dev'], description: 'Crear la vista de tablero con sus columnas.', dueDate: `${yr}-${mo}-12` },
    { id: 4, title: 'Definir historias de usuario', priority: 'Baja', status: 'done', tags: ['Docs'], description: 'Documentar las HUs iniciales en el plan.', dueDate: `${yr}-${mo}-05` },
    { id: 5, title: 'Revisar pull requests', priority: 'Media', status: 'inProgress', tags: ['Dev', 'QA'], description: 'Revisar y aprobar los PRs pendientes del sprint.', dueDate: `${yr}-${mo}-${dd}` },
    { id: 6, title: 'Actualizar documentación', priority: 'Baja', status: 'pending', tags: ['Docs'], description: 'Actualizar README y docs con los últimos cambios.', dueDate: `${yr}-${mo}-22` },
])

let nextId = 7

// ── Getters ──────────────────────────────────────────────────────────────────
const pendingTasks = computed(() => tasks.value.filter(t => t.status === 'pending'))
const inProgressTasks = computed(() => tasks.value.filter(t => t.status === 'inProgress'))
const doneTasks = computed(() => tasks.value.filter(t => t.status === 'done'))

// ── KPI Stats ────────────────────────────────────────────────────────────────
const stats = computed(() => {
    const todayISO = `${yr}-${mo}-${dd}`
    const endOfWeek = new Date(now)
    endOfWeek.setDate(now.getDate() + (7 - now.getDay()))
    const weekISO = `${endOfWeek.getFullYear()}-${String(endOfWeek.getMonth() + 1).padStart(2, '0')}-${String(endOfWeek.getDate()).padStart(2, '0')}`

    return {
        total: tasks.value.length,
        completadas: doneTasks.value.length,
        enProgreso: inProgressTasks.value.length,
        pendientes: pendingTasks.value.length,
        vencenHoy: tasks.value.filter(t => t.dueDate === todayISO && t.status !== 'done').length,
        estaSemana: tasks.value.filter(t => t.dueDate && t.dueDate <= weekISO && t.status !== 'done').length,
    }
})

const upcomingTasks = computed(() =>
    tasks.value
        .filter(t => t.dueDate && t.status !== 'done')
        .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
        .slice(0, 5)
)

const priorityDistribution = computed(() => {
    const total = tasks.value.length || 1
    return {
        alta: Math.round(tasks.value.filter(t => t.priority === 'Alta').length / total * 100),
        media: Math.round(tasks.value.filter(t => t.priority === 'Media').length / total * 100),
        baja: Math.round(tasks.value.filter(t => t.priority === 'Baja').length / total * 100),
    }
})

// ── Mutaciones ───────────────────────────────────────────────────────────────
const addTask = (title) => {
    if (!title.trim()) return
    tasks.value.push({
        id: nextId++,
        title: title.trim(),
        priority: 'Media',
        status: 'pending',
        tags: [],
        description: '',
        dueDate: '',
    })
}

const deleteTask = (taskId) => {
    tasks.value = tasks.value.filter(t => t.id !== taskId)
}

const updateTask = (updated) => {
    const idx = tasks.value.findIndex(t => t.id === updated.id)
    if (idx !== -1) tasks.value[idx] = { ...updated }
}

const moveTask = (taskId, newStatus) => {
    const task = tasks.value.find(t => t.id === taskId)
    if (task) task.status = newStatus
}

export function useTasks() {
    return {
        tasks,
        pendingTasks,
        inProgressTasks,
        doneTasks,
        stats,
        upcomingTasks,
        priorityDistribution,
        addTask,
        deleteTask,
        updateTask,
        moveTask,
    }
}
