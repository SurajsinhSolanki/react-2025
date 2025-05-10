import axios from 'axios';
import storage from "./localStorage";

// --- Configuration ---
// Get the API base URL from environment variables.
// Use a variable name appropriate for your build setup (e.g., REACT_APP_, VITE_, NEXT_PUBLIC_).
const API_BASE_URL = process.env.BASE_URL;

if (!API_BASE_URL) {
    console.error("BASE_URL environment variable is not set!");
    throw new Error("BASE_URL environment variable is not set!")
    // Depending on your application's requirements, you might want to:
    // - Throw an error to prevent the app from starting with a bad config.
    // - Use a default development URL.
    // - Display a user-friendly error message.
    // For now, we'll just log an error. Requests made without a base URL might fail.
}

// --- Create Axios Instance ---
// Create a custom Axios instance. This allows you to configure
// defaults and add interceptors specifically for your API calls.
const api = axios.create({
    baseURL: API_BASE_URL, // Set the base URL for all requests made with this instance
    timeout: 10000, // Optional: Set a default timeout for requests (in milliseconds)
    headers: {
        'Content-Type': 'application/json', // Optional: Set a default content type
        'Accept': 'application/json', // Optional: Indicate that you expect JSON responses
    },
});

// --- Interceptors (Pipelines) ---
// Interceptors allow you to run code automatically before requests are sent
// or after responses are received. This is where you add your "pipelines".

// Request Interceptor: Add authentication token to headers
api.interceptors.request.use(
    (config) => {
        // Get your authentication token (e.g., from localStorage, a state management library)
        const authToken = storage.getItem('local','auth'); // Example: Replace with your actual token source

        // If a token exists, add it to the Authorization header
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }

        // You can also modify other config options here, e.g., add a timestamp, modify parameters

        console.log('Request Interceptor:', config.method?.toUpperCase(), config.url); // Optional: Log request details

        return config; // Always return the config object
    },
    (error) => {
        // Handle request errors (e.g., network issues before the request is sent)
        console.error('Request Interceptor Error:', error);
        return Promise.reject(error); // Propagate the error
    }
);

// Response Interceptor: Handle global response logic (e.g., error handling, logging)
api.interceptors.response.use(
    (response) => {
        // This function is called for successful responses (status 2xx)
        console.log('Response Interceptor:', response.status, response.config.method?.toUpperCase(), response.config.url); // Optional: Log response details

        // You can transform the response data here if needed
        // response.data = myCustomDataTransformer(response.data);

        return response; // Always return the response object
    },
    (error) => {
        // This function is called for error responses (status outside 2xx)
        console.error('Response Interceptor Error:', error.response?.status, error.config?.method?.toUpperCase(), error.config?.url, error.message); // Log error details

        // Example: Handle 401 Unauthorized errors globally
        if (error.response?.status === 401) {
            console.warn('Unauthorized request. Redirecting to login...');
            // Example: Redirect to login page (requires react-router-dom or similar)
            // history.push('/login'); // Assuming you have access to history object
            // Or dispatch a logout action if using Redux/Context
        }

        // You can perform another global error handling here, e.g., logging to a service, showing a notification.

        return Promise.reject(error); // Propagate the error so the calling code can handle it too
    }
);

// --- API Call Function ---
// This is the main function you will use in your components/services.
// It uses the configured Axios instance.
/**
 * Makes an HTTP request using the configured Axios instance.
 *
 * @param {string} url - The URL for the request relative to the baseURL.
 * @param {object} [config={}] - Optional Axios request configuration (method, data, params, headers, etc.).
 * @returns {Promise<object>} - A promise that resolves with the Axios response object.
 */
const apiRequest = (url, config = {}) => {
    // The 'url' here is relative to the baseURL set in the instance.
    // The 'config' object overrides or adds to the instance's default configuration
    // for this specific request.
    return api(url, config);
};

// --- Usage Examples ---
/*
 * Import the apiRequest function into your component or service file:
 * import apiRequest from './path/to/your/axiosWrapper'; // Adjust the path as needed
 *
 * The apiRequest function returns a Promise that resolves with the Axios response object
 * for successful requests (status 2xx) and rejects for network errors or HTTP errors (status 4xx, 5xx).
 *
 * You can use async/await for cleaner asynchronous code.
 */

/**
 * Example: Making a GET request
 * Fetches a list of users from the /users endpoint.
 */
/*
async function fetchUsers() {
  try {
    // GET is the default method, so you don't need to specify it in the config
    const response = await apiRequest('/users');

    // Axios puts the response data directly on the 'data' property
    const users = response.data;
    console.log('Fetched users:', users);
    return users;

  } catch (error) {
    // Axios rejects the promise for HTTP errors (4xx, 5xx), so catch them here
    console.error('Error fetching users:', error.message);

    // You can access the response details from the error object if available
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received (e.g., network issue)
      console.error('Error request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }

    throw error; // Re-throw the error for calling code to handle
  }
}
*/

/**
 * Example: Making a POST request
 * Creates a new user by sending data to the /users endpoint.
 * @param {object} userData - The data for the new user.
 */
/*
async function createUser(userData) {
  try {
    const response = await apiRequest('/users', {
      method: 'POST', // Specify the HTTP method
      data: userData, // Axios automatically serializes objects to JSON for POST/PUT/PATCH
      // You can override default headers or add new ones here
      // headers: { 'X-Custom-Header': 'value' }
    });

    const createdUser = response.data;
    console.log('Created user:', createdUser);
    return createdUser;

  } catch (error) {
    console.error('Error creating user:', error);
    // Handle error details as shown in the GET example
    throw error;
  }
}
*/

/**
 * Example: Making a PUT request
 * Updates an existing user by sending data to a specific user endpoint (/users/:id).
 * @param {string} userId - The ID of the user to update.
 * @param {object} updateData - The data to update the user with.
 */
/*
async function updateUser(userId, updateData) {
  try {
    const response = await apiRequest(`/users/${userId}`, { // Include ID in the URL
      method: 'PUT', // Specify the HTTP method
      data: updateData, // Data to send in the request body
    });

    const updatedUser = response.data;
    console.log(`Updated user ${userId}:`, updatedUser);
    return updatedUser;

  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    // Handle error details
    throw error;
  }
}
*/

/**
 * Example: Making a DELETE request
 * Deletes a user at a specific user endpoint (/users/:id).
 * @param {string} userId - The ID of the user to delete.
 */
/*
async function deleteUser(userId) {
  try {
    const response = await apiRequest(`/users/${userId}`, { // Include ID in the URL
      method: 'DELETE', // Specify the HTTP method
      // DELETE requests typically don't have a request body
    });

    // Response data for DELETE might be empty (status 204) or a success message
    console.log(`Deleted user ${userId}:`, response.data);
    return response.data; // Return response.data even if it's empty

  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error);
    // Handle error details
    throw error;
  }
}
*/

/**
 * Example: Making a GET request with query parameters
 * Fetches users with pagination or filtering.
 * @param {object} params - Query parameters (e.g., { page: 1, limit: 10 }).
 */
/*
async function searchUsers(params) {
  try {
    const response = await apiRequest('/users', {
      method: 'GET', // GET is default
      params: params, // Axios adds these as query parameters to the URL (?page=1&limit=10)
    });

    const users = response.data;
    console.log('Searched users:', users);
    return users;

  } catch (error) {
    console.error('Error searching users:', error);
    // Handle error details
    throw error;
  }
}
*/


// --- Export the function ---
export default apiRequest;

// --- Optional: Export the Axios instance itself if you need direct access ---
// export { api };
