<template>
  <div class="section md:section-md" :style="containerStyle(data.style)">
    <div
      class="wrapper md:wrapper-md mx-auto"
      :style="wrapperStyle(data.style)"
    >
      <div class="flex w-full" :style="textStyle('title', data.style)" :class="data.style && data.style.title && data.style.title.class" v-if="data.title" >
        <h3 :class="titleClassSize(data.style)" class="leading-tight w-full md:leading-normal">{{ data.title }}</h3>
      </div>
      <div class="content_wrapper md:content_wrapper-md">
      <div v-if="data.image && data.image.url" class="section_image md:section_image-md" :style="{'flex-basis': data.image.width + 'px'}">
        <img class="w-full" :src="data.image.url" />
      </div>

      <div v-if="data.video && data.video.src" class="section_video">
        <video controls class="rounded-lg overflow-hidden">
          <source :src="data.video.src" type="video/mp4" />
        </video>
      </div>
      
      <div>
        <div v-if="Array.isArray(data.text.content)" class="flex flex-col md:flex-row justify-between" :class="{'md:flex': data.text.layout == 'horizontal'}">
          <div v-for="(text, index) in data.text.content" v-html="text" :style="textStyle('paragraph', data.style)" class="section_text md:section_text-md flex-grow" :key="index"></div>
        </div>
        <div v-else v-html="data.text.content" :style="textStyle('paragraph', data.style)" class="w-full section_text"></div>
    
        <div v-if="data.text.buttons" class="action_container">
          <a class="action" v-for="item in data.text.buttons" :href="item.url" :style="styleObj(item)" :key="item.url" target="_blank">
            {{item.text}}
          </a>
        </div>

      </div>
</div>
  </div>
</div>
</template>

<script>
export default {
  props: ["data", "html", "stylesheet", "globalStyle"],
  methods: {
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
  }
};
</script>
<style scoped lang="scss">

</style>
