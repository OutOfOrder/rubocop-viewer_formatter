<template lang="pug">
  OffenseList(:label="issue.cop || '^'", :offenses='offenses')
    template(v-slot='{entry}')
      .offense
        .meta
          span.location
            | {{entry.path}}:{{entry.location.start_line}}
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
              | {{highligh_line(entry.location)}}
            | {{post_line(entry.location)}}
</template>

<script>
  import OffenseList from '../components/OffenseList';
  import SourceParsing from '../mixins/SourceParsing';

  export default {
    name: "IssueOffenses",
    components: {OffenseList},
    mixins: [SourceParsing],
    props: {
      issueId: {type: String, required: true}
    },
    computed: {
      issue() {
        return this.$store.getters.issueById(this.issueId);
      },
      offenses() {
        return this.$store.getters.offensesByIssue(this.issueId);
      }

    }
  };
</script>

<style scoped>

</style>