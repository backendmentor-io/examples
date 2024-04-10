#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsOpensearchStack } from '../lib/stack';

const env = { account: '906159550171', region: 'ap-southeast-2' };

const app = new cdk.App();
new AwsOpensearchStack(app, 'AwsOpensearchStack', { env: env });
