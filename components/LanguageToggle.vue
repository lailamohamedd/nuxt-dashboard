<template>
  <div>
    <button class="cursor-pointer font-bold" @click="toggleLanguage">
      {{ selectedLang === "en" ? "AR" : "EN" }}
    </button>
  </div>
</template>

<script setup>
import { useI18n } from "#imports";
import { useHead } from "#imports";
import { ref, watch, onMounted } from "vue";

const { locale } = useI18n();

const savedLang = localStorage.getItem("locale") || locale.value;
const selectedLang = ref(savedLang);

locale.value = selectedLang.value;

const updateHtmlAttributes = () => {
  document.documentElement.lang = selectedLang.value;
  document.documentElement.dir = selectedLang.value === "ar" ? "rtl" : "ltr";
};

watch(selectedLang, (newLang) => {
  locale.value = newLang;
  localStorage.setItem("locale", newLang);
  updateHtmlAttributes();
});

onMounted(() => {
  document.documentElement.lang = selectedLang.value;
});

useHead({
  htmlAttrs: {
    lang: selectedLang,
  },
});

const toggleLanguage = () => {
  selectedLang.value = selectedLang.value === "en" ? "ar" : "en";
};
</script>
