<!--
  HLModal — HighRise modal stub.

  Renders an overlay + centered dialog via Teleport. Provides three
  slot regions (header, default body, footer) matching the HR modal
  pattern. Handles Esc-to-close and optional mask-closable.

  Props mirror the subset that migrated pages actually use:
    - show        — visibility toggle (v-model:show)
    - width       — dialog max-width in px (default 520)
    - maskClosable — close on overlay click (default true)
    - title       — header title text (rendered in a built-in header
                    bar with close button; use #header slot to override)
-->
<script setup lang="ts">
import { watch, nextTick, ref, onBeforeUnmount } from 'vue'

interface Props {
  show: boolean
  width?: number
  maskClosable?: boolean
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: 520,
  maskClosable: true,
  title: '',
})

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
}>()

const dialogRef = ref<HTMLElement | null>(null)

function close() {
  emit('update:show', false)
}

function onOverlayClick() {
  if (props.maskClosable) close()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.stopPropagation()
    close()
  }
}

watch(
  () => props.show,
  async (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      await nextTick()
      dialogRef.value?.focus()
    } else {
      document.body.style.overflow = ''
    }
  },
)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="hl-modal-fade">
      <div
        v-if="show"
        class="hl-modal-overlay"
        @click.self="onOverlayClick"
        @keydown="onKeydown"
      >
        <div
          ref="dialogRef"
          class="hl-modal-dialog"
          :style="{ maxWidth: `${width}px` }"
          role="dialog"
          aria-modal="true"
          tabindex="-1"
        >
          <!-- Header -->
          <div class="hl-modal-header">
            <slot name="header">
              <h1 class="hl-modal-header__title">{{ title }}</h1>
            </slot>
            <button
              type="button"
              class="hl-modal-header__close"
              aria-label="close modal"
              @click="close"
            >
              <i class="fas fa-times" aria-hidden="true" />
            </button>
          </div>

          <!-- Body -->
          <div class="hl-modal-body">
            <slot />
          </div>

          <!-- Footer (optional) -->
          <div v-if="$slots.footer" class="hl-modal-footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ─── Overlay ───────────────────────────────────────────────────────── */
.hl-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 24, 40, 0.55);
  padding: 24px;
}

/* ─── Dialog ────────────────────────────────────────────────────────── */
.hl-modal-dialog {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: calc(100vh - 48px);
  background: var(--base-white, #ffffff);
  border-radius: 12px;
  box-shadow:
    0 8px 8px -4px rgba(16, 24, 40, 0.03),
    0 20px 24px -4px rgba(16, 24, 40, 0.08);
  outline: none;
}

/* ─── Header ────────────────────────────────────────────────────────── */
.hl-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--gray-200, #eaecf0);
  flex: 0 0 auto;
}

.hl-modal-header__title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  color: var(--gray-900, #101828);
}

.hl-modal-header__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: var(--gray-500, #667085);
  font-size: 14px;
  cursor: pointer;
  transition: background 0.12s ease, color 0.12s ease;
}

.hl-modal-header__close:hover {
  background: var(--gray-100, #f2f4f7);
  color: var(--gray-700, #344054);
}

.hl-modal-header__close:focus-visible {
  outline: 2px solid var(--primary-500, #2970ff);
  outline-offset: 2px;
}

/* ─── Body ──────────────────────────────────────────────────────────── */
.hl-modal-body {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 20px;
}

/* ─── Footer ────────────────────────────────────────────────────────── */
.hl-modal-footer {
  flex: 0 0 auto;
  border-top: 1px solid var(--gray-200, #eaecf0);
}

/* ─── Transition ────────────────────────────────────────────────────── */
.hl-modal-fade-enter-active,
.hl-modal-fade-leave-active {
  transition: opacity 0.18s ease;
}

.hl-modal-fade-enter-active .hl-modal-dialog,
.hl-modal-fade-leave-active .hl-modal-dialog {
  transition: transform 0.18s ease;
}

.hl-modal-fade-enter-from,
.hl-modal-fade-leave-to {
  opacity: 0;
}

.hl-modal-fade-enter-from .hl-modal-dialog {
  transform: scale(0.96) translateY(8px);
}

.hl-modal-fade-leave-to .hl-modal-dialog {
  transform: scale(0.96) translateY(8px);
}
</style>
