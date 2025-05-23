export const fetchConHeaders = (url: string, options: RequestInit = {}) => {
  return fetch(url, {
    ...options,
    headers: {
      'Accept': 'application/json',
      'ngrok-skip-browser-warning': 'true',
      ...(options.headers || {})
    }
  });
};