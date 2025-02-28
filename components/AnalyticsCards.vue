<template>
  <div class="mx-auto analytics-cards lg:px-10 px-6 pb-6 pt-4">
    <!-- Responsive grid layout for analytics cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="card flex items-center bg-white px-4 py-8 rounded-2xl"
      >
        <!-- Icon container with dynamic styles -->
        <div
          class="w-13 h-13 flex items-center justify-center rounded-full"
          :class="[
            card.bgColor, // Background color for the icon
            card.textColor, // Text color for the icon
          ]"
        >
          <i :class="['fa-solid', card.icon, 'text-xl']"></i>
        </div>

        <!-- Card content: Title, price, and optional badge -->
        <div class="mx-2">
          <p class="text-sm text-gray-400">
            {{ card.title }} <!-- Display card title -->
          </p>
          <h2 class="text-gray-800 font-bold text-xl">
            {{ card.price }} <!-- Display main value -->

            <!-- Badge for percentage change (if available) -->
            <span
              v-if="card.badge"
              class="mx-2 rounded-xl font-semibold text-xs px-2 py-1"
              :class="[
                card.bgBadge, // Background color for badge
                card.textBadge, // Text color for badge
              ]"
            >
              {{ card.badge }}
            </span>
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Define analytics card data with dynamic styles
const cards = ref([
  {
    title: "Total Revenue",
    price: "$52.6k",
    icon: "fa-chart-gantt",
    bgColor: "bg-[oklch(0.45_0.2_256.51/0.22)]", // Blue background
    textColor: "text-blue-400", // Blue text
    badge: "+1.45%", // Percentage change indicator
    bgBadge: "bg-[oklch(0.72_0.21_23.02/0.16)]", // Red background for negative change
    textBadge: "text-red-400", // Red text for negative change
  },
  {
    title: "Today’s Revenue",
    price: "$1024",
    icon: "fa-chart-simple",
    bgColor: "bg-[oklch(0.77_0.2_152.18/0.14)]", // Green background
    textColor: "text-green-400", // Green text
    badge: "+1.45%", // Positive change
    bgBadge: "bg-[oklch(0.77_0.2_152.18/0.14)]", // Green background for positive change
    textBadge: "text-green-400", // Green text for positive change
  },
  {
    title: "Items Sold",
    price: "251",
    icon: "fa-cart-shopping",
    bgColor: "bg-[oklch(0.75_0.18_56.73/0.12)]", // Orange background
    textColor: "text-orange-400", // Orange text
  },
  {
    title: "Active Users",
    price: "150",
    icon: "fa-user-group",
    bgColor: "bg-[oklch(0.72_0.21_23.02/0.16)]", // Red background
    textColor: "text-red-400", // Red text
  },
]);
</script>
