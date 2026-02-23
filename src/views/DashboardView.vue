<template>
  <div class="dashboard-view">
    <header class="welcome">
      <h1>Bienvenido de nuevo, <span class="gradient-text">Usuario</span></h1>
      <p>Esto es lo que está pasando hoy.</p>
    </header>

    <!-- Entrada Rápida (HU3) -->
    <section class="quick-entry-section">
      <div class="quick-entry glass">
        <input 
          v-model="newTaskTitle" 
          @keyup.enter="addTask"
          type="text" 
          placeholder="Escribe una tarea y presiona Enter..."
        />
        <button @click="addTask" class="add-btn">Añadir</button>
      </div>
    </section>

    <div class="summary-cards">
      <div class="glass stats-card">
        <h3>Pendientes</h3>
        <p class="count">12</p>
      </div>
      <div class="glass stats-card">
        <h3>En Progreso</h3>
        <p class="count">4</p>
      </div>
      <div class="glass stats-card">
        <h3>Completadas</h3>
        <p class="count">28</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const newTaskTitle = ref('')

const addTask = () => {
  if (newTaskTitle.value.trim()) {
    console.log('Tarea añadida:', newTaskTitle.value)
    // En una app real, emitiríamos un evento o guardaríamos en un store
    alert('Tarea añadida con éxito: ' + newTaskTitle.value)
    newTaskTitle.value = ''
  }
}
</script>

<style scoped>
.dashboard-view {
  max-width: 1000px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.welcome p {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.quick-entry-section {
  margin-bottom: 4rem;
}

.quick-entry {
  display: flex;
  padding: 0.5rem;
  gap: 0.5rem;
}

.quick-entry input {
  flex-grow: 1;
  background: transparent;
  border: none;
  color: white;
  padding: 1rem;
  font-size: 1.1rem;
}

.add-btn {
  background: var(--accent-blue);
  color: white;
  border: none;
  padding: 0 1.5rem;
  border-radius: 8px;
  font-weight: 600;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.stats-card {
  padding: 2rem;
  text-align: center;
}

.stats-card h3 {
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.count {
  font-size: 2.5rem;
  font-weight: 700;
}
</style>
