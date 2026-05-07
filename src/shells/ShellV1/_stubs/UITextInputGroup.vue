<!--
  UITextInputGroup stub — deferred-by-design.
  Upstream: spm-ts/src/pmd/components/UIComponents/UITextInputGroup.vue
  Deferred because: requires vee-validate, libphonenumber-js, UITextInput,
  UIIcon — all absent from the preview repo.

  For the Sub-Accounts page this only needs to render a functional search
  box (type="text", v-model, @keyup). We render a plain <input> with the
  same class surface as upstream so the container layout is correct.
-->
<template>
  <div class="hl-text-input-container">
    <div class="relative rounded-md shadow-sm">
      <div v-if="icon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <i class="fas fa-search text-sm"></i>
      </div>
      <input
        :type="type || 'text'"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="!!disabled"
        class="hl-text-input block w-full rounded-md border-gray-300 shadow-sm focus:border-curious-blue-500 focus:ring-curious-blue-500 sm:text-sm"
        :class="{ 'pl-10': icon }"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @keyup="$emit('keyup', $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UITextInputGroup',
  emits: ['update:modelValue', 'keyup', 'enter', 'focus', 'blur', 'change'],
  props: {
    modelValue: { type: [String, Number], default: '' },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    icon: { type: String },
    disabled: { type: [Boolean, String], default: false },
    label: { type: String },
    name: { type: String, default: '' },
    error: { type: Boolean, default: false },
    errorMsg: { type: String, default: '' },
  },
})
</script>
