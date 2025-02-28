<template>
  <div class="flex login-card min-h-screen items-center justify-center overflow-x-auto">
    <div class="w-full max-w-md card bg-white p-6 shadow-gray-500 rounded-lg">
      <h2 class="text-2xl font-bold text-center text-gray-700 mb-4">{{ $t('Login') }}</h2>

      <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-600">{{$t('email')}}</label>
          <input 
            v-model="email" 
            type="email" 
            id="email" 
            :placeholder="$t('Enter_your_email')"
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-400"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-600">{{ $t('Password') }}</label>
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
        <NuxtLink to="" class="text-blue-500 hover:underline">{{ $t('Sign_up_here') }}</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");
const router = useRouter();

/**
 * Handle user login process
 * - Fetches users from dummy API
 * - Matches email & password
 * - Generates a Fake JWT token (Base64)
 * - Stores it in localStorage
 */
const handleLogin = async () => {
  errorMessage.value = "";
  loading.value = true;

  try {
    // Fetch all users from dummy API
    const res = await fetch("https://dummyjson.com/users");
    const users = await res.json();

    // Find user by email and password
    const user = users.users.find(
      (u) => u.email === email.value && u.password === password.value
    );

    if (user) {
      // 🔹 Create a Fake JWT Token (Base64 Encoding)
      const payload = {
        id: user.id,
        email: user.email,
        name: user.firstName,
        exp: Math.floor(Date.now() / 1000) + 3600, // Expires in 1 hour
      };

      // Convert the payload to a Base64 string (Simulated JWT)
      const token = btoa(JSON.stringify(payload));

      // Store token in localStorage
      localStorage.setItem("token", token);

      alert("Login successful!");
      router.push("/profile");
    } else {
      errorMessage.value = "Invalid email or password";
    }
  } catch (err) {
    errorMessage.value = "An error occurred while logging in";
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>
