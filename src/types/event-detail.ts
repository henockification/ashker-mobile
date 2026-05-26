/** Placeholder / future API shapes for event detail landing content. */

export type EventSpeaker = {
  id: string;
  name: string;
  title: string;
  company: string;
  topic: string;
  initials: string;
};

export type EventSession = {
  id: string;
  title: string;
  track: string;
  startTime: string;
  endTime: string;
  room: string;
  speakerName: string;
};

export type EventSponsorTier = 'platinum' | 'gold' | 'silver' | 'partner';

export type EventSponsor = {
  id: string;
  name: string;
  tier: EventSponsorTier;
  initials: string;
};

export type EventDetailContent = {
  speakers: EventSpeaker[];
  sessions: EventSession[];
  sponsors: EventSponsor[];
};
