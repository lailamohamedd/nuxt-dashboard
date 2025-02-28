import { defineStore } from "pinia";
import { useCookie } from "#app";

/**
 * Authentication store using Pinia for state management.
 * This store handles authentication state using cookies.
 */
export const useAuthStore = defineStore("auth", {
  // Define the reactive state
  state: () => ({
    /**
     * Stores the authentication token.
     * The token is retrieved from a cookie (if available) to maintain session persistence.
     */
    token: useCookie("token").value || null, 
  }),

  // Define computed properties (getters)
  getters: {
    /**
     * Determines whether the user is authenticated.
     * Returns `true` if a valid token exists, otherwise `false`.
     */
    isAuthenticated: (state) => !!state.token, 
  },

  // Define methods (actions)
  actions: {
    /**
     * Handles user login by setting the authentication token.
     * The token is stored both in the state and as a cookie for session persistence.
     *
     * @param {string} token - The authentication token received upon successful login.
     */
    login(token) {
      this.token = token;
      useCookie("token").value = token;
    },

    /**
     * Logs out the user by clearing the authentication token.
     * Removes the token from both the state and the cookie storage.
     */
    logout() {
      this.token = null;
      useCookie("token").value = null;
    },
  },
});
