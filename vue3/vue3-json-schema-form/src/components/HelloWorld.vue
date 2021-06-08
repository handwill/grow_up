<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>{{ name }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface Config {
  name: string;
}

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String as PropType<string>,
    config: {
      type: Object as PropType<Config>,
      required: true,
    },
  },
  setup(props, { slots, attrs, emit }) {
    return {
      name: "nihao1",
    };
  },
  mounted() {
    console.log(this.config.name);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
