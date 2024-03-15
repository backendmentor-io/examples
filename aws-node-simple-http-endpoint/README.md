# Blog Post Codebase: A simple HTTP node endpoint on AWS

This repository contains the codebase for the blog post titled "[A simple HTTP node endpoint on AWS](https://www.backendmentor.io/articles/aws-node-simple-http-endpoint)".

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Testing Lambda Output with curl](#testing-lambda-output-with-curl)
- [Reporting Issues or Suggestions](#reporting-issues-or-suggestions)
- [License](#license)

## Overview

This AWS CDK stack sets up a simple HTTP endpoint using a Node.js Lambda function. Here's a breakdown of each component and what you would learn from deploying this stack:

### Lambda Function (`myLambda`)

- A Node.js Lambda function named `MyLambda` is defined using the `NodejsFunction` construct from AWS CDK.
- The Lambda function is configured to use Node.js 16.x runtime (`runtime: Runtime.NODEJS_16_X`).
- The code for the Lambda function is located in the `./lib/handler.js` file, and the `handler` function is used as the entry point.

### Function URL

- The Lambda function is configured to generate a function URL using the `addFunctionUrl` method.
- The `authType` is set to `FunctionUrlAuthType.NONE`, indicating that the HTTP endpoint does not require any authentication.

### Output

- The generated URL of the Lambda function (`lambdaUrl.url`) is outputted as a CloudFormation output (`LambdaEndpoint`).
- This URL serves as the HTTP endpoint for invoking the Lambda function directly.

By deploying this stack, you would learn how to:

- Create a Node.js Lambda function using AWS CDK.
- Configure the runtime version and entry point for the Lambda function.
- Generate an HTTP endpoint URL for the Lambda function.
- Output the URL of the Lambda function as a CloudFormation output for easy access.

This stack provides a basic setup for creating a serverless HTTP endpoint using AWS Lambda, allowing you to quickly expose your Lambda function over HTTP without the need for additional services like API Gateway.

## Prerequisites

Before you can use this codebase, make sure you have the following:

1. **Node.js and npm**: Ensure you have Node.js and npm installed on your system. You can download and install them from the [official Node.js website](https://nodejs.org/).

2. **AWS CDK**: This codebase uses AWS CDK to deploy infrastructure. Install AWS CDK globally using npm:

   ```bash
   npm install -g aws-cdk
   ```

3. **AWS Account**: You'll need an AWS account to deploy and run the code. If you don't have one, you can sign up for free on the [AWS website](https://aws.amazon.com/).

4. **AWS CLI**: Configure the AWS CLI with your AWS credentials. You can install the AWS CLI and configure it by following the instructions in the [AWS CLI User Guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).

5. **IAM Permissions**: Make sure your AWS IAM user or role has the necessary permissions to create and manage resources like Lambda functions and IAM roles. At a minimum, you'll need permissions to create and manage Lambda functions, CloudFormation stacks, and necessary AWS resources.

## Getting Started

To get started with this codebase, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/backendmentor.io/examples.git
   ```

2. Navigate to the project directory:

   ```bash
   cd examples/aws-node-simple-http-endpoint
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

Once you've set up the project, you can deploy the Lambda function using AWS CDK:

```bash
cdk deploy
```

After deployment, the CloudFormation stack outputs will include the Lambda function's endpoint URL. You can use this URL for testing your Lambda function.

## Testing Lambda Output with curl

To test the Lambda function's output using curl, follow these steps:

1. Copy the Lambda function's endpoint URL from the CloudFormation stack outputs.

2. Use curl to send a GET request to the Lambda endpoint:

   ```bash
   curl -X GET <lambda-endpoint-url>
   ```

   Replace `<lambda-endpoint-url>` with the actual Lambda function's endpoint URL.

3. You should receive a response from the Lambda function similar to the following:

   ```json
   { "message": "Hello from Lambda!" }
   ```

   This confirms that the Lambda function is working correctly.

## Reporting Issues or Suggestions

If you encounter any inaccuracies in the code or have suggestions for improvement, we'd love to hear from you! Please submit a GitHub issue with a brief explanation of the problem or idea, along with any relevant details.

Before submitting an issue, please check if someone else has already reported it. If not, feel free to create a new one.

## License

This code is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as you see fit.
