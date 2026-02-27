
-- Create forum messages table
CREATE TABLE IF NOT EXISTS public.forum_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_name TEXT NOT NULL,
    message_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable Realtime for this table
ALTER publication supabase_realtime ADD TABLE forum_messages;

-- Enable Row Level Security
ALTER TABLE public.forum_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous access for the demo (Adjust for production)
CREATE POLICY "Allow anon select forum" ON public.forum_messages FOR SELECT USING (true);
CREATE POLICY "Allow anon insert forum" ON public.forum_messages FOR INSERT WITH CHECK (true);
