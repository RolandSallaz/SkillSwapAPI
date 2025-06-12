DOCKER := docker-compose
ENV := --env-file .env.example # это нужно менять если требуется
FILES := --file docker-compose.yml

FLAGS := ${ENV} ${FILES}
IMAGES := $(shell ${DOCKER} ${FLAGS} images -q)

INIT_DIR_CMD := $(shell [ -d ./docker/volumes ] || mkdir -p ./docker/volumes)

init-dir: 
	${INIT_DIR_CMD}
	
docker-up:
	${INIT_DIR_CMD}
	${DOCKER} ${FLAGS} up -d
docker-up-build:
	${INIT_DIR_CMD}
	${DOCKER} ${FLAGS} up -d --build

docker-down:
	${DOCKER} ${FLAGS} down -v
docker-rmi:
	-${DOCKER} ${FLAGS} down -v
	-docker rmi -f ${IMAGES}

docker-stop:
	-docker stop $(shell docker ps -a -q)
	-docker rm $(shell docker ps -a -q)
docker-clear:
	-docker stop $(shell docker ps -a -q)
	-docker rm $(shell docker ps -a -q)
	-docker rmi -f $(shell docker images -aq)
	-docker volume rm $(shell docker volume ls -q)