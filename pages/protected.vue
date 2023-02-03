<script setup lang="ts">
const countdown = ref(10);
const redirect = () => navigateTo('/');

const interval = setInterval(() => {
  countdown.value--;
  if (countdown.value === 0) {
    clearInterval(interval);
    redirect();
  }
}, 1000);
</script>

<template>
  <div>
    <h1 class="text-lg font-semibold">Page Protected</h1>
    <p class="my-4">The page
      you were trying to reach is protected. Please sign in to access.</p>
    <NuxtLink class="border shadow rounded px-3 py-2 m-2 hover:bg-gray-100" to="/">
      Sign In...
    </NuxtLink>
    <p class="my-4">Redirecting in {{ countdown }} seconds...</p>
  </div>
</template>