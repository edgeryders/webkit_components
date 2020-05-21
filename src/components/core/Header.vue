<template>
  <div class="w-full" :style="containerStyle(data.style)">
    <div v-for="(view, index) in data.views" :key="index">
      <Menu v-if="view.menu" :data="$globals.navItems" :globalStyle="globalStyleSheet" :stylesheet="data.style" :open="openMenu" ref="childComponent" @toggle="toggleMenu" />
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
