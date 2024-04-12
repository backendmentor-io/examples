#!/bin/bash

# OpenSearch endpoint
OPENSEARCH_ENDPOINT="{{YOUR OPENSEARCH ENDPOINT URL}}"

# Username and password for authentication
USERNAME="admin"
PASSWORD="Password123!"

# Create index
curl -XPUT -u "$USERNAME:$PASSWORD" "$OPENSEARCH_ENDPOINT/my-index" -H 'Content-Type: application/json' -d '{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 0
  }
}'

# Generate dummy HTTP request logs
endpoints=("api/users" "api/products" "api/orders" "api/customers")
verbs=("GET" "POST" "PUT" "DELETE")

for (( i=1; i<=500; i++ )); do
  # Generate random endpoint and HTTP verb
  ENDPOINT=${endpoints[$((RANDOM % ${#endpoints[@]}))]}
  VERB=${verbs[$((RANDOM % ${#verbs[@]}))]}

  # Generate random response code
  RESPONSE_CODE=$((RANDOM % 400 + 200))

  # Generate timestamp (current time minus a random number of seconds)
  TIMESTAMP=$(date -u -d "-$((RANDOM % 3600)) seconds" --iso-8601=seconds)

  # Create log record
  DATA="{\"timestamp\":\"$TIMESTAMP\",\"endpoint\":\"/$ENDPOINT\",\"verb\":\"$VERB\",\"response_code\":$RESPONSE_CODE}"

  # Send log record to OpenSearch
  curl -XPOST -u "$USERNAME:$PASSWORD" "$OPENSEARCH_ENDPOINT/my-index/_doc" -H 'Content-Type: application/json' -d "$DATA"
done
