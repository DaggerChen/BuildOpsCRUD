# Employee - Skill CRUD Web App

This is a full-stack web app that consumes GraphQL API to handle queries that create/read/update/delete Employee and Skill objects.

This project uses:

1. **AppSync** to create GraphQL APIs
2. **AWS Amplify** for frontend to backend connectivity
3. **React Apollo** as GraphQL client
4. **Material UI** for frontend design components
5. **Amazon S3** to host the web application.

Here is the [link](http://20201106-daggercodechallenge-dev.s3-website-eu-west-1.amazonaws.com/) to the deployed website.

## Install Packages

### `npm install`

Install the dependencies in the local node_modules folder.

By default, `npm install` will install all modules listed as dependencies in [`package.json`](https://docs.npmjs.com/cli/v6/configuring-npm/package-json). 

## Run in Local

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Deploy 

### `npm install -g @aws-amplify/cli`

The first step is to install the Amplify command line tool to be able to create and maintain serverless backends on AWS. It is also the main tool to manage with AWS services.

### `amplify configure`

The next step is to run `amplify configure` command to configure your cli with your AWS account if you haven't configured your AWS account yet.

### `amplify init`

Initialize the project and connect the project to the cloud.

### `amplify hosting add`

To deploy this app to Amazon S3, we need to run `amplify hosting add` command to add a host. 

Select Amazon CloudFront and S3 as the plugin module to execute and then select S3 environment DEV (S3 only with HTTP). Then follow the next steps to name a S3 bucket for hosting and we are close to victory!

### `amplify publish`

This is the final step to deploy this web app. By running `amplify publish` we deploy the project to the host we just added, and now the project is deployed online!










