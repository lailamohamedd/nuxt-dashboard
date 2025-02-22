<template>
  <div class="layout flex">
    <Sidebar />
    <div class="dashboard w-full">
      <AppNav />
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import AppNav from "./AppNav.vue";
import Sidebar from "./Sidebar.vue";
</script>
