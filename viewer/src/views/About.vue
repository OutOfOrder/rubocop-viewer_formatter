<template lang="pug">
  .about
    p RuboCop version {{metadata.rubocop_version}}
    p Ruby version {{metadata.ruby_engine}}-{{metadata.ruby_version}} on {{metadata.ruby_platform}}
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'About',
  computed: {
    ...mapState(['metadata']),
  },
};
</script>
