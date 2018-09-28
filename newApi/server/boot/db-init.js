var server = require('../server');

// get a handle to our defined datasource
var ds = server.dataSources.mariadb;

// since we pass `null` as parameter ALL models will be created / updated
// including those provided by LoopBack e.g. 'User', 'AccessToken', 'ACL', 'RoleMapping' ...
ds.isActual(null, function (err, actual) {
    if(0){
        // if an error occured throw it
        if (err) {
            throw err;
        }
    
        // if changes are needed, if they are
        if (!actual) {
    
            // update the database
            // ds.automigrate(null, function (err, result) {
            ds.autoupdate(null, function (err, result) {
    
                // if an error occured throw it
                if (err) {
                    throw err;
                }
    
            });
            
        }
    }
});