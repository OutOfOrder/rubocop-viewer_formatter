<template lang="pug">
  .offenses_wrap
    h4 {{label}}

    .offenses
      ul
        li(v-for='entry in offenses')
          slot(:entry='entry')

</template>

<script>
export default {
  name: 'OffenseList',
  props: {
    label: { type: String, required: true },
    offenses: { type: Array, required: true },
  },
};
</script>

<style scoped lang="scss">
  .offenses_wrap {
    display: flex;
    flex-direction: column;
    height: 100%;

    h4 {
      background-color: beige;
      text-align: center;
      margin: 0;
      padding: 10px 0;
      flex: 0 0 auto;
    }

    .offenses {
      flex: 1 1 auto;
      overflow-y: scroll;

      ul {
        margin: 0;
        padding: 0;

        li {
          list-style: none;
        }
      }
    }
  }
</style>
