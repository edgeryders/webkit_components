<template>
    <div class="hero_standard content_wrapper md:content_wrapper-md w-full" :style="elementStyle(data.style, 'wrapper')" >
     {{elementStyle(data.style, 'wrapper')}}
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
  margin: 0 auto;
  .hero_title-md {
    padding: 0;
  }
}
.hero_image {
  @apply flex items-center justify-center pt-2;
  img {
  width: 80%;
}
}

.hero_description {
  @apply text-lg mt-2;
  white-space: pre-wrap;
}

.hero_actions {
  @apply flex pt-3;
  a {
    @apply text-sm p-3 rounded-sm;
    font-size: 14px;
    &:hover {
      @apply bg-gray-300;
      background: #efefef !important;
    }
  }
}

}
</style>
