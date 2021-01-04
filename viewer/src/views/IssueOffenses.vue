<template lang="pug">
  OffenseList(:label="issue.cop || '^'", :offenses='offenses')
    template(v-slot='{entry}')
      Offense(:entry='entry')
        | {{entry.path}}:
</template>

<script>
import Offense from '../components/Offense';
import OffenseList from '../components/OffenseList';
import SourceParsing from '../mixins/SourceParsing';

export default {
  name: 'IssueOffenses',
  components: { Offense, OffenseList },
  mixins: [SourceParsing],
  props: {
    issueId: { type: String, required: true },
  },
  computed: {
    issue() {
      return this.$store.getters.issueById(this.issueId);
    },
    offenses() {
      return this.$store.getters.offensesByIssue(this.issueId);
    },

  },
};
</script>

<style scoped>

</style>
