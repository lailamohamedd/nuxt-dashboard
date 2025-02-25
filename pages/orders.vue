<template>
  <div class="p-6 mt-5 overflow-auto ml-0 md:ml-32 lg:ml-70">
    <h1 class="mb-3 text-2xl font-bold">Orders</h1>
    <div class="card p-6 bg-white shadow-gray-500 overflow-auto rounded">
      <!-- Search Input -->
      <div class="relative md:w-65 mb-4 hidden md:block">
        <span
          class="relative md:absolute inset-y-0 left-0 flex items-center pl-2"
        >
          <button class="p-1 focus:outline-none text-gray-300">
            <i class="fa-solid fa-magnifying-glass"></i></button
        ></span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="search..."
          class="lg:w-120 md:w-50 search placeholder:text-gray-300 bg-gray-100 px-4 py-2 lg:pl-12 pl-6 rounded shadow-gray-200 outline-none"
        />
      </div>
      <table class="w-full border-collapse bg-white text-left text-sm text-gray-400">
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
          <tr v-for="item in paginatedOrders" :key="item.id" class="hover:bg-gray-50">
            <td class="px-4 py-3 flex items-center text-gray-800">
              <img :src="item.thumbnail" width="40px" class="rounded-2xl" alt="product" />
              <span class="mx-3 font-bold">{{ item.title }}</span>
            </td>
            <td class="px-4 py-3 font-bold">{{ item.stock }}</td>
            <td class="px-4 py-3 font-bold">{{ item.date }}</td>
            <td class="px-4 py-3 font-bold">${{ item.amount }}</td>
            <td class="px-2 py-3">
              <span class="font-bold px-4 py-1 rounded-md" :class="getStatusClass(item.status)">
                {{ item.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="loading" class="p-4 text-center font-bold text-gray-500">
        Loading ...
      </div>

      <!-- Pagination -->
      <div class="pagination flex justify-center mt-4 space-x-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-200 text-gray-500 rounded disabled:opacity-50"
        >
          <i class="fa-solid fa-angles-left"></i>
        </button>
        <span class="px-4 py-2 font-bold">{{ currentPage }} / {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-gray-200 text-gray-500 rounded disabled:cursor-auto cursor-pointer disabled:opacity-50"
        >
          <i class="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const orders = ref([]);
const searchQuery = ref("");
const loading = ref(true);
const currentPage = ref(1);
const itemsPerPage = 5;

onMounted(async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    
    orders.value = data.products.map((item) => ({
      ...item,
      date: randomDate(),
      amount: (item.price * (Math.random() * 5 + 1)).toFixed(2),
      status: getRandomStatus(),
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
});

const filteredOrders = computed(() => {
  return orders.value.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage));

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredOrders.value.slice(start, start + itemsPerPage);
});

const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };

const randomDate = () => {
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - Math.floor(Math.random() * 30));
  return pastDate.toISOString().split("T")[0];
};

const getRandomStatus = () => {
  const statuses = ["Pending", "Shipped", "Delivered", "Canceled"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const getStatusClass = (status) => {
  return {
    "Pending": "bg-orange-100 text-orange-500",
    "Shipped": "bg-blue-100 text-blue-500",
    "Delivered": "bg-green-100 text-green-500",
    "Canceled": "bg-red-100 text-red-500",
  }[status] || "bg-gray-100 text-gray-500";
};
</script>
