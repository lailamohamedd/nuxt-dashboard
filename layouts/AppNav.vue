<template>
  <nav
    class="bg-white shadow px-3 lg:px-15 md:px-15 py-3 flex justify-between ml-0 sm:ml-32 md:ml-70"
  >
    <div class="relative md:w-65 hidden md:block">
      <span
        class="relative md:absolute inset-y-0 left-0 flex items-center pl-2"
      >
        <button class="p-1 focus:outline-none text-gray-300">
          <i class="fa-solid fa-magnifying-glass"></i></button
      ></span>
      <input
        type="text"
        placeholder="search"
        class="lg:w-120 md:w-50 placeholder:text-gray-300 bg-gray-100 px-4 py-2 lg:pl-12 pl-6 rounded shadow-gray-200 outline-none"
      />
    </div>
    <div class="flex w-100 items-center justify-end gap-x-3">
      <!-- <DarkModeToggle /> -->
      <button class="rounded-md px-2 py-1 bg-gray-100 text-gray-400">
        <i class="fa-solid fa-bag-shopping fa-md"></i>
      </button>
      <button class="rounded-md relative px-2 py-1 bg-gray-100 text-gray-400">
        <i class="fa fa-bell fa-md"></i>
        <span class="w-3 top-0 h-3 bg-red-400 absolute z-10 rounded-xl"></span>
      </button>
      <div class="relative">
        <button class="text-gray-800 text-center group">
          <img
            src="/public/images/user.svg"
            class="rounded-md mx-auto cursor-pointer"
            width="32"
            alt="user"
          />
          <div
            class="z-10 hidden shadow absolute font-bold bg-white rounded-lg w-32 group-focus:block top-full right-0"
          >
            <ul class="py-2 text-sm text-gray-400">
              <li class="py-2"><a href="">Johny Larsen</a></li>
              <li class="py-2"><a href="">settings</a></li>
              <li class="py-2"><a href="">logout</a></li>
            </ul>
          </div>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import DarkModeToggle from "../components/DarkModeToggle.vue";
</script>

<style scoped></style>
