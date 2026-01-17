#!/bin/bash
# Script to connect to Neon PostgreSQL database

# Method 1: Using PGPASSWORD environment variable
export PGPASSWORD="npg_DtCJi70NMZob"
psql -h ep-young-wildflower-ah6j0ug0-pooler.c-3.us-east-1.aws.neon.tech -p 5432 -U neondb_owner -d neondb -c "SELECT version();"

# Method 2: Using connection string with endpoint option
# psql 'postgresql://neondb_owner:npg_DtCJi70NMZob@ep-young-wildflower-ah6j0ug0-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&options=endpoint%3Dep-young-wildflower-ah6j0ug0' -c "SELECT version();"

# Method 3: Using .pgpass file (for persistent connections)
# Create a .pgpass file with content like:
# hostname:port:database:username:password
# For example: echo "ep-young-wildflower-ah6j0ug0-pooler.c-3.us-east-1.aws.neon.tech:5432:neondb:neondb_owner:npg_DtCJi70NMZob" >> ~/.pgpass
# Then: chmod 600 ~/.pgpass