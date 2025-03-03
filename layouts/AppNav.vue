<template>
  <nav 
  v-if="!isLoginPage" 
  class="bg-white shadow px-3 lg:px-15 md:px-15 py-3 flex justify-between"
  :class="{
    'ml-0 sm:ml-32 md:ml-70': !isRtl, // Left-to-Right (LTR)
    'mr-0 sm:mr-32 md:mr-70': isRtl  // Right-to-Left (RTL)
  }"
>

    <!-- Search Box -->
    <div class="relative md:w-65 hidden md:block">
      <span class="relative md:absolute inset-y-0 flex items-center" 
      :class="{
            'pr-2 right-0': isRtl,
            'pl-2 left-0': !isRtl
          }">
        <button class="p-1 focus:outline-none text-gray-300">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </span>
      <input
        type="text"
        :placeholder="$t('search')"
        class="lg:w-120 md:w-50 search placeholder:text-gray-300 bg-gray-100 px-4 py-2 rounded shadow-gray-200 outline-none"
        :class="{
            'lg:pr-12 pr-6': isRtl,
            'lg:pl-12 pl-6': !isRtl
          }"
      />
    </div>

    <div class="flex w-100 items-center justify-end gap-x-3">
      <!-- <LanguageToggle /> -->

      <DarkModeToggle />
      
      <!-- Cart Button -->
      <button class="rounded-md btn-icon px-2 py-1 bg-gray-100 text-gray-400">
        <i class="fa-solid fa-bag-shopping fa-md"></i>
      </button>

      <!-- Notifications Button -->
      <button class="rounded-md btn-icon relative px-2 py-1 bg-gray-100 text-gray-400">
        <i class="fa fa-bell fa-md"></i>
        <span class="w-3 top-0 h-3 bg-red-400 absolute z-10 rounded-xl"></span>
      </button>
      
      <!-- User Dropdown -->
      <div class="relative" ref="dropdown">
        <button @click="toggleDropdown" class="text-gray-800 text-center">
          <img src="/images/user.svg" class="rounded-md mx-auto cursor-pointer" width="32" alt="user" />
        </button>
        <div v-if="isDropdownOpen" class="z-10 shadow absolute drop-list font-bold bg-white rounded-lg w-32 top-full "
        :class="{
            'left-0': isRtl,
            'right-0': !isRtl
          }"
        >
          <ul class="py-2 text-sm text-gray-400">
            <li class="px-3 py-2 text-center"><NuxtLink to="/profile">{{ $t('Profile') }}</NuxtLink></li>
            <!-- Show only logout button if user is authenticated -->
            <li class="px-3 py-2 text-center">
            <button @click="logout" class="px-1 py-2 cursor-pointer">
              {{ $t('Logout') }}
            </button>
          </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core';

const { locale } = useI18n();
const isRtl = computed(() => locale.value === 'ar');
const router = useRouter();
const token = useCookie("token");
const authStore = useAuthStore();
const isDropdownOpen = ref(false);
const dropdown = ref(null);
const route = useRoute();

// Determine if the current page is the login page
const isLoginPage = computed(() => route.path === '/auth/login');

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};
onClickOutside(dropdown, () => {
  isDropdownOpen.value = false;
});

const logout = () => {
  authStore.logout();
};
</script>
