<template>
  <div class="bg-white pt-10 md:pt-0">
    <div class="section md:section-md">
      <Video :sources="custom.sources" :poster="custom.poster" />
    </div>
  </div>
</template>

<script>
import Video from "@/components/views/Video.vue";

export default {
  props: ["custom"],
  components: { Video }
}
</script>
