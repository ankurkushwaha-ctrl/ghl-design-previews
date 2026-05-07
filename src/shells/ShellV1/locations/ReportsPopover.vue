<!--
  ReportsPopover.vue
  ────────────────────────────────────────────────────────────────────────────
  Small click-popover with 5 fake report links. The trigger element is the
  default slot — typically the "Reports" link in LocationCard97Plan footer.
  All links are inert (no-op @click) since the brief calls them out as fake.
-->
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { UIPopover } from '@gohighlevel/ghl-ui'
import {
  BarChart01Icon,
  PhoneCall01Icon,
  Mail01Icon,
  MessageChatCircleIcon,
  PieChart01Icon,
} from '@gohighlevel/ghl-icons/24/outline'

defineProps<{
  locationName: string
}>()

const { t } = useI18n()

const reportLinks = [
  { id: 'sales', labelKey: 'reportSales', icon: BarChart01Icon },
  { id: 'calls', labelKey: 'reportCalls', icon: PhoneCall01Icon },
  { id: 'email', labelKey: 'reportEmail', icon: Mail01Icon },
  { id: 'conv', labelKey: 'reportConversation', icon: MessageChatCircleIcon },
  { id: 'custom', labelKey: 'reportCustom', icon: PieChart01Icon },
]
</script>

<template>
  <UIPopover trigger="click" placement="top" :width="240">
    <template #trigger>
      <slot />
    </template>
    <div class="reports-popover">
      <div class="reports-popover__title">
        {{ t('reportsPopoverTitle', { name: locationName }) }}
      </div>
      <ul class="reports-popover__list">
        <li
          v-for="link in reportLinks"
          :key="link.id"
          class="reports-popover__item"
          @click.prevent
        >
          <component :is="link.icon" class="h-4 w-4 text-gray-500 mr-2" />
          <span>{{ t(link.labelKey) }}</span>
        </li>
      </ul>
    </div>
  </UIPopover>
</template>

<style scoped>
.reports-popover {
  min-width: 220px;
  padding: 4px 0;
}
.reports-popover__title {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--gray-500, #667085);
  letter-spacing: 0.05em;
  padding: 4px 12px 8px;
  border-bottom: 1px solid var(--gray-100, #f2f4f7);
}
.reports-popover__list {
  list-style: none;
  margin: 0;
  padding: 6px 0;
}
.reports-popover__item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  font-size: 14px;
  color: var(--gray-700, #344054);
  cursor: pointer;
  transition: background 0.15s ease;
}
.reports-popover__item:hover {
  background: var(--gray-50, #f9fafb);
  color: var(--gray-900, #101828);
}
</style>
