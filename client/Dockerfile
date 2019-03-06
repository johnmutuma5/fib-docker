FROM node:alpine as builder

ENV appDir=/app
WORKDIR $appDir

COPY ./package.json ${appDir}/package.json
RUN npm install
COPY . .

RUN npm run build

FROM nginx
EXPOSE 3000
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
