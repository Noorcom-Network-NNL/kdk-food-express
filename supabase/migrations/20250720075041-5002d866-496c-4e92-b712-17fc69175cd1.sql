-- Create an admin user profile
-- First, you need to create a user in Supabase Auth, then use their user_id here
-- Replace 'YOUR_USER_ID_HERE' with the actual user ID from Supabase Auth

-- Example: If you created a user with email admin@kumidoner.com, 
-- get their user_id from the Auth > Users section in Supabase dashboard
-- Then run this insert:

INSERT INTO admin_profiles (user_id, name, email, role, is_active)
VALUES (
  'YOUR_USER_ID_HERE', -- Replace with actual user ID
  'KDK Admin',
  'admin@kumidoner.com', -- Replace with the email you used
  'admin',
  true
);

-- Alternative: If you want to make ANY authenticated user an admin (for testing):
-- INSERT INTO admin_profiles (user_id, name, email, role, is_active)
-- SELECT id, 'Admin User', email, 'admin', true 
-- FROM auth.users 
-- WHERE email = 'your-email@example.com';