<template>
  <div class="hero_container">
    
    <div v-if="config.template">
      <component v-bind:is="config.template" :baseUrl="config.baseUrl" :globalStyle="globalStyle" :data="data"></component>
    </div>

   <Standard v-else :globalStyle="globalStyle" :data="data" />

  </div>
</template>

<script>
import moment from "moment";
import Standard from "@/components/views/Hero/Standard.vue";

export default {
  methods: {
  },
  components: {
    Standard
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("MMMM Do YYYY");
    }
  },
  props: ["data", "config", "stylesheet", "baseUrl", "globalStyle"]
};
</script>


<style scoped lang="scss">

.hero {
@apply border-b;
 background-attachment: fixed !important;
}

.hero_container {
  @apply inline-block w-full;

}



</style>
