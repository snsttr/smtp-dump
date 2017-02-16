# smtp-dump
This tool provides a Node.js SMTP Server that dumps all mails to disk. It can be used to test SMTP Clients or
simulate SMTP Servers for Development reasons.

## Installation

    git clone https://github.com/snsttr/smtp-dump.git
    cd smtp-dump
    npm install

## Usage

    node smtp-dump.js

smtp-dump.js will write out all E-Mails into the default output folder `./output` while running. The E-Mail will __not be
send__ to the destination Mail Server.

The SMTP Server does not require a username and/or a password. Also secure connections are not possible, yet.

### optional Arguments

Specify the logging destination by passing a path to `--output` (default directory is `output`).
Creates the directory if it does not exist.

    node smtp-dump.js --output=dump
    node smtp-dump.js --output=/home/smtp-dump
    node smtp-dump.js --output=C:\smtp-dump
    

Specify the port for the SMTP Server by passing a number (1 - 65536) to `--port` (default Port is `25`)

    node smtp-dump.js --port=10025
    
Debugging ouput (console) is enabled if you use `--logger` (default is disabled).
    
    node smtp-dump.js --logger

# Example

Start smtp-dump.js with output directory `./dump`, port `10025` and logging activated. 

        node smtp-dump.js --output=dump --port=10025 --logger
        
Now enter the settings to your SMTP Server in your SMTP Client Application (usually on `localhost`). As soon as the client
tries to send an E-Mail using the specified SMTP Server the smtp-dump.js writes the Mail as a txt-File into the specified
output directory:

    Message-ID: <823a882740c0361723b9951939d501ee8347@example.com>
    Date: Thu, 29 Dec 2016 15:54:13 +0100
    Subject: Test E-Mail
    From: Test Client <noreply@example.com>
    To: test@example.com
    MIME-Version: 1.0
    Content-Type: text/plain; charset=utf-8
    Content-Transfer-Encoding: quoted-printable
    
    This is a Test Message
    
Since we used `--logger` the smtp-dump.js outputs some information to the command line:

    [2017-02-16 14:34:54] INFO: SMTP Server listening on [::]:10025
    [2017-02-16 14:35:46] INFO: [82Suh8w7238+O] Connection from [127.0.0.1]
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] S: 220 localhost ESMTP
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] C: EHLO example.com
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] S: 250-localhost Nice to meet you, [127.0.0.1]
    250-PIPELINING
    250-8BITMIME
    250-SMTPUTF8
    250-AUTH LOGIN PLAIN
    250 STARTTLS
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] C: MAIL FROM: <noreply@example.com>
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] S: 250 Accepted
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] C: RCPT TO: <test@example.com>
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] S: 250 Accepted
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] C: DATA
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] S: 354 End data with <CR><LF>.<CR><LF>
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] C: <701 bytes of DATA>
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] S: 250 OK: message queued
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] C: MAIL FROM: <noreply@example.com>
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] S: 250 Accepted
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] C: RCPT TO: <test@example.com>
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] S: 250 Accepted
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] C: DATA
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] S: 354 End data with <CR><LF>.<CR><LF>
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] C: <706 bytes of DATA>
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] S: 250 OK: message queued
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] C: QUIT
    [2017-02-16 14:35:46] DEBUG: [82Suh8w7238+O] S: 221 Bye
    [2017-02-16 14:35:46] INFO: [82Suh8w7238+O] Connection closed to [127.0.0.1]
