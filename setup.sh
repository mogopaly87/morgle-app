#!/bin/bash
sudo apt update
sudo apt-get install nodejs
sudo apt install npm
cd ~/morgle-app/front-end
npm install
npm run build
mv build/ ~/morgle-app/back-end

cd ~/morgle-app/back-end
npm install
node src/server.js