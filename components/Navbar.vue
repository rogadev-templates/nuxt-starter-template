<script lang="ts" setup>
const client = useSupabaseAuthClient();
const user = useSupabaseUser();
const colorMode = useColorMode();

const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
};

const colorModeIcon = computed(() => {
  return colorMode.preference === 'dark' ? 'carbon:sun' : 'carbon:moon';
});

const logout = async () => {
  await client.auth.signOut();
  navigateTo('/');
};
</script>

<template>
  <nav>
    <ul>
      <li>
        <NuxtLink to="/">home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/profile">profile</NuxtLink>
      </li>
    </ul>
    <div>
      <button @click="toggleColorMode">
        <Icon :name="colorModeIcon" />
      </button>
      <button v-if="user" @click="logout">logout</button>
    </div>
  </nav>
</template>

<style scoped>

</style>
