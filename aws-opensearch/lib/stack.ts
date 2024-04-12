import * as cdk from 'aws-cdk-lib';
import { SecretValue } from 'aws-cdk-lib';
import { AnyPrincipal, Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import * as opensearch from 'aws-cdk-lib/aws-opensearchservice';
import { Construct } from 'constructs';

export class AwsOpensearchStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const osDomain = new opensearch.Domain(this, 'MyOpensearchCluster', {
      version: opensearch.EngineVersion.OPENSEARCH_2_11,
      zoneAwareness: { enabled: false },
      ebs: {
        volumeSize: 10,
      },
      capacity: {
        dataNodes: 2,
        masterNodes: 2,
        dataNodeInstanceType: 't3.small.search',
        multiAzWithStandbyEnabled: false,
      },
      fineGrainedAccessControl: {
        masterUserPassword: new SecretValue('Password123!'),
      },
      useUnsignedBasicAuth: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      accessPolicies: [
        new PolicyStatement({
          actions: ['es:*'],
          principals: [new AnyPrincipal()],
          effect: Effect.ALLOW,
          resources: ['*'],
        }),
      ],
    });

    new cdk.CfnOutput(this, 'opensearchEndpoint', {
      value: `https://${osDomain.domainEndpoint}`,
    });
  }
}
