# deploy using docker compose

cd ~/app/lms-public

git pull

if curl http://localhost; then
  docker compose down
fi

docker-compose build --no-cache

echo "Deployment done!"
