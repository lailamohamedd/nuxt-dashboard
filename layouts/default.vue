<template>
  <!-- Main layout container with flexbox for a structured layout -->
  <div class="layout flex">
    <!-- Sidebar Component (Navigation Menu) -->
    <Sidebar />

    <!-- Main Content Area -->
    <div class="dashboard w-full">
      <!-- Top Navigation Bar -->
      <AppNav />
      
      <!-- Dynamic Page Content -->
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const authSTore=useAuthStore();
onMounted(async()=>{
  await authSTore.getUser();

})
import AppNav from "./AppNav.vue"; // Importing the top navigation component
import Sidebar from "./Sidebar.vue"; // Importing the sidebar navigation component
</script>
