#!/bin/bash

# MySQL username and password for the remote MySQL server
remote_mysql_user="username"
remote_mysql_password="password"
remote_mysql_host="addres of host" # Replace with the IP or hostname of the remote MySQL server

mysql_user="username"           # MySQL username
mysql_password="password"   # MySQL password
database_name="db name"     # Name of the MySQL database
table_name="table name"           # Name of the MySQL table


# Your data collection code
df_info=$(df -h / | tail -1)
meminfo=$(grep "MemTotal\|MemFree" /proc/meminfo)

storage_total_gb=$(echo "$df_info" | awk '{print $2}' | sed 's/G//')
storage_free_gb=$(echo "$df_info" | awk '{print $4}' | sed 's/G//')
memtotal_kb=$(echo "$meminfo" | grep "MemTotal" | awk '{print $2}')
memfree_kb=$(echo "$meminfo" | grep "MemFree" | awk '{print $2}')
memtotal_gb=$(echo "scale=2; $memtotal_kb / 1024 / 1024" | bc)
memfree_gb=$(echo "scale=2; $memfree_kb / 1024 / 1024" | bc)

# Use this line to execute the query to insert new data
echo "INSERT INTO system_info (metric_name, value) VALUES ('mem_total_gb', $memtotal_gb), ('mem_free_gb', $memfree_gb);" | /usr/bin/mysql -u "$mysql_user" -p"$mysql_password" db_name

ssh -i "$ssh_key" $remote_user@$remote_mysql_host "mysql -u $mysql_user -p'$mysql_password' -e \"$sql_command\" $database_name"

