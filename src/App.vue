<script setup lang="ts">
// App shell: just routes the request. Each route owns its own chrome
// (e.g. wraps itself in <ShellV1>) so the index page can render
// chrome-free.
</script>

<template>
  <router-view />
</template>
