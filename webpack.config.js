const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    devtool: false,
    plugins: [new MiniCssExtractPlugin(), new HTMLWebpackPlugin()],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: require.resolve('./simple-dep-loader'),
                    },
                ],
            },
        ],
    },
};
