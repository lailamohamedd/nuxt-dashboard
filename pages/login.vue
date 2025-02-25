<template>
  <!-- <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-semibold text-gray-700 text-center">تسجيل الدخول</h2>

      <form @submit.prevent="login" class="mt-6">
        <div>
          <label class="block text-gray-700">اسم المستخدم</label>
          <input
            v-model="username"
            type="text"
            required
            class="mt-2 w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        <div class="mt-4">
          <label class="block text-gray-700">كلمة المرور</label>
          <input
            v-model="password"
            type="password"
            required
            class="mt-2 w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        <p v-if="errorMessage" class="mt-2 text-red-500">{{ errorMessage }}</p>

        <button
          type="submit"
          class="mt-4 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          تسجيل الدخول
        </button>
      </form>
    </div>
  </div> -->
</template>
<script> 
// const login = async () => {
//   const res = await $fetch("https://dummyjson.com/auth/login", {

//     method: "POST",
//     body: JSON.stringify({
//       email: "emilys",
//       password: "emilyspass",
//       expiresInMins: 30, // optional, defaults to 60
//     }),
//     credentials: 'include' // Include cookies (e.g., accessToken) in the request
//   })
//   console.log(res)
// }
</script>