-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.quiz_results (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  personality_id text NOT NULL CHECK (personality_id = ANY (ARRAY['salmon-nigiri'::text, 'spicy-tuna'::text, 'avocado-maki'::text, 'california-roll'::text, 'unagi'::text, 'tamago'::text, 'shrimp-tempura'::text, 'katsu-curry'::text, 'takoyaki'::text, 'wasabi'::text, 'matcha-latte'::text, 'matcha-tiramisu'::text, 'mochi'::text, 'dorayaki'::text, 'plain-white-rice'::text, 'ramen'::text, 'spicy-salmon'::text, 'bicep-sushi'::text, 'dynamite-roll'::text, 'extra-spicy-curry'::text, 'karaage'::text, 'pickled-ginger'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT quiz_results_pkey PRIMARY KEY (id)
);
CREATE TABLE public.sushi_confessions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  personality_id text NOT NULL,
  comment text NOT NULL CHECK (char_length(comment) >= 1 AND char_length(comment) <= 300),
  status text NOT NULL DEFAULT 'approved'::text CHECK (status = ANY (ARRAY['pending'::text, 'approved'::text, 'rejected'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  visitor_id uuid,
  CONSTRAINT sushi_confessions_pkey PRIMARY KEY (id)
);
CREATE TABLE public.sushi_reactions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  confession_id uuid NOT NULL,
  visitor_id uuid NOT NULL,
  reaction text NOT NULL CHECK (reaction = ANY (ARRAY['🍣'::text, '🔥'::text, '💀'::text])),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT sushi_reactions_pkey PRIMARY KEY (id),
  CONSTRAINT sushi_reactions_confession_id_fkey FOREIGN KEY (confession_id) REFERENCES public.sushi_confessions(id)
);
CREATE TABLE public.sushi_replies (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  confession_id uuid NOT NULL,
  personality_id text NOT NULL,
  comment text NOT NULL CHECK (char_length(comment) >= 1 AND char_length(comment) <= 300),
  visitor_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT sushi_replies_pkey PRIMARY KEY (id),
  CONSTRAINT sushi_replies_confession_id_fkey FOREIGN KEY (confession_id) REFERENCES public.sushi_confessions(id)
);