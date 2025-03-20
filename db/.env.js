"use strict";

// Load environment variables from .env files
require("dotenv").config();

// Set the DATABASE_URL environment variable if not already set
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL =
    "postgres://postgres:postgres@localhost:5433/solaceassignment";
}

module.exports = {
  getDatabaseUrl: () => process.env.DATABASE_URL,
};
