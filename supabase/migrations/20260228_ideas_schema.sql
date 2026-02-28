
-- Create ideas table for Public Forum
CREATE TABLE IF NOT EXISTS public.startup_ideas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    summary TEXT NOT NULL,
    upvotes INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    user_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Realtime
ALTER publication supabase_realtime ADD TABLE startup_ideas;

-- Enable RLS
ALTER TABLE public.startup_ideas ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Ideas are viewable by everyone" ON public.startup_ideas
    FOR SELECT USING (true);

-- Allow public insert
CREATE POLICY "Anyone can post an idea" ON public.startup_ideas
    FOR INSERT WITH CHECK (true);

-- Mock Data
INSERT INTO public.startup_ideas (name, summary, upvotes, comments_count, user_name)
VALUES ('NexusFlow', 'AI-driven liquidity management for cross-border B2B payments.', 124, 18, 'FintechFounder');

INSERT INTO public.startup_ideas (name, summary, upvotes, comments_count, user_name)
VALUES ('Solaris', 'Decentralized grid management for residential solar clusters.', 89, 12, 'EcoTech');

INSERT INTO public.startup_ideas (name, summary, upvotes, comments_count, user_name)
VALUES ('BioSync', 'Real-time metabolic tracking via non-invasive dermal sensors.', 210, 45, 'BioHacker');
