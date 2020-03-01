# MVP API 

## Environment

Copy the file `.env.template` and fill in the required data to start up the api.

local development: `.env`
docker development: `.env.docker`

## Run with Docker

### Build  Image

```
  docker build -t mvp-api-image .
```

### Start Container

```
  docker run --name mvp-api -p 3000:3000 -d mvp-api-image
```

### Notes

- After starting the container the app needs some time to fully start up
- On Windows machines localhost may not be working to access the container. Use the docker-machine ip instead.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```