-- Seed data for WalkAboutSD

-- Insert sample neighborhoods
INSERT INTO public.neighborhoods (slug, name, description, long_description, difficulty, average_walk_time, is_featured) VALUES
('la-jolla', 'La Jolla', 'Stunning coastal views and upscale charm', 'La Jolla, known as the "Jewel" of San Diego, offers breathtaking ocean vistas, pristine beaches, and world-class dining. This upscale coastal community features the famous La Jolla Cove, Torrey Pines State Natural Reserve, and numerous art galleries.', 'moderate', 90, true),
('gaslamp-quarter', 'Gaslamp Quarter', 'Historic heart with Victorian-era buildings', 'The Gaslamp Quarter is San Diego''s premier entertainment district, featuring Victorian-era buildings, trendy restaurants, rooftop bars, and vibrant nightlife. This 16-block historic neighborhood is perfect for both day and evening walks.', 'easy', 60, true),
('balboa-park', 'Balboa Park', 'Cultural heart with museums and gardens', 'Balboa Park is one of the largest urban cultural parks in North America, featuring 17 museums, beautiful gardens, the San Diego Zoo, and stunning Spanish architecture. Perfect for culture enthusiasts and nature lovers alike.', 'easy', 120, true),
('little-italy', 'Little Italy', 'Authentic Italian culture and cuisine', 'Little Italy is a vibrant neighborhood known for its authentic Italian restaurants, weekly farmers market, and waterfront location. The area features charming piazzas, boutique shops, and the beautiful Waterfront Park.', 'easy', 45, true),
('coronado', 'Coronado', 'Island paradise with pristine beaches', 'Coronado Island offers a perfect blend of small-town charm and resort luxury. Home to the iconic Hotel del Coronado, pristine beaches, and charming Orange Avenue, this island community is accessible via the stunning Coronado Bridge.', 'easy', 75, true);

-- Insert sample walks for La Jolla
INSERT INTO public.walks (neighborhood_id, slug, name, description, duration, distance, difficulty, route_type, is_featured) VALUES
((SELECT id FROM neighborhoods WHERE slug = 'la-jolla'), 'la-jolla-cove-trail', 'La Jolla Cove Trail', 'Scenic coastal walk along the cliffs with sea lion viewing spots', 45, 1.5, 'easy', 'loop', true),
((SELECT id FROM neighborhoods WHERE slug = 'la-jolla'), 'torrey-pines-loop', 'Torrey Pines State Reserve Loop', 'Breathtaking cliff-side trails with rare Torrey Pine trees', 90, 3.2, 'moderate', 'loop', true),
((SELECT id FROM neighborhoods WHERE slug = 'la-jolla'), 'la-jolla-shores-walk', 'La Jolla Shores Beach Walk', 'Family-friendly beach walk with tide pools and gentle waves', 30, 1.0, 'easy', 'out-and-back', false);

-- Insert sample walks for Gaslamp Quarter
INSERT INTO public.walks (neighborhood_id, slug, name, description, duration, distance, difficulty, route_type, is_featured) VALUES
((SELECT id FROM neighborhoods WHERE slug = 'gaslamp-quarter'), 'historic-gaslamp-tour', 'Historic Gaslamp Tour', 'Walk through Victorian-era architecture and historic landmarks', 60, 2.0, 'easy', 'loop', true),
((SELECT id FROM neighborhoods WHERE slug = 'gaslamp-quarter'), 'gaslamp-food-tour', 'Gaslamp Food & Drink Tour', 'Culinary journey through the best restaurants and bars', 120, 1.8, 'easy', 'loop', false);

-- Insert sample points of interest for La Jolla
INSERT INTO public.points_of_interest (neighborhood_id, name, type, description, price_range, rating, is_featured) VALUES
((SELECT id FROM neighborhoods WHERE slug = 'la-jolla'), 'La Jolla Cove', 'Natural Attraction', 'Protected marine reserve perfect for snorkeling and sea lion watching', NULL, 4.8, true),
((SELECT id FROM neighborhoods WHERE slug = 'la-jolla'), 'The Cave Store', 'Attraction', 'Historic shop with tunnel access to Sunny Jim Sea Cave', '$', 4.5, true),
((SELECT id FROM neighborhoods WHERE slug = 'la-jolla'), 'George''s at the Cove', 'Restaurant', 'Award-winning restaurant with ocean views', '$$$', 4.7, true),
((SELECT id FROM neighborhoods WHERE slug = 'la-jolla'), 'Birch Aquarium', 'Museum', 'Interactive marine science aquarium', '$$', 4.6, true);

-- Insert sample points of interest for Gaslamp Quarter
INSERT INTO public.points_of_interest (neighborhood_id, name, type, description, price_range, rating, is_featured) VALUES
((SELECT id FROM neighborhoods WHERE slug = 'gaslamp-quarter'), 'Gaslamp Museum', 'Museum', 'Historic Davis-Horton House showcasing San Diego history', '$', 4.3, true),
((SELECT id FROM neighborhoods WHERE slug = 'gaslamp-quarter'), 'Petco Park', 'Stadium', 'Home of the San Diego Padres baseball team', '$$', 4.6, true),
((SELECT id FROM neighborhoods WHERE slug = 'gaslamp-quarter'), 'The Tin Fish', 'Restaurant', 'Casual seafood spot with harbor views', '$$', 4.4, false);

-- Insert sample events
INSERT INTO public.events (neighborhood_id, title, description, event_date, start_time, end_time, location, price, max_participants) VALUES
((SELECT id FROM neighborhoods WHERE slug = 'la-jolla'), 'La Jolla Art Walk', 'Annual celebration of local artists and galleries', '2024-10-15', '10:00:00', '18:00:00', 'Prospect Street', 0, NULL),
((SELECT id FROM neighborhoods WHERE slug = 'gaslamp-quarter'), 'Gaslamp Quarter Food & Wine Festival', 'Culinary showcase featuring local restaurants', '2024-11-02', '12:00:00', '21:00:00', 'Fifth Avenue', 75.00, 500),
((SELECT id FROM neighborhoods WHERE slug = 'little-italy'), 'Little Italy Mercato', 'Weekly farmers market and street fair', '2024-10-05', '08:00:00', '14:00:00', 'Date Street', 0, NULL);

-- Insert sample newsletter subscribers (with hashed emails for privacy)
INSERT INTO public.newsletter_subscribers (email, name, is_active) VALUES
('demo1@example.com', 'Demo User 1', true),
('demo2@example.com', 'Demo User 2', true),
('demo3@example.com', 'Demo User 3', false);