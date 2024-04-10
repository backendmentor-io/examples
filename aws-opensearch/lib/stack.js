"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsOpensearchStack = void 0;
const cdk = require("aws-cdk-lib");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const ec2 = require("aws-cdk-lib/aws-ec2");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const opensearch = require("aws-cdk-lib/aws-opensearchservice");
class AwsOpensearchStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const vpc = ec2.Vpc.fromLookup(this, 'DefaultVpc', { isDefault: true });
        const osDomain = new opensearch.Domain(this, 'MyOpensearchCluster', {
            version: opensearch.EngineVersion.OPENSEARCH_2_11,
            vpc,
            vpcSubnets: [{ subnets: [vpc.publicSubnets[0]] }],
            zoneAwareness: { enabled: false },
            ebs: {
                volumeSize: 10,
            },
            capacity: {
                dataNodes: 3,
                masterNodes: 2,
                dataNodeInstanceType: 't3.small.search',
                multiAzWithStandbyEnabled: false,
            },
            fineGrainedAccessControl: {
                masterUserPassword: new aws_cdk_lib_1.SecretValue('Password123!'),
            },
            useUnsignedBasicAuth: true,
            enableVersionUpgrade: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            tlsSecurityPolicy: opensearch.TLSSecurityPolicy.TLS_1_2,
            accessPolicies: [
                new aws_iam_1.PolicyStatement({
                    actions: ['es:*'],
                    principals: [new aws_iam_1.AnyPrincipal()],
                    effect: aws_iam_1.Effect.ALLOW,
                    resources: ['*'],
                }),
            ],
        });
        new cdk.CfnOutput(this, 'opensearchEndpoint', {
            value: `https://${osDomain.domainEndpoint}`,
        });
    }
}
exports.AwsOpensearchStack = AwsOpensearchStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMsNkNBQTBDO0FBQzFDLDJDQUEyQztBQUMzQyxpREFBNEU7QUFDNUUsZ0VBQWdFO0FBR2hFLE1BQWEsa0JBQW1CLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDL0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFFeEUsTUFBTSxRQUFRLEdBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxxQkFBcUIsRUFBRTtZQUNsRSxPQUFPLEVBQUUsVUFBVSxDQUFDLGFBQWEsQ0FBQyxlQUFlO1lBQ2pELEdBQUc7WUFDSCxVQUFVLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2pELGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUU7WUFDakMsR0FBRyxFQUFFO2dCQUNILFVBQVUsRUFBRSxFQUFFO2FBQ2Y7WUFDRCxRQUFRLEVBQUU7Z0JBQ1IsU0FBUyxFQUFFLENBQUM7Z0JBQ1osV0FBVyxFQUFFLENBQUM7Z0JBQ2Qsb0JBQW9CLEVBQUUsaUJBQWlCO2dCQUN2Qyx5QkFBeUIsRUFBRSxLQUFLO2FBQ2pDO1lBQ0Qsd0JBQXdCLEVBQUU7Z0JBQ3hCLGtCQUFrQixFQUFFLElBQUkseUJBQVcsQ0FBQyxjQUFjLENBQUM7YUFDcEQ7WUFDRCxvQkFBb0IsRUFBRSxJQUFJO1lBQzFCLG9CQUFvQixFQUFFLElBQUk7WUFDMUIsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztZQUN4QyxpQkFBaUIsRUFBRSxVQUFVLENBQUMsaUJBQWlCLENBQUMsT0FBTztZQUN2RCxjQUFjLEVBQUU7Z0JBQ2QsSUFBSSx5QkFBZSxDQUFDO29CQUNsQixPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0JBQ2pCLFVBQVUsRUFBRSxDQUFDLElBQUksc0JBQVksRUFBRSxDQUFDO29CQUNoQyxNQUFNLEVBQUUsZ0JBQU0sQ0FBQyxLQUFLO29CQUNwQixTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUM7aUJBQ2pCLENBQUM7YUFDSDtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLEVBQUU7WUFDNUMsS0FBSyxFQUFFLFdBQVcsUUFBUSxDQUFDLGNBQWMsRUFBRTtTQUM1QyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUF6Q0QsZ0RBeUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IFNlY3JldFZhbHVlIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgZWMyIGZyb20gJ2F3cy1jZGstbGliL2F3cy1lYzInO1xuaW1wb3J0IHsgQW55UHJpbmNpcGFsLCBFZmZlY3QsIFBvbGljeVN0YXRlbWVudCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuaW1wb3J0ICogYXMgb3BlbnNlYXJjaCBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtb3BlbnNlYXJjaHNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5cbmV4cG9ydCBjbGFzcyBBd3NPcGVuc2VhcmNoU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCB2cGMgPSBlYzIuVnBjLmZyb21Mb29rdXAodGhpcywgJ0RlZmF1bHRWcGMnLCB7IGlzRGVmYXVsdDogdHJ1ZSB9KTtcblxuICAgIGNvbnN0IG9zRG9tYWluID0gbmV3IG9wZW5zZWFyY2guRG9tYWluKHRoaXMsICdNeU9wZW5zZWFyY2hDbHVzdGVyJywge1xuICAgICAgdmVyc2lvbjogb3BlbnNlYXJjaC5FbmdpbmVWZXJzaW9uLk9QRU5TRUFSQ0hfMl8xMSxcbiAgICAgIHZwYyxcbiAgICAgIHZwY1N1Ym5ldHM6IFt7IHN1Ym5ldHM6IFt2cGMucHVibGljU3VibmV0c1swXV0gfV0sXG4gICAgICB6b25lQXdhcmVuZXNzOiB7IGVuYWJsZWQ6IGZhbHNlIH0sXG4gICAgICBlYnM6IHtcbiAgICAgICAgdm9sdW1lU2l6ZTogMTAsXG4gICAgICB9LFxuICAgICAgY2FwYWNpdHk6IHtcbiAgICAgICAgZGF0YU5vZGVzOiAzLFxuICAgICAgICBtYXN0ZXJOb2RlczogMixcbiAgICAgICAgZGF0YU5vZGVJbnN0YW5jZVR5cGU6ICd0My5zbWFsbC5zZWFyY2gnLFxuICAgICAgICBtdWx0aUF6V2l0aFN0YW5kYnlFbmFibGVkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBmaW5lR3JhaW5lZEFjY2Vzc0NvbnRyb2w6IHtcbiAgICAgICAgbWFzdGVyVXNlclBhc3N3b3JkOiBuZXcgU2VjcmV0VmFsdWUoJ1Bhc3N3b3JkMTIzIScpLFxuICAgICAgfSxcbiAgICAgIHVzZVVuc2lnbmVkQmFzaWNBdXRoOiB0cnVlLFxuICAgICAgZW5hYmxlVmVyc2lvblVwZ3JhZGU6IHRydWUsXG4gICAgICByZW1vdmFsUG9saWN5OiBjZGsuUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxuICAgICAgdGxzU2VjdXJpdHlQb2xpY3k6IG9wZW5zZWFyY2guVExTU2VjdXJpdHlQb2xpY3kuVExTXzFfMixcbiAgICAgIGFjY2Vzc1BvbGljaWVzOiBbXG4gICAgICAgIG5ldyBQb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgICAgIGFjdGlvbnM6IFsnZXM6KiddLFxuICAgICAgICAgIHByaW5jaXBhbHM6IFtuZXcgQW55UHJpbmNpcGFsKCldLFxuICAgICAgICAgIGVmZmVjdDogRWZmZWN0LkFMTE9XLFxuICAgICAgICAgIHJlc291cmNlczogWycqJ10sXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdvcGVuc2VhcmNoRW5kcG9pbnQnLCB7XG4gICAgICB2YWx1ZTogYGh0dHBzOi8vJHtvc0RvbWFpbi5kb21haW5FbmRwb2ludH1gLFxuICAgIH0pO1xuICB9XG59XG4iXX0=