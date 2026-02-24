<template>
  <span
    class="tag-chip"
    :class="{ active: active }"
    :style="{ '--chip-color': color }"
    @click="$emit('click')"
  >
    {{ label }}
  </span>
</template>

<script setup>
const TAG_COLORS = {
  Diseño:  '#4b9bee',
  Dev:     '#7c3aed',
  QA:      '#10b981',
  Docs:    '#f59e0b',
}

const props = defineProps({
  label:  { type: String, required: true },
  active: { type: Boolean, default: false },
})

defineEmits(['click'])

const color = TAG_COLORS[props.label] ?? '#6b7280'
</script>

<style scoped>
.tag-chip {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.15rem 0.55rem;
  border-radius: 99px;
  border: 1px solid var(--chip-color);
  color: var(--chip-color);
  background: transparent;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  user-select: none;
  letter-spacing: 0.03em;
}

.tag-chip.active {
  background: var(--chip-color);
  color: #fff;
}

.tag-chip:hover:not(.active) {
  background: color-mix(in srgb, var(--chip-color) 15%, transparent);
}
</style>
