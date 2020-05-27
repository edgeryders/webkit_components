<template>
    <div class="hero_standard md:hero_standard-md" :style="elementStyle(data.style.wrapper, 'wrapper')" :class="elementClass(data.style.wrapper.class)">
      <div class="hero_image md:hero_image-md" v-if="data.image" :style="getImageWidth(data.image.width)">
        <img :src="data.image.url" />
      </div>
      <div class="hero_content md:hero_content-md">
        <div class="hero_title flex flex-col md:hero_title-md">
          <h1 v-if="data.title" :class="getClass('title', data.style)" contenteditable  @blur="event => onInput(event, 'title')" :style="textStyle('title', data.style)" v-html="data.title"></h1>
          <h3 v-if="data.subtitle" :style="textStyle('subtitle', data.style)"  :class="getClass('subtitle', data.style)" v-html="data.subtitle"></h3>
        </div>
        <div class="hero_description" contenteditable  @blur="event => onInput(event, 'text.content')" v-html="data.text" :style="textStyle('paragraph', data.style)"></div>
        <div class="hero_actions md:hero_actions-md">
            <a v-for="item in data.buttons" :style="uiStyle('button', data.style)" :class="getClass('button', data.style)" :href="item.url" :key="item.url">
              {{item.text}}
            </a>
        </div>
      </div>

  </div>
</template>

<script>
import moment from "moment";

export default {
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("MMMM Do YYYY");
    }
  },
  methods: {
    onInput(event, property) {
      const edited = event.target.innerText;
      function setValue(obj,access,value){
            if (typeof(access)=='string'){
                access = access.split('.');
            }
            if (access.length > 1){
                setValue(obj[access.shift()],access,value);
            }else{
                obj[access[0]] = value;
            }
        }

      
       setValue(this.$globals.blocks[0],property,edited);

    },
    styleObj(item) {
      var styleObj = {
        background: '#000',
        color: '#fff'
      };
      if (item.background) {
        styleObj["background"] = item.background;
      };
      if (item.color) {
        styleObj["color"] = item.color;
      };
      return styleObj;
    }
  },
  props: ["data", "globalStyle", "event", "index"]
};
</script>

<style lang="scss">
@responsive {
.hero_standard {
  @apply flex flex-col;
  margin: 0 auto;
  .hero_title-md {
    padding: 0;
  }
}
  .hero_actions {
    @apply flex flex-col mt-4;
    a {
      @apply w-full;
    }
  }
.content_wrapper {
  @apply inline-block;
}
.hero_image {
   @apply inline-block;
}
.hero_title {
  @apply leading-tight;
}
.hero_description {
  @apply text-lg mt-2;
  white-space: pre-wrap;
}


.hero_standard-md {
  @apply flex flex-row items-center justify-center pt-2;
  img {
    width: 80%;
  }
  .content_wrapper {
    @apply flex;
  }
}
  .hero_actions-md {
    @apply inline-block;
    a {
      width: auto !important;
    }
  }
}
</style>
