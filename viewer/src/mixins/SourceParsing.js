export default {
  methods: {
    pre_line(location) {
      return location.source.substring(0, location.start_column);
    },
    highligh_line(location) {
      return location.source.substring(location.start_column, location.last_column);
    },
    post_line(location) {
      return location.source.substring(location.last_column);
    }
  }
};