const path = require('path');

module.exports={
    mode:'development',
    entry: path.join(__dirname, '/chrome-ext/devtools.js'),
    output:{
        path: path.join(__dirname, '/chrome-ext/build'),
        filename: 'bundle.js',
    },

}