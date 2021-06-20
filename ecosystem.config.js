module.exports = {
    apps : [{
      name: "app",
      script: "src/index.ts",
      watch       : true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }