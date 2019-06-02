#!/bin/bash -e

testCommand="$1"
extraArgs="$2"

# DB ENV VARIABLES
  # DB_USERNAME
  # DB_PASSWORD
  # DB_NAME
  # DB_HOSTNAME
  # DB_PORT
  # DB_DIALECT

source .env.test

quit() {
  ./bin/tearDownTestDB.sh

  exit 1
}

trap quit ERR

./bin/launchTestDB.sh

NODE_ENV=test npm run db:reset
eval "${testCommand} ${extraArgs}"
TEST_EXIT=$?

./bin/tearDownTestDB.sh

echo "Completed with success!"
exit ${TEST_EXIT}
