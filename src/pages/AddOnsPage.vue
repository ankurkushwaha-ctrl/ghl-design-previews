<template>
  <!--
    Mirrors src/pages/SubAccountsPage.vue: thin wrapper that pairs a
    vendored inner page with the production-style ShellV1 chrome.
    The inner page lives at src/shells/ShellV1/add-ons/AddOnsPage.vue
    and is byte-identical to spm-ts upstream apart from import paths
    and the chrome-stripping documented in its header comment.

    active="agency-marketplace" matches the meta key for the Add-Ons
    sidebar item in src/shells/ShellV1/_stubs/navigation.ts (which
    mirrors spm-ts/src/util/navigation.ts), so the correct sidebar
    row stays highlighted while this page is open.
  -->
  <ShellV1 active="agency-marketplace">
    <AddOnsPage />
  </ShellV1>
</template>

<script setup lang="ts">
import ShellV1 from '@/shells/ShellV1/index.vue';
import AddOnsPage from '@/shells/ShellV1/add-ons/AddOnsPage.vue';
</script>
