// utils/Utils.jsx

export const getCsrfToken = () => {
    const matches = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
    return matches ? matches[2] : null;
  };
  