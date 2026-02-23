<template>
  <div class="task-list-view">
    <header>
      <h1>Tablero de <span class="gradient-text">Tareas</span></h1>
      <p>Organiza y gestiona tu trabajo pendiente.</p>
    </header>

    <div class="kanban">
      <!-- Columna Pendiente -->
      <div class="kanban-column glass">
        <h3>Pendiente</h3>
        <div class="card-list">
          <div v-for="task in pendingTasks" :key="task.id" class="task-card glass">
            <h4>{{ task.title }}</h4>
            <div class="meta">
              <span :class="['badge', task.priority.toLowerCase()]">{{ task.priority }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna En Progreso -->
      <div class="kanban-column glass">
        <h3>En Progreso</h3>
        <div class="card-list">
          <div v-for="task in inProgressTasks" :key="task.id" class="task-card glass">
            <h4>{{ task.title }}</h4>
            <div class="meta">
              <span :class="['badge', task.priority.toLowerCase()]">{{ task.priority }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Columna Finalizado -->
      <div class="kanban-column glass">
        <h3>Finalizado</h3>
        <div class="card-list">
          <div v-for="task in doneTasks" :key="task.id" class="task-card glass">
            <h4>{{ task.title }}</h4>
            <div class="meta">
              <span :class="['badge', task.priority.toLowerCase()]">{{ task.priority }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const pendingTasks = ref([
  { id: 1, title: 'Diseñar arquitectura base', priority: 'Alta' },
  { id: 2, title: 'Configurar entorno BDD', priority: 'Media' }
])

const inProgressTasks = ref([
  { id: 3, title: 'Implementar HU2 Kanban', priority: 'Alta' }
])

const doneTasks = ref([
  { id: 4, title: 'Definir historias de usuario', priority: 'Baja' }
])
</script>

<style scoped>
h1 {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

header p {
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
}

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
  cursor: grab;
}

.task-card h4 {
  margin-bottom: 0.8rem;
  font-weight: 500;
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

.alta { color: #ff3e3e; border-color: #ff3e3e; }
.media { color: #f39c12; border-color: #f39c12; }
.baja { color: #2ecc71; border-color: #2ecc71; }
</style>
