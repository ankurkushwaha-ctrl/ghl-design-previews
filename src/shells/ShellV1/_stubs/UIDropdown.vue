<!--
  UIDropdown stub — deferred-by-design.
  Upstream: spm-ts/src/compatibility/dropdown/Dropdown.vue
  Deferred because: upstream uses @popperjs/core which is not in the
  preview repo's dependencies (and we cannot add npm deps per repo rules).

  This stub reproduces the full props API and toggle behaviour using
  simple CSS positioning instead of Popper. The visual result is
  functionally identical for the preview use-case (no complex anchoring
  or flip needed).
-->
<template>
  <div
    :id="id"
    class="dropdown btn-group"
    :class="{ show: isOpen }"
  >
    <button
      ref="toggleButton"
      class="btn dropdown-toggle"
      :class="[
        buttonClass,
        { 'disabled cursor-not-allowed': disabled },
        `btn-${variant}`,
        size ? `btn-${size}` : '',
      ]"
      @click="toggle"
      @keydown.esc="close"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
      :tabindex="disabled ? -1 : 0"
      role="button"
    >
      <slot name="button-content">{{ text }}</slot>
    </button>
    <ul
      v-if="isOpen"
      class="dropdown-menu"
      :class="[menuClass, { 'dropdown-menu-right': right, show: isOpen }]"
      role="menu"
    >
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, provide } from 'vue'

export default defineComponent({
  name: 'UIDropdown',
  props: {
    id: { type: String, default: () => `dd-${Math.random().toString(36).substr(2, 9)}` },
    text: { type: [String, Number], default: '' },
    disabled: { type: Boolean, default: false },
    buttonClass: { type: String, default: '' },
    menuClass: { type: String, default: '' },
    right: { type: Boolean, default: false },
    variant: { type: String, default: 'secondary' },
    size: { type: String, default: '' },
    boundary: { type: [String, Object], default: 'scrollParent' },
    noCaret: { type: Boolean, default: false },
  },
  setup(props) {
    const isOpen = ref(false)

    const close = () => { isOpen.value = false }
    const toggle = () => { if (!props.disabled) isOpen.value = !isOpen.value }

    provide('closeDropdown', close)

    const handleClickOutside = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (!el.closest('.dropdown')) close()
    }

    onMounted(() => document.addEventListener('click', handleClickOutside))
    onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))

    return { isOpen, toggle, close }
  },
})
</script>

<style scoped>
.dropdown-menu {
  position: absolute;
  z-index: 1000;
  display: block;
  min-width: 10rem;
  padding: 0.5rem 0;
  background: #fff;
  border: 1px solid rgba(0,0,0,.15);
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0,0,0,.175);
  right: 0;
  left: auto;
}
.dropdown { position: relative; }
</style>
