/** Same-origin dalam production Docker (VITE_API_BASE_URL tidak diset); dev fallback ke artisan serve */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL !== undefined && import.meta.env.VITE_API_BASE_URL !== ""
    ? String(import.meta.env.VITE_API_BASE_URL)
    : import.meta.env.DEV
      ? "http://localhost:8000"
      : "";
