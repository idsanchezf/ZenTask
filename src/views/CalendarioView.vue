<template>
  <div class="calendario-view">
    <header>
      <h1>Calendario de <span class="gradient-text">Tareas</span></h1>
      <p>Planifica y visualiza tu trabajo en el tiempo.</p>
    </header>

    <!-- Controles: navegación de mes + filtros de prioridad -->
    <div class="controls-section">
      <div class="month-nav glass">
        <button class="btn-prev-month nav-btn" @click="prevMonth">←</button>
        <h2 class="month-title">{{ monthLabel }}</h2>
        <button class="btn-next-month nav-btn" @click="nextMonth">→</button>
      </div>

      <div class="priority-filters">
        <span class="filter-label">Prioridad:</span>
        <span
          v-for="p in PRIORITIES"
          :key="p.value"
          :class="['badge', p.value, { active: priorityFilter === p.value }]"
          @click="togglePriority(p.value)"
        >{{ p.label }}</span>
      </div>
    </div>

    <!-- Grid de calendario -->
    <div class="calendar-wrapper glass">
      <!-- Cabecera de días de la semana -->
      <div class="calendar-weekdays">
        <span v-for="day in WEEKDAYS" :key="day">{{ day }}</span>
      </div>

      <!-- Celdas del mes -->
      <div class="calendar-grid">
        <div
          v-for="(cell, idx) in calendarDays"
          :key="idx"
          :class="[
            'calendar-day',
            { 'other-month': !cell.currentMonth },
            { 'today': cell.isToday },
            { 'selected': selectedDay && isSameDay(cell.date, selectedDay) },
            { 'has-tasks': tasksForDay(cell.date).length > 0 }
          ]"
          @click="selectDay(cell)"
        >
          <span class="day-number">{{ cell.date.getDate() }}</span>
          <div class="task-pills">
            <div
              v-for="task in tasksForDay(cell.date).slice(0, 2)"
              :key="task.id"
              class="task-pill"
            >
              <span class="pill-title">{{ task.title }}</span>
              <span :class="['badge', task.priority.toLowerCase()]">{{ task.priority }}</span>
            </div>
            <div v-if="tasksForDay(cell.date).length > 2" class="task-pill more">
              +{{ tasksForDay(cell.date).length - 2 }} más
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Panel lateral: tareas del día seleccionado -->
    <Transition name="slide">
      <div v-if="selectedDay" class="day-detail-sidebar glass">
        <div class="detail-header">
          <h3>{{ selectedDayLabel }}</h3>
          <button @click="selectedDay = null" class="close-btn">×</button>
        </div>

        <div v-if="tasksForDay(selectedDay).length === 0" class="empty-state">
          <p>No hay tareas para este día.</p>
        </div>

        <div v-else class="task-list">
          <div
            v-for="task in tasksForDay(selectedDay)"
            :key="task.id"
            class="task-item glass"
          >
            <div class="task-item-header">
              <span class="task-item-title">{{ task.title }}</span>
              <span :class="['badge', task.priority.toLowerCase()]">{{ task.priority }}</span>
            </div>
            <div class="task-item-tags" v-if="task.tags.length">
              <span
                v-for="tag in task.tags"
                :key="tag"
                class="tag-mini"
              >{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTasks } from '../composables/useTasks'

// ── Constantes ─────────────────────────────────────────────────────────────
const WEEKDAYS  = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const MONTHS_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const PRIORITIES = [
  { label: 'Alta',  value: 'alta'  },
  { label: 'Media', value: 'media' },
  { label: 'Baja',  value: 'baja'  },
]

// ── Datos de tareas desde composable compartido ─────────────────────────────
const { tasks: allTasks } = useTasks()

// ── Estado reactivo ─────────────────────────────────────────────────────────
const now            = new Date()
const currentDate    = ref(new Date(now.getFullYear(), now.getMonth(), 1))
const selectedDay    = ref(null)
const priorityFilter = ref(null)

// ── Computed ────────────────────────────────────────────────────────────────
const monthLabel = computed(() =>
  `${MONTHS_ES[currentDate.value.getMonth()]} ${currentDate.value.getFullYear()}`
)

const calendarDays = computed(() => {
  const year  = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay  = new Date(year, month + 1, 0)

  // getDay() devuelve 0=Dom..6=Sáb → ajustamos a Lun=0
  const startOffset = (firstDay.getDay() + 6) % 7
  const totalCells  = Math.ceil((startOffset + lastDay.getDate()) / 7) * 7

  const days = []
  for (let i = 0; i < totalCells; i++) {
    const date = new Date(year, month, 1 - startOffset + i)
    days.push({
      date,
      currentMonth: date.getMonth() === month,
      isToday: isSameDay(date, now),
    })
  }
  return days
})

const selectedDayLabel = computed(() => {
  if (!selectedDay.value) return ''
  const d = selectedDay.value
  return `${d.getDate()} de ${MONTHS_ES[d.getMonth()]} ${d.getFullYear()}`
})

// ── Helpers ─────────────────────────────────────────────────────────────────
const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth()    === b.getMonth()    &&
  a.getDate()     === b.getDate()

