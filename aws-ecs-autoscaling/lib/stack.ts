import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';
import { Construct } from 'constructs';
import {
  AdjustmentType,
  MetricAggregationType,
  ScalableTarget,
  ServiceNamespace,
  StepScalingPolicy,
} from 'aws-cdk-lib/aws-applicationautoscaling';

export class AwsEcsAutoScalingStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a VPC
    const vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 2,
    });

    // Create an ECS cluster
    const cluster = new ecs.Cluster(this, 'MyCluster', {
      vpc: vpc,
    });

    // Create a basic API service
    const apiService = new ecsPatterns.ApplicationLoadBalancedFargateService(
      this,
      'MyApiService',
      {
        cluster: cluster,
        taskImageOptions: {
          image: ecs.ContainerImage.fromRegistry('nginx'),
        },
      }
    );

    const scalableTarget = new ScalableTarget(this, 'ScalableTarget', {
      serviceNamespace: ServiceNamespace.ECS,
      resourceId: `service/${cluster.clusterName}/${apiService.service.serviceName}`,
      scalableDimension: 'ecs:service:DesiredCount',
      minCapacity: 1,
      maxCapacity: 2,
    });

    new StepScalingPolicy(this, 'CPUScalingPolicy', {
      scalingTarget: scalableTarget,
      metricAggregationType: MetricAggregationType.AVERAGE,
      adjustmentType: AdjustmentType.CHANGE_IN_CAPACITY,
      scalingSteps: [
        { upper: 25, change: -1 },
        { lower: 85, change: +1 },
        { lower: 95, change: +3 },
      ],
      cooldown: cdk.Duration.seconds(60),
      metric: new cloudwatch.Metric({
        namespace: 'AWS/ECS',
        metricName: 'CPUUtilization',
        dimensionsMap: {
          ClusterName: cluster.clusterName,
          ServiceName: apiService.service.serviceName,
        },
        period: cdk.Duration.minutes(1),
      }),
    });

    new StepScalingPolicy(this, 'MemoryScalingPolicy', {
      scalingTarget: scalableTarget,
      metricAggregationType: MetricAggregationType.AVERAGE,
      adjustmentType: AdjustmentType.CHANGE_IN_CAPACITY,
      scalingSteps: [
        { upper: 25, change: -1 },
        { lower: 85, change: +1 },
        { lower: 95, change: +3 },
      ],
      cooldown: cdk.Duration.seconds(60),
      metric: new cloudwatch.Metric({
        namespace: 'AWS/ECS',
        metricName: 'MemoryUtilization',
        dimensionsMap: {
          ClusterName: cluster.clusterName,
          ServiceName: apiService.service.serviceName,
        },
        period: cdk.Duration.minutes(1),
      }),
    });
  }
}
