<template>
  <div class="block_text md:block_text-md" >
    <div v-if="Array.isArray(data)" class="text_container md:text_container-md">
      <div v-for="(text, index) in data" v-html="text" class="text" :key="index"></div>
    </div>
    <div v-else v-html="data" class="text"></div>
</div>
</template>

<script>
export default {
  props: ["data", "mq"]
};
</script>
<style lang="scss">
@responsive {
.block_text {
  @apply mr-6 leading-relaxed flex justify-between;
  flex-basis: 100%;
  &:last-child {
    @apply mr-0;
  }
}

.text_container {
  @apply flex flex-col;
  .text {
    @apply mr-8 ;
    flex-basis: 100%;
    &:last-child {
      @apply mr-0;
    }
    p {
      @apply block mb-3;
    }
    /deep/ h3 {
      margin-bottom: 30px !important;
    }
  }
  p {
    @apply mb-3;
  }
}

.block_text-md {
  @apply flex-row;
}
.text_container-md {
  @apply flex-row;
}
}

</style>
