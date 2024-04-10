import * as cdk from 'aws-cdk-lib';
import { FunctionUrlAuthType, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class AwsNodeSimpleHttpEndpointStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Configure the Lambda function
    const myLambda = new NodejsFunction(this, 'MyLambda', {
      runtime: Runtime.NODEJS_16_X,
      entry: './lib/handler.js',
      handler: 'handler',
    });

    // Configure the Lambda functions endpoint URL
    const lambdaUrl = myLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });

    // Output the Lambda functions endpoint URL
    new cdk.CfnOutput(this, 'LambdaEndpoint', {
      value: lambdaUrl.url,
      description: 'Lambda function endpoint URL',
    });
  }
}
