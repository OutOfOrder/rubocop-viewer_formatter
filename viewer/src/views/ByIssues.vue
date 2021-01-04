<template lang="pug">
  section.by_issues.offense-view
    section.issues
      ListEntries(:entries='issues' route-name='for_issue' route-param='issueId')

    section.offenses
      router-view
</template>

<script>
import ListEntries from '../components/ListEntries';

export default {
  name: 'ByIssues',
  components: { ListEntries },
  props: {
    categoryId: { type: String, required: true },
  },
  computed: {
    issues() {
      const unsortedCategories = this.$store.getters.issuesByCategory[this.categoryId] || [];
      const categories = [...unsortedCategories];
      return categories
        .map((a) => ({ key: a, label: a.split('/')[1] }))
        .sort((a, b) => a.label > b.label);
    },
  },
};
</script>

<style scoped lang="scss">
  .issues {
    overflow-y: scroll;
  }
</style>
