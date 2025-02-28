<template>
    <div>
      <button class="cursor-pointer font-bold" @click="toggleLanguage">{{ selectedLang === "en" ? "AR" : "EN" }}</button>
    </div>
  </template>
  
  <script setup>
import { useI18n } from "vue-i18n";
import { ref } from "vue";

const { locale } = useI18n();
const selectedLang = ref(locale.value);

const toggleLanguage = () => {
  selectedLang.value = selectedLang.value === "en" ? "ar" : "en";
  locale.value = selectedLang.value;

  localStorage.setItem("locale", selectedLang.value);

  document.documentElement.lang = selectedLang.value;
  document.documentElement.dir = selectedLang.value === "ar" ? "rtl" : "ltr";
};
  </script>