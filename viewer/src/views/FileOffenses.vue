<template lang="pug">
  OffenseList(:label="file.path || '^'", :offenses='offenses')
    template(v-slot='{entry}')
      .offense
        .meta
          span.location
            | Line \#{{entry.location.start_line}}
          |
          | -
          |
          span.severity(:class='entry.severity')
            | {{entry.severity}}
          | :
          |
          span.message
            | {{entry.message}}
        pre
          code
            | {{pre_line(entry.location)}}
            span.highlight(:class='entry.severity')
              | {{highlight_line(entry.location)}}
            | {{post_line(entry.location)}}
</template>

<script>
import OffenseList from '../components/OffenseList';
import SourceParsing from '../mixins/SourceParsing';

export default {
  name: 'FileOffenses',
  components: { OffenseList },
  mixins: [SourceParsing],
  props: {
    fileId: { type: String, required: true },
  },
  computed: {
    file() {
      return this.$store.getters.fileById(this.fileId);
    },
    offenses() {
      return this.$store.getters.offensesByFile(this.fileId);
    },
  },
};
</script>

<style scoped lang="scss">
</style>
