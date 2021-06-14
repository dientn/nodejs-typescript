# Nodejs-CI/CD

[![jest](https://jestjs.io/img/jest-badge.svg)](https://github.com/facebook/jest)

Learning Nodejs CI/CD

## Setup
```bash
#sudo docker-compose build
sudo docker-compose up -d --build
```

## Accessing the Jenkins Docker container

```bash
docker exec -it jenkins-blueocean bash
```
Disable git ssl

```bash
git config --global http.sslverify false
```


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
