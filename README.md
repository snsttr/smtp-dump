# smtp-dump
NodeJS SMTP Server that dumps all received mails

## Install
After cloning the repository

    npm install

## Use

    node smtp-dump.js

smtp-dump.js will output all received E-Mails into the output folder (default _"output"_) while running.

### Arguments

Specify the logging destination by passing a path to _--output_ (default directory is _"output"_).
Creates the directory if it does not exist.

    node smtp-dump.js --output=dump
    node smtp-dump.js --output=/home/smtp-dump
    node smtp-dump.js --output=C:\smtp-dump
    

Specify the port for the SMTP Server by passing a number (1 - 65536) to _--port_ (default Port is _25_)

    node smtp-dump.js --port=dump
    
Debugging ouput (console) is enabled if you use _--logger_
    
    node smtp-dump.js --logger