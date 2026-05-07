<!--
  UIButton stub — vendored verbatim from
  spm-ts/src/pmd/components/UIComponents/UIButton.vue.

  Only change: this file lives at _stubs/UIButton.vue instead of the
  original path. No runtime imports needed — all styles are Tailwind
  classes already available in the preview repo's Tailwind config.
-->
<template>
  <button
    v-bind="$attrs"
    :type="type"
    class="hl-btn"
    :disabled="disabled"
    :class="buttonClasses"
    @click="handleClick"
  >
    <svg
      v-if="loading"
      class="w-5 h-5 mr-3 -ml-1 animate-spin"
      :class="loaderClasses"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    use: {
      type: String,
      default: 'primary',
    },
    type: {
      // upstream: plain String — vue-tsc requires the narrower union here
      type: String as () => 'button' | 'reset' | 'submit',
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  computed: {
    buttonClasses() {
      return {
        'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-apple-500 hover:bg-apple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-apple-500': this.use === 'primary',
        'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded shadow-sm text-apple-500 bg-apple-200 hover:bg-apple-300 hover:text-apple-600 focus:outline-none': this.use === 'primary-light',
        'inline-flex items-center px-4 py-2 border-2 border-curious-blue-400 text-sm font-medium rounded text-curious-blue-500 hover:bg-curious-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-curious-blue-500': this.use === 'secondary',
        'inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-curious-blue-500': this.use === 'outline',
        'inline-flex items-center px-4 py-2 border-transparent text-sm font-medium rounded shadow-sm text-red-500 bg-red-200 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500': this.use === 'danger',
        'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded text-white bg-curious-blue-500 hover:bg-curious-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-curious-blue-600': this.use === 'tertiary',
        'cursor-not-allowed': this.loading
      }
    },
    loaderClasses() {
      return {
        'text-white': this.use === 'primary' || this.use === 'danger',
        'text-curious-blue-500': this.use === 'secondary',
        'text-gray-700': this.use === 'outline'
      }
    }
  },
  methods: {
    handleClick(event: Event) {
      this.$emit('click', event)
    }
  }
})
</script>

<style scoped>
.hl-btn:disabled {
  color: rgba(0,0,0,.25);
  background-color: #f5f5f5;
  border-color: #d9d9d9;
  text-shadow: none;
  box-shadow: none;
  cursor: not-allowed;
}
</style>
