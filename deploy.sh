# deploy using docker compose

cd ~/app/lms-public

git pull

if curl http://localhost; then
  docker compose down
fi

docker compose up -d --build "api-server" "web-server"

echo "Deployment done!"
