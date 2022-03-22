#!/bin/bash
python3 everyday_api.py
timestamp=`date +%Y/%m/%d/%H:%M`
echo "success $timestamp" >> check_test
exit 0

