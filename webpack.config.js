'use strict';

const webpack = require('webpack');
const path = require('path');

console.log('path', path)
console.log('dirName',__dirname)


module.exports = {
    mode: 'development',
    entry: {
        entry: './public/index.js',
    },
    output: {
        path: path.resolve(__dirname + '/chrome-ext/build'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
};