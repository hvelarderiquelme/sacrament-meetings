export type MeetingType = "testimony" | "regular" | "stake" | "general" | "special";

export interface Hymn {
  number: number;
  title: string;
}

export interface Speaker {
  name: string;
  topic: string;
  type: 'speaker' | 'musical-number';
}

export interface BusinessItem {
  description: string;
  calling?: string;
  name: string;
  officiator?: string;
}

export interface SacramentMeeting {
  id: number;
  date: string; // Note: @vercel/postgres returns DATE columns as JS Date objects or ISO strings depending on config
  meetingType: MeetingType;
  presiding: string;
  conducting: string;
  announcements: string[];
  openingHymn: Hymn;
  openingPrayer: string;
  wardBusiness: BusinessItem[];
  stakeBusiness: boolean;
  sacramentHymn: Hymn;
  speakers: Speaker[];
  closingHymn: Hymn;
  closingPrayer: string;
}