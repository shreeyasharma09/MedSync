#!/bin/bash

# Prompt for UW username
read -p "Enter your UW username: " UW_USERNAME

# Check if STUDENT variable is set
if [ -z "$STUDENT" ]; then
  echo "❌ Error: STUDENT variable is not set. Export your private key first:"
  echo 'export STUDENT="$(cat path_to_your_private_key_file)"'
  exit 1
fi

# Step 1: Start SSH agent
echo "🔐 Starting ssh-agent..."
eval `ssh-agent`

# Step 2: Add key to agent
echo "🔑 Adding SSH key to agent..."
ssh-add - <<< "${STUDENT}"

# Step 3: SSH into server with port forwarding
echo "🌐 Connecting to mse-msci-245.uwaterloo.ca and forwarding MySQL port..."
ssh -o ServerAliveInterval=30 -L 3306:localhost:3306 "${UW_USERNAME}"@mse-msci-245.uwaterloo.ca
