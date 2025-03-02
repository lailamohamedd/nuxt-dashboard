<template>
  <!-- Sidebar is hidden on the login page -->
  <div v-if="!isLoginPage">
    <!-- Mobile menu button (visible only on smaller screens) -->
    <button
      @click="isSidebarOpen = !isSidebarOpen"
      class="md:hidden mt-3 absolute cursor-pointer text-gray-800 py-2 px-4 rounded z-50"
      :class="isRtl ? 'right-3' : 'left-3'"
    >
      <i class="fa-solid fa-bars text-xl text-gray-400"></i>
    </button>

    <!-- Sidebar Container -->
    <div
      :class="[
        'sidebar w-70 bg-white shadow h-full px-5 py-2 fixed top-0 transition-transform duration-300 z-50',
        isSidebarOpen ? 'translate-x-0' : isRtl ? 'translate-x-70' : '-translate-x-70', // Toggle sidebar visibility on mobile
        isRtl ? 'right-0' : 'left-0', // Position dynamically
        'md:translate-x-0', // Always visible on larger screens
      ]"
    >
      <!-- Sidebar Header -->
      <div class="my-2 flex items-center pb-2">
        <i class="fa-solid fa-layer-group mr-3 fa-xl text-blue-500"></i>
        <h1 class="text-2xl text-center text-gray-800 font-bold">
          Manager <span class="text-blue-500">Pro</span>
        </h1>
      </div>

      <!-- Navigation Menu -->
      <ul class="mt-3 pt-5 text-gray-800 font-bold">
        <li
          v-for="(item, index) in menuItems"
          :key="index"
          class="text-gray-400 rounded mb-2 first:bg-blue-50 first:text-blue-500"
        >
          <nuxt-link
            class="p-3 flex items-center"
            active-class="bg-blue-50 text-blue-500 rounded active:hover:bg-blue-50 active:hover:text-blue-500"
            :to="{ name: item.link }"
          >
          <i :class="['fa-solid', item.icon, 'fa-lg', isRtl ? 'ml-3' : 'mr-3']"></i>

            {{ item.name }}
          </nuxt-link>
        </li>

        <hr class="pb-3 mt-5 border-gray-200" />

        <!-- Messages Menu Item with Notification Indicator -->
        <li class="mb-2 text-gray-400">
          <nuxt-link
            class="p-3 flex justify-between items-center rounded"
            active-class="bg-blue-50 text-blue-500 rounded active:hover:bg-blue-50 active:hover:text-blue-500"
            :to="{ name: 'messages' }"
          >
            <span>
              <i class="fa-solid fa-comment-dots fa-lg "
                :class="{
                'ml-3': isRtl,
                'mr-3': !isRtl
              }"></i>
              {{ $t("Messages") }}
            </span>
            <span class="h-4 w-4 bg-red-400 rounded-2xl mx-2"></span>
          </nuxt-link>
        </li>

        <!-- Support Menu Item -->
        <li class="mb-2 text-gray-400">
          <nuxt-link
            class="p-3 flex items-center rounded"
            active-class="bg-blue-50 text-blue-500 rounded active:hover:bg-blue-50 active:hover:text-blue-500"
            :to="{ name: 'support' }"
          >
            <i class="fa-regular fa-life-ring fa-lg "
            :class="{
              'ml-3': isRtl,
              'mr-3': !isRtl
            }"></i>
            {{ $t("Support") }}
          </nuxt-link>
        </li>

        <!-- Settings Menu Item -->
        <li class="mb-2 text-gray-400">
          <nuxt-link
            class="p-3 flex items-center rounded"
            active-class="bg-blue-50 text-blue-500 rounded active:hover:bg-blue-50 active:hover:text-blue-500"
            :to="{ name: 'settings' }"
          >
            <i class="fa-solid fa-gear fa-lg "
            :class="{
              'ml-3': isRtl,
              'mr-3': !isRtl
            }"></i>
            {{ $t("Settings") }}
          </nuxt-link>
        </li>
      </ul>
    </div>

    <!-- Sidebar Overlay (For Mobile) -->
    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
      style="background-color: rgba(0, 0, 0, 0.5)"
    ></div>
  </div>
</template>

<script setup>
const isSidebarOpen = ref(false); // Sidebar visibility on mobile
const route = useRoute();
// ✅ Check if the current route is the login page
const isLoginPage = computed(() => route.path === "/auth/login");

const { locale } = useI18n();
const isRtl = computed(() => locale.value === 'ar');
const { t } = useI18n();

// Sidebar menu items
const menuItems = computed(() => [
  { name: t("dashboard"), icon: "fa-home", link: "index" },
  { name: t("orders"), icon: "fa-cart-shopping", link: "orders" },
  { name: t("Items"), icon: "fa-store", link: "items" },
  { name: t("Transactions"), icon: "fa-file", link: "transactions" },
  { name: t("Reports"), icon: "fa-file-pdf", link: "reports" },
]);
</script>
