<template>
  <div class="dashboard-view">
    <header class="welcome">
      <h1>Panel de <span class="gradient-text">Control</span></h1>
      <p>Resumen de productividad · {{ todayLabel }}</p>
    </header>

    <!-- Entrada rápida (HU3) -->
    <section class="quick-entry-section">
      <div class="quick-entry glass">
        <input
          v-model="newTaskTitle"
          @keyup.enter="handleAdd"
          type="text"
          placeholder="Escribe una tarea y presiona Enter..."
        />
        <button @click="handleAdd" class="add-btn">Añadir</button>
      </div>
    </section>

    <!-- ── KPI Cards ─────────────────────────────────────────────────── -->
    <div class="kpi-grid">
      <div class="kpi-card glass">
        <span class="kpi-icon">📋</span>
        <div>
          <p class="kpi-label">Total Tareas</p>
          <p class="kpi-value">{{ stats.total }}</p>
        </div>
      </div>
      <div class="kpi-card glass">
        <span class="kpi-icon">✅</span>
        <div>
          <p class="kpi-label">Completadas</p>
          <p class="kpi-value">{{ stats.completadas }}</p>
          <span class="kpi-badge blue">En Progreso: {{ stats.enProgreso }}</span>
        </div>
      </div>
      <div class="kpi-card glass">
        <span class="kpi-icon">🔴</span>
        <div>
          <p class="kpi-label">Vencen Hoy</p>
          <p class="kpi-value">{{ stats.vencenHoy }}</p>
          <span v-if="stats.vencenHoy > 0" class="kpi-badge red">Urgente</span>
        </div>
      </div>
      <div class="kpi-card glass">
        <span class="kpi-icon">📅</span>
        <div>
          <p class="kpi-label">Esta Semana</p>
          <p class="kpi-value">{{ stats.estaSemana }}</p>
        </div>
      </div>
    </div>

    <!-- ── Sección central: gráficos ──────────────────────────────────── -->
    <div class="charts-grid">

      <!-- Gráfico de barras por estado -->
      <div class="chart-section glass">
        <h3>Tareas por Estado</h3>
        <div class="bar-chart">
          <div v-for="bar in stateBars" :key="bar.label" class="bar-row">
            <span class="bar-label">{{ bar.label }}</span>
            <div class="bar-track">
              <div class="bar-fill" :style="{ width: bar.pct + '%', background: bar.color }"></div>
            </div>
            <span class="bar-count">{{ bar.count }}</span>
          </div>
        </div>
      </div>

      <!-- Donut chart por prioridad -->
      <div class="donut-section glass">
        <h3>Distribución por Prioridad</h3>
        <div class="donut-wrapper">
          <svg class="donut-chart" viewBox="0 0 120 120">
            <circle class="donut-bg" cx="60" cy="60" r="45"/>
            <!-- Alta -->
            <circle
              class="donut-seg"
              cx="60" cy="60" r="45"
              :stroke-dasharray="`${priorityDistribution.alta * 2.827} ${282.7}`"
              stroke-dashoffset="0"
              stroke="#ff3e3e"
            />
            <!-- Media -->
            <circle
              class="donut-seg"
              cx="60" cy="60" r="45"
              :stroke-dasharray="`${priorityDistribution.media * 2.827} ${282.7}`"
              :stroke-dashoffset="`${-priorityDistribution.alta * 2.827}`"
              stroke="#f39c12"
            />
            <!-- Baja -->
            <circle
              class="donut-seg"
              cx="60" cy="60" r="45"
              :stroke-dasharray="`${priorityDistribution.baja * 2.827} ${282.7}`"
              :stroke-dashoffset="`${-(priorityDistribution.alta + priorityDistribution.media) * 2.827}`"
              stroke="#2ecc71"
            />
            <text x="60" y="64" class="donut-center-text">{{ stats.total }}</text>
          </svg>

          <ul class="donut-legend">
            <li><span class="dot" style="background:#ff3e3e"></span> Alta ({{ priorityDistribution.alta }}%)</li>
            <li><span class="dot" style="background:#f39c12"></span> Media ({{ priorityDistribution.media }}%)</li>
            <li><span class="dot" style="background:#2ecc71"></span> Baja ({{ priorityDistribution.baja }}%)</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- ── Próximos vencimientos ────────────────────────────────────── -->
    <section class="upcoming-section glass">
      <h3>Próximas Fechas de Vencimiento</h3>
      <div v-if="upcomingTasks.length === 0" class="empty-state">
        <p>No hay tareas con fecha pendiente. ¡Todo al día! 🎉</p>
      </div>
      <div v-else>
        <div
          v-for="task in upcomingTasks"
          :key="task.id"
          class="upcoming-item"
        >
          <div class="upcoming-info">
            <span class="upcoming-title">{{ task.title }}</span>
            <div class="upcoming-chips">
              <span :class="['badge', task.priority.toLowerCase()]">{{ task.priority }}</span>
              <span v-for="tag in task.tags.slice(0,2)" :key="tag" class="tag-mini">{{ tag }}</span>
            </div>
          </div>
          <span class="upcoming-date">{{ formatDate(task.dueDate) }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTasks } from '../composables/useTasks'

const { stats, upcomingTasks, priorityDistribution, addTask, pendingTasks, inProgressTasks, doneTasks } = useTasks()

const newTaskTitle = ref('')
const handleAdd = () => {
  addTask(newTaskTitle.value)
  newTaskTitle.value = ''
}

