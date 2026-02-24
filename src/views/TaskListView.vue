<template>
  <div class="task-list-view">
    <header>
      <h1>Tablero de <span class="gradient-text">Tareas</span></h1>
      <p>Organiza y gestiona tu trabajo pendiente.</p>
    </header>

    <!-- Barra de controles: búsqueda + filtros de etiqueta (HU6 + HU8) -->
    <div class="controls-section">
      <div class="search-bar glass">
        <input v-model="searchQuery" type="text" placeholder="Buscar tareas..." />
      </div>

      <div class="tag-filters">
        <span class="filter-label">Filtrar:</span>
        <TagChip
          v-for="tag in AVAILABLE_TAGS"
          :key="tag"
          :label="tag"
          :active="activeTagFilter === tag"
          @click="toggleTagFilter(tag)"
        />
      </div>
    </div>

    <div class="kanban">
      <!-- Columna Pendiente -->
      <div class="kanban-column glass">
        <h3>Pendiente</h3>
        <div class="card-list">
          <div v-for="task in filteredPending" :key="task.id" class="task-card glass" @click="openDetail(task)">
            <h4>{{ task.title }}</h4>
            <div class="tags-row" v-if="task.tags.length">
              <TagChip v-for="tag in task.tags" :key="tag" :label="tag" :active="true" />
            </div>
            <div class="meta">
              <span :class="['badge', task.priority.toLowerCase()]">{{ task.priority }}</span>
              <div class="actions">
                <button class="delete-btn" @click.stop="deleteTask(task)">🗑️</button>
                <button class="move-right" @click.stop="moveTask(task, 'pending', 'inProgress')">→</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna En Progreso -->
      <div class="kanban-column glass">
        <h3>En Progreso</h3>
        <div class="card-list">
          <div v-for="task in filteredInProgress" :key="task.id" class="task-card glass" @click="openDetail(task)">
            <h4>{{ task.title }}</h4>
            <div class="tags-row" v-if="task.tags.length">
              <TagChip v-for="tag in task.tags" :key="tag" :label="tag" :active="true" />
            </div>
            <div class="meta">
              <span :class="['badge', task.priority.toLowerCase()]">{{ task.priority }}</span>
              <div class="actions">
                <button class="delete-btn" @click.stop="deleteTask(task)">🗑️</button>
                <button class="move-left" @click.stop="moveTask(task, 'inProgress', 'pending')">←</button>
                <button class="move-right" @click.stop="moveTask(task, 'inProgress', 'done')">→</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna Finalizado -->
      <div class="kanban-column glass">
        <h3>Finalizado</h3>
        <div class="card-list">
          <div v-for="task in filteredDone" :key="task.id" class="task-card glass" @click="openDetail(task)">
            <h4>{{ task.title }}</h4>
            <div class="tags-row" v-if="task.tags.length">
              <TagChip v-for="tag in task.tags" :key="tag" :label="tag" :active="true" />
            </div>
            <div class="meta">
              <span :class="['badge', task.priority.toLowerCase()]">{{ task.priority }}</span>
              <div class="actions">
                <button class="delete-btn" @click.stop="deleteTask(task)">🗑️</button>
                <button class="move-left" @click.stop="moveTask(task, 'done', 'inProgress')">←</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Panel de Detalle Lateral (HU4 + HU8) -->
    <Transition name="slide">
      <div v-if="selectedTask" class="task-detail-sidebar glass">
        <div class="detail-header">
          <h2>Detalle de Tarea</h2>
          <button @click="selectedTask = null" class="close-btn">×</button>
        </div>

        <div class="detail-content">
          <div class="form-group">
            <label>Título</label>
            <input v-model="selectedTask.title" type="text" name="title" />
          </div>
          <div class="form-group">
            <label>Prioridad</label>
            <select v-model="selectedTask.priority">
              <option>Alta</option>
              <option>Media</option>
              <option>Baja</option>
            </select>
          </div>
          <div class="form-group">
            <label>Descripción</label>
            <textarea v-model="selectedTask.description" rows="4"></textarea>
          </div>

          <!-- Sección Etiquetas (HU8) -->
          <div class="form-group">
            <label>Etiquetas</label>
            <div class="tag-selector">
              <TagChip
                v-for="tag in AVAILABLE_TAGS"
                :key="tag"
                :label="tag"
                :active="selectedTask.tags.includes(tag)"
                @click="toggleTag(tag)"
              />
            </div>
          </div>

          <div class="detail-footer">
            <button class="delete-link" @click="deleteTask(selectedTask)">Eliminar Tarea</button>
            <button class="save-btn" @click="saveTask">Guardar</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TagChip from '../components/TagChip.vue'
