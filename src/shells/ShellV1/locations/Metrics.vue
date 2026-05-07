<!--
  Metrics.vue
  ────────────────────────────────────────────────────────────────────────────
  Vendored verbatim from:
    ghl-revex-frontend/apps/locations/src/components/locations/overview/Metrics.vue

  Template kept byte-identical to upstream.

  Import surgery applied (upstream → here):
    @/helpers/report_helper             → './report_helper'  (vendored, trimmed
                                          to only the seven fields the preview
                                          mock data exercises — see report_helper.ts).
    @gohighlevel/ghl-ui                 → kept as-is (real package now installed).
-->
<script setup lang="ts">
import { computed } from 'vue'
import { UITooltip, UITextMdMedium, UITextSmMedium } from '@gohighlevel/ghl-ui'
import { buildReport } from './report_helper'

const props = defineProps({
  locationId: { type: String, required: true },
  metrics: { type: Object, required: true },
  previousMetrics: { type: Object, required: true },
  fields: { type: Array, required: true },
})

const parsedMetrics = computed(() => {
  return buildReport(props.fields, props.metrics, props.previousMetrics)
})
</script>
<template>
  <div class="metrics flex">
    <div v-for="(row, i) in parsedMetrics" :key="i" class="metric-row">
      <div v-for="col in row" :key="col.label" class="metric-row-item">
        <UITextSmMedium
          :id="'loc-' + locationId + '__stat_label'"
          class="mb-1 text-sm text-gray-500"
        >
          {{ col.label }}
        </UITextSmMedium>
        <div
          v-for="metric in col.metrics"
          :key="metric.label"
          class="flex items-center"
        >
          <UITooltip :id="'loc-' + locationId + '__stat_tip'">
            <template #trigger>
              <component
                :is="metric.icon"
                :id="'loc-' + locationId + '__stat_icon'"
                class="mr-1 h-4 w-4 stroke-gray-500"
              />
            </template>
            {{ metric.tooltip || '' }}
          </UITooltip>
          <UITextSmMedium
            :id="'loc-' + locationId + '__stat_val'"
            class="text-sm font-semibold text-gray-900"
          >
            {{ metric.value }}
          </UITextSmMedium>
          <div
            v-if="metric.comparison"
            v-show="metric.comparison"
            class="compare m-1 pl-1 pr-1"
            :class="metric.comparison && metric.comparison.classes"
          >
            <UITextMdMedium
              :id="'loc-' + locationId + '__stat_compare'"
              class="flex items-center font-semibold"
              style="font-weight: 500; font-size: 12px; line-height: 18px"
            >
              <component
                :is="metric.comparison.icon"
                :id="'loc-' + locationId + '__stat_compare_icon'"
                class="mr-1 h-3 w-3"
              />
              <span>{{ metric.comparison.value }}%</span>
            </UITextMdMedium>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.metrics {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
}
.compare {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: auto;
  height: 24px;

  border-radius: 16px;

  flex: none;
  order: 0;
  flex-grow: 0;
}
.arrow-icon {
  position: absolute;
  left: 20.83%;
  right: 20.83%;
  top: 20.83%;
  bottom: 20.83%;
}
.metric-row {
  display: flex;
  flex-basis: 50%;
  flex-direction: row;
}

.metric-row:first-child {
  padding-bottom: 10px;
}
.hl-card-footer {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
.metric-row-item {
  flex-basis: 25%;
}
</style>
