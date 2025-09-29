-- WalkAboutSD Database Schema

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    location TEXT,
    interests TEXT[],
    walking_level TEXT CHECK (walking_level IN ('beginner', 'intermediate', 'advanced')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Neighborhoods table
CREATE TABLE public.neighborhoods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    long_description TEXT,
    highlights JSONB,
    location GEOGRAPHY(POINT, 4326),
    boundaries GEOGRAPHY(POLYGON, 4326),
    featured_image TEXT,
    images TEXT[],
    video_url TEXT,
    average_walk_time INTEGER, -- in minutes
    difficulty TEXT CHECK (difficulty IN ('easy', 'moderate', 'challenging')),
    best_time_to_visit TEXT,
    parking_info TEXT,
    public_transport TEXT,
    tags TEXT[],
    meta_title TEXT,
    meta_description TEXT,
    is_featured BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Walks/Routes table
CREATE TABLE public.walks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    neighborhood_id UUID REFERENCES neighborhoods(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    duration INTEGER, -- in minutes
    distance NUMERIC(5,2), -- in miles
    difficulty TEXT CHECK (difficulty IN ('easy', 'moderate', 'challenging')),
    route_type TEXT CHECK (route_type IN ('loop', 'out-and-back', 'one-way')),
    route_coordinates GEOGRAPHY(LINESTRING, 4326),
    elevation_gain INTEGER, -- in feet
    highlights TEXT[],
    points_of_interest JSONB,
    start_point GEOGRAPHY(POINT, 4326),
    end_point GEOGRAPHY(POINT, 4326),
    images TEXT[],
    tips TEXT[],
    is_premium BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Points of Interest table
CREATE TABLE public.points_of_interest (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    neighborhood_id UUID REFERENCES neighborhoods(id) ON DELETE CASCADE,
    walk_id UUID REFERENCES walks(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    location GEOGRAPHY(POINT, 4326),
    address TEXT,
    phone TEXT,
    website TEXT,
    hours JSONB,
    price_range TEXT CHECK (price_range IN ('$', '$$', '$$$', '$$$$')),
    rating NUMERIC(2,1),
    images TEXT[],
    tags TEXT[],
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- User Walks (saved/completed walks)
CREATE TABLE public.user_walks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    walk_id UUID REFERENCES walks(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('saved', 'in-progress', 'completed')),
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    photos TEXT[],
    distance_covered NUMERIC(5,2),
    time_taken INTEGER, -- in minutes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(user_id, walk_id)
);

-- Reviews table
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    neighborhood_id UUID REFERENCES neighborhoods(id) ON DELETE CASCADE,
    walk_id UUID REFERENCES walks(id) ON DELETE CASCADE,
    poi_id UUID REFERENCES points_of_interest(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    content TEXT,
    photos TEXT[],
    helpful_count INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    CHECK (
        (neighborhood_id IS NOT NULL AND walk_id IS NULL AND poi_id IS NULL) OR
        (neighborhood_id IS NULL AND walk_id IS NOT NULL AND poi_id IS NULL) OR
        (neighborhood_id IS NULL AND walk_id IS NULL AND poi_id IS NOT NULL)
    )
);

-- Newsletter Subscribers
CREATE TABLE public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    preferences JSONB,
    is_active BOOLEAN DEFAULT true,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Events table
CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    neighborhood_id UUID REFERENCES neighborhoods(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    event_date DATE,
    start_time TIME,
    end_time TIME,
    location TEXT,
    location_coordinates GEOGRAPHY(POINT, 4326),
    image_url TEXT,
    registration_url TEXT,
    price NUMERIC(10,2),
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    tags TEXT[],
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Photos Gallery
CREATE TABLE public.photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    neighborhood_id UUID REFERENCES neighborhoods(id) ON DELETE CASCADE,
    walk_id UUID REFERENCES walks(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    caption TEXT,
    tags TEXT[],
    likes_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Analytics Events
CREATE TABLE public.analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_id TEXT,
    event_type TEXT NOT NULL,
    event_data JSONB,
    page_url TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for better query performance
CREATE INDEX idx_neighborhoods_slug ON neighborhoods(slug);
CREATE INDEX idx_neighborhoods_featured ON neighborhoods(is_featured);
CREATE INDEX idx_walks_neighborhood ON walks(neighborhood_id);
CREATE INDEX idx_walks_slug ON walks(slug);
CREATE INDEX idx_poi_neighborhood ON points_of_interest(neighborhood_id);
CREATE INDEX idx_user_walks_user ON user_walks(user_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
CREATE INDEX idx_analytics_events_user ON analytics_events(user_id);
CREATE INDEX idx_analytics_events_session ON analytics_events(session_id);
CREATE INDEX idx_analytics_events_created ON analytics_events(created_at);

-- Create spatial indexes
CREATE INDEX idx_neighborhoods_location ON neighborhoods USING GIST(location);
CREATE INDEX idx_neighborhoods_boundaries ON neighborhoods USING GIST(boundaries);
CREATE INDEX idx_walks_route ON walks USING GIST(route_coordinates);
CREATE INDEX idx_poi_location ON points_of_interest USING GIST(location);

-- Row Level Security (RLS) Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE neighborhoods ENABLE ROW LEVEL SECURITY;
ALTER TABLE walks ENABLE ROW LEVEL SECURITY;
ALTER TABLE points_of_interest ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_walks ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Public read access for neighborhoods, walks, POIs, events
CREATE POLICY "Public can view neighborhoods" ON neighborhoods FOR SELECT USING (true);
CREATE POLICY "Public can view walks" ON walks FOR SELECT USING (true);
CREATE POLICY "Public can view POIs" ON points_of_interest FOR SELECT USING (true);
CREATE POLICY "Public can view events" ON events FOR SELECT USING (true);
CREATE POLICY "Public can view photos" ON photos FOR SELECT USING (true);

-- User profile policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- User walks policies
CREATE POLICY "Users can view own walks" ON user_walks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own walks" ON user_walks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own walks" ON user_walks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own walks" ON user_walks FOR DELETE USING (auth.uid() = user_id);

-- Review policies
CREATE POLICY "Public can view reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert own reviews" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own reviews" ON reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own reviews" ON reviews FOR DELETE USING (auth.uid() = user_id);

-- Create functions for updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_neighborhoods_updated_at BEFORE UPDATE ON neighborhoods
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_walks_updated_at BEFORE UPDATE ON walks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_points_of_interest_updated_at BEFORE UPDATE ON points_of_interest
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_walks_updated_at BEFORE UPDATE ON user_walks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();