
echo "Deployment started."

cd ~/lms-public

git pull

# Frontend

cd ~/lms-public/webapp

npm install

npm run build

sudo nginx -s reload

# Backend

cd ~/lms-public/api

npm install

npm run build

npm run migrate

npm run restart

echo "Depmployment done."