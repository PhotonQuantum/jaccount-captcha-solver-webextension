const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'build');

module.exports = {
    node: false,
    entry: {
        content: path.join(src, 'content'),
    },

    output: {
        path: dist,
        filename: '[name].js'
    },

    resolve: {
        extensions: [ '.js' ]
    },
    module: {
        rules: [
            {
                test: /\.(onnx)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        },
                    },
                ],
            }
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns:[
                {from: path.join(src, "manifest.json"), to: dist},
                {from: path.join(src, "icons"), to: path.join(dist, "icons")}
            ]
        })
    ]
};