/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new JavaScriptObfuscator({
            rotateStringArray: true
        }, ['abc.js'])
    ]
});
