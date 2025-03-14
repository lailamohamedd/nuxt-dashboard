<template>
  <div>
    <!-- Loading Spinner -->
    <div
      v-if="loading"
      class="flex flex-col items-center justify-center min-h-screen"
    >
      <div class="relative flex items-center justify-center">
        <div
          class="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"
        ></div>
        <div
          class="absolute w-12 h-12 border-4 border-gray-300 border-b-blue-500 rounded-full animate-ping"
        ></div>
      </div>
      <p class="mt-4 text-lg font-semibold animate-pulse">
        {{ $t("loading") }}...
      </p>
    </div>
    <!-- User Profile Card -->
    <div
      v-if="user"
      class="flex items-center justify-center min-h-screen overflow-x-auto"
      :class="
        language === 'ar' ? 'mr-0 sm:mr-32 md:mr-70' : 'ml-0 sm:ml-32 md:ml-70'
      "
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
          <p>
            <strong>{{ $t("email") }}:</strong> {{ user.email }}
          </p>
          <p>
            <strong>{{ $t("Phone") }}:</strong> {{ user.phone }}
          </p>
          <p>
            <strong>{{ $t("Birth_Date") }}:</strong> {{ user.birthDate }} ({{
              user.age
            }}
            years)
          </p>
          <p>
            <strong>{{ $t("Gender") }}:</strong> {{ user.gender }}
          </p>
        </div>
      </div>
    </div>
    <!-- Error Message if User Not Found -->
    <div
      v-else
      class="flex items-center justify-center min-h-screen text-gray-600"
    >
      <p>{{ $t("User_not_found") }}</p>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const language = computed(() => locale.value);
const router = useRouter();
const user = ref({});
const loading = ref(true);
const auth = useAuthStore();

onMounted(async () => {
  await auth.getUser();
  user.value = auth.user;
  loading.value = false;
});

// Define middleware for protected route
definePageMeta({
  middleware: "auth",
});
</script>
