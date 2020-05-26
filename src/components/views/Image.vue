<template>
  <div class="flex items-start block_image md:block_image-md">
    <img v-for="image in data" :key="image.url" :src="image.url" :width="image.size" />
  </div>
</template>

<script>
export default {
  props: ["data", "mq"]
};
</script>
<style scoped lang="scss">
@responsive {
.block_image {
  @apply mb-4;
  flex-shrink: 0;
}

.block_image-md {
  @apply mr-8;
  flex-shrink: 0;
}
}
</style>