// Fecha de hoy en español
const MONTHS_ES = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
const now = new Date()
const todayLabel = `${now.getDate()} de ${MONTHS_ES[now.getMonth()]} ${now.getFullYear()}`

const formatDate = (iso) => {
  if (!iso) return ''
  const [, m, d] = iso.split('-')
  return `${parseInt(d)} ${MONTHS_ES[parseInt(m)-1]}`
}

// Barras de estado
const stateBars = computed(() => {
  const total = stats.value.total || 1
  return [
    { label: 'Backlog',     count: pendingTasks.value.length,    pct: Math.round(pendingTasks.value.length    / total * 100), color: 'linear-gradient(90deg,#4b9bee,#2563eb)' },
    { label: 'En Progreso', count: inProgressTasks.value.length, pct: Math.round(inProgressTasks.value.length / total * 100), color: 'linear-gradient(90deg,#7c3aed,#a855f7)' },
    { label: 'Completado',  count: doneTasks.value.length,       pct: Math.round(doneTasks.value.length       / total * 100), color: 'linear-gradient(90deg,#10b981,#34d399)' },
  ]
})
</script>

<style scoped>
.dashboard-view { max-width: 1100px; }

h1 { font-size: 2.2rem; margin-bottom: 0.4rem; }
.welcome p { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 2.5rem; }

/* ── Quick entry ── */
.quick-entry-section { margin-bottom: 2.5rem; }
.quick-entry { display: flex; padding: 0.5rem; gap: 0.5rem; }
.quick-entry input { flex-grow: 1; background: transparent; border: none; color: white; padding: 0.8rem 1rem; font-size: 1rem; font-family: inherit; }
.add-btn { background: var(--accent-blue); color: white; border: none; padding: 0 1.5rem; border-radius: 8px; font-weight: 600; cursor: pointer; transition: opacity 0.2s; }
.add-btn:hover { opacity: 0.85; }

/* ── KPI Grid ── */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
  margin-bottom: 2rem;
}

.kpi-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.4rem 1.6rem;
  border-radius: 12px;
}

.kpi-icon { font-size: 1.8rem; line-height: 1; margin-top: 2px; }

.kpi-label { font-size: 0.72rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 0.3rem; }
.kpi-value { font-size: 2.2rem; font-weight: 700; line-height: 1; margin-bottom: 0.4rem; }

.kpi-badge { font-size: 0.65rem; padding: 0.2rem 0.6rem; border-radius: 99px; font-weight: 600; }
.kpi-badge.blue { background: rgba(75,155,238,0.15); color: #4b9bee; border: 1px solid rgba(75,155,238,0.3); }
.kpi-badge.red  { background: rgba(255,62,62,0.15);  color: #ff3e3e;  border: 1px solid rgba(255,62,62,0.3); }

/* ── Charts Grid ── */
.charts-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 1.2rem;
  margin-bottom: 2rem;
}

.chart-section, .donut-section {
  padding: 1.5rem 1.8rem;
  border-radius: 12px;
}

h3 { font-size: 0.85rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1.5rem; font-weight: 600; }

/* ── Bar chart ── */
.bar-chart { display: flex; flex-direction: column; gap: 1.2rem; }
.bar-row { display: grid; grid-template-columns: 100px 1fr 40px; align-items: center; gap: 1rem; }
.bar-label { font-size: 0.82rem; color: var(--text-secondary); }
.bar-track { height: 8px; background: rgba(255,255,255,0.06); border-radius: 99px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 99px; transition: width 0.6s ease; }
.bar-count { font-size: 0.82rem; font-weight: 600; text-align: right; }

/* ── Donut chart ── */
.donut-wrapper { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
.donut-chart { width: 140px; height: 140px; transform: rotate(-90deg); }
.donut-bg { fill: none; stroke: rgba(255,255,255,0.06); stroke-width: 16; }
.donut-seg { fill: none; stroke-width: 16; transition: stroke-dasharray 0.5s ease; }
.donut-center-text { fill: white; font-size: 18px; font-weight: 700; text-anchor: middle; transform: rotate(90deg) translate(0px, -120px); font-family: Inter, sans-serif; }

.donut-legend { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; width: 100%; }
.donut-legend li { display: flex; align-items: center; gap: 0.6rem; font-size: 0.8rem; color: var(--text-secondary); }
.dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

/* ── Upcoming ── */
.upcoming-section { padding: 1.5rem 1.8rem; border-radius: 12px; }

.upcoming-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--card-border);
}
.upcoming-item:last-child { border-bottom: none; }

.upcoming-info { display: flex; flex-direction: column; gap: 0.3rem; }
.upcoming-title { font-size: 0.9rem; font-weight: 500; }
.upcoming-chips { display: flex; gap: 0.4rem; flex-wrap: wrap; }

.badge { font-size: 0.62rem; padding: 0.15rem 0.4rem; border-radius: 4px; font-weight: 600; border: 1px solid currentColor; }
.alta  { color: #ff3e3e; }
.media { color: #f39c12; }
.baja  { color: #2ecc71; }

.tag-mini { font-size: 0.6rem; padding: 0.1rem 0.4rem; border-radius: 99px; background: rgba(124,58,237,0.2); color: #a78bfa; border: 1px solid rgba(124,58,237,0.4); }

.upcoming-date { font-size: 0.75rem; color: var(--text-secondary); white-space: nowrap; font-variant-numeric: tabular-nums; }

.empty-state { color: var(--text-secondary); font-size: 0.9rem; padding: 1rem 0; }
</style>
