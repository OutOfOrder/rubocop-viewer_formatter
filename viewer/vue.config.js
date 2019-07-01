module.exports = {
  // productionSourceMap: false,
  filenameHashing: false,
  chainWebpack: config => {
    config.optimization.delete('splitChunks');
  },
  css: {
    extract: false
  }
};