# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [https://docs.docker.com/engine/install/]
- Docker-compose - [https://docs.docker.com/compose/install/]

## Downloading

```
git clone https://github.com/Anthony-Hoopkins/nodejs2024Q1-service/pull/2
```

### Rename ".env.example" to ".env" or just use current

## Run docker-compose:
open terminal in root folder and run:

```
docker-compose up -d --build
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/docs.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Docs Swagger

open http://localhost:4000/docs


## Testing

After application running open new terminal and enter:

To run all tests without authorization (for current part 1)

```
npm run test
```


## Installing NPM modules
if you want to use app locally: open terminal in root folder and run (but you need to up DB and change POSTGRES_HOST to POSTGRES_HOST=localhost in .env):

```
npm install
```

##### end of 2-nd task responsibility 


--------------- 
To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
