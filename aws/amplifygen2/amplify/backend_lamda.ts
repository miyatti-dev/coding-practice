import { defineBackend } from '@aws-amplify/backend';
import { helloWorld } from './functions/hello-world/resource.ts';

const backend = defineBackend({
  helloWorld,
});

backend.addOutput({
  custom: {
    helloWorldFunctionName: backend.helloWorld.resources.lambda.functionName,
  },
});