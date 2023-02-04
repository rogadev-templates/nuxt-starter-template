<script lang="ts" setup>
import { z } from 'zod';
import type { Provider } from '@supabase/supabase-js';
import type { Ref } from 'vue';

// CONSTANTS
const MIN_PW_LENGTH = 14;

// INPUT VALUES
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');

// INPUT ERRORS
const errors: {
  email: Ref<string[]>,
  password: Ref<string[]>,
  passwordConfirmation: Ref<string[]>;
}
  = {
  email: ref([]),
  password: ref([]),
  passwordConfirmation: ref([]),
};

// SIGN IN / SIGN UP METHOD
const isSigningIn = ref(true);
const toggleMethod = () => {
  isSigningIn.value = !isSigningIn.value;
};

// NEW PASSWORD VALIDATION CONSTANTS
const newPasswordRegex = new RegExp(`/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{${MIN_PW_LENGTH},}$/`);
const newPasswordInvalidMessage = 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number';

// FORM INPUT SCHEMAS
const signInSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(MIN_PW_LENGTH),
});
const signUpSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8).regex(newPasswordRegex, newPasswordInvalidMessage),
  passwordConfirmation: z.string().min(8),
}).refine((data) => data.password === passwordConfirm.value, {
  message: 'Passwords must match',
  path: ['passwordConfirmation'],
});

// FORM VALIDATION
const isSignInValid = computed(() => {
  if (email.value === '' || password.value === '') return false;
  const result = signInSchema.safeParse({
    email: email.value,
    password: password.value,
  });
  return result.success;
});

const isSignUpValid = computed(() => {
  console.log('isSignUpValid');
  const result = signUpSchema.safeParse({
    email: email.value,
    password: password.value,
    passwordConfirmation: passwordConfirm.value,
  });
  return result.success;
});

// SIGN IN METHODS
const signInWithEmail = async () => {
  const submission = {
    email: email.value,
    password: password.value,
  };
  const result = signInSchema.safeParse(submission);
  if (!result.success) {
    console.error(result.error);
    return;
  }
  const { error } = await useSupabaseAuthClient().auth.signInWithPassword({ ...submission });
  if (error) return console.error(error);
};
const signInWithOAuth = async (provider: Provider) => {
  const result = await useSupabaseAuthClient().auth.signInWithOAuth({
    provider,
  });
  if (result.error) {
    console.log(result.error);
  }
};

// SIGN UP METHODS
const signUpWithEmail = async () => {
  const submission = {
    email: email.value,
    password: password.value,
  };
  const result = signUpSchema.safeParse(submission);
  if (!result.success) {
    console.error(result.error);
    return;
  }
  const { error } = await useSupabaseAuthClient().auth.signUp({ email: email.value, password: password.value });
  if (error) return console.error(error);
  return navigateTo('/auth/verify-email');
};

// FORM SUBMISSION
const handleSubmit = async () => {
  if (isSigningIn.value) {
    await signInWithEmail();
  } else {
    await signUpWithEmail();
  }
};
</script>

<template>
  <div class="flex min-h-full">
    <div class="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img class="h-12 w-auto" src="https://a-us.storyblok.com/f/1004312/512x512/9a8d0bbf7e/favicon.png"
            alt="Roga Dev" />
          <h2 class="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            Or
            {{ ' ' }}
            <a href="/onboarding" class="font-medium text-indigo-600 hover:text-indigo-500">start your 14-day free
              trial</a>
          </p>
        </div>

        <!-- Social Sign In -->
        <form @submit.prevent="handleSubmit()" class="mt-8">
          <div>
            <div>
              <p class="text-sm font-medium text-gray-700">Sign in with</p>
              <div class="mt-1 grid grid-cols-3 gap-3">
                <AuthSignInWithGoogle @signIn="signInWithOAuth('google')" />
                <AuthSignInWithMicrosoft @signIn="signInWithOAuth('azure')" />
                <AuthSignInWithFacebook @signIn="signInWithOAuth('facebook')" />
              </div>
            </div>
            <div class="relative mt-6">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
          </div>
          <div v-if="isSigningIn">
            <div class="mt-6">
              <div class="space-y-6">
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                  <div class="mt-1">
                    <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
                      class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                  </div>
                  <ul v-if="errors.email.value.length" class="mt-2 text-sm text-red-600 list-disc list-inside">
                    <li v-for="error in errors.email">{{ error }}</li>
                  </ul>
                </div>

                <div class="space-y-1">
                  <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                  <div class="mt-1">
                    <input v-model="password" id="password" name="password" type="password"
                      autocomplete="current-password" required
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
                    <a href="/forgot" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your
                      password?</a>
                  </div>
                </div>
                <!-- Sign In Button -->
                <div>
                  <button type="submit" :disabled="!isSignInValid"
                    class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400">
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="mt-6">
              <div class="space-y-6">
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                  <div class="mt-1">
                    <input v-model="email" id="email" name="email" type="email" autocomplete="email" required
                      class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                  </div>
                  <ul v-if="errors.email.value.length" class="mt-2 text-sm text-red-600 list-disc list-inside">
                    <li v-for="error in errors.email">{{ error }}</li>
                  </ul>
                </div>

                <div class="space-y-1">
                  <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                  <div class="mt-1">
                    <input id="password" name="password" type="password" autocomplete="off" v-model="password" required
                      class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
                  </div>
                  <ul v-if="errors.password.value.length" class="mt-2 text-sm text-red-600 list-disc list-inside">
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
                  <ul v-if="errors.passwordConfirmation.value.length"
                    class="mt-2 text-sm text-red-600 list-disc list-inside">
                    <li v-for="error in errors.passwordConfirmation.value">{{ error }}</li>
                  </ul>
                </div>

                <div>
                  <button type="submit" :disabled="!isSignUpValid"
                    class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400">
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- "Sign in instead" option -->
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">
                  {{ isSigningIn? `Don't have an account?` : 'Already have an account?' }}
                </span>
              </div>
            </div>

            <div class="mt-6">
              <button type="button" @click="toggleMethod"
                class="w-full flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                {{ isSigningIn? 'Sign up instead': 'Sign in instead' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt="" />
    </div>
  </div>
</template>