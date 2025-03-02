<template>
  <div class="error text-center mt-5">
    <!-- Error image -->
    <img
      src="/images/error.png"
      class="mx-auto max-w-xl"
      width="100%"
      alt="404 image"
    />

    <!-- Display error status code -->
    <h1 class="text-2xl mt-5 font-bold">{{ error.statusCode }}</h1>

    <!-- Display error message -->
    <h3 class="my-5">{{ error.statusMessage }}</h3>
    {{ error }}

    <!-- Button to redirect back to home -->
    <button
      class="btn bg-blue-100 text-blue-500 rounded py-3 px-4 cursor-pointer font-bold"
      @click="clearErr"
    >
      Back Home
    </button>
  </div>
</template>

<script setup>
/**
 * Define component props to receive error data
 */
defineProps(["error"]);

/**
 * Function to clear the error and redirect to the home page
 */
const clearErr = () => {
  clearError({ redirect: "/" });
};
</script>
