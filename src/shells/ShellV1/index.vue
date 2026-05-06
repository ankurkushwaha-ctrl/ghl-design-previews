<script lang="ts" setup>
  /*
   * ShellV1 — placeholder.
   *
   * The fabricated Sidebar.vue / TopBar.vue that previously lived here
   * have been deleted (commit "wipe fabricated shell"). The next step
   * is to vendor the spm-ts shell SCSS verbatim and re-template using
   * prod's actual class names. Until that lands, every page wrapped
   * in <ShellV1> will render its content with this notice in place of
   * the chrome.
   *
   * Source of truth for ShellV1 (do not invent):
   *   - spm-ts/src/pmd/components/sidebar/SideBar.vue
   *   - spm-ts/src/pmd/components/sidebar/UIMenuItems.vue
   *   - spm-ts/src/pmd/components/sidebar/LocationSwitcherContainer.vue
   *   - spm-ts/src/pmd/components/sidebar/QuickActions.vue
   *   - spm-ts/src/pmd/components/TopBar.vue
   *   - spm-ts/src/assets/pmd/css/styles.sidebar.scss
   *   - spm-ts/src/assets/pmd/css/styles.sidebar.light.scss
   *   - spm-ts/src/util/navigation.ts (lines 10780–11650 = agency nav)
   *   - spm-ts/src/assets/pmd/img/{agency,location}-marker.svg
   */

  interface Props {
    /** Active sidebar nav `meta` key (e.g. 'agency-marketplace'). Will
        be wired up once the real shell is vendored. Kept on the API so
        page wrappers don't need to change. */
    active?: string;
  }

  withDefaults(defineProps<Props>(), { active: '' });
</script>

<template>
  <!--
    The outer wrapper class is intentionally kept — it's the scope
    selector spm-ts SCSS is written under (.sidebar-v2-agency / 
    .sidebar-v2-location). Once styles.sidebar.scss is vendored, the
    real sidebar + topbar slot in here without re-wiring AddOnsPage.
  -->
  <div class="shell-v1-placeholder sidebar-v2-agency">
    <div class="shell-v1-placeholder__notice" role="status">
      <p class="shell-v1-placeholder__title">ShellV1 — being re-ported</p>
      <p class="shell-v1-placeholder__body">
        The fabricated sidebar/topbar were deleted. Next step: vendor
        the spm-ts shell SCSS verbatim and re-template using
        production class names. See <code>ShellV1/index.vue</code>
        comment for the source-of-truth file list.
      </p>
    </div>
    <main class="shell-v1-placeholder__content hl_wrapper">
      <slot />
    </main>
  </div>
</template>

<style scoped>
  .shell-v1-placeholder {
    min-height: 100vh;
    background: var(--gray-50);
  }

  .shell-v1-placeholder__notice {
    /* Loud on purpose — a constant reminder this is intermediate. */
    border-bottom: 2px dashed var(--warning-400);
    background: var(--warning-50);
    color: var(--warning-900);
    padding: 12px 16px;
    font-family: var(--hr-font-family-base);
  }

  .shell-v1-placeholder__title {
    margin: 0 0 4px;
    font-size: var(--hr-font-size-md);
    font-weight: var(--hr-font-weight-semibold);
  }

  .shell-v1-placeholder__body {
    margin: 0;
    font-size: var(--hr-font-size-sm);
    line-height: var(--hr-line-height-sm);
  }

  .shell-v1-placeholder__body code {
    background: var(--warning-100);
    padding: 0 4px;
    border-radius: 3px;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 12px;
  }

  .shell-v1-placeholder__content {
    padding: 0;
    min-height: calc(100vh - 60px);
  }
</style>
