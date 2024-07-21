export const getCsrfToken = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/csrf-token`, {
      credentials: 'include',
    });
    const data = await response.json();
    return data.csrfToken;
  };
  