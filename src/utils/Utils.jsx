// utils/Utils.jsx
export const getCsrfToken = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/csrf-token`, {
        credentials: 'include',
      });
      const data = await response.json();
      return data.csrfToken;
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      return null;
    }
  };
  