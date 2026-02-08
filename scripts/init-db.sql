-- Database initialization script for CyberSecure Africa
-- This script runs on first database creation

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Grant necessary permissions
GRANT ALL PRIVILEGES ON DATABASE cybersecure TO cyberuser;

-- Create indexes for better performance (tables will be created by SQLAlchemy)
-- These will be created after the application starts
