FROM node:lts-alpine AS builder

LABEL description="Docker container for building example-browser demo app"
LABEL maintainer="Iris Garcia <iris@lightstreams.io>"

ARG ssh_prv_key

RUN apk update && apk add openssh git ca-certificates bash python build-base && rm -rf /var/cache/apk/*

WORKDIR /srv

## Authorize SSH Host
RUN mkdir -p /root/.ssh && \
    chmod 0700 /root/.ssh && \
    ssh-keyscan github.com > /root/.ssh/known_hosts

# Add the keys and set permissions
RUN echo "-----BEGIN RSA PRIVATE KEY-----" > /root/.ssh/id_rsa && \
	echo "$ssh_prv_key" | sed -E -e 's/[[:blank:]]+/\n/g' >> /root/.ssh/id_rsa && \
	echo "-----END RSA PRIVATE KEY-----"  >> /root/.ssh/id_rsa && \
	chmod 600 /root/.ssh/id_rsa

RUN git config --global url."git@github.com:lightstreams-network".insteadOf "https://github.com/lightstreams-network"
RUN git clone -b master --single-branch git@github.com:lightstreams-network/example-browser.git /srv

RUN npm install
RUN npm run build

FROM httpd:2.4
COPY --from=builder /srv/build/ /usr/local/apache2/htdocs/
