FROM ubuntu

RUN sudo apt-get update
RUN sudo apt-get install nodejs
RUN sudo apt-get install npm
RUN npm install -g pm2@latest

RUN echo "Hello docker"

CMD ["/start"]