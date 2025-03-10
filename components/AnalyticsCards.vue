<template>
  <div class="mx-auto analytics-cards lg:px-10 px-6 pb-6 pt-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="card flex items-center bg-white px-4 py-8 rounded-2xl"
      >
        <div
          class="w-13 h-13 flex items-center justify-center rounded-full"
          :class="[card.bgColor, card.textColor]"
        >
          <i :class="['fa-solid', card.icon, 'text-xl']"></i>
        </div>

        <div class="mx-2">
          <p class="text-sm text-gray-400">{{ card.title }}</p>
          <h2 class="text-gray-800 font-bold text-xl">
            {{ card.price }}
            <span
              v-if="card.badge"
              class="mx-2 rounded-xl font-semibold text-xs px-2 py-1"
              :class="[card.bgBadge, card.textBadge]"
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
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n(); // تفعيل الترجمة

// تعريف بيانات البطاقات مع الترجمة
const cards = computed(() => [
  {
    title: t("TotalRevenue"),
    price: "$52.6k",
    icon: "fa-chart-gantt",
    bgColor: "bg-[oklch(0.45_0.2_256.51/0.22)]",
    textColor: "text-blue-400",
    badge: "+1.45%",
    bgBadge: "bg-[oklch(0.72_0.21_23.02/0.16)]",
    textBadge: "text-red-400",
  },
  {
    title: t("TodayRevenue"),
    price: "$1024",
    icon: "fa-chart-simple",
    bgColor: "bg-[oklch(0.77_0.2_152.18/0.14)]",
    textColor: "text-green-400",
    badge: "+1.45%",
    bgBadge: "bg-[oklch(0.77_0.2_152.18/0.14)]",
    textBadge: "text-green-400",
  },
  {
    title: t("ItemsSold"),
    price: "251",
    icon: "fa-cart-shopping",
    bgColor: "bg-[oklch(0.75_0.18_56.73/0.12)]",
    textColor: "text-orange-400",
  },
  {
    title: t("ActiveUsers"),
    price: "150",
    icon: "fa-user-group",
    bgColor: "bg-[oklch(0.72_0.21_23.02/0.16)]",
    textColor: "text-red-400",
  },
]);
</script>
