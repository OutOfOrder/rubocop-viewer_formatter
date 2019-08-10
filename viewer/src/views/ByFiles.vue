<template lang="pug">
  section.by_files.offense-view
    section.files
      ListEntries(:entries='files' route-name='for_file' route-param='fileId')

    section.offenses
      router-view
</template>

<script>
  import ListEntries from '../components/ListEntries';

  import {mapGetters} from 'vuex';

  export default {
    name: "ByFiles",
    components: {ListEntries},
    computed: {
      ...mapGetters(['files']),
      
    },
  };
</script>

<style scoped lang="scss">
  .files {
    overflow-y: scroll;
  }
</style>