#!/bin/bash

# Check if Docker is running
docker info > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "Docker is not running. Attempting to start Docker..."

  # Check if on Mac
  if [ "$(uname)" == "Darwin" ]; then
    # Try to start Docker Desktop on Mac
    echo "Starting Docker Desktop..."
    open -a Docker

    # Wait for Docker to start (up to 30 seconds)
    count=0
    while ! docker info > /dev/null 2>&1; do
      if [ $count -ge 30 ]; then
        echo "Docker did not start in time. Please start Docker Desktop manually and try again."
        exit 1
      fi
      echo "Waiting for Docker to start... ($count/30)"
      sleep 1
      count=$((count + 1))
    done

    echo "Docker has started successfully!"
  else
    echo "Please start Docker manually and try again."
    exit 1
  fi
fi

echo "Docker is running. Setting up the database..."

# Start PostgreSQL container
docker compose up -d

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
sleep 5

# Run migrations
echo "Running database migrations..."
npx drizzle-kit push:pg

# Seed the database
echo "Seeding the database..."
npm run seed

# Start the app
echo "Starting the application..."
npm run dev
