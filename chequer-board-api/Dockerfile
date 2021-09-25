FROM node:lts 
WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build:prod

EXPOSE 4500

ENTRYPOINT [ "yarn", "start:prod" ]
