const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
    // compress main.js(/src/client/js/main.js) code into main.js(/assets/js) code for modern javascript
    // to understand it in the client
    entry: '/src/client/js/main.js',
    mode: 'development',
    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'assets'),
    },
    plugins: [new MiniCssExtractPlugin({
        filename: 'css/style.css',
    })],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: [
                        ['@babel/preset-env', { targets: "defaults" }]
                      ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader','sass-loader']
            }
        ]
    }
}