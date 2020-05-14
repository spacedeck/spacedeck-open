#!/bin/bash
DATABASE_PATH="/app/database/database.sqlite"

if [ ! -f "$DATABASE_PATH" ]; then
  touch $DATABASE_PATH
fi

node spacedeck.js
