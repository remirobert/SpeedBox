FROM ubuntu
MAINTAINER Rémi ROBERT

RUN apt-get update
RUN apt-get install --yes nodejs
RUN apt-get install --yes nodejs-legacy
RUN apt-get install --yes npm
RUN npm install -g install pm2 --verbose

CMD "run" "server"

ENTRYPOINT usr/bin/node
