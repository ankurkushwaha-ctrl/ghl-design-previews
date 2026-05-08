<script setup lang="ts">
import ShellV1 from '@/shells/ShellV1/index.vue'
import BulkActionHistoryPage from '@/shells/ShellV1/locations/bulk-history/BulkActionHistoryPage.vue'
</script>
<template>
  <ShellV1 active="sub-accounts">
    <BulkActionHistoryPage />
  </ShellV1>
</template>
