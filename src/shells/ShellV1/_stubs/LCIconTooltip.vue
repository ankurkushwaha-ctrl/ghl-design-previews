<!--
  LCIconTooltip stub — deferred-by-design.
  Upstream: spm-ts/src/pmd/components/agency/LcIconTooltip.vue
  Deferred because: upstream uses SAAS_ASSETS_BASE_URL (a CDN constant from
  a service that isn't available in the preview repo), and v-tooltip
  directive (not registered here).

  We render a simple 30×30 placeholder icon tile that matches the upstream
  sizing so the card layout stays correct.
-->
<template>
  <div
    :id="`loc-${locationId}__${type}_${state}`"
    style="width:30px;height:30px;display:inline-flex;align-items:center;justify-content:center;opacity:0.4;"
    :title="tooltipText"
  >
    <i class="fas fa-circle" style="font-size:12px;color:#a0aec0;"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LCIconTooltip',
  props: {
    type: { type: String, required: true },
    locationId: { type: String, required: true },
    state: { type: String, required: true },
  },
  computed: {
    tooltipText(): string {
      if (this.type === 'lc_email') {
        return this.state === 'enabled' ? 'Managed by LC Email' : 'Not Managed by LC Email'
      }
      if (this.type === 'lc_phone') {
        return this.state === 'enabled' ? 'Managed by LC Phone'
          : this.state === 'migration_in_process' ? 'Under Migration to LC Phone'
          : 'Not Managed by LC Phone'
      }
      return ''
    },
  },
})
</script>
