<template lang="pug">
  ul
    li(v-for='entry in entries')
      router-link(:to="{name:routeName, params:{[routeParam]:entry.key}}")
        | {{entry.label}}

</template>

<script>
export default {
  name: 'ListEntries',
  props: {
    entries: { type: Array, required: true },
    routeName: { type: String, required: true },
    routeParam: { type: String, required: true },
  },
};
</script>

<style scoped lang="scss">
  ul {
    padding: 0;
    margin: 0;

    li {
      list-style: none;

      a {
        display: block;
        padding: 2px 7px;

        &.router-link-active {
          background-color: #22dddd;
          border-radius: 10px;
        }
      }
    }
  }
</style>
