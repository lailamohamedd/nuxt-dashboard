export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuthStore();
  if (!auth.token) {
     return   navigateTo("/auth/login");
  }
});
