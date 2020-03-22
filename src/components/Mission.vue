<template>
  <div class="pt-10 md:pt-0 md:bg-gray-200">
    <div class="section md:section-md md:bg-gray-200">
      <h1 class="section_title">
        {{ custom.title }}
      </h1>
      <h3 class="font-display text-2xl">
        {{ custom.subtitle }}
      </h3>

      <div class="w-full flex flex-col md:flex-row items-start justify-between">
        <div class="w-full md:w-1/2 pr-8 mt-4 text-left leading-normal">
          <p v-html="custom.description" class=" text-xl" />
        </div>
        <div class="w-full md:w-1/2 px-8 mt-6 md:mt-8 mb-8 md:pt-2 text-left text-xl border-l border-gray leading-normal">
          <div class="w-full flex items-start">
            <Video
              :sources="custom.video.src"
              :poster="custom.video.img"
              :skip-backward="-20"
              :skip-forward="55"
              :auto-play="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Video from "@/components/views/Video.vue";
  export default {
    components: { Video },
    props: ["custom"]
  };
</script>
