<script setup lang="ts">
  /*
   * Root component. Mirrors spm-ts/src/pmd/PMDApp.vue's mounting strategy:
   *   - The two <style> blocks below are vendored verbatim from PMDApp.vue
   *     (lines 722–944 in the upstream file).
   *   - Both blocks are intentionally UNSCOPED so the rules apply globally
   *     (the V2 sidebar SCSS uses `.sidebar-v2-agency` / `.sidebar-v2-location`
   *     wrapper classes that need to match elements deep in the shell tree).
   *   - The :root CSS-variable block defines tokens (`--sidebar-bg-color`,
   *     `--custom-link-color`, `--custom-yellow-color`, ...) that the SCSS
   *     references implicitly. Without it, the sidebar compiles but renders
   *     unstyled.
   *
   * Each route owns its own chrome (e.g. wraps itself in <ShellV1>) so the
   * index page can render chrome-free.
   */
</script>

<template>
  <router-view />
</template>

<!--
  ─────────────────────────────────────────────────────────────────────
  Block 1: vendored from spm-ts/src/pmd/PMDApp.vue, first <style> block.

  spm-ts also @imports three legacy global stylesheets here:
    @import '../assets/pmd/css/styles.css';        (29,287 lines)
    @import '../assets/pmd/css/styles.patch.css';  (3,432 lines)
    @import '../assets/pmd/css/styles.patch.scss'; (41 lines)

  Those files are V1-sidebar-era global CSS (no `sidebar-v2` selectors).
  We're previewing the V2 sidebar only, so vendoring 32k+ lines of legacy
  chrome would just bloat the bundle. The @imports are deliberately
  omitted — if a future preview needs V1 chrome, vendor them then.
  ─────────────────────────────────────────────────────────────────────
-->
<style>
.pmd-app .hl_wrapper {
  padding-left: 70px;
}
</style>

<!--
  ─────────────────────────────────────────────────────────────────────
  Block 2: vendored verbatim from spm-ts/src/pmd/PMDApp.vue, second
  <style lang="scss"> block. Path under @use stays byte-identical to
  spm-ts because we mirrored the assets/pmd/css/ directory layout.
  ─────────────────────────────────────────────────────────────────────
-->
<style lang="scss">
@use '@/assets/pmd/css/styles.sidebar.scss' as sidebar;
@use '@/assets/pmd/css/styles.sidebar.light.scss' as sidebar-light;
/*@import '@/assets/pmd/css/styles.sidebar.dark.scss';*/

:root {
  --sidebar-bg-color: #0c2d3f;
  --sidebar-parent-active-li-bg-color: rgba(24, 139, 246, 0.1);
  --sidebar-li-color: #ffffff;
  --sidebar-collapse-li-bg-color: #103855;
  --custom-link-color: #38a0db;
  --custom-primary: #178af6;
  --custom-primary-border-color: rgba(24, 139, 246, 0.1);
  --custom-yellow-color: #ff6600;
  --custom-yellow-active: #ff9900;
  --custom-yellow-border-color: #ff6600;
  --button-icon-color: #ffffff;
  --loader-color: #0c2d3f;
  --login--header-border-color: rgba(144, 164, 174, 0.2);
  --settings-tab-link-color: #607179;
}

body[data-theme='default-dark-v1'] {
  // @import url('https://fonts.googleapis.com/css2?family=Calibri');

  nav#navbar {
    background: var(--sidebar-bg-color);
  }

  .hl_navbar--links > li .nav-marketing-links ul li.active a,
  .hl_navbar--links > li .nav-dropdown-links ul li.active a {
    color: var(--custom-link-color);
  }

  .hl_navbar--links > li.active > a {
    color: var(--sidebar-li-color);
    font-weight: 500;
    background: var(--sidebar-parent-active-li-bg-color);
  }

  .hl_navbar--links > li a {
    display: block;
    padding: 15px 25px;
    color: var(--sidebar-li-color);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-transition: none;
    transition: none;
    font-weight: 500;
  }

  .btn.btn-primary {
    background-color: var(--custom-primary);
    border-color: var(--custom-border-color);
    color: var(--button-icon-color);
  }

  .btn.btn-yellow {
    background-color: var(--custom-yellow-color);
    border-color: var(--custom-yellow-border-color);
    color: var(--button-icon-color);
  }

  .btn.btn-yellow:active,
  .btn.btn-yellow:focus,
  .btn.btn-yellow:hover {
    color: var(--button-icon-color);
    background-color: var(--custom-yellow-active);
    border-color: var(--custom-yellow-active);
  }

  .hl_settings--nav li.active a,
  .hl_settings--nav li.hover a {
    color: var(--custom-link-color);
    font-weight: 500;
    border-color: var(--custom-link-color);
  }

  a:not(.btn) {
    color: var(--custom-link-color);
    text-decoration: none;
    // background-color: transparent;
    -webkit-text-decoration-skip: objects;
  }

  a:not(.btn):hover {
    color: var(--custom-link-color);
    text-decoration: none;
    // background-color: transparent;
    -webkit-text-decoration-skip: objects;
  }

  .hl_settings--nav a {
    color: var(--settings-tab-link-color);

    &:hover {
      color: var(--settings-tab-link-color);
    }
  }

  .hl_marketing--nav li.active a {
    color: var(--custom-link-color);
    font-weight: 500;
    border-color: var(--custom-link-color);
  }

  button.hl_navbar--button.btn.btn-success.btn-block {
    background: var(--custom-link-color);
  }

  .hl_navbar--links > li .nav-dropdown-links,
  .hl_navbar--links > li .nav-marketing-links {
    background-color: var(--sidebar-collapse-li-bg-color);
    border-top: 1px solid var(--sidebar-collapse-li-bg-color);
    border-bottom: 1px solid var(--sidebar-collapse-li-bg-color);
  }

  .hl_navbar--toggle {
    top: auto;
    bottom: 10px;
    right: 0;
  }

  .hl_navbar--toggle.collapse {
    position: absolute;
    left: 0;
    margin: auto;
  }

  .hl_controls .hl_controls--right .btn-sm .icon,
  .hl_controls .hl_controls--right .btn-group-sm > .btn .icon {
    color: var(---button-icon-color);
  }

  .lds-grid div {
    background: var(--loader-color);
  }

  .hl_conversations--message > .hl_conversations--message-body .messages-single a {
    color: var(---button-icon-color);
    text-decoration: underline;
  }

  .launchpad-progress-incomplete {
    background: #fff !important;
  }
}

/*Reusable classes START*/
.hl_calltoaction-btn {
  background: #27ae60;
  border-radius: 3px;
  padding: 7px 20px;
  border: unset;
  color: #fff;
}

.hl_center {
  height: 100%;
  display: grid;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.hl_compact_header {
  padding: 10px 15px;
}

.hl_text_center {
  text-align: center;
}

.hl_new_badge {
  display: inline-block;
  padding: 0 4px;
  line-height: 15px;
  font-size: 0.6rem;
  margin-left: auto;
  border: 1px solid #af8205;
  border-radius: 3px;
  background: #ffbc00;
  color: #0c2d3f;
  white-space: nowrap;
}

/*Reusable classes FINISH*/

/* Chatbot widget style START */
#mobile-chat-container {
  /** TO HIDE the Freshbot Widget **/
  display: none !important;
}

// a tag color changed to white.
.chat-container .chat-history .other-message a {
  color: #fff !important;
}

.hl_force-block {
  display: block !important;
}

.hl-loader-container {
  background: #f0fdfe;
}

/* Chatbot widget style FINISH */
</style>
