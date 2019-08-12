export default {
  methods: {
    pre_line(location) {
      return location.source.substring(0, location.start_column);
    },
    highlight_line(location) {
      if (location.start_line === location.last_line) {
        return location.source.substring(location.start_column, location.last_column);
      } else {
        let source_lines = location.source.split('\n');
        let s = source_lines[0].substring(location.start_column);
        for (let i = 1; i < source_lines.length - 1; ++i) {
          s += '\n' + source_lines[i];
        }
        s += "\n" + source_lines[source_lines.length - 1].substring(0, location.last_column);
        return s;
      }
    },
    post_line(location) {
      if (location.start_line === location.last_line) {
        return location.source.substring(location.last_column);
      } else {
        let source_lines = location.source.split('\n');

        return source_lines[source_lines.length - 1].substring(location.last_column);
      }
    }
  }
};