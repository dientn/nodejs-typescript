FROM node:14

## for Use SSH 
# COPY ./entrypoint/docker-entrypoint.sh /entrypoint/docker-entrypoint.sh
# RUN chmod +x /entrypoint

RUN apt-get update
# RUN apt-get -y install ssh 
# RUN apt-get install -y openssh-server
# RUN service ssh start
# RUN echo 'root:Docker' | chpasswd
WORKDIR /app

RUN npm install pm2 -g

RUN git clone https://github.com/dientn/nodejs-typescript.git /app

RUN npm install --production

RUN cp .env.example .env
## for Use SSH 
# ENTRYPOINT ["sh", "/entrypoint/docker-entrypoint.sh"]

# THIS PART WILL BE REPLACED IF YOU PASS SOME OTHER COMMAND TO docker RUN
# CMD cd /app/nodejs-typescript & npm start
CMD while true; do echo "default arg" && sleep 1; done

VOLUME ["/app"]

EXPOSE 3000