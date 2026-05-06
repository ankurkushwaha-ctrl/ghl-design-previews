<script lang="ts" setup>
  /*
   * Stub of @platform-ui/highrise's HLTabs.
   *
   * Supports the subset AddOnsPage actually uses:
   *   - v-model:value with a string|number key
   *   - type="line" (default — no other types implemented)
   *   - default slot of <HLTabPane> children
   *
   * Tab labels come from each <HLTabPane>'s `tab` prop. We collect
   * panes via a shared injected registry keyed by `name`.
   */
  import { Fragment, computed, provide, ref, useSlots, type VNode } from 'vue';

  type TabKey = string | number;

  interface Props {
    value?: TabKey;
    type?: 'line' | 'card';
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'line',
  });

  const emit = defineEmits<{ 'update:value': [value: TabKey] }>();

  const slots = useSlots();

  // Panes are read off slot vnodes' props on every render. With `v-for`
  // the slot can contain Fragment wrappers, so we flatten recursively
  // before picking HLTabPane nodes.
  const flattenVNodes = (nodes: VNode[]): VNode[] => {
    const out: VNode[] = [];
    for (const node of nodes) {
      if (!node) continue;
      if (node.type === Fragment && Array.isArray(node.children)) {
        out.push(...flattenVNodes(node.children as VNode[]));
        continue;
      }
      out.push(node);
    }
    return out;
  };

  const panes = computed(() => {
    const children = flattenVNodes((slots.default?.() ?? []) as VNode[]);
    return children
      .filter((vnode) => vnode && typeof vnode.type === 'object')
      .map((vnode) => ({
        key: vnode.props?.name as TabKey,
        label: vnode.props?.tab as string,
      }))
      .filter((p) => p.key !== undefined);
  });

  const internal = ref<TabKey | undefined>(props.value);
  const active = computed<TabKey | undefined>({
    get: () => (props.value !== undefined ? props.value : internal.value),
    set: (v) => {
      internal.value = v;
      if (v !== undefined) emit('update:value', v);
    },
  });

  // Children read activeKey via inject — see HLTabPane.
  provide('hl-tabs-active-key', active);
</script>

<template>
  <div class="hl-tabs" :class="`hl-tabs--${props.type}`">
    <div class="hl-tabs__nav" role="tablist">
      <button
        v-for="pane in panes"
        :key="pane.key"
        type="button"
        role="tab"
        :aria-selected="active === pane.key"
        class="hl-tabs__tab"
        :class="{ 'hl-tabs__tab--active': active === pane.key }"
        @click="active = pane.key"
      >
        {{ pane.label }}
      </button>
    </div>
    <div class="hl-tabs__panes">
      <slot />
    </div>
  </div>
</template>

<style scoped>
  .hl-tabs__nav {
    display: flex;
    gap: 4px;
    border-bottom: 1px solid var(--gray-200);
  }

  .hl-tabs__tab {
    appearance: none;
    background: transparent;
    border: 0;
    padding: 10px 14px;
    margin-bottom: -1px;
    font-family: inherit;
    font-size: var(--hr-font-size-lg);
    font-weight: var(--hr-font-weight-medium);
    color: var(--gray-500);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: color 0.15s ease, border-color 0.15s ease;
  }

  .hl-tabs__tab:hover {
    color: var(--gray-700);
  }

  .hl-tabs__tab:focus-visible {
    outline: 2px solid var(--primary-600);
    outline-offset: 2px;
    border-radius: 4px;
  }

  .hl-tabs__tab--active {
    color: var(--primary-600);
    border-bottom-color: var(--primary-600);
  }

  .hl-tabs__panes {
    padding-top: 16px;
  }
</style>
