<template>
  <div class="card bg-white px-6 pt-6 pb-2 shadow-gray-500 rounded-lg">
    <!-- Header Section: Title & Timeframe Selection -->
    <div class="flex justify-between mb-1">
      <h2 class="mb-3 text-lg font-bold">{{ $t('Reports') }}</h2>

      <!-- Timeframe Selection Buttons -->
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
          {{ label }}
        </button>
      </div>
    </div>

    <!-- Line Chart Displaying Revenue Data -->
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"; // Import reactive and computed properties

// Available timeframes for selecting report data
const timeFrames = {
  day: "Day",
  week: "Week",
  month: "Month",
};

// Reactive state to track the selected timeframe
const selectedTimeFrame = ref("day");

// Data sets for different timeframes (simulating revenue data)
const dataSets = {
  day: [10, 15, 8, 20, 18, 12, 25], // Revenue for each day in a week
  week: [50, 80, 45, 100, 90, 60, 120], // Revenue for each week
  month: [200, 300, 250, 400, 350, 280, 500], // Revenue for each month
};

// Dynamically update the chart series based on selected timeframe
const series = computed(() => [
  {
    name: "Revenue", // Data label
    data: dataSets[selectedTimeFrame.value], // Get data for the selected timeframe
  },
]);

// Chart configuration options
const chartOptions = {
  chart: {
    id: "revenue-chart", // Unique ID for the chart
    toolbar: { show: false }, // Hide toolbar for a cleaner UI
  },
  xaxis: {
    categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // X-axis labels (days of the week)
  },
  colors: ["#1E90FF"], // Chart line color (blue)
};

// Function to update the selected timeframe
const setTimeFrame = (timeFrame) => {
  selectedTimeFrame.value = timeFrame;
};
</script>
