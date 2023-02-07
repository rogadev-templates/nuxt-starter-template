<script lang="ts" setup>
const user = useSupabaseUser();
</script>

<template>
  <Auth v-if="!user" />
  <Dashboard v-else />
</template>

<style scoped>

</style>
