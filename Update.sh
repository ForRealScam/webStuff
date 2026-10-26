#!/bin/bash
set -euo pipefail

# Repository and service configuration.
REPO_URL="https://github.com/ForRealScam/webStuff.git"
BRANCH="main"
REPO="/root/Websitas/site"
SERVICE="myapp.service"

# First run: set up the repo if it isn't one yet.
if [ ! -d "$REPO/.git" ]; then
    if [ -d "$REPO" ] && [ -n "$(ls -A "$REPO")" ]; then
        echo "==> $REPO exists without git; linking it to $REPO_URL..."
        git -C "$REPO" init
        git -C "$REPO" remote add origin "$REPO_URL"
    else
        echo "==> Cloning $REPO_URL into $REPO..."
        mkdir -p "$(dirname "$REPO")"
        git clone --branch "$BRANCH" "$REPO_URL" "$REPO"
    fi
fi

cd "$REPO"

# Make sure origin points at the GitHub repo.
git remote set-url origin "$REPO_URL"

echo "==> Updating repository..."
git fetch origin "$BRANCH"
git checkout -f -B "$BRANCH" "origin/$BRANCH"
git reset --hard "origin/$BRANCH"
echo "    Now at: $(git log -1 --format='%h %s (%cr)')"


cd ./site
echo "==> Installing dependencies..."
npm ci

echo "==> Building frontend..."
npm run build

echo "==> Restarting service..."
sudo systemctl restart "$SERVICE"

sleep 3

echo "==> Service status..."
sudo systemctl --no-pager --full status "$SERVICE"

echo "==> Recent logs..."
sudo journalctl -u "$SERVICE" -n 20 --no-pager