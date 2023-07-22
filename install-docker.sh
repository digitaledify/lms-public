#!/usr/bin/env bash

# Instructions
# Execute this script as root user
# chmod +x install-docker.sh
# ./install-docker.sh

# Install Docker

curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Post-installation steps for Linux for rootless mode

########## BEGIN ##########
sudo sh -eux <<EOF
# Install newuidmap & newgidmap binaries
apt-get install -y uidmap
EOF
########## END ##########

dockerd-rootless-setuptool.sh install

echo "export PATH=/usr/bin:$PATH" >> ~/.bashrc
echo "export DOCKER_HOST=unix:///run/user/1000/docker.sock" >> ~/.bashrc

echo "Docker installed successfully"
