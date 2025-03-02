<template>
  <div class="recent-orders lg:px-10 px-6 pb-6 pt-2">
    <!-- Header section with title and navigation link -->
    <div class="flex justify-between mb-1 items-center">
      <h2 class="mb-3 text-lg font-bold">{{ $t('RecentOrders') }}</h2>
      <NuxtLink to="/orders" class="text-gray-400 py-2 px-3 rounded transition">
        {{ $t('Go_Orders_Page') }}
        <i class="fa-solid font fa-sm " 
          :class="{
            'fa-left-long': isRtl,
            'fa-right-long': !isRtl
          }"></i>
      </NuxtLink>
    </div>

    <!-- Orders Table -->
    <div class="card p-6 bg-white shadow-gray-500 rounded-lg overflow-x-auto">
      <table
        class="w-full border-collapse bg-white text-sm text-gray-400"
        :class="{
            'text-right': isRtl,
            'text-left': !isRtl
          }"
      >
        <thead>
          <tr class="bg-gray-100 text-gray-400">
            <th class="px-4 py-3">{{ $t('ItemName') }}</th>
            <th class="px-4 py-3">{{ $t('Qity') }}</th>
            <th class="px-4 py-3">{{ $t('OrderDate') }}</th>
            <th class="px-4 py-3">{{$t('Amount')}}</th>
            <th class="px-4 py-3">{{ $t('Status') }}</th>
          </tr>
        </thead>
        <tbody>
          <!-- Loop through orders and display each order row -->
          <tr v-for="item in orders" :key="item.id" class="hover:bg-gray-50">
            <td class="px-4 py-3 flex items-center text-gray-800">
              <img
                :src="item.thumbnail"
                width="30"
                class="rounded-2xl"
                alt="product"
              />
              <span class="mx-3 font-bold">{{ item.title }}</span>
            </td>
            <td class="px-4 py-3 font-bold text-gray-800">{{ item.stock }}</td>
            <td class="px-4 py-3 font-bold">{{ item.date }}</td>
            <td class="px-4 py-3 font-bold text-gray-800">
              {{ item.amount }}$
            </td>
            <td class="px-4 py-3">
              <span
                class="font-bold px-4 py-1 rounded-md"
                :class="[item.statusColor, item.statusBg]"
              >
                {{ item.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Loading Indicator -->
      <div v-if="loading" class="p-4 text-center font-bold text-gray-500">
        {{$t('loading')}}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
const orders = ref([]); // Reactive reference to store fetched orders
const loading = ref(true); // State to track loading status
const { locale } = useI18n();
const isRtl = computed(() => locale.value === "ar");
onMounted(async () => {
  try {
    // Fetch data from the API
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();

    // Process and map API data to fit order structure
    orders.value = data.products.slice(-3).map((item, index) => {
      const status = getStatus(index);
      const { color, bg } = getStatusStyle(status);
      return {
        id: item.id,
        title: item.title,
        thumbnail: item.thumbnail,
        stock: item.stock,
        date: generateDate(index),
        amount: (item.price * 2).toFixed(2),
        status,
        statusColor: color,
        statusBg: bg,
      };
    });
  } catch (error) {
    console.error("Error loading orders:", error);
  } finally {
    loading.value = false; // Hide loading indicator once data is loaded
  }
});

/**
 * Get order status based on index.
 * @param {number} index - Order index
 * @returns {string} - Status name
 */
const getStatus = (index) => {
  const statuses = ["Pending", "Shipped", "Delivered"];
  return statuses[index % statuses.length];
};

/**
 * Get the styling class for order status.
 * @param {string} status - Order status
 * @returns {object} - Object containing text color and background class
 */
const getStatusStyle = (status) => {
  const styles = {
    Pending: { color: "text-orange-500", bg: "bg-[oklch(0.75_0.18_56.73/0.12)]" },
    Shipped: { color: "text-blue-500", bg: "bg-[oklch(0.45_0.2_256.51/0.22)]" },
    Delivered: { color: "text-green-500", bg: "bg-[oklch(0.77_0.2_152.18/0.14)]" },
  };
  return styles[status] || { color: "text-gray-500", bg: "bg-gray-100" };
};

/**
 * Generate a formatted date based on index.
 * @param {number} index - Order index
 * @returns {string} - Formatted date string (YYYY-MM-DD)
 */
const generateDate = (index) => {
  const now = new Date();
  now.setDate(now.getDate() - index * 3);
  return now.toISOString().split("T")[0];
};
</script>
