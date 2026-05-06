<script lang="ts" setup>
import SideBar from './sidebar/SideBar.vue';

interface Props {
  active?: string;
}

withDefaults(defineProps<Props>(), { active: '' });
</script>

<template>
  <div class="sidebar-v2-agency shell-v1">
    <SideBar :active="active" />
    <main class="shell-v1__content hl_wrapper">
      <slot />
    </main>
  </div>
</template>

<style scoped>
  .shell-v1 {
    min-height: 100vh;
    display: flex;
  }

  .shell-v1__content {
    flex: 1;
    padding: 0;
    min-width: 0;
    background: var(--gray-50);
  }
</style>
