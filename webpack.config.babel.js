import { join } from 'path';

const loaders = [{
  test: /\.js$/,
  loader: 'babel-loader',
  include: join(__dirname, 'src'),
}, {
  test: /\.json$/,
  loader: 'json-loader',
}];

export default {
  devtool: 'source-map',
  entry: './src/index',
  output: {
    path: join(__dirname, 'umd'),
    library: 'react-factorial-test',
    libraryTarget: 'umd',
  },
  resolve: {
    root: join(__dirname, 'src'),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.json'],
  },
  module: { loaders },
};
