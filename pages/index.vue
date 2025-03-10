<template>
  <div
    :class="
      language === 'ar' ? 'mr-0 sm:mr-32 md:mr-70' : 'ml-0 sm:ml-32 md:ml-70'
    "
  >
    <!-- Start Analytics -->
    <div class="analysis">
      <h2 class="mx-10 pt-7 pb-0 text-lg font-bold">{{ $t("Analytics") }}</h2>
      <AnalyticsCards/>
    </div>
    <!-- End Analytics -->
    <!-- Start Charts -->
    <div class="grid lg:grid-cols-3 px-6 gap-6 lg:px-10 pb-6 pt-0">
      <div class="lg:col-span-2">
        <AreaChart />
      </div>
      <div>
        <BarChart/>
      </div>
    </div>
    <!-- End Charts -->
    <!-- Start Recent Orders Table -->
    <RecentOrders/>
    <!-- End Recent Orders Table -->
  </div>
</template>

<script setup>
import AnalyticsCards from "~/components/AnalyticsCards.vue";
import AreaChart from "~/components/charts/AreaChart.vue";
import BarChart from "~/components/charts/BarChart.vue";

const { locale } = useI18n();
const language = computed(() => locale.value);
definePageMeta({
  middleware: "auth",
});
</script>
