#!/bin/bash

# Remove all unused containers, networks, images (both dangling and unreferenced), and volumes.
docker system prune -f -a --volumes

# Remove all containers and named volumes
docker rm -f -v $(docker ps -aq)

# Remove all images
docker rmi $(docker images -a -q)

# Remove all named volumes
docker volume rm $(docker volume ls -q)