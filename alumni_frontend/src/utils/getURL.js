export const getURL = () => {
  // Prefer explicitly configured site URL (for production), else fall back to current origin
  let url =
    process.env.REACT_APP_SITE_URL ||
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

  // Ensure URL starts with http/https
  if (!url.startsWith('http')) {
    url = `https://${url}`;
  }

  // Ensure URL ends with /
  if (!url.endsWith('/')) {
    url = `${url}/`;
  }

  return url;
};
