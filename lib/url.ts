//Connectionto the database

export function getDatabaseUrl(): string {
  // 1. Check for a custom environment variable first
  if (process.env.NEXT_PUBLIC_APP_URL) {
    const cleanUrl = process.env.NEXT_PUBLIC_APP_URL
    .replace(/^https?:\/\//, '') // Removes leading http:// or https://
    .replace(/\/$/, ''); // Remove trailing slash if present
    return `https://${cleanUrl}`;
  }

  // 2. If not found, check for Vercel deployment environment variable
  if (process.env.VERCEL_URL) {
    //const cleanUrl = process.env.VERCEL_URL.replace(/^https?:\/\//, ''); // Remove trailing slash if present
    return `https://${process.env.VERCEL_URL}`;
  }

  //FALLBACK: If neither environment variable is set, default to localhost for local development
    return 'http://127.0.0.1:3000';
}