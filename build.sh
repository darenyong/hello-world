#!/bin/bash
VERSION="1.0.0"
tag="my-hello:${VERSION}"
docker build -t ${tag}
