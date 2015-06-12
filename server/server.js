var loopback = require('loopback'),
    boot = require('loopback-boot'),
    DeepstreamServer = require( 'deepstream.io' ),
    MongoDBStorageConnector = require( 'deepstream.io-storage-mongodb' ),
    server = new DeepstreamServer();

var app = module.exports = loopback();

// Optionally you can specify some settings, a full list of which
// can be found here http://deepstream.io/docs/deepstream.html
server.set( 'serverName', 'todoApp' );
server.set( 'host', 'localhost' );
server.set( 'port', 6020 );

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
    // start the Deepstream Server
    server.start();
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
