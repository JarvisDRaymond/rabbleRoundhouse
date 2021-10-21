# rabbleRoundhouse

## UI Developer Test Overview
The provided mockup is implemented using React with create-react-app. The application can be viewed here: https://www.jarvisdraymond.com/coding-challenges/rabble-roundhouse/

## Instructions for Running
If necessary, first install NPM and Node. See: https://docs.npmjs.com/cli/v7/configuring-npm/install
Then, after downloading the rabbleRoundhouse package, navigate to the 'rabbleRoundhouse' directory via the command-line interface (CLI) and enter: 
```
cd rabble-roundhouse
npm install react
npm run start
```
Depending on your system, you might not need to install react. 

## Notes on Implementation
There is a requirement that states <i>only those that have a status of "available" are currently able to be downloaded</i>. This is addressed by having the download selected alert only those items that are both checked and have an available status. 

This application uses modern JavaScript and is best run in a modern web browser. 

## Notes on Testing
A test suite of 12 functional tests are included using Reacting Testing Library (RTL). This can be run via the CLI by navigating to the 'rabbleRoundhouse' directory via CLI and entering:
```
npm run test a
```
