export default defineNuxtRouteMiddleware((to, from) => {
  // Ensure the middleware does not run on the server-side (only runs on the client-side).
  if (process.server) return;

  // Retrieve the authentication token from local storage.
  // const token = localStorage.getItem("token");

  // If no token is found, redirect the user to the login page.
  // if (!token) {
  //   return navigateTo("/login");
  // }

  try {
    // Attempt to parse the token (assuming it contains user information in JSON format).
    const user = JSON.parse(token);

    // Ensure the token contains a valid user ID, otherwise, consider it invalid.
    if (!user.id) {
      throw new Error("Invalid token");
    }
  } catch (error) {
    // Handle token parsing errors (e.g., corrupted or tampered token).
    console.error("❌ Authentication error:", error.message);

    // Remove the invalid token from local storage and redirect the user to the login page.
    localStorage.removeItem("token");
    return navigateTo("/login");
  }
  if (process.client) {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return navigateTo("/auth/login");
    }
  }
});
