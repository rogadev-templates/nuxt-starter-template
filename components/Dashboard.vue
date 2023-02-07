<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <p class="my-4">Welcome to your dashboard, {{ user?.identities?.values.name ?? 'User' }}</p>
  </div>
</template>