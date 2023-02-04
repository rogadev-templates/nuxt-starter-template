<template>
  <div>
    <button type="button" @click="$emit('signIn')"
      class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
      <span class="sr-only"> Sign in with Microsoft </span>
      <Icon name="logos:microsoft-icon" class="h-5 w-5" />
    </button>
  </div>
</template>