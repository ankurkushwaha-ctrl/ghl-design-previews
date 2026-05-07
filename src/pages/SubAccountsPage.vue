<template>
  <ShellV1 active="agency-accounts">
    <!--
      UIContentWrap MUST sit ABOVE Locations.vue, not inside it. ghl-ui's
      `useNotification()` (used inside Locations.vue) expects an ancestor
      `n-notification-provider` from naive-ui. UIContentWrap installs that
      provider; Vue's inject() walks up parents only, so calling
      useNotification() inside the same component that renders UIContentWrap
      throws "No outer n-notification-provider found.".

      Mirrors the pattern in
      ghl-revex-frontend/apps/locations/src/pages/BulkActionHistoryPage.vue,
      which wraps its page component the same way.
    -->
    <UIContentWrap full-screen>
      <Locations />
    </UIContentWrap>
  </ShellV1>
</template>

<script setup lang="ts">
import { UIContentWrap } from '@gohighlevel/ghl-ui'
import ShellV1 from '@/shells/ShellV1/index.vue'
import Locations from '@/shells/ShellV1/locations/Locations.vue'
</script>
