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

check_database_health() {
  docker exec \
    ${DB_CONTAINER_ID} \
    bash -c "psql -h ${DB_HOSTNAME} -U ${DB_USERNAME} -W ${DB_PASSWORD} -d ${DB_NAME} -c 'select 1'"
}

wait_for_database() {
  local host="${DB_HOSTNAME}"
  local port="${DB_PORT}"
  local connectionRetries=3
  local databaseTimeout=30

  echo -e "Waiting for database connection \"${host}:${port}\" 1s ${connectionRetries}x"
  until $(echo > /dev/tcp/$host/$port) || [ $connectionRetries -eq 0 ]; do
    ((connectionRetries--))
    sleep 1
  done

  if [ $connectionRetries -eq 0 ]; then
    echo -e "Failed to acquire database connection!"
    return 1
  fi

  echo -e "Connection acquired!"
  echo -e "Waiting for the database to be ready..."
  until check_database_health > /dev/null 2>&1 || [ $databaseTimeout -eq 0 ]; do
    ((databaseTimeout--))
    sleep 1
  done

  if [ $databaseTimeout -eq 0 ]; then
    echo -e "Failure waiting the database, it took too long to boot."
    return 1
  fi

  echo -e "Database ready!"
  return 0
}

find_old_db_container_id() {
  echo $(docker ps \
    --all \
    --filter "name=postgres-db-test-container" \
    --no-trunc \
    -q)
}

find_running_db_container_id() {
  echo $(docker ps \
    --filter "status=running" \
    --filter "name=postgres-db-test-container" \
    --no-trunc \
    -q)
}

start_db_container() {
  echo -e "Starting new postgres docker container on host: ${DB_HOSTNAME} and port: ${DB_PORT}..."
  docker run \
    --name postgres-db-test-container \
    -p ${DB_PORT}:5432 \
    -e POSTGRES_DB=${DB_NAME} \
    -e POSTGRES_USER=${DB_USERNAME} \
    -e POSTGRES_PASSWORD=${DB_PASSWORD} \
    -d \
    postgres

  if [ "1" = "$?" ]; then
    echo -e "Failed to start postgres image."
    exit 1
  fi

  DB_CONTAINER_ID=$(find_running_db_container_id)
  STARTED_DB_CONTAINER=1
}

stop_and_remove_db() {
  echo "Stopping DB container ${DB_CONTAINER_ID}..."
  docker stop ${DB_CONTAINER_ID}
  echo "DB container stopped. Going to remove it..."
  docker rm ${DB_CONTAINER_ID}
}

quit() {
  DB_CONTAINER_ID=$(find_old_db_container_id)
  if [ ! -z ${DB_CONTAINER_ID} ]; then
    stop_and_remove_db
  fi

  exit 1
}

trap quit ERR

# trying to find some db container 
DB_CONTAINER_ID=$(find_old_db_container_id)

if [ ! -z ${DB_CONTAINER_ID} ]
then
  echo -e "Cleaning old container ${DB_CONTAINER_ID}..."
  stop_and_remove_db
fi
STARTED_DB_CONTAINER=0
start_db_container

wait_for_database
echo -e "Postgres container ${DB_CONTAINER_ID} is running!"

NODE_ENV=test npm run db:reset
eval "${testCommand} ${extraArgs}"
TEST_EXIT=$?

if [ $STARTED_DB_CONTAINER -eq 1 ]; then
  stop_and_remove_db
fi

echo "Completed with success!"
exit ${TEST_EXIT}
