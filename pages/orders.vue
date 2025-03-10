<template>
  <div
    class="p-6 mt-5 overflow-x-auto"
    :class="
      language === 'ar' ? 'mr-0 sm:mr-32 md:mr-70' : 'ml-0 sm:ml-32 md:ml-70'
    "
  >
    <h1 class="mb-3 text-2xl font-bold">{{ $t("orders") }}</h1>
    <div class="card p-6 bg-white shadow-gray-500 overflow-auto rounded">
      <!-- Search Input -->
      <div class="relative md:w-65 mb-4">
        <span
          class="absolute inset-y-0 flex items-center"
          :class="language === 'ar' ? 'pr-2 right-0' : 'pl-2 left-0'"
        >
          <button class="p-1 focus:outline-none text-gray-300">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="$t('search')"
          class="lg:w-120 md:w-50 search placeholder:text-gray-300 bg-gray-100 px-4 py-2 rounded shadow-gray-200 outline-none"
          :class="language === 'ar' ? 'lg:pr-10 pr-10' : 'lg:pl-10 pl-10'"
        />
      </div>

      <!-- Orders Table -->
      <table
        class="w-full border-collapse bg-white text-sm text-gray-400"
        :class="language === 'ar' ? 'text-right' : 'text-left'"
      >
        <thead>
          <tr class="bg-gray-100 text-gray-400">
            <th class="px-4 py-3">{{ $t("ItemName") }}</th>
            <th class="px-4 py-3">{{ $t("Qity") }}</th>
            <th class="px-4 py-3">{{ $t("OrderDate") }}</th>
            <th class="px-4 py-3">{{ $t("Amount") }}</th>
            <th class="px-4 py-3">{{ $t("Status") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in paginatedOrders"
            :key="item.id"
            class="hover:bg-gray-50"
          >
            <td class="px-4 py-3 flex items-center text-gray-800">
              <img
                :src="item.thumbnail"
                width="40px"
                class="rounded-2xl"
                alt="product"
              />
              <span class="mx-3 font-bold">{{ item.title }}</span>
            </td>
            <td class="px-4 py-3 font-bold">{{ item.stock }}</td>
            <td class="px-4 py-3 font-bold">{{ item.date }}</td>
            <td class="px-4 py-3 font-bold">${{ item.amount }}</td>
            <td class="px-2 py-3">
              <span
                class="font-bold px-4 py-1 rounded-md"
                :class="getStatusClass(item.status)"
              >
                {{ item.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Loading Indicator -->
      <div v-if="loading" class="p-4 text-center font-bold text-gray-500">
        {{ $t("loading") }}
      </div>

      <!-- Pagination Controls -->
      <div class="pagination flex justify-center mt-4 space-x-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-gray-200 text-gray-500 rounded disabled:opacity-50"
        >
          <i
            class="fa-solid"
            :class="language === 'ar' ? 'fa-angles-right' : 'fa-angles-left'"
          ></i>
        </button>
        <span class="px-4 py-2 font-bold"
          >{{ currentPage }} / {{ totalPages }}</span
        >
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-gray-200 text-gray-500 rounded disabled:cursor-auto cursor-pointer disabled:opacity-50"
        >
          <i
            class="fa-solid"
            :class="language === 'ar' ? 'fa-angles-left' : 'fa-angles-right'"
          ></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const language = computed(() => locale.value);
const orders = ref([]); // Stores the fetched order data
const searchQuery = ref(""); // Stores the search query
const loading = ref(true); // Indicates if data is being loaded
const currentPage = ref(1); // Current page for pagination
const itemsPerPage = 5; // Number of items per page
// Fetching order data from the API
onMounted(async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    // Formatting order data with random values for amount and status
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

// Computed property for filtering orders based on search query
const filteredOrders = computed(() => {
  return orders.value.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Total number of pages
const totalPages = computed(() =>
  Math.ceil(filteredOrders.value.length / itemsPerPage)
);

// Computed property for paginated orders
const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredOrders.value.slice(start, start + itemsPerPage);
});

// Pagination functions
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

// Generates a random past date within the last 30 days
const randomDate = () => {
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - Math.floor(Math.random() * 30));
  return pastDate.toISOString().split("T")[0];
};

// Returns a random order status
const getRandomStatus = () => {
  const statuses = ["Pending", "Shipped", "Delivered", "Canceled"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

// Returns the CSS class for the given status
const getStatusClass = (status) => {
  return (
    {
      Pending: "bg-[oklch(0.75_0.18_56.73/0.12)] text-orange-500",
      Shipped: "bg-[oklch(0.45_0.2_256.51/0.22)] text-blue-500",
      Delivered: "bg-[oklch(0.77_0.2_152.18/0.14)] text-green-500",
      Canceled: "bg-[oklch(0.72_0.21_23.02/0.16)] text-red-500",
    }[status] || "bg-gray-100 text-gray-500"
  );
};

// Define middleware for protected route
definePageMeta({
  middleware: "auth",
});
</script>
