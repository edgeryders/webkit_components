<template>
  <div class="block_video">
    <div class="w-full" v-for="(video,index) in data" :key="index">
		<div v-if="video.vimeo" class="w-full mb-1">
			<iframe :src="'https://player.vimeo.com/video/' + video.vimeo" width="100%" :height="video.height"  frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
		</div>
		<div v-if="video.youtube" class="mb-1">
			<iframe :src="'https://www.youtube.com/embed/' + video.youtube" width="100%" :height="video.height" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
		</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "mq"]
};
</script>
<style scoped lang="scss">
@responsive {
.block_video {
  @apply mb-4 flex flex-col w-full;
  div {
  width: 100%;
  iframe {
  width: 100%;
}
}
}

.block_image-md {
  @apply mr-8;
  flex-shrink: 0;
}
}
</style>
