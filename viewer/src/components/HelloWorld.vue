<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <input
      type="file"
      accept="application/json"
      @change="processJSON"
    >
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    props: {
      msg: {type: String, required: true}
    },
    methods: {
      processJSON(e) {
        const target = e.target;
        const files = target.files;

        let reader = new FileReader();
        reader.addEventListener('loadend', () => {
          let json = JSON.parse(reader.result);
          this.$store.commit('LOAD_JSON', json);
        });

        reader.readAsText(files[0]);
      }
    }
  };
</script>

<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
