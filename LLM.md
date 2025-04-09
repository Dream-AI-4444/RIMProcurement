# Kratom Wholesale Platform - Developer Guide

This document provides detailed information for developers working on the Kratom Wholesale Platform.

## 🌿 Project Overview

The Kratom Wholesale Platform connects wholesale buyers with suppliers in the United States. It features an interactive quiz that collects business requirements and provides personalized product recommendations.

## 🏗️ Architecture

This project follows a modern full-stack architecture:

- **Frontend**: React + TypeScript + Tailwind CSS + Shadcn UI
- **Backend**: Node.js + Express
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js
- **Deployment**: Docker + Docker Compose

## 🛠️ Development Notes

### 2025-04-09 Database Health Check Fix

**Issue**: The health check endpoint was failing with `TypeError: (void 0) is not a function` in the `checkDatabaseHealth` function. 

**Root Cause**: The function was trying to use `schema.sql` which doesn't exist. The `sql` template tag should be imported directly from drizzle-orm.

**Solution**: 
1. Added import for `sql` from drizzle-orm: `import { sql } from "drizzle-orm";`
2. Changed `db.execute(schema.sql\`SELECT 1\`)` to `db.execute(sql\`SELECT 1\`)`

**Impact**: This fixes the database health check, ensuring the `/health` endpoint returns proper status codes for monitoring systems.
