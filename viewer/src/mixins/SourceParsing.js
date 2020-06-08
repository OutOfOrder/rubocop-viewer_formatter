export default {
  methods: {
    pre_line(location) {
      return location.source.substring(0, location.start_column);
    },
    highlight_line(location) {
      if (location.start_line === location.last_line) {
        return location.source.substring(location.start_column, location.last_column);
      } else {
        const sourceLines = location.source.split('\n');
        let s = sourceLines[0].substring(location.start_column);
        for (let i = 1; i < sourceLines.length - 1; ++i) {
          s += '\n' + sourceLines[i];
        }
        s += '\n' + sourceLines[sourceLines.length - 1].substring(0, location.last_column);
        return s;
      }
    },
    post_line(location) {
      if (location.start_line === location.last_line) {
        return location.source.substring(location.last_column);
      } else {
        const sourceLines = location.source.split('\n');

        return sourceLines[sourceLines.length - 1].substring(location.last_column);
      }
    },
  },
};
