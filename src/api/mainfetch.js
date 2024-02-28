import React, { useEffect } from 'react';
import axios from 'axios';

 export const api = axios.create({
 
  baseURL: 'https://muslim-sweets-backend.onrender.com/api/v1', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api2 = axios.create({
  baseURL: "https://muslim-sweets-backend.onrender.com/api/v1", // Replace with your apiValue base URL
  headers: {
    "Content-Type": 'multipart/form-data',
    // "Content-Type": 'application/json'
  },
});

// Request interceptor
api.interceptors.request.use(
  config => {
    // You can modify the request configuration here
    // For example, you can add an authorization token
    const accessToken = 'your_access_token';
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  error => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  response => {
    // You can modify the response data here
    return response;
  },
  async error => {
    // Handle response error
    if (error.response && error.response.status === 401) {
      // Token expired, attempt to refresh
      const newAccessToken = await refreshAccessToken();
      error.config.headers.Authorization = `Bearer ${newAccessToken}`;
      return api.request(error.config);
    }
    return Promise.reject(error);
  }
);

// Function to refresh the access token
async function refreshAccessToken() {
  try {
    // Make a request to your authentication endpoint with the refresh token
    const response = await axios.post('https://auth.example.com/refresh', {
      refresh_token: 'your_refresh_token',
    });

    // Update the access token with the new one
    return response.data.access_token;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
}

// // Example React component
// const MyComponent = () => {
//   useEffect(() => {
//     // Example GET request
//     api.get('/data')
//       .then(response => {
//       })
//       .catch(error => {
//         console.error('GET Error:', error);
//       });

//     // Example POST request
//     api.post('/create', { data: 'some data' })
//       .then(response => {
//       })
//       .catch(error => {
//         console.error('POST Error:', error);
//       });

//     // Example DELETE request
//     api.delete('/delete/123')
//       .then(response => {
//       })
//       .catch(error => {
//         console.error('DELETE Error:', error);
//       });
//   }, []);

// };

// export default MyComponent;
