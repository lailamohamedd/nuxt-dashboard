<template>
  <div class="card bg-white px-6 pt-6 pb-2 shadow-gray-500 rounded-lg">
    <div class="flex justify-between mb-1">
      <h2 class="mb-3 text-lg font-bold">{{ t("Reports") }}</h2>

      <div class="flex space-x-2">
        <button
          v-for="(label, key) in timeFrames"
          :key="key"
          @click="setTimeFrame(key)"
          :class="[
            'px-4 py-2 rounded cursor-pointer font-bold',
            selectedTimeFrame === key ? 'text-blue-600' : 'text-gray-400',
          ]"
        >
          {{ t(label) }}
        </button>
      </div>
    </div>

    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const timeFrames = computed(() => ({
  day: "Day",
  week: "Week",
  month: "Month",
}));

const selectedTimeFrame = ref("day");

const dataSets = {
  day: [10, 15, 8, 20, 18, 12, 25],
  week: [50, 80, 45, 100, 90, 60, 120],
  month: [200, 300, 250, 400, 350, 280, 500],
};

const series = computed(() => [
  {
    name: t("Revenue"),
    data: dataSets[selectedTimeFrame.value] || [],
  },
]);

const chartOptions = ref({
  chart: {
    id: "revenue-chart",
    toolbar: { show: false },
  },
  xaxis: {
    categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  colors: ["#1E90FF"],
});

const setTimeFrame = (timeFrame) => {
  selectedTimeFrame.value = timeFrame;
};
</script>
