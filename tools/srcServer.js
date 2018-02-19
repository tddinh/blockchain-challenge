import browserSync from 'browser-sync';
import proxy from 'proxy-middleware';
import url from 'url';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';
import webpackConfig from '../webpack.config';

const proxyOptions = url.parse('https://api.blockchain.info');
proxyOptions.route = '/api';

const config = webpackConfig('development');
const bundler = webpack(config);

browserSync({
  port: process.env.PORT || 8000,
  server: {
    baseDir: 'src',
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: config.output.publicPath,
        stats: { colors: true },
        noInfo: true
      }),
      webpackHotMiddleware(bundler),
      historyApiFallback(),
      proxy(proxyOptions)
    ],
    cors: true
  },

  files: [
    'src/index.html'
  ]
});
