#!/bin/bash -e

containerIdArg="$1"
extraArgs="$2"

find_old_db_container_id() {
  echo $(docker ps \
    --all \
    --filter "name=postgres-db-test-container" \
    --no-trunc \
    -q)
}

quit() {
  echo "Error while cleaning old db instances, check manually if the container was stoped and removed."

  exit 1
}

trap quit ERR

# if we receive the container id as argument, we use it, otherwise we try to find it
if [ ! -z ${containerIdArg} ]
then
  echo "Using container id passed as command argument"
  DB_CONTAINER_ID=${containerIdArg}
else
  echo "Looking for old containers"
  DB_CONTAINER_ID=$(find_old_db_container_id)
fi

if [ ! -z ${DB_CONTAINER_ID} ]
then
  echo "Stopping DB container ${DB_CONTAINER_ID}..."
  docker stop ${DB_CONTAINER_ID}
  echo "DB container stopped. Going to remove it..."
  docker rm ${DB_CONTAINER_ID}
fi

echo "Test DB down!"
exit 0
