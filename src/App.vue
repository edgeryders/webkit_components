<template>
    <div class="site_container">
      <div v-if="globalStyleSheet">
        <div v-for="(section, index) in sections" :key="index" :id="section.id">
          <component v-bind:is="section.type" :key="componentKey + index" :baseUrl="$globals.config.baseUrl" :globalStyle="globalStyleSheet" :data="section" :index="index"></component>
        </div>
      </div>
    </div>
</template>

<script src="js-yaml.min.js"></script>
<script>

import Nav from "@/components/ui/Navigation.vue";
import MobileMenu from "@/components/ui/Mobile_Menu.vue";

import hero from "@/components/core/Hero.vue";
import Header from "@/components/core/Header.vue";
import custom from "@/components/core/Custom.vue";
import Content from "@/components/core/Content.vue";
import events from "@/components/edgeryders/Events.vue";
import topics from "@/components/core/Topics.vue";
import people from "@/components/core/People.vue";
import users from "@/components/core/Users.vue";
import partners from "@/components/edgeryders/Partners.vue";
import edgeryders from "@/components/edgeryders/About.vue";
import custom_form from "@/components/core/Form.vue";
import terms from "@/components/edgeryders/Terms.vue";

export default {
  name: "home",
  data() {
    return {
      category: { users: [] },
      categories: [],
      componentKey: 0,
      stylesheet: null,
      openMenu: false,
      openConfig: null,
      view: 'configure'
    };
  },
  components: {
    people,
    users,
    topics,
    events,
    hero,
    Header,
    Nav,
    MobileMenu,
    custom,
    Content,
    partners,
    edgeryders,
    custom_form,
    terms
  },
  created() {
   this.getData();
    
    // this.sections.map(section => {
    //   return Vue.component(section.type, require(section.path + '.vue'))
    // });
  },
  mounted() {

  },
  methods: {
    getSectionData(type) {
      return this.sections.find(section => section.type === type) || {};
    },
    toggleMenu() {
      this.openMenu = !this.openMenu;
    },
    toggleConfig(value) {
      if (this.openConfig == value) {
        this.openConfig = null
      } else {
        this.openConfig = value;
      }
    }
  },
  computed: {
  }
};
</script>
<style lang="scss">
.sidebar_container {
  @apply relative;
    width: 450px;
    height: 100vh;
    @apply overflow-scroll bg-gray-100 border-r;
    .sidebar_options {
      @apply flex w-full border-t border-b;
      .button {
        @apply w-full text-center font-bold p-4;
        &:first-child {
          @apply border-r;
        }
        &.active {
          @apply bg-gray-200;
        }
        &:hover {
          cursor: pointer;
          @apply bg-gray-100;
        }
      }
    }
    .container {
      @apply p-4 ;
      h4 {
        @apply relative text-xl font-bold border-b border-gray-300 pb-2 mb-2;
        &:hover {
          cursor: pointer;
        }
       &:before {
          content: "";
          display: inline-block;
          width: 0;
          height: 0;
          position: relative;
          top: -1px;
          border-style: solid;
          margin: 0 10px 0 2px;
          border-width: 4.5px 0 4.5px 6px;
          border-color: transparent transparent transparent rgba(0,0,0,0.2);
          transform: rotate(0deg);
          transition: transform .5s ease;
        }
        &.active {
          &:before {
            transform: rotate(90deg);
            border-color: transparent transparent transparent #000;
          }
        }
      }
      h5 {
         @apply text-sm font-bold  mb-2;
      }
      &.json {
        pre {
        word-wrap: break-word;
        }
      }
  }
}
.edit_container {
  @apply inline-block w-full border mb-2;
  &.select {
    border: none;
  }
}
.block_config {
  max-height: 0px;

  overflow: hidden;
  transition: max-height .3s ease;
  &.active {
    max-height: 1500px;
      @apply pb-4;
  }
}
.edit {
  @apply flex w-full justify-between items-center border-b overflow-hidden;
  p {
    @apply bg-gray-100 px-3 py-2 border-r h-full font-bold; 
    flex-shrink: 0;
    min-width: 90px;
    font-size: 12px;
  }
  input {
    @apply border flex-grow border-none px-2 py-2;
    font-size: 12px;
    width: 100%;
  }
  select {
    @apply w-full p-3;
    height: 30px;
    font-size: 14px;
  }
  &.select {
    border: none !important;
  }
  
  &.textarea {
    @apply flex-col items-start;
    p {
      @apply text-left border-none; 
    }
    textarea {
      @apply p-2 w-full;
      min-height: 120px; 
       font-size: 12px;
    }
  }
}
.sandbox_container {
  @apply flex fixed w-full h-full;
}
.site_container {
  @apply flex flex-col w-full overflow-scroll;
}
</style>

