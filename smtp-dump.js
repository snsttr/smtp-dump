// imports
var SMTPServer = require('smtp-server').SMTPServer,
    fs = require('fs'),
    dateFormat = require('dateformat');

var outputDir = 'output';

// create output directory if it does not exist yet
try {
    fs.mkdirSync(outputDir);
} catch(e) {
    if ( e.code != 'EEXIST' ) throw e;
}

// create new STMP Server instance with given configuration
var server = new SMTPServer({
    secure: false,
	name: 'localhost',
	authOptional: true,
	logger: true,
	onData: function(stream, session, callback) {
        var filename = dateFormat(new Date(), 'yyyy-mm-dd HH-MM-ss');
        if(session.envelope.rcptTo.length >= 1) {
            filename += ' ' + session.envelope.rcptTo[0].address;
        }

		var dump = fs.createWriteStream(outputDir + '/' + filename  + '.txt');
		stream.pipe(dump);
        stream.on('end', callback);
	}
});

// Server listens on localhost:25
server.listen(25);