const toISO = (date) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const tasksForDay = (date) => {
  const iso = toISO(date)
  return allTasks.value.filter(t => {
    const matchDate     = t.dueDate === iso
    const matchPriority = !priorityFilter.value || t.priority.toLowerCase() === priorityFilter.value
    return matchDate && matchPriority
  })
}

// ── Acciones ─────────────────────────────────────────────────────────────────
const prevMonth = () => {
  const d = currentDate.value
  currentDate.value = new Date(d.getFullYear(), d.getMonth() - 1, 1)
  selectedDay.value = null
}

const nextMonth = () => {
  const d = currentDate.value
  currentDate.value = new Date(d.getFullYear(), d.getMonth() + 1, 1)
  selectedDay.value = null
}

const selectDay = (cell) => {
  selectedDay.value = isSameDay(cell.date, selectedDay.value ?? new Date(0))
    ? null
    : cell.date
}

const togglePriority = (p) => {
  priorityFilter.value = priorityFilter.value === p ? null : p
}
</script>

<style scoped>
.calendario-view {
  position: relative;
}

h1 {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

header p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

/* ── Controls ── */
.controls-section {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.month-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.5rem 1.5rem;
}

.month-title {
  font-size: 1.1rem;
  font-weight: 600;
  min-width: 180px;
  text-align: center;
}

.nav-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  transition: background 0.2s, color 0.2s;
}

.nav-btn:hover {
  background: var(--card-bg);
  color: white;
}

.priority-filters {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.priority-filters .badge {
  font-size: 0.75rem;
  padding: 0.3rem 0.8rem;
  border-radius: 99px;
  cursor: pointer;
  border: 1px solid currentColor;
  background: transparent;
  transition: background 0.2s, color 0.2s;
  user-select: none;
}

.priority-filters .badge.active {
  color: #fff !important;
}

/* ── Calendar wrapper ── */
.calendar-wrapper {
  padding: 1.5rem;
  border-radius: 12px;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 0.5rem;
}

.calendar-weekdays span {
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.4rem 0;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

/* ── Calendar day cell ── */
.calendar-day {
  min-height: 90px;
  padding: 0.5rem;
  border-radius: 8px;
  background: rgba(255,255,255,0.03);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
  position: relative;
}

.calendar-day:hover {
  background: rgba(255,255,255,0.07);
  border-color: var(--card-border);
}

.calendar-day.other-month {
  opacity: 0.3;
}

.calendar-day.today {
  border-color: #7c3aed;
  background: rgba(124, 58, 237, 0.08);
}

.calendar-day.today .day-number {
  background: linear-gradient(135deg, #4b9bee, #7c3aed);
  color: #fff;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.calendar-day.selected {
  border-color: #4b9bee;
  background: rgba(75, 155, 238, 0.1);
}

.day-number {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 0.4rem;
  display: block;
}

/* ── Task pills ── */
.task-pills {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.task-pill {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  padding: 0.2rem 0.4rem;
  background: rgba(255,255,255,0.06);
  border-radius: 4px;
  font-size: 0.65rem;
  line-height: 1.2;
}

.task-pill.more {
  color: var(--text-secondary);
  justify-content: center;
  font-style: italic;
  background: transparent;
}

.pill-title {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 80px;
}

/* ── Badges de prioridad ── */
.badge {
  font-size: 0.6rem;
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
  font-weight: 600;
  white-space: nowrap;
}

.alta  { color: #ff3e3e; border-color: #ff3e3e; }
.media { color: #f39c12; border-color: #f39c12; }
.baja  { color: #2ecc71; border-color: #2ecc71; }

.priority-filters .alta.active  { background: #ff3e3e; }
.priority-filters .media.active { background: #f39c12; }
.priority-filters .baja.active  { background: #2ecc71; }

/* ── Panel lateral del día ── */
.day-detail-sidebar {
  position: fixed;
  right: 0;
  top: 0;
  width: 360px;
  height: 100vh;
  z-index: 100;
  padding: 2rem;
  border-radius: 0;
  border-left: 1px solid var(--card-border);
  overflow-y: auto;
  backdrop-filter: blur(20px);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.detail-header h3 {
  font-size: 1rem;
  font-weight: 600;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.8rem;
  line-height: 1;
  cursor: pointer;
}

.empty-state {
  color: var(--text-secondary);
  text-align: center;
  margin-top: 3rem;
  font-size: 0.9rem;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.task-item {
  padding: 0.9rem 1rem;
  border-radius: 8px;
  background: rgba(255,255,255,0.05);
}

.task-item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}

.task-item-title {
  font-size: 0.85rem;
  font-weight: 500;
  flex: 1;
}

.task-item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.tag-mini {
  font-size: 0.6rem;
  padding: 0.1rem 0.4rem;
  border-radius: 99px;
  background: rgba(124, 58, 237, 0.2);
  color: #a78bfa;
  border: 1px solid rgba(124, 58, 237, 0.4);
}

/* ── Transición panel ── */
.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from, .slide-leave-to        { transform: translateX(100%); }
</style>
