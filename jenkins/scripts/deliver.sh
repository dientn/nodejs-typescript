-#!/bin/sh     
docker exec -it node-server bash <<EOF       
 cd /app/nodejs-typescript 
 git pull      
 npm install
 pm2 reload ecosystem.config.js
 exit      
EOF