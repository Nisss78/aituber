/*
  # Initial Schema Setup for AItuber Platform

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `avatar_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `vtubers`
      - `id` (uuid, primary key)
      - `name` (text)
      - `avatar_emoji` (text)
      - `description` (text)
      - `category` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `owner_id` (uuid, references profiles)

    - `streams`
      - `id` (uuid, primary key)
      - `vtuber_id` (uuid, references vtubers)
      - `title` (text)
      - `status` (text)
      - `viewer_count` (integer)
      - `started_at` (timestamp)
      - `ended_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `chat_messages`
      - `id` (uuid, primary key)
      - `stream_id` (uuid, references streams)
      - `user_id` (uuid, references profiles)
      - `message` (text)
      - `type` (text)
      - `amount` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create vtubers table
CREATE TABLE IF NOT EXISTS vtubers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  avatar_emoji text,
  description text,
  category text,
  owner_id uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create streams table
CREATE TABLE IF NOT EXISTS streams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vtuber_id uuid REFERENCES vtubers(id),
  title text NOT NULL,
  status text NOT NULL,
  viewer_count integer DEFAULT 0,
  started_at timestamptz,
  ended_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stream_id uuid REFERENCES streams(id),
  user_id uuid REFERENCES profiles(id),
  message text NOT NULL,
  type text NOT NULL,
  amount integer,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vtubers ENABLE ROW LEVEL SECURITY;
ALTER TABLE streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create policies for vtubers
CREATE POLICY "VTubers are viewable by everyone"
  ON vtubers FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own VTubers"
  ON vtubers FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own VTubers"
  ON vtubers FOR UPDATE
  USING (auth.uid() = owner_id);

-- Create policies for streams
CREATE POLICY "Streams are viewable by everyone"
  ON streams FOR SELECT
  USING (true);

CREATE POLICY "VTuber owners can manage streams"
  ON streams FOR ALL
  USING (
    auth.uid() IN (
      SELECT owner_id FROM vtubers WHERE id = vtuber_id
    )
  );

-- Create policies for chat messages
CREATE POLICY "Chat messages are viewable by everyone"
  ON chat_messages FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can send chat messages"
  ON chat_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);