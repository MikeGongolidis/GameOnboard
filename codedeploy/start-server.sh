#!/bin/bash
set -e


/usr/local/bin/docker-compose -f docker-compose.yml up --build -d > /dev/null 2> /dev/null < /dev/null &
