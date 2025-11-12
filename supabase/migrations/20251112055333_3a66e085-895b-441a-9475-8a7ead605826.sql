-- Add file attachments support to messages
ALTER TABLE public.messages ADD COLUMN attachments JSONB DEFAULT '[]'::jsonb;

-- Add pinned and reactions support
ALTER TABLE public.messages ADD COLUMN is_pinned BOOLEAN DEFAULT false;
ALTER TABLE public.messages ADD COLUMN reactions JSONB DEFAULT '{}'::jsonb;

-- Create storage bucket for chat files
INSERT INTO storage.buckets (id, name, public)
VALUES ('chat-files', 'chat-files', false);

-- RLS policies for chat-files bucket
CREATE POLICY "Users can view files in their conversations"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'chat-files' AND
    EXISTS (
      SELECT 1 FROM public.messages m
      JOIN public.conversation_participants cp ON cp.conversation_id = m.conversation_id
      WHERE m.attachments::text LIKE '%' || storage.objects.name || '%'
      AND cp.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can upload files to their conversations"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'chat-files' AND
    auth.uid() IS NOT NULL
  );

CREATE POLICY "Users can delete their own uploaded files"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'chat-files' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Create index for full-text search on messages
CREATE INDEX idx_messages_content_search ON public.messages USING gin(to_tsvector('english', content));

-- Function to search messages across conversations
CREATE OR REPLACE FUNCTION public.search_messages(
  search_query TEXT,
  conversation_filter UUID DEFAULT NULL,
  date_from TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  date_to TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  sender_role_filter TEXT DEFAULT NULL
)
RETURNS TABLE (
  message_id UUID,
  conversation_id UUID,
  sender_id UUID,
  sender_role TEXT,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  attachments JSONB,
  is_pinned BOOLEAN,
  reactions JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    m.id,
    m.conversation_id,
    m.sender_id,
    m.sender_role,
    m.content,
    m.created_at,
    m.attachments,
    m.is_pinned,
    m.reactions
  FROM public.messages m
  JOIN public.conversation_participants cp ON cp.conversation_id = m.conversation_id
  WHERE 
    cp.user_id = auth.uid()
    AND (
      search_query IS NULL OR search_query = '' OR
      to_tsvector('english', m.content) @@ plainto_tsquery('english', search_query)
    )
    AND (conversation_filter IS NULL OR m.conversation_id = conversation_filter)
    AND (date_from IS NULL OR m.created_at >= date_from)
    AND (date_to IS NULL OR m.created_at <= date_to)
    AND (sender_role_filter IS NULL OR m.sender_role = sender_role_filter)
  ORDER BY m.created_at DESC
  LIMIT 100;
END;
$$;