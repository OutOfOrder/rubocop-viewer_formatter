<template lang="pug">
  section.by_issues.offense-view
    section.issues
      ListEntries(:entries='issues' route-name='for_issue' route-param='issueId')

    section.offenses
      router-view
</template>

<script>
  import ListEntries from '../components/ListEntries';

  import {mapGetters} from 'vuex';

  export default {
    name: "ByIssues",
    components: {ListEntries},
    computed: {
      ...mapGetters(['issues']),
    },
  };
</script>

<style scoped lang="scss">
  .issues {
    overflow-y: scroll;
  }
</style>