<template>
  <div class="langs_toggle">
    <select class="cursor-pointer outline-0 p-1 bg-white" v-model="language">
      <option
        class="cursor-pointer font-bold outline-0 px-3"
        v-for="item in locales"
        :key="typeof item === 'object' ? item.code : item"
        :value="typeof item === 'object' ? item.code : item"
      >
        {{ typeof item === "object" ? item.name : item }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { locales, locale, setLocale } = useI18n();

const language = computed({
  get: () => locale.value,
  set: (value) => {
    setLocale(value);
    localStorage.setItem("locale", value);
    document.documentElement.lang = value;
    document.documentElement.dir = value === "ar" ? "rtl" : "ltr";
  },
});

const savedLang = localStorage.getItem("locale");
if (savedLang && locales.value.map((l) => l.code).includes(savedLang)) {
  setLocale(savedLang);
  document.documentElement.lang = savedLang;
  document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
}
</script>
