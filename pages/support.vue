<template>
  <div class="p-6 mt-5 overflow-x-auto"
    :class="{
      'ml-0 sm:ml-32 md:ml-70': !isRtl,
      'mr-0 sm:mr-32 md:mr-70': isRtl
    }">
    <h1 class="mb-3 text-2xl font-bold">{{ $t('Support') }}</h1>
    <div class="card p-6 bg-white shadow-gray-500 overflow-auto rounded"></div>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const isRtl = computed(() => locale.value === 'ar');

definePageMeta({
  middleware: "auth",
});
</script>
