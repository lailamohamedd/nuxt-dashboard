<template>
  <div class="card bg-white p-6 shadow-gray-500 rounded-lg">
    <!-- Chart Title -->
    <h2 class="text-xl font-bold text-gray-800">{{ $t('Visits') }}</h2>

    <!-- ApexChart Component for Bar Chart -->
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup>
import { ref } from "vue"; // Import ref for reactive data binding

// Data series for the chart (visit counts per day)
const series = ref([
  {
    name: "Visits", // Series name (displayed in the tooltip)
    data: [120, 200, 150, 80, 170, 210, 140], // Visits for each day
  },
]);

// Chart configuration options
const chartOptions = ref({
  chart: {
    height: 350, // Chart height in pixels
    type: "bar", // Chart type (bar chart)
  },
  plotOptions: {
    bar: {
      borderRadius: 5, // Rounded edges for bars
      columnWidth: "45%", // Width of each bar relative to available space
      dataLabels: {
        position: "top", // Display data labels at the top of bars
      },
    },
  },
  colors: ["#1066e9"], // Bar color (blue)
  dataLabels: {
    enabled: true, // Enable labels on top of bars
    formatter: (val) => val + " Visits", // Format data labels with text
    offsetY: -20, // Adjust position of data labels
    style: {
      fontSize: "11px", // Font size for labels
      colors: ["#304758"], // Label text color
    },
  },
  xaxis: {
    categories: ["M", "T", "W", "T", "F", "S", "S"], // Days of the week
    position: "bottom", // Position of the x-axis
    axisBorder: { show: false }, // Hide axis border
    axisTicks: { show: false }, // Hide axis ticks
    crosshairs: {
      fill: {
        type: "gradient",
        gradient: {
          colorFrom: "#D8E3F0", // Light blue gradient start
          colorTo: "#BED1E6", // Light blue gradient end
          stops: [0, 100], // Gradient stops
          opacityFrom: 0.4, // Start opacity
          opacityTo: 0.5, // End opacity
        },
      },
    },
    tooltip: { enabled: true }, // Enable tooltip on hover
  },
  yaxis: {
    axisBorder: { show: false }, // Hide y-axis border
    axisTicks: { show: false }, // Hide y-axis ticks
    labels: {
      show: false, // Hide y-axis labels
      formatter: (val) => val + " Visits", // Format y-axis labels (if enabled)
    },
  },
});
</script>
