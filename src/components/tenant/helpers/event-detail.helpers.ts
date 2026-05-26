import type { EventDetailContent } from '@/src/types/event-detail';
import type { TenantEvent } from '@/src/types/tenant-events';

/**
 * Placeholder conference content keyed to the event.
 * Replace with API response mapped to `EventDetailContent` when available.
 */
export const getEventDetailContent = (event: TenantEvent): EventDetailContent => {
  const name = event.eventName;

  return {
    speakers: [
      {
        id: `${event.id}-sp-1`,
        name: 'Dr. Amara Okafor',
        title: 'Chief Innovation Officer',
        company: 'Northline Labs',
        topic: `Opening keynote · ${name}`,
        initials: 'AO',
      },
      {
        id: `${event.id}-sp-2`,
        name: 'James Chen',
        title: 'VP Product',
        company: 'Summit Ventures',
        topic: 'Building resilient event experiences',
        initials: 'JC',
      },
      {
        id: `${event.id}-sp-3`,
        name: 'Elena Vasquez',
        title: 'Head of Partnerships',
        company: 'Atlas Media Group',
        topic: 'Sponsor-led growth strategies',
        initials: 'EV',
      },
      {
        id: `${event.id}-sp-4`,
        name: 'Marcus Reid',
        title: 'Director of Engineering',
        company: 'Cloudframe',
        topic: 'Live production at scale',
        initials: 'MR',
      },
    ],
    sessions: [
      {
        id: `${event.id}-ses-1`,
        title: 'Registration & networking breakfast',
        track: 'General',
        startTime: '08:00',
        endTime: '09:00',
        room: 'Main foyer',
        speakerName: 'Event team',
      },
      {
        id: `${event.id}-ses-2`,
        title: `Welcome to ${name}`,
        track: 'Keynote',
        startTime: '09:00',
        endTime: '09:45',
        room: 'Grand hall',
        speakerName: 'Dr. Amara Okafor',
      },
      {
        id: `${event.id}-ses-3`,
        title: 'Panel: The future of hybrid events',
        track: 'Strategy',
        startTime: '10:00',
        endTime: '11:00',
        room: 'Room A',
        speakerName: 'James Chen · Elena Vasquez',
      },
      {
        id: `${event.id}-ses-4`,
        title: 'Technical deep dive: streaming & engagement',
        track: 'Technology',
        startTime: '11:15',
        endTime: '12:15',
        room: 'Room B',
        speakerName: 'Marcus Reid',
      },
      {
        id: `${event.id}-ses-5`,
        title: 'Closing remarks & sponsor showcase',
        track: 'General',
        startTime: '16:00',
        endTime: '17:00',
        room: 'Expo hall',
        speakerName: 'Event team',
      },
    ],
    sponsors: [
      { id: `${event.id}-s-1`, name: 'Ashker Events', tier: 'platinum', initials: 'AE' },
      { id: `${event.id}-s-2`, name: 'Northline Labs', tier: 'gold', initials: 'NL' },
      { id: `${event.id}-s-3`, name: 'Summit Ventures', tier: 'gold', initials: 'SV' },
      { id: `${event.id}-s-4`, name: 'Cloudframe', tier: 'silver', initials: 'CF' },
      { id: `${event.id}-s-5`, name: 'Atlas Media', tier: 'silver', initials: 'AM' },
      { id: `${event.id}-s-6`, name: 'Partner Network', tier: 'partner', initials: 'PN' },
    ],
  };
};
