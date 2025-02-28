export default defineNuxtRouteMiddleware((to, from) => {
  // Retrieve the authentication token from local storage.
  const token = localStorage.getItem("token");

  // If no token is found, redirect the user to the login page.
  if (!token) {
    return navigateTo("/auth/login");
  }
});
