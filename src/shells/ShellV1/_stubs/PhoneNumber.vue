<!--
  PhoneNumber stub — deferred-by-design.
  Upstream: spm-ts/src/pmd/components/util/PhoneNumber.vue
  Deferred because: upstream requires libphonenumber-js, vee-validate,
  and phoneNumber mixins — none available in the preview repo.

  For the Sub-Accounts page, PhoneNumber is always used with type="display"
  in LocationListCard.vue, which renders `<span>{{ formattedPhone }}</span>`.
  We just render the raw modelValue string since this is a design preview.
-->
<template>
  <span>{{ modelValue }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PhoneNumber',
  props: {
    modelValue: { type: String, default: '' },
    type: { type: String, default: 'display' },
    currentLocationId: String,
    placeholder: String,
    customClass: { default: '' },
    allowNan: Boolean,
    allowChange: { default: false },
    disabled: { default: false },
    error: { default: false },
    errorMsg: { default: '' },
  },
  emits: ['change', 'blur', 'keyup', 'enter', 'update:modelValue'],
})
</script>
