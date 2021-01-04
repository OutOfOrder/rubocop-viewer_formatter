<template lang="pug">
  section.by_category
    section.categories
      ListEntries(:entries='categories' route-name='by_issues' route-param='categoryId')

    section.issues
      router-view
</template>

<script>
import ListEntries from '../components/ListEntries';

import { mapGetters } from 'vuex';

export default {
  name: 'ByCategories',
  components: { ListEntries },
  computed: {
    ...mapGetters(['categories']),
  },
};
</script>

<style scoped lang="scss">
  .categories {
    overflow-y: scroll;
  }
  .issues {
    display: flex;
  }
  .by_category {
    display: flex;
    overflow: hidden;
  }
</style>
