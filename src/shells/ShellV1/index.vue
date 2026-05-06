<script lang="ts" setup>
  /*
   * ShellV1 — wraps a page in the legacy spm-ts chrome (sidebar + topbar).
   *
   * Usage in a page:
   *
   *   <template>
   *     <ShellV1 active="addons">
   *       <YourPageContent />
   *     </ShellV1>
   *   </template>
   *
   * Layout matches prod:
   *   - Sidebar: fixed left, 14rem wide
   *   - Topbar:  fixed top, left: 14rem (so it doesn't sit under the sidebar)
   *   - Content: starts at left: 14rem, top: 50px (the topbar height)
   *
   * Background is var(--gray-50) — pages can override via their own
   * .hl_wrapper--inner background. AddOnsPage does this.
   */
  import Sidebar from './Sidebar.vue';
  import TopBar from './TopBar.vue';

  interface Props {
    /** Active sidebar nav key (e.g. 'addons'). Passed straight to Sidebar. */
    active?: string;
  }

  withDefaults(defineProps<Props>(), { active: '' });
</script>

<template>
  <div class="shell-v1 sidebar-v2-agency">
    <Sidebar :active-key="active" />
    <TopBar />
    <!-- Main content area. The .hl_wrapper class is preserved so pages
         that already key off it (e.g. AddOnsPage's
         .hl_wrapper--inner) render unchanged. -->
    <main class="shell-v1__content hl_wrapper">
      <slot />
    </main>
  </div>
</template>

<style scoped>
  .shell-v1 {
    min-height: 100vh;
    background: var(--gray-50);
  }
  /* Matches prod's calc(100vw - 14rem) wrapper width. */
  .shell-v1__content {
    margin-left: 14rem;
    padding-top: 50px;
    min-height: 100vh;
  }
</style>
