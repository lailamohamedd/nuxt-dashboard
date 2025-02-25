<template>
  <div class="recent-orders lg:px-10 px-6 pb-6 pt-2">
    <div class="flex justify-between mb-1 items-center">
      <h2 class="mb-3 text-lg font-bold">Recent Orders</h2>
      <NuxtLink to="/orders" class="text-gray-400 py-2 px-3 rounded transition">
        Go to Orders Page
        <i class="fa-solid fa-right-long font fa-sm"></i>
      </NuxtLink>
    </div>
    <!-- Orders Table -->
    <div class="card p-6 bg-white shadow-gray-500 rounded-lg overflow-x-auto">
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

      <!--  Loading  -->
      <div v-if="loading" class="p-4 text-center font-bold text-gray-500">
        Loading ...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const orders = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) throw new Error("Failed to fetch data");

    const data = await response.json();
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
    loading.value = false;
  }
});

const getStatus = (index) => {
  const statuses = ["Pending", "Shipped", "Delivered"];
  return statuses[index % statuses.length];
};

const getStatusStyle = (status) => {
  const styles = {
    Pending: { color: "text-orange-500", bg: "bg-orange-100" },
    Shipped: { color: "text-blue-500", bg: "bg-blue-100" },
    Delivered: { color: "text-green-500", bg: "bg-green-100" },
  };
  return styles[status] || { color: "text-gray-500", bg: "bg-gray-100" };
};

const generateDate = (index) => {
  const now = new Date();
  now.setDate(now.getDate() - index * 3);
  return now.toISOString().split("T")[0];
};
</script>
