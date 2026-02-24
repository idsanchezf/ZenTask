<template>
  <div class="layout">
    <!-- Barra Lateral (HU1) -->
    <aside class="sidebar glass">
      <div class="logo">
        <h2 class="gradient-text">ZenTask</h2>
      </div>
      <nav>
        <router-link to="/" class="nav-item">
          <span>Panel de Control</span>
        </router-link>
        <router-link to="/tareas" class="nav-item">
          <span>Tareas</span>
        </router-link>
        <router-link to="/calendario" class="nav-item">
          <span>Calendario</span>
        </router-link>
      </nav>
      <div class="user-profile">
        <div class="avatar">U</div>
        <span>Usuario Demo</span>
      </div>
    </aside>

    <!-- Contenido Principal -->
    <main class="main-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0a0a0c 100%);
}

.sidebar {
  width: 260px;
  height: 96vh;
  margin: 2vh 0 2vh 2vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

.logo h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
}

nav {
  flex-grow: 1;
}

.nav-item {
  display: block;
  padding: 0.8rem 1rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s;
}

.nav-item:hover, .router-link-active {
  background: var(--card-bg);
  color: var(--text-primary);
  border: 1px solid var(--card-border);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--card-border);
}

.avatar {
  width: 32px;
  height: 32px;
  background: var(--accent-blue);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.main-content {
  flex-grow: 1;
  padding: 3rem;
  overflow-y: auto;
}
</style>
