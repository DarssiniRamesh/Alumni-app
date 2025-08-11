#!/bin/bash
cd /home/kavia/workspace/code-generation/alumni-connect-platform-154944/alumni_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

