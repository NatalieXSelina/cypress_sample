# Pre
node >= v16.16.0

# How to use this project
```bash
npm install
npm run cy:run:single # run demo without UI
npm run cy:open # run with UI
npm run cy:run # run filter by specPattern
npm run allure:report # generate report
npx allure open # watch report
```

# One command for running all testcases and watch report
```bash
npm run cy:project
```

# What's more
If you need to put this project in Jenkins, you can follow these commands above to organize stages.

# Two report plugins to choose
## allure

## mochawesome