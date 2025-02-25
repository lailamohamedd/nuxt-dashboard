<template>
  <div class="mx-auto lg:px-10 px-6 pb-6 pt-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="card flex items-center bg-white px-4 py-8 rounded-2xl"
      >
        <div
          class="w-13 h-13 flex items-center justify-center rounded-full"
          :class="[
            card.bgColor,
            card.textColor,
          ]"
        >
          <i :class="['fa-solid', card.icon, 'text-xl']"></i>
        </div>
        <div class="mx-2">
          <p class="text-sm text-gray-400">
            {{ card.title }}
          </p>
          <h2 class="text-gray-800 font-bold text-xl">
            {{ card.price }}
            <span
              v-if="card.badge"
              class="mx-2 rounded-xl font-semibold text-xs px-2 py-1"
              :class="[
                card.bgBadge,
                card.textBadge,
                'dark:bg-opacity-20 dark:text-opacity-90',
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

const cards = ref([
  {
    title: "Total Revenue",
    price: "$52.6k",
    icon: "fa-chart-gantt",
    bgColor: "bg-blue-50",
    textColor: "text-blue-400",
    badge: "+1.45%",
    bgBadge: "bg-red-50",
    textBadge: "text-red-400",
  },
  {
    title: "Today’s Revenue",
    price: "$1024",
    icon: "fa-chart-simple",
    bgColor: "bg-green-50",
    textColor: "text-green-400",
    badge: "+1.45%",
    bgBadge: "bg-green-50",
    textBadge: "text-green-400",
  },
  {
    title: "Items Sold",
    price: "251",
    icon: "fa-cart-shopping",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-400",
  },
  {
    title: "Active Users",
    price: "150",
    icon: "fa-user-group",
    bgColor: "bg-purple-50",
    textColor: "text-purple-400",
  },
]);
</script>