import { useTasks } from '../composables/useTasks'

// --- Constantes ---
const AVAILABLE_TAGS = ['Diseño', 'Dev', 'QA', 'Docs']

// --- Estado reactivo ---
const searchQuery    = ref('')
const selectedTask   = ref(null)
const activeTagFilter = ref(null)

// --- Composable compartido ---
const { pendingTasks, inProgressTasks, doneTasks, deleteTask: removeTask, moveTask: changeStatus, updateTask } = useTasks()

// --- Lógica de filtrado (HU6 + HU8) ---
const filterTasks = (tasks) =>
  tasks.filter(t => {
    const matchesText = !searchQuery.value || t.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesTag  = !activeTagFilter.value || t.tags.includes(activeTagFilter.value)
    return matchesText && matchesTag
  })

const filteredPending    = computed(() => filterTasks(pendingTasks.value))
const filteredInProgress = computed(() => filterTasks(inProgressTasks.value))
const filteredDone       = computed(() => filterTasks(doneTasks.value))

// --- Lógica de filtro de etiqueta (HU8) ---
const toggleTagFilter = (tag) => {
  activeTagFilter.value = activeTagFilter.value === tag ? null : tag
}

// --- Lógica de movimiento (HU5) ---
const moveTask = (task, from, to) => {
  const statusMap = { pending: 'pending', inProgress: 'inProgress', done: 'done' }
  changeStatus(task.id, statusMap[to])
}

// --- Lógica de detalle (HU4) ---
const openDetail = (task) => {
  selectedTask.value = { ...task, tags: [...task.tags] }
}

const saveTask = () => {
  if (!selectedTask.value) return
  updateTask(selectedTask.value)
  selectedTask.value = null
}

// --- Lógica de etiquetas en detalle (HU8) ---
const toggleTag = (tag) => {
  if (!selectedTask.value) return
  const idx = selectedTask.value.tags.indexOf(tag)
  if (idx === -1) selectedTask.value.tags.push(tag)
  else selectedTask.value.tags.splice(idx, 1)
}

// --- Lógica de borrado (HU7) ---
const deleteTask = (task) => {
  if (confirm(`¿Estás seguro de que deseas eliminar la tarea "${task.title}"?`)) {
    removeTask(task.id)
    selectedTask.value = null
  }
}
</script>

<style scoped>
.task-list-view {
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

/* ── Controls (búsqueda + filtros) ── */
.controls-section {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-bar {
  padding: 0.5rem 1rem;
  min-width: 260px;
}

.search-bar input {
  width: 100%;
  background: transparent;
  border: none;
  color: white;
  padding: 0.5rem 0;
}

.tag-filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* ── Kanban ── */
.kanban {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.kanban-column {
  padding: 1.5rem;
  min-height: 70vh;
}

.kanban-column h3 {
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: var(--text-secondary);
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.task-card {
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.task-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.08);
}

.task-card h4 {
  margin-bottom: 0.6rem;
  font-weight: 500;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.7rem;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge {
  font-size: 0.7rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
}

.actions button {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 1.2rem;
  padding: 0 0.2rem;
}

.actions button:hover { color: var(--accent-blue); }

.alta  { color: #ff3e3e; border-color: #ff3e3e; }
.media { color: #f39c12; border-color: #f39c12; }
.baja  { color: #2ecc71; border-color: #2ecc71; }

/* ── Panel de Detalle ── */
.task-detail-sidebar {
  position: fixed;
  right: 0;
  top: 0;
  width: 400px;
  height: 100vh;
  z-index: 100;
  padding: 2.5rem;
  border-radius: 0;
  border-left: 1px solid var(--card-border);
  overflow-y: auto;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  background: rgba(0,0,0,0.2);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  color: white;
  padding: 0.8rem;
}

/* Selector de etiquetas (HU8) */
.tag-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(0,0,0,0.15);
  border: 1px solid var(--card-border);
  border-radius: 8px;
}

.detail-footer {
  margin-top: 2.5rem;
}

.save-btn {
  width: 100%;
  padding: 1rem;
  background: var(--accent-blue);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
}

.delete-btn {
  font-size: 0.9rem !important;
  opacity: 0.5;
  margin-right: 0.5rem;
}

.delete-btn:hover { opacity: 1; color: #ff3e3e !important; }

.delete-link {
  display: block;
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
  background: transparent;
  border: none;
  color: #ff3e3e;
  font-size: 0.8rem;
  text-decoration: underline;
  cursor: pointer;
}

/* Transición */
.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from, .slide-leave-to        { transform: translateX(100%); }
</style>
