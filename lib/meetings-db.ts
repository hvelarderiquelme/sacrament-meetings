import { SacramentMeeting } from './types';

export const mockMeetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-11-01',
    meetingType: 'regular',
    presiding: 'Bishop Taylor',
    conducting: 'Brother Harris (1st Counselor)',
    announcements: [
      'Ward youth temple trip this Thursday at 6:00 PM.',
      'The annual Ward Thanksgiving Social will be on November 21st.',
      'Choir practice resumes this Sunday at 1:00 PM.'
    ],
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Sarah Jenkins',
    wardBusiness: [
      { description: 'Release Brother Davis as Sunday School teacher.' },
      { description: 'Sustain Brother Miller as the new Sunday School teacher.' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
    speakers: [
      { name: 'Sister Emily Nelson', topic: 'Finding Peace in Christ', type: 'speaker' },
      { name: 'Elder and Sister Wright', topic: 'Special Musical Number: Abide With Me', type: 'musical-number' },
      { name: 'Brother Michael Chang', topic: 'The Power of Daily Scripture Study', type: 'speaker' }
    ],
    closingHymn: { number: 85, title: 'How Firm a Foundation' },
    closingPrayer: 'Brother James Miller'
  },
  {
    id: 2,
    date: '2026-11-08',
    meetingType: 'testimony',
    presiding: 'Bishop Taylor',
    conducting: 'Bishop Taylor',
    announcements: [
      'Tithing declaration sign-up sheets are available on the clerk\'s desk.'
    ],
    openingHymn: { number: 134, title: 'I Believe in Christ' },
    openingPrayer: 'Brother Robert Chen',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: 'I Do Believe on His Holy Name' },
    speakers: [
      { name: 'Congregation members', topic: 'Bearing testimonies as moved by the Spirit', type: 'speaker' }
    ],
    closingHymn: { number: 243, title: 'Let Us All Press On' },
    closingPrayer: 'Sister Maria Garcia'
  },
  {
    id: 3,
    date: '2026-11-15',
    meetingType: 'stake',
    presiding: 'President Lund (Stake Presidency)',
    conducting: 'President Lund',
    announcements: [
      'Reminder: All regularly scheduled ward meetings are cancelled this Sunday for Stake Conference.'
    ],
    openingHymn: { number: 3, title: 'Now Let Us Rejoice' },
    openingPrayer: 'Sister Linda Christensen',
    wardBusiness: [],
    stakeBusiness: true,
    // Sacrament hymn is not part of a non-sacrament stake meeting entry
    sacramentHymn: { number: 0, title: 'N/A (Stake Conference)' }, 
    speakers: [
      { name: 'Sister Julie Beck', topic: 'Strengthening the Home and Family', type: 'speaker' },
      { name: 'President Arthur Jones', topic: 'Gathering Israel', type: 'speaker' }
    ],
    closingHymn: { number: 292, title: 'O My Father' },
    closingPrayer: 'Brother David Vance'
  },
  {
    id: 4,
    date: '2026-11-22',
    meetingType: 'general',
    presiding: 'The First Presidency',
    conducting: 'The First Presidency',
    announcements: [
      'No local meetings. Please watch General Conference online or at the stake center.'
    ],
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Elder Dieter F. Uchtdorf',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 0, title: 'N/A (General Conference)' },
    speakers: [
      { name: 'President Russell M. Nelson', topic: 'Closing remarks and testimony', type: 'speaker' }
    ],
    closingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
    closingPrayer: 'Sister Camille N. Johnson'
  },
    {
    id: 5,
    date: '2026-11-29',
    meetingType: 'regular',
    presiding: 'Bishop Taylor',
    conducting: 'Brother Smith (2nd Counselor)',
    announcements: [
      'Ward Christmas Feast sign-ups begin today in the foyer.',
      'Youth activity night this Wednesday will be a service project packing care kits.'
    ],
    openingHymn: { number: 5, title: 'High on the Mountain Top' },
    openingPrayer: 'Sister Chloe Bennett',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 182, title: 'We\'ll Sing All Hail to Jesus\' Name' },
    speakers: [
      { name: 'Brother Aaron Foster', topic: 'The Principle of Tithing and Blessings', type: 'speaker' },
      { name: 'Sister Clara Higgins', topic: 'Developing Christlike Charity', type: 'speaker' }
    ],
    closingHymn: { number: 166, title: 'Abide with Me!' },
    closingPrayer: 'Brother Thomas Vance'
  },
  {
    id: 6,
    date: '2026-12-06',
    meetingType: 'testimony',
    presiding: 'Bishop Taylor',
    conducting: 'Bishop Taylor',
    announcements: [
      'The Ward Christmas Program will be held next Sunday morning during sacrament meeting.',
      'Please submit any outstanding reimbursement forms to the ward clerk before December 15th.'
    ],
    openingHymn: { number: 201, title: 'Joy to the World' },
    openingPrayer: 'Brother Samuel Peterson',
    wardBusiness: [
      { description: 'Sustain Sister Lopez as a primary worker.' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 187, title: 'Memories of Galilee' },
    speakers: [
      { name: 'Congregation members', topic: 'Bearing testimonies as moved by the Spirit', type: 'speaker' }
    ],
    closingHymn: { number: 202, title: 'Oh, Come, All Ye Faithful' },
    closingPrayer: 'Sister Elena Rostova'
  }
];

// Helper database functions to use inside your API routes or pages
export const meetingsDb = {
  getAll: () => mockMeetings,
  getById: (id: number) => mockMeetings.find(m => m.id === id),
  getByDate: (date: string) => mockMeetings.find(m => m.date === date)
};

