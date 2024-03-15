#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsNodeSimpleHttpEndpointStack } from '../lib/stack';

const app = new cdk.App();
new AwsNodeSimpleHttpEndpointStack(app, 'AwsNodeSimpleHttpEndpointStack', {});
