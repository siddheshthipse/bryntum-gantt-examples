const
    path      = require('path'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
    {
        entry : {
            cruddemo : path.join(__dirname, 'app.js')
        },
        resolve : {
            symlinks : false
        },
        output : {
            library : {
                name : 'cruddemo',
                type : 'umd'
            },
            path     : path.join(__dirname, 'build'),
            filename : 'cruddemo.js'
        },
        module : {
            rules : [
                {
                    test    : /\.js$/,
                    exclude : /(node_modules(?!\/bryntum-gantt\/))/,
                    use     : {
                        loader  : 'babel-loader',
                        options : {
                            presets : ['@babel/preset-env']
                        }
                    }
                }
            ]
        }
    },
    {
        entry  : path.join(__dirname, 'resources', 'app.css'),
        output : {
            path     : path.join(__dirname, 'build'),
            filename : 'tmp'
        },
        module : {
            rules : [
                {
                    test : /\.(css|sass|scss)$/,
                    use  : [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test : /\.(eot|svg|ttf|woff|woff2)$/,
                    type : 'asset/resource'
                },
                {
                    test    : /\.png$/,
                    loader  : 'file-loader',
                    options : {
                        name(resourcePath) {
                            if (resourcePath.match(/favicon.png/)) {
                                return 'favicon.png';
                            }
                            else {
                                return '[path][name].[ext]';
                            }
                        }
                    }
                }
            ]
        },
        plugins : [new MiniCssExtractPlugin({
            filename : 'cruddemo.css'
        })]
    }
];
