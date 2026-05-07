#!/bin/bash

ACCESS_TOKEN=$(gcloud auth print-access-token)
GIT_NPM_PACKAGES_TOKEN=$(gcloud secrets versions access latest --secret=platform-infra-git-npm-packages-token --project highlevel-staging)
BULLMQ_TOKEN=$(gcloud secrets versions access latest --secret=platform-infra-bullmq-token --project highlevel-staging)

echo "@platform-core:registry=https://us-central1-npm.pkg.dev/highlevel-staging/platform-core/" > .npmrc
echo -e "//us-central1-npm.pkg.dev/highlevel-staging/platform-core/:_authToken=${ACCESS_TOKEN}\n" >> .npmrc

echo "@ghl-revex:registry=https://us-central1-npm.pkg.dev/highlevel-staging/revex-core/" >> .npmrc
echo -e "//us-central1-npm.pkg.dev/highlevel-staging/revex-core/:_authToken=${ACCESS_TOKEN}\n" >> .npmrc

echo "@ghl:registry=https://us-central1-npm.pkg.dev/highlevel-staging/revex-core/" >> .npmrc
echo -e "//us-central1-npm.pkg.dev/highlevel-staging/revex-core/:_authToken=${ACCESS_TOKEN}\n" >> .npmrc

echo "@crm-core:registry=https://us-central1-npm.pkg.dev/highlevel-staging/crm-core/" >> .npmrc
echo -e "//us-central1-npm.pkg.dev/highlevel-staging/crm-core/:_authToken=${ACCESS_TOKEN}\n" >> .npmrc

echo "@platform-ui:registry=https://us-central1-npm.pkg.dev/highlevel-staging/frontend-core/" >> .npmrc
echo -e "//us-central1-npm.pkg.dev/highlevel-staging/frontend-core/:_authToken=${ACCESS_TOKEN}\n" >> .npmrc

echo "@ghl-plugins:registry=https://us-central1-npm.pkg.dev/highlevel-staging/ghl-plugins/" >> .npmrc
echo -e "//us-central1-npm.pkg.dev/highlevel-staging/ghl-plugins/:_authToken=${ACCESS_TOKEN}\n" >> .npmrc

echo "@gohighlevel:registry=https://npm.pkg.github.com/" >> .npmrc
echo -e "//npm.pkg.github.com/:_authToken=${GIT_NPM_PACKAGES_TOKEN}\n" >>.npmrc

echo "@taskforcesh:registry=https://npm.taskforce.sh/" >> .npmrc
echo -e "//npm.taskforce.sh/:_authToken=${BULLMQ_TOKEN}\n" >> .npmrc

echo "✅ Authentication configured successfully"
