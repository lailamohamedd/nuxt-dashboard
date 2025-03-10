<template>
  <div class="flex login-card min-h-screen items-center justify-center overflow-x-auto">
    <div class="w-full max-w-md card bg-white p-6 shadow-gray-500 rounded-lg">
      <h2 class="text-2xl font-bold text-center text-gray-700 mb-4">{{ $t('Login') }}</h2>

      <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label for="username" class="block text-sm mb-2 font-medium text-gray-600">{{$t('username')}}</label>
          <input 
            v-model="username" 
            type="text" 
            id="username" 
            :placeholder="$t('Enter_your_username')"
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400"
          />
        </div>

        <div>
          <label for="password" class="block text-sm mb-2 font-medium text-gray-600">{{ $t('Password') }}</label>
          <input 
            v-model="password" 
            type="password" 
            id="password" 
            :placeholder="$t('Enter_password')"
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
          />
        </div>

        <button 
          type="submit" 
          :disabled="loading"
          class="w-full bg-blue-500 cursor-pointer hover:bg-blue-600 text-white py-2 rounded-lg transition"
        >
          {{ loading ? "Logging in..." : "Login" }}
        </button>
      </form>

      <p class="text-sm text-gray-600 text-center mt-4">
        {{ $t('Don_have_account') }}
        <NuxtLink to="" class="text-blue-400 hover:underline">{{ $t('Sign_up_here') }}</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");
const router = useRouter();
const username = ref("");
const auth = useAuthStore();

const login = async () => {
  auth.login({ username: username.value, password: password.value });
}
</script>
