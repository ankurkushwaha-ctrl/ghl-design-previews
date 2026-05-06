<script lang="ts" setup>
  /*
   * Companion to HLTabs. Renders its slot only when its `name` matches
   * the active key injected by the parent <HLTabs>. The tab label
   * (the `tab` prop) is read from the parent — see HLTabs for that.
   */
  import { computed, inject, type Ref } from 'vue';

  type TabKey = string | number;

  interface Props {
    name: TabKey;
    tab?: string;
  }

  const props = defineProps<Props>();

  const active = inject<Ref<TabKey | undefined>>('hl-tabs-active-key');
  const isActive = computed(() => active?.value === props.name);
</script>

<template>
  <div v-if="isActive" role="tabpanel" class="hl-tab-pane">
    <slot />
  </div>
</template>
