<template>
  <!-- Button to toggle between light and dark mode -->
  <button @click="toggleDarkMode" class="p-2 cursor-pointer text-xl">
    <span v-if="isDarkMode">🌙</span> <!-- Moon icon for dark mode -->
    <span v-else>☀️</span> <!-- Sun icon for light mode -->
  </button>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isDarkMode = ref(false); // Reactive state to track dark mode

onMounted(() => {
  // Retrieve theme preference from local storage and apply it
  isDarkMode.value = localStorage.getItem("theme") === "dark";
  document.documentElement.classList.toggle("dark", isDarkMode.value);
});

/**
 * Toggles the dark mode state and updates the theme preference in local storage.
 */
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  
  // Apply or remove the "dark" class to the HTML root element
  document.documentElement.classList.toggle("dark", isDarkMode.value);
  
  // Save the user's theme preference
  localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
};
</script>
