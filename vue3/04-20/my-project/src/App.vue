<template>
  <div>123</div>
  <div>{{ count }}</div>
  <button @click="updateCount">加一</button>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    const count = ref(0);

    function updateCount() {
      count.value++;
    }
    return {
      count,
      updateCount,
    };
  },
});
</script>

<style></style>
