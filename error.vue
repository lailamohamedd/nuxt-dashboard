<template>
  <div class="error text-center mt-5">
    <img
      src="/images/404.png"
      class="mx-auto max-w-lg"
      width="100%"
      alt="404 image"
    />
    <h1 class="text-2xl font-bold">{{ error.statusCode }}</h1>
    <h3 class="my-5">{{ error.statusMessage }}</h3>
    <button class="btn bg-blue-100 text-blue-500 rounded py-3 px-4 cursor-pointer font-bold" @click="clearErr">Back Home</button>
  </div>
</template>

<script setup>
defineProps(["error"]);

//methods
const clearErr = () => {
  clearError({redirect: "/"});
}
</script>
