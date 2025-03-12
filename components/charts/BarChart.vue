<template>
  <div class="card bg-white p-6 shadow-gray-500 rounded-lg">
    <!-- Chart Title -->
    <h2 class="text-xl font-bold text-gray-800">{{ t('Visits') }}</h2>

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
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const series = ref([
  {
    name: t('Visits'), 
    data: [120, 200, 150, 80, 170, 210, 140],
  },
]);

const chartOptions = ref({
  chart: {
    height: 350,
    type: "bar",
    toolbar: { show: false }, 
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
    formatter: (val) => `${val} ${t('Visits')}`, 
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
    tooltip: { enabled: true },
  },
  yaxis: {
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: {
      show: false,
      formatter: (val) => `${val} ${t('Visits')}`, 
    },
  },
});

watch(locale, () => {
  series.value = [
    {
      name: t('Visits'),
      data: [120, 200, 150, 80, 170, 210, 140],
    },
  ];
  
  chartOptions.value.dataLabels.formatter = (val) => `${val} ${t('Visits')}`;
  chartOptions.value.yaxis.labels.formatter = (val) => `${val} ${t('Visits')}`;
});
</script>
