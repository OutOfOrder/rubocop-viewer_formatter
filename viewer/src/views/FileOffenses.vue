<template lang="pug">
  OffenseList(:label="file.path || '^'", :offenses='offenses')
    template(v-slot='{entry}')
      Offense(:entry='entry')
        | Line \#
</template>

<script>
import Offense from '../components/Offense';
import OffenseList from '../components/OffenseList';
import SourceParsing from '../mixins/SourceParsing';

export default {
  name: 'FileOffenses',
  components: { Offense, OffenseList },
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
