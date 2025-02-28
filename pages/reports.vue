<template>
  <!-- Main container with padding and responsive margins -->
    <div
    class="p-6 mt-5 overflow-x-auto"
    :class="{
      'ml-0 sm:ml-32 md:ml-70': !isRtl,
      'mr-0 sm:mr-32 md:mr-70': isRtl
    }">
    <!-- Card container for the report with a shadow and rounded corners -->
    <div class="p-6 report-card bg-white shadow-gray-500 rounded-lg mt-5">
      <!-- Importing and displaying the Area Chart component -->
      <AreaChart />
    </div>
  </div>
</template>

<script setup>
// Importing the AreaChart component from the charts directory
import AreaChart from "~/components/charts/AreaChart.vue";
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const isRtl = computed(() => locale.value === 'ar');
// Defining page metadata to enforce authentication before accessing this page
// definePageMeta({
//   middleware: "protected", // Ensures only authenticated users can access this page
// });
</script>
