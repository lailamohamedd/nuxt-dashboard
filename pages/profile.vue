<template>
  <!-- Loading Spinner -->
  <div
    v-if="loading"
    class="flex flex-col items-center justify-center min-h-screen text-gray-400"
  >
    <div
      class="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"
    ></div>
    <p class="mt-3 text-lg font-semibold">{{ $t('loading') }}</p>
  </div>

  <!-- User Profile Card -->
  <div
    v-if="user"
    class="flex items-center justify-center min-h-screen overflow-x-auto" 
    :class="{
      'ml-0 sm:ml-32 md:ml-70': !isRtl,
      'mr-0 sm:mr-32 md:mr-70': isRtl
    }"
  >
    <div
      class="bg-white card shadow-md rounded-lg p-6 w-full max-w-md text-gray-800"
    >
      <div class="text-center">
        <!-- User Profile Image -->
        <img
          :src="user.image"
          alt="Profile Image"
          class="w-24 h-24 rounded-full mx-auto border-4 border-gray-300 shadow-md"
        />
        <h2 class="text-xl font-semibold mt-2">
          {{ user.firstName }} {{ user.lastName }}
        </h2>
        <p class="text-sm text-gray-500">@{{ user.username }}</p>
      </div>

      <!-- User Information -->
      <div class="mt-4 space-y-3 text-sm">
        <p><strong>{{ $t('email') }}:</strong> {{ user.email }}</p>
        <p><strong>{{ $t('Phone') }}:</strong> {{ user.phone }}</p>
        <p>
          <strong>{{ $t('Birth_Date') }}:</strong> {{ user.birthDate }} ({{
            user.age
          }}
          years)
        </p>
        <p><strong>{{ $t('Gender') }}:</strong> {{ user.gender }}</p>
      </div>
    </div>
  </div>

  <!-- Error Message if User Not Found -->
  <div
    v-else
    class="flex items-center justify-center min-h-screen text-gray-600"
  >
    <p>{{ $t('User_not_found') }}</p>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref, reactive } from "vue";
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const isRtl = computed(() => locale.value === 'ar');
const router = useRouter();
const user = reactive({});
const loading = ref(true);

onMounted(async () => {
  try {
    // Retrieve the authentication token from local storage
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("🔴 No token found! Redirecting to login...");
      router.push("/auth/login");
      return;
    }

    let decodedToken;
    try {
      // Decode JWT token to extract user ID
      decodedToken = JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      console.error("❌ Failed to decode token:", error.message);
      localStorage.removeItem("token");
      router.push("/auth/login");
      return;
    }

    // Ensure the token contains a valid user ID
    if (!decodedToken.id) {
      console.error("❌ Invalid token structure:", decodedToken);
      localStorage.removeItem("token");
      router.push("/auth/login");
      return;
    }

    // Fetch user data from the API using the extracted user ID
    const res = await fetch(`https://dummyjson.com/users/${decodedToken.id}`);
    if (!res.ok) throw new Error("Failed to fetch user data");

    // Store the retrieved user data in the reactive object
    const userData = await res.json();
    Object.assign(user, userData);
  } catch (error) {
    console.error("❌ Error loading profile:", error.message);
    localStorage.removeItem("token");
    router.push("/auth/login");
  } finally {
    // Hide the loading spinner once the data is loaded or an error occurs
    loading.value = false;
  }
});

// Define middleware for protected route
// definePageMeta({
//   middleware: "protected",
// });
</script>
