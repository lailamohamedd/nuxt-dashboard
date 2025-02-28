import { ref } from "vue";
import { useCookie } from "#app";

/**
 * Custom authentication composable for managing user authentication state.
 * Uses cookies to persist authentication tokens.
 */
export function useAuth() {
  const user = ref(null); // Reactive reference to store the authenticated user data
  const token = useCookie("token"); // Cookie-based token storage

  /**
   * Handles user login by sending credentials to the API.
   * If authentication is successful, stores the token and user data.
   * 
   * @param {Object} credentials - User login credentials (email, password, etc.)
   */
  const login = async (credentials) => {
    const { data } = await useFetch("/api/auth/login", {
      method: "POST",
      body: credentials,
    });

    if (data.value?.token) {
      token.value = data.value.token; // Store token in cookie
      user.value = data.value.user; // Set user data
    }
  };

  /**
   * Logs out the user by clearing the token and user data.
   */
  const logout = () => {
    token.value = null; // Remove token from cookie
    user.value = null; // Clear user data
  };

  return { user, login, logout };
}
