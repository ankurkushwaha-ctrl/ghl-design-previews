<script lang="ts" setup>
  /*
   * ShellV1 chrome preview — hosts ported shell components in isolation
   * for visual verification before the full SideBar.vue is wired up.
   *
   * As each slice (2.1, 2.2, ...) lands, mount its component into this page
   * inside a sample sidebar wrapper so stakeholders can sanity-check it
   * against prod without needing the whole chrome assembled.
   *
   * Currently mounted:
   *   - 2.1: LocationSwitcherContainer (the location pill)
   *
   * The wrapper class `.sidebar-v2-agency` is the SCSS scope selector under
   * which styles.sidebar.scss writes all sidebar rules. Without it, the
   * vendored component renders unstyled.
   */
  import LocationSwitcherContainer from '@/shells/ShellV1/sidebar/LocationSwitcherContainer.vue';
</script>

<template>
  <div class="shell-parts-preview">
    <div class="shell-parts-preview__intro">
      <h1 class="shell-parts-preview__title">ShellV1 — parts preview</h1>
      <p class="shell-parts-preview__copy">
        Each ported shell component shown in isolation against a sample
        sidebar background, for fidelity checks before the full chrome is
        assembled.
      </p>
    </div>

    <section class="shell-parts-preview__slice">
      <header class="shell-parts-preview__header">
        <h2 class="shell-parts-preview__heading">2.1 — LocationSwitcherContainer</h2>
        <p class="shell-parts-preview__sub">
          Vendored from
          <code>spm-ts/src/pmd/components/sidebar/LocationSwitcherContainer.vue</code>.
          Renders in agency-mode (no <code>locationId</code>) — pill shows
          "Click to switch" with the agency marker icon. Click the pill to
          toggle the dropdown placeholder.
        </p>
      </header>

      <!--
        `.sidebar-v2-agency` is the SCSS scope selector for the V2 sidebar.
        We use it as the styling parent here to mimic what SideBar.vue will
        render once 2.3 lands. The fixed width matches the expanded sidebar
        width upstream (`hl_navbar` is 250px).
      -->
      <div class="shell-parts-preview__stage">
        <nav class="shell-parts-preview__sidebar sidebar-v2-agency">
          <LocationSwitcherContainer />
        </nav>
      </div>
    </section>
  </div>
</template>

<style scoped>
  .shell-parts-preview {
    min-height: 100vh;
    padding: 32px 24px;
    background: var(--gray-50);
    font-family: var(--hr-font-family-base, system-ui, sans-serif);
  }

  .shell-parts-preview__intro {
    max-width: 720px;
    margin: 0 auto 32px;
  }

  .shell-parts-preview__title {
    margin: 0 0 8px;
    font-size: 22px;
    font-weight: 600;
    color: var(--gray-900);
    letter-spacing: -0.01em;
  }

  .shell-parts-preview__copy {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
    color: var(--gray-600);
  }

  .shell-parts-preview__slice {
    max-width: 720px;
    margin: 0 auto 40px;
    background: #ffffff;
    border: 1px solid var(--gray-200);
    border-radius: 12px;
    overflow: hidden;
  }

  .shell-parts-preview__header {
    padding: 20px 24px;
    border-bottom: 1px solid var(--gray-200);
  }

  .shell-parts-preview__heading {
    margin: 0 0 6px;
    font-size: 15px;
    font-weight: 600;
    color: var(--gray-900);
  }

  .shell-parts-preview__sub {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
    color: var(--gray-600);
  }

  .shell-parts-preview__sub code {
    background: var(--gray-100);
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 12px;
  }

  .shell-parts-preview__stage {
    /* Mimics the prod sidebar background so the pill renders in context. */
    padding: 24px;
    background: var(--sidebar-bg-color);
    display: flex;
    justify-content: flex-start;
  }

  .shell-parts-preview__sidebar {
    /* Width mirrors the expanded V2 sidebar (.hl_navbar is 250px wide). */
    width: 250px;
    min-height: 200px;
    position: relative;
  }
</style>
