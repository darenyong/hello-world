#!/bin/bash

# clean out old containers and images before build
docker stop my-hello
docker rm -v -f my-hello
docker rmi my-hello:1.0.0

VERSION="1.0.0"
tag="my-hello:${VERSION}"
docker build -t ${tag} .
