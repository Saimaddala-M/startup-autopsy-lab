
import { Expert } from "../types";

export const MOCK_EXPERTS: Expert[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    role: 'Growth Strategist',
    expertise: ['SaaS', 'Market Dynamics', 'PLG'],
    bio: 'Ex-Google Head of Strategy. Specializes in scaling mid-market startups to IPO.',
    availability: '2 slots left this week',
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    id: '2',
    name: 'Marcus Thorne',
    role: 'Risk Analyst',
    expertise: ['Fintech', 'Legal Compliance', 'Security'],
    bio: 'Renowned auditor for tier-1 VCs. Finds the risks that bury unicorns.',
    availability: 'Waitlist: 4 days',
    avatar: 'https://picsum.photos/seed/marcus/100/100'
  },
  {
    id: '3',
    name: 'Elena Volkov',
    role: 'UX Intelligence',
    expertise: ['Behavioral Design', 'Retention', 'A/B Testing'],
    bio: 'Behavioral psychologist turned product wizard. Fixes churn in 48 hours.',
    availability: 'Available now',
    avatar: 'https://picsum.photos/seed/elena/100/100'
  }
];
