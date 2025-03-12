<template>
  <nav 
  v-if="!isLoginPage" 
  class="bg-white shadow px-3 lg:px-15 md:px-15 py-3 flex justify-between"
  :class="language === 'ar' ? 'mr-0 sm:mr-32 md:mr-70' : 'ml-0 sm:ml-32 md:ml-70'"
>

    <!-- Search Box -->
    <div class="relative md:w-65 hidden md:block">
      <span class="relative md:absolute inset-y-0 flex items-center "
      :class="language === 'ar' ? 'pr-2 right-0' : 'pl-2 left-0'">
        <button class="p-1 focus:outline-none text-gray-300">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </span>
      <input
        type="text"
        :placeholder="$t('search')"
        class="lg:w-120 md:w-50 search placeholder:text-gray-300 bg-gray-100 px-4 py-2 rounded shadow-gray-200 outline-none "
        :class="language === 'ar' ? 'lg:pr-12 pr-6' : 'lg:pl-12 pl-6'"
      />
    </div>

    <div class="flex w-100 items-center justify-end gap-x-3">
      <LanguageToggle />

      <DarkModeToggle />
      <!-- Cart Dropdown -->
      <div class="relative cart_dropdown" ref="cartDropdown">
        <button @click="toggleCartDropdown" class="relative cursor-pointer rounded-md btn-icon px-3 py-2 bg-gray-100 text-gray-400">
          <i class="fa-solid fa-bag-shopping fa-lg"></i>
          <span v-if="cartItems.length" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {{ cartItems.length }}
          </span>
        </button>
        <div 
          v-if="isCartDropdownOpen" 
          class="absolute cart mt-2 w-64 bg-white shadow-lg rounded-lg z-10 p-4"
          :class="language === 'ar' ? 'left-0' : 'right-0'"
        >
          <div v-if="cartItems.length > 0" class="space-y-3">
            <div v-for="item in cartItems" :key="item.id" class="flex justify-between items-center border-b border-gray-200 cursor-pointer pb-2">
              <span class="text-sm font-bold">{{ item.name }}</span>
              <span class="text-sm text-red-500 font-bold">{{ item.price }}$</span>
            </div>
            <button class="w-full bg-blue-500 text-white py-2 cursor-pointer font-bold rounded-md mt-2 hover:bg-blue-600 transition">
              {{ $t('View_Cart') }}
            </button>
          </div>
          <p v-else class="text-sm text-center text-gray-500 font-bold">{{ $t('Cart_empty') }}</p>
        </div>
      </div>

      <!-- Notifications Dropdown -->
      <div class="relative notifications" ref="notificationsDropdown">
        <button @click="toggleNotificationsDropdown" class="relative cursor-pointer rounded-md btn-icon px-3 py-2 bg-gray-100 text-gray-400">
          <i class="fa fa-bell fa-lg"></i>
          <span v-if="notifications.length" class="absolute -top-1 -right-1 bg-red-500 font-bold text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {{ notifications.length }}
          </span>
        </button>
        <div 
          v-if="isNotificationsDropdownOpen" 
          class="absolute notification mt-2 w-64 bg-white shadow-lg rounded-lg z-10 p-4"
          :class="language === 'ar' ? 'left-0' : 'right-0'"
        >
          <div v-if="notifications.length > 0" class="space-y-3">
            <div v-for="notification in notifications" :key="notification.id" class="border-b border-gray-200 cursor-pointer pb-2 text-sm">
              <p class="font-bold">{{ notification.message }}</p>
              <span class="text-xs text-gray-400">{{ notification.time }}</span>
            </div>
          </div>
          <p v-else class="text-sm text-center text-gray-500">{{ $t('No_notifications') }}</p>
        </div>
      </div>

      <!-- User Dropdown -->
      <div class="relative user_dropdown" ref="userDropdown">
        <button @click="toggleUserDropdown" class="text-gray-800 cursor-pointer text-center flex items-center gap-2">
          <img src="/images/user.svg" class="rounded-full border border-gray-400 shadow-md" width="32" alt="user" />
          <!-- <span class="hidden md:inline text-sm font-semibold">{{ authStore.user?.firstName }}</span> -->
        </button>
        <div 
          v-if="isUserDropdownOpen" 
          class="absolute user_details mt-2 w-40 bg-white shadow-lg rounded-lg z-10 p-3"
          :class="language === 'ar' ? 'left-0' : 'right-0'"
        >
          <ul class="text-sm">
            <li class="py-2 hover:bg-gray-100 rounded-md text-center">
              <NuxtLink to="/profile" class="block px-3 font-bold">{{ $t('Profile') }}</NuxtLink>
            </li>
            <li class="py-2 hover:bg-gray-100 rounded-md">
              <button @click="logout" class="block w-full font-bold cursor-pointer text-center">
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
const language = computed(() => locale.value);
const router = useRouter();
const token = useCookie("token");
const authStore = useAuthStore();
const dropdown = ref(null);
const route = useRoute();

// Determine if the current page is the login page
const isLoginPage = computed(() => route.path === '/auth/login');

// Cart Dropdown
const isCartDropdownOpen = ref(false);
const cartDropdown = ref(null);
const cartItems = ref([
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Headphones", price: 199 },
]);
const toggleCartDropdown = () => {
  isCartDropdownOpen.value = !isCartDropdownOpen.value;
};
onClickOutside(cartDropdown, () => {
  isCartDropdownOpen.value = false;
});

// Notifications Dropdown
const isNotificationsDropdownOpen = ref(false);
const notificationsDropdown = ref(null);
const notifications = ref([
  { id: 1, message: "Order #1234 has been shipped!", time: "5 mins ago" },
  { id: 2, message: "New message from support", time: "1 hour ago" },
]);
const toggleNotificationsDropdown = () => {
  isNotificationsDropdownOpen.value = !isNotificationsDropdownOpen.value;
};
onClickOutside(notificationsDropdown, () => {
  isNotificationsDropdownOpen.value = false;
});

// User Dropdown
const isUserDropdownOpen = ref(false);
const userDropdown = ref(null);
const toggleUserDropdown = () => {
  isUserDropdownOpen.value = !isUserDropdownOpen.value;
};
onClickOutside(userDropdown, () => {
  isUserDropdownOpen.value = false;
});
const logout = () => {
  authStore.logout();
};
</script>
