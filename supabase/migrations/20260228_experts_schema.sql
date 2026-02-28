
-- Create experts table
CREATE TABLE IF NOT EXISTS public.experts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    expertise TEXT[] NOT NULL,
    bio TEXT,
    availability TEXT,
    avatar TEXT,
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Realtime
ALTER publication supabase_realtime ADD TABLE experts;

-- Enable RLS
ALTER TABLE public.experts ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Experts are viewable by everyone" ON public.experts
    FOR SELECT USING (true);

-- Allow public insert (application)
CREATE POLICY "Anyone can apply as an expert" ON public.experts
    FOR INSERT WITH CHECK (true);

-- Insert initial mock data if table is empty (Optional, but helps for demo)
INSERT INTO public.experts (name, role, expertise, bio, availability, avatar)
SELECT 'Dr. Sarah Chen', 'Growth Strategist', ARRAY['SaaS', 'Market Dynamics', 'PLG'], 'Ex-Google Head of Strategy. Specializes in scaling mid-market startups to IPO.', '2 slots left this week', 'https://picsum.photos/seed/sarah/100/100'
WHERE NOT EXISTS (SELECT 1 FROM public.experts WHERE name = 'Dr. Sarah Chen');

INSERT INTO public.experts (name, role, expertise, bio, availability, avatar)
SELECT 'Marcus Thorne', 'Risk Analyst', ARRAY['Fintech', 'Legal Compliance', 'Security'], 'Renowned auditor for tier-1 VCs. Finds the risks that bury unicorns.', 'Waitlist: 4 days', 'https://picsum.photos/seed/marcus/100/100'
WHERE NOT EXISTS (SELECT 1 FROM public.experts WHERE name = 'Marcus Thorne');

INSERT INTO public.experts (name, role, expertise, bio, availability, avatar)
SELECT 'Elena Volkov', 'UX Intelligence', ARRAY['Behavioral Design', 'Retention', 'A/B Testing'], 'Behavioral psychologist turned product wizard. Fixes churn in 48 hours.', 'Available now', 'https://picsum.photos/seed/elena/100/100'
WHERE NOT EXISTS (SELECT 1 FROM public.experts WHERE name = 'Elena Volkov');
