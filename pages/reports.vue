<template>
  <!-- Main container with padding and responsive margins -->
  <div
    class="p-6 mt-5 overflow-x-auto"
    :class="
      language === 'ar' ? 'mr-0 sm:mr-32 md:mr-70' : 'ml-0 sm:ml-32 md:ml-70'
    "
  >
    <!-- Card container for the report with a shadow and rounded corners -->
    <div class="p-6 report-card bg-white shadow-gray-500 rounded-lg mt-5">
      <!-- Importing and displaying the Area Chart component -->
      <AreaChart />
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const language = computed(() => locale.value);
import AreaChart from "~/components/charts/AreaChart.vue";

definePageMeta({
  middleware: "auth",
});
</script>
