<template>
  <div class="block_text md:block_text-md" >
    <div v-if="Array.isArray(data)" class="text_container md:text_container-md">
      <div v-for="(text, index) in data" v-html="text" class="text" :style="elementStyle(stylesheet, 'text')" :key="index"></div>
    </div>
    <div v-else v-html="data" class="text" :style="elementStyle(stylesheet, 'text')"></div>
</div>
</template>

<script>
export default {
  props: ["data", "mq", "stylesheet"]
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

</style>
