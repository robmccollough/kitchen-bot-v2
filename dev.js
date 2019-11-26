
const localtunnel = require('localtunnel');

class Dev {
    /**
     * Expose the app on localhost with the given port. Used in development.
     *
     * @static
     * @param {number} port The port on localhost to expose
     * @return {undefined}
     */
    static dev(port, subdomain) {
        const options = {
            subdomain: subdomain
        };


        const tunnel = localtunnel(port, options, function(error, tunnel) {
            if (error) {
                console.log('Error trying to establish a local tunnel:', error);
                return;
            }

            // The local tunnel connection url
            const url = tunnel.url;
            console.log('Local tunnel connection established:', url);
        });

        tunnel.on('close', function() {
            console.log('Local tunnel connection closed');
            console.log('Exiting the program');
            process.exit();
        });
    }
}

module.exports = Dev;
