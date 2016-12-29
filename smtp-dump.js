// imports
var argv = require('minimist')(process.argv.slice(2)),
    SMTPServer = require('smtp-server').SMTPServer,
    fs = require('fs'),
    dateFormat = require('dateformat');

// default values
var config = {
    output: 'output',
    port:   25,
    logger: false
};

// overwrite default config values with arguments
Object.assign(config, argv);

// create new STMP Server instance with given configuration
var server = new SMTPServer({
    secure: false,
    name: 'localhost',
    authOptional: true,
    logger: config.logger,
    onData: function(stream, session, callback) {
        // create output directory if it does not exist yet
        try {
            fs.mkdirSync(config.output);
        }
        catch (e) {
            if (e.code !== 'EEXIST') {
                throw e;
            }
        }

        // filename will consist of current DateTime ...
        var filename = dateFormat(new Date(), 'yyyy-mm-dd HH-MM-ss');
        if(session.envelope.rcptTo.length >= 1) {
            // ... and first recipient E-Mail-Adress if existent
            filename += ' ' + session.envelope.rcptTo[0].address;
        }

        // write mail to file
        var dump = fs.createWriteStream(config.output + '/' + filename  + '.txt');
        stream.pipe(dump);
        stream.on('end', callback);
    }
});

// Server listens on localhost:25
server.listen(config.port);