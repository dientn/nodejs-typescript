# Nodejs-CI/CD

[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

Learning Nodejs CI/CD

## Setup
```bash
#docker-compose build
docker-compose up -d --build
```

## Accessing the Jenkins Docker container

```bash
docker exec -it jenkins-blueocean bash
```

Setup wizard jenkins follow this [link](https://www.jenkins.io/doc/book/installing/docker/#setup-wizard)


## Create Jenkins pipeline 

Create a pipeline follow this [link](https://www.jenkins.io/doc/book/pipeline/getting-started/), and use this reporsitory instead of the Repository URL at the Pipeline section







## Test

Run test:

### Test without coverage
```bash
npm test
```

### Test within coverage
```bash
npm test:coverage
```

---
