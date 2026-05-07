<!--
  UIDropdownItem stub — vendored verbatim from
  spm-ts/src/compatibility/dropdown/DropdownItem.vue.
  Only change: injects closeDropdown from UIDropdown stub instead of
  the @popperjs variant.
-->
<template>
  <li role="presentation">
    <a
      role="menuitem"
      :href="href"
      :target="target"
      @click="handleClick"
      :class="['dropdown-item', { 'disabled': disabled }, { 'active': active }]"
    >
      <slot></slot>
    </a>
  </li>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'UIDropdownItem',
  props: {
    href: { type: String, default: 'javascript:void(0)' },
    target: { type: String, default: '_self' },
    disabled: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    item: { type: Object, default: () => ({}) },
  },
  emits: ['click'],
  setup(props, { emit }) {
    const closeDropdown = inject<(() => void) | undefined>('closeDropdown')
    const handleClick = (event: Event) => {
      if (props.disabled) { event.preventDefault(); return }
      emit('click', props.item)
      closeDropdown?.()
    }
    return { handleClick }
  },
})
</script>
