<template>
  <div class="recent-orders lg:px-10 px-6 pb-6 pt-2">
    <div class="flex justify-between mb-1 items-center">
      <h2 class="mb-3 text-lg font-bold">Recent Orders</h2>
      <NuxtLink to="/orders" class="text-gray-400 py-2 px-3 rounded transition">
        Go to Orders Page
        <i class="fa-solid fa-right-long font fa-sm"></i>
      </NuxtLink>
    </div>
    
    <div class="p-6 bg-white shadow-gray-500 rounded-lg overflow-x-auto">
      <!-- عرض التحميل أثناء جلب البيانات -->
      <div v-if="loading" class="p-4 text-center font-bold text-gray-500">
        Loading ...
      </div>
      
      <!-- عرض الجدول فقط عند انتهاء التحميل -->
      <table v-if="!loading" class="w-full border-collapse bg-white text-left text-sm text-gray-400">
        <thead>
          <tr class="bg-gray-100 text-gray-400">
            <th class="px-4 py-3">Item Name</th>
            <th class="px-4 py-3">Qity</th>
            <th class="px-4 py-3">Order Date</th>
            <th class="px-4 py-3">Amount</th>
            <th class="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in info" :key="data.id" class="hover:bg-gray-50">
            <td class="px-4 py-3 flex">
              <img :src="data.img" width="30px" height="30px" class="rounded-2xl" alt="product" />
              <span class="mx-3 font-bold text-gray-800">{{ data.name }}</span>
            </td>
            <td class="px-4 py-3">
              <span class="text-gray-800 font-bold">{{ data.qity }}</span>
            </td>
            <td class="px-4 py-3 font-bold">{{ data.date }}</td>
            <td class="px-4 py-3">
              <span class="text-gray-800 font-bold">{{ data.amount }}</span>
            </td>
            <td class="px-4 py-3">
              <span :class="['font-bold px-4 py-1 rounded-md', data.statusColor, data.statusBg]">
                {{ data.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const info = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch("/orders.json");
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
    info.value = data.slice(-3);
  } catch (error) {
    console.error("Error loading orders:", error);
  } finally {
    loading.value = false;
  }
});
</script>
