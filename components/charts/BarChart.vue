<template>
  <div class="bg-white p-6 shadow-gray-500 rounded-lg">
    <h2 class="text-xl font-bold text-gray-800">Visits</h2>
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup>
import { ref } from "vue";

const series = ref([
  {
    name: "Visits",
    data: [120, 200, 150, 80, 170, 210, 140],
  },
]);

const chartOptions = ref({
  chart: {
    height: 350,
    type: "bar",
  },
  plotOptions: {
    bar: {
      borderRadius: 5,
      columnWidth: "45%",
      dataLabels: {
        position: "top",
      },
    },
  },
  colors: ["#1066e9"],
  dataLabels: {
    enabled: true,
    formatter: (val) => val + " Visits",
    offsetY: -20,
    style: {
      fontSize: "11px",
      colors: ["#304758"],
    },
  },
  xaxis: {
    categories: ["M", "T", "W", "T", "F", "S", "S"],
    position: "bottom",
    axisBorder: { show: false },
    axisTicks: { show: false },
    crosshairs: {
      fill: {
        type: "gradient",
        gradient: {
          colorFrom: "#D8E3F0",
          colorTo: "#BED1E6",
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        },
      },
    },
    tooltip: { enabled: true },
  },
  yaxis: {
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      show: false,
      formatter: (val) => val + " Visits",
    },
  },
});
</script>
