<template>
  <div class="p-6 mt-5 overflow-auto ml-0 md:ml-32 lg:ml-70">
    <h1 class="mb-3 text-2xl font-bold">Orders</h1>
    <div class="p-6 bg-white shadow-gray-500 overflow-auto rounded-lg mt-5">
      <table
        class="w-full border-collapse bg-white text-left text-sm text-gray-400"
      >
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
          <tr
            v-for="data in paginatedOrders"
            :key="data.id"
            class="hover:bg-gray-50"
          >
            <td class="px-4 py-3 flex items-center">
              <img
                :src="data.img"
                width="40px"
                class="rounded-2xl"
                alt="product"
              />
              <span class="mx-3 font-bold text-gray-800">{{ data.name }}</span>
            </td>
            <td class="px-4 py-3">
              <span class="text-gray-800 font-bold">{{ data.qity }}</span>
            </td>
            <td class="px-4 py-3 font-bold">{{ data.date }}</td>
            <td class="px-4 py-3">
              <span class="text-gray-800 font-bold">{{ data.amount }}</span>
            </td>
            <td class="px-2 py-3">
              <span
                :class="[
                  'font-bold px-4 py-1 rounded-md',
                  data.statusColor,
                  data.statusBg,
                ]"
              >
                {{ data.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="loading" class="p-4 text-center font-bold text-gray-500">
        Loading ...
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-4 space-x-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 cursor-pointer bg-gray-200 text-gray-500 rounded disabled:cursor-auto disabled:opacity-50"
        >
          <i class="fa-solid fa-angles-left"></i>
        </button>
        <span class="px-4 py-2 font-bold"
          >{{ currentPage }} / {{ totalPages }}</span
        >
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 cursor-pointer bg-gray-200 font-bold text-gray-500 rounded disabled:cursor-auto disabled:opacity-50"
        >
          <i class="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const info = ref([]);
const loading = ref(true);
const currentPage = ref(1);
const itemsPerPage = 5;

onMounted(async () => {
  try {
    const response = await fetch("/orders.json");
    info.value = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
});

const totalPages = computed(() => Math.ceil(info.value.length / itemsPerPage));

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return info.value.slice(start, end);
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
</script>
