<template>
  <div class="w-full" :style="elementStyle(data.style.container, 'container')" :class="elementClass(data.style.container.class)">
    <div v-for="(view, index) in data.views" :key="index">
      <Menu v-if="view.menu" :anchor="getAnchorLinks(view.menu)" :external="getExternalLinks(view.menu)" :globalStyle="globalStyleSheet" :stylesheet="data.style" :open="openMenu" ref="childComponent" @toggle="toggleMenu" />
      <Hero style="margin-top: 60px" v-if="view.hero" :data="view.hero" :config="view.hero.config" :globalStyle="globalStyleSheet" :stylesheet="data.style" :open="openMenu" ref="childComponent" @toggle="toggleMenu" />
    </div>
    
  </div>
</template>

<script>
import moment from "moment";
import Menu from "@/components/ui/Navigation.vue";
import Hero from "@/components/views/Hero.vue";

export default {
  methods: {
    getAnchorLinks(data){
      if (data.config && data.config.id !== false) {
        return this.$globals.navItems
      } else {
        return null
      }
    },
    getExternalLinks(data) {
      if (data.config && data.config.external) {
        return data.config.external
      } 
    }
  },
  components: {
    Menu,
    Hero
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("MMMM Do YYYY");
    }
  },
  props: ["category", "data", "baseUrl", "globalStyle", "index"]
};
</script>


<style scoped lang="scss">

.hero {
@apply border-b;
 background-attachment: fixed !important;
}



</style>
