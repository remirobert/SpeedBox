FROM ubuntu
MAINTAINER Rémi ROBERT

RUN apt-get update
RUN apt-get install --yes nodejs
RUN apt-get install --yes nodejs-legacy
RUN apt-get install --yes npm
RUN apt-get install --yes curl
RUN npm install -g install pm2 --verbose
RUN curl https://install.meteor.com/ | sh

CMD "ls" "/usr/bin"
