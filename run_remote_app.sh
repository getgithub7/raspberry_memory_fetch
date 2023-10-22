#!/bin/bash

# Your Raspberry Pi SSH information
rpi_user="pi"
rpi_host="ip address"
rpi_script_path="/path/to/script.sh"
rpi_password="password"
# SSH into the Raspberry Pi and execute the script
sshpass -p "$rpi_password" ssh "$rpi_user@$rpi_host" "bash $rpi_script_path"

# Change the directory on your local PC
cd raspberry_memory/src

# Start your Node.js application with npm
npm start

#maybe neccesary to insatall sshpass
