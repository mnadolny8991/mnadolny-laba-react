const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader', 
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css'
        })
    ],
    devtool: 'source-map',
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        watchFiles: ['src/**/*'],
        port: 9000,
    }
}