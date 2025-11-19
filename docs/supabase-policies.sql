-- SQL to create hackathons table and RLS policies for Supabase

-- Create table
CREATE TABLE IF NOT EXISTS public.hackathons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  start_date timestamptz,
  end_date timestamptz,
  location text,
  prize text,
  image_url text,
  created_by uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Ensure RLS enabled
ALTER TABLE public.hackathons ENABLE ROW LEVEL SECURITY;

-- Public can SELECT
CREATE POLICY IF NOT EXISTS "Public can select hackathons"
ON public.hackathons
FOR SELECT
USING (true);

-- Users can INSERT only when created_by = auth.uid()
CREATE POLICY IF NOT EXISTS "Users can insert their own hackathon"
ON public.hackathons
FOR INSERT
TO public
WITH CHECK (auth.uid() = created_by);

-- Users can UPDATE their own hackathon
CREATE POLICY IF NOT EXISTS "Users can update own hackathon"
ON public.hackathons
FOR UPDATE
TO public
USING (auth.uid() = created_by)
WITH CHECK (auth.uid() = created_by);

-- Users can DELETE their own hackathon
CREATE POLICY IF NOT EXISTS "Users can delete own hackathon"
ON public.hackathons
FOR DELETE
TO public
USING (auth.uid() = created_by);
