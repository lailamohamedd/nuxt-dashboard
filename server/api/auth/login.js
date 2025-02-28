import jwt from "jsonwebtoken";

const SECRET_KEY = "mysecretkey123"; // Secret key for signing JWT tokens

export default defineEventHandler(async (event) => {
  try {
    // Read the request body
    const body = await readBody(event);
    const { email, password } = body;

    // Validate input - Ensure both email and password are provided
    if (!email || !password) {
      setResponseStatus(event, 400);
      return { success: false, message: "Email and password are required" };
    }

    // Fetch user data from an external API
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();

    // Find user in the fetched data
    const user = data.users.find(
      (u) => u.email === email && u.password === password
    );

    // If user is not found or credentials are incorrect
    if (!user) {
      setResponseStatus(event, 401);
      return { success: false, message: "Invalid email or password" };
    }

    // Generate a JWT token with user data and expiration time of 1 hour
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.firstName },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Return success response with the generated token
    return { success: true, message: "Login successful", token };
  } catch (error) {
    // Handle any unexpected server errors
    setResponseStatus(event, 500);
    return { success: false, message: "Server error", error: error.message };
  }
});
