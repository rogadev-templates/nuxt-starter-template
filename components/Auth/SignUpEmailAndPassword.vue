<script setup lang="ts">
defineProps({
  email: String,
  password: String,
  passwordConfirm: String,
  errors: {
    type: Object,
    default: () => ({
      email: [],
      password: [],
      passwordConfirm: [],
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
          <input id="password" name="password" type="password" autocomplete="off" v-model="password" required
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
        </div>
        <ul v-if="errors.password.length" class="mt-2 text-sm text-red-600 list-disc list-inside">
          <li v-for="error in errors.password">{{ error }}</li>
        </ul>
      </div>

      <div class="space-y-1">
        <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
        <div class="mt-1">
          <input id="confirm-password" name="confirm-password" type="password" autocomplete="off"
            v-model="passwordConfirm" required
            class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
        </div>
        <ul v-if="errors.passwordConfirm.length" class="mt-2 text-sm text-red-600 list-disc list-inside">
          <li v-for="error in errors.passwordConfirm">{{ error }}</li>
        </ul>
      </div>

      <div>
        <button type="submit"
          :disabled="!email || !password || errors.email.length || errors.password.length || errors.passwordConfirm.length || password !== passwordConfirm"
          class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400">
          Sign up
        </button>
      </div>
    </div>
  </div>
</template>