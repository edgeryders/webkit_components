<template>
  <div class="block md:block-md" :style="containerStyle(data.style)">
    <div
      class="wrapper md:wrapper-md mx-auto"
      :style="wrapperStyle(data.style)"
    >
      <div class="flex w-full" :style="textStyle('title', data.style)" :class="data.style && data.style.title && data.style.title.class" v-if="data.title" >
        <h3 :class="titleClassSize(data.style)" class="leading-tight w-full md:leading-normal">{{ data.title }}</h3>
      </div>
      <div class="w-full">
        <div v-for="(view, index) in data.views" :key="index" class="content_block md:content_block-md">
              <ImageView v-if="view.image" :mq="viewport" :data="view.image" />    
              <TextView v-if="view.text" :mq="viewport" :data="view.text" :stylesheet="view.style" />
              <FormView v-if="view.form" :mq="viewport" :data="view.form" />
        </div>
      </div>
  </div>
</div>
</template>

<script>
import TextView from "@/components/views/Text.vue";
import ImageView from "@/components/views/Image.vue";
import FormView from "@/components/views/Form.vue";

export default {
  props: ["data", "html", "stylesheet", "globalStyle"],
  components: {
    TextView,
    ImageView,
    FormView
  },
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
@responsive {
.block {
  @apply px-8 pt-1 pb-6;
  .wrapper {
    @apply flex-col;
  }
  .block_title {
    @apply border-b border-gray-200 py-0 w-full mb-1;
    h2 {
      @apply m-0 mt-6 pb-3;
      border: none;
    }
  }
}

.block-md {
  @apply px-10 py-2;
  .block_title {
    @apply mb-3;
  }
  .wrapper {
     @apply flex-row;
  }
  .block_title {
    h2 {
      @apply pb-3;
    }
  }
}
.content_block {
  @apply flex flex-col py-2;
  /deep/ h3, /deep/ h4 {
    @apply mb-4 mt-1;
  }
  /deep/ p {
    margin-bottom: 10px !important;
  }
}
.content_block-md {
  @apply flex-row;
  > div:first-child {
     @apply mr-6;
  }
}
.content_block + .content_block {
  @apply mt-4;
  }
.block /deep/ p {
  margin: 0;
}
}
</style>
