FROM node:20-alpine
WORKDIR /opt/app
RUN apk update && apk upgrade --no-cache

RUN addgroup --gid 10000 --system acecam \
    && adduser --uid 10000 --disabled-password --no-create-home --shell /bin/false --ingroup acecam acecam

RUN npm install -g serve
COPY dist/ .
USER acecam
ENTRYPOINT ["serve","-p","8080","-s","/opt/app"]