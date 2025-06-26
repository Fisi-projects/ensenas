#!/bin/bash

echo "🔐 Decoding google-services.json from env"

mkdir -p android/app
echo "$GOOGLE_SERVICES_JSON" | base64 -d > android/app/google-services.json

echo "✅ google-services.json written to android/app/"
