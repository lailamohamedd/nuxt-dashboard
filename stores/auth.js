import { defineStore } from "pinia";
import { useCookie } from "#app";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token"));
  const isAuthenticated = ref(false);
  const user = ref(null);
  const getUser = async () => {
    if (token.value && token.value !== "undefined") {
      const res = await $fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token.value, // Pass JWT via Authorization header
        },
      });
      if (res && res.id) {
        isAuthenticated.value = true;
        user.value = res;
      }
    }
  };
  const login = ({ username, password }) => {
    $fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        username: username,
        password: password,
      },
    }).then((res) => {
      localStorage.setItem("token", res.accessToken);
      token.value = res.accessToken;
      isAuthenticated.value = true;
      user.value = res;
      return navigateTo("/profile");
    });
  };
  const logout = () => {
    token.value = null;
    isAuthenticated.value = false;
    user.value = null;
    localStorage.removeItem("token");
    return navigateTo("/auth/login");
  };
  return {
    token,
    isAuthenticated,
    user,
    getUser,
    logout,
    login,
  };
});
