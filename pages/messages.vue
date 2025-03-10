<template>
  <div
    class="p-6 mt-5 overflow-x-auto"
    :class="
      language === 'ar' ? 'mr-0 sm:mr-32 md:mr-70' : 'ml-0 sm:ml-32 md:ml-70'
    "
  >
    <h1 class="mb-3 text-2xl font-bold">{{ $t("Messages") }}</h1>
    <div class="card p-6 bg-white shadow-gray-500 overflow-auto rounded"></div>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const language = computed(() => locale.value);
definePageMeta({
  middleware: "auth",
});
</script>
