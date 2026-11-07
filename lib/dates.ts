import { cacheLife } from 'next/cache';

// Cached function for the copyright year
export async function getCurrentYear() {
  'use cache';
  cacheLife('max');
  return new Date().getFullYear();
}

// Cached function for the long bulletin header date
export async function getFormattedDate() {
  'use cache';
  cacheLife('max');
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getDisplayDate(dateString: string, includeWeekday: boolean = false): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: includeWeekday ? 'long' : 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC' // Prevents server/client hydration offset glitches
  });
}

// lib/dates.ts

export function getUpcomingSundayDateString(): string {
  const now = new Date();
  
  // 1. Get the current day of the week based on your LOCAL time (0 = Sunday, 1 = Monday...)
  const currentDayOfWeek = now.getDay();
  
  // 2. Calculate exactly how many days until Sunday using your local clock
  const daysUntilSunday = currentDayOfWeek === 0 ? 0 : 7 - currentDayOfWeek;
  
  const upcomingSunday = new Date(now);
  upcomingSunday.setDate(now.getDate() + daysUntilSunday);
  
  // 3. Extract the year, month, and day using local time methods to avoid UTC shifts
  const year = upcomingSunday.getFullYear();
  
  // .padStart(2, '0') ensures a two-digit format like '08' instead of '8'
  const month = String(upcomingSunday.getMonth() + 1).padStart(2, '0');
  const day = String(upcomingSunday.getDate()).padStart(2, '0');
  
  // Returns exactly "2026-11-08" regardless of what time of day it is called
  return `${year}-${month}-${day}`;
}
