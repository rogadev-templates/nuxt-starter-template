<script setup lang="ts">
defineProps({
  email: String,
  password: String,
  errors: {
    type: Object,
    default: () => ({
      email: [],
      password: [],
    }),
  }
});
</script>

<template>
  <div class="mt-6">
    <div class="space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
        <div class="mt-1">
          <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
        </div>
        <ul v-if="errors.email.length" class="mt-2 text-sm text-red-600 list-disc list-inside">
          <li v-for="error in errors.email">{{ error }}</li>
        </ul>
      </div>

      <div class="space-y-1">
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <div class="mt-1">
          <input v-model="password" id="password" name="password" type="password" autocomplete="current-password"
            required
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
          <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
        </div>

        <div class="text-sm">
          <a href="/forgot" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
        </div>
      </div>
      <!-- Sign In Button -->
      <div>
        <button type="submit" :disabled="!email || !password || errors.email.length || errors.password.length"
          class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400">
          Sign in
        </button>
      </div>
    </div>
  </div>
</template>