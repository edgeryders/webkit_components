<template>
  <div class="block_text md:block_text-md" >
    <div v-if="Array.isArray(content)" class="text_container md:text_container-md">
      <div v-for="(text, index) in content" v-html="text" class="text" :style="elementStyle(stylesheet, 'text')" :key="index"></div>
    </div>
    <div v-else v-html="content" class="text" :class="{'post': post}" :style="elementStyle(stylesheet, 'text')"></div>
</div>
</template>

<script>
import axios from "axios";

export default {
  props: ["data", "mq", "stylesheet"],
  data() {
    return { content: null, post: false };
  },
  methods: {
    isNumeric(num){
      return !isNaN(num)
    }
  },
  created() {
     if (this.isNumeric(this.data)) {
      axios.get(
        `${this.$globals.config.baseUrl}/t/${this.data}.json`
      ).then(({ data }) => {
        this.content = data.post_stream.posts[0].cooked;
        this.post = true;
      });
     } else {
      this.content = this.data
     }
  }
};
</script>
<style lang="scss">
@responsive {
.block_text {
  @apply flex;
  width: 100%;

}

.text_container {
  @apply flex flex-col;
  .text {
    @apply mr-8 ;
    flex-basis: 100%;
    &:last-child {
      @apply mr-0;
    }

  }

}

.block_text-md {
  @apply flex-row w-full items-start;
}
.text_container-md {
  @apply flex-row  w-full;
  justify-content:space-around;
}
}

.post {
    h1, h2, h3, h4, h5 {
      @apply font-bold block w-full m-0 p-0;
    }
    h1 {
      @apply mb-2 text-3xl;
    }
    h2 {
      @apply mb-2 text-2xl;
    }
    h3 {
      @apply block text-xl mb-2;
    }
    p {
      @apply w-full inline-block mb-3;
    }
    blockquote {
      @apply bg-gray-200 p-5 pl-6 border-l-2 my-3 border-gray-300;
    }
    img {
        @apply block;
        &.emoji {
        @apply my-0 float-left mr-1;
        width: 20px;
      }
    }

}
</style>
