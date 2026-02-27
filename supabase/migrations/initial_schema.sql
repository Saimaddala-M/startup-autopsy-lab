
-- Create tables for Startup Autopsy Lab

-- 1. Analysis Results
CREATE TABLE IF NOT EXISTS public.analysis_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    startup_name TEXT,
    input_data JSONB,
    result_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Spy Reports
CREATE TABLE IF NOT EXISTS public.spy_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT,
    result_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS (Optional for security)
ALTER TABLE public.analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spy_reports ENABLE ROW LEVEL SECURITY;

-- Allow anonymous access (Adjust as needed for production)
CREATE POLICY "Allow anon select" ON public.analysis_results FOR SELECT USING (true);
CREATE POLICY "Allow anon insert" ON public.analysis_results FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anon select spy" ON public.spy_reports FOR SELECT USING (true);
CREATE POLICY "Allow anon insert spy" ON public.spy_reports FOR INSERT WITH CHECK (true);
