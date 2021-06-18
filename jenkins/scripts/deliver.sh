-#!/bin/sh     
docker exec -it node-server bash <<EOF       
 cd /app/nodejs-typescript 
 git pull      
 npm install
 npm start
 exit      
EOF