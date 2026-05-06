<script lang="ts" setup>
import SideBar from './sidebar/SideBar.vue';
import TopBar from './topbar/TopBar.vue';

interface Props {
  active?: string;
}

withDefaults(defineProps<Props>(), { active: '' });
</script>

<template>
  <div class="sidebar-v2-agency shell-v1">
    <SideBar :active="active" />
    <section class="shell-v1__content">
      <TopBar :active="active" />
      <main class="hl_wrapper shell-v1__main">
        <slot />
      </main>
    </section>
  </div>
</template>

<style scoped>
  .shell-v1 {
    min-height: 100vh;
    display: flex;
  }

  .shell-v1__content {
    flex: 1;
    min-width: 0;
    min-height: 100vh;
    background: var(--gray-50);
    display: flex;
    flex-direction: column;
  }

  .shell-v1__main {
    flex: 1;
    padding: 0;
  }
</style>
