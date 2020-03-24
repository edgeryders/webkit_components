<template>
  <div class="md:bg-gray-200 pb-8">
    <div class="text-center section md:section-md md:bg-gray-200">
      <h1 class="text-center section_title">{{ custom.title }}</h1>
      <p class="text-left" v-html="custom.description" />
      <a :href="`${baseUrl}/c/${custom.category}`" target="_blank">
        <button class="text-white bg-primary border border-primary text-xm font-semibold rounded-lg px-4 py-3 mt-6 leading-normal">
          {{ custom.submit }}
        </button>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["baseUrl", "custom"]
};
</script>

<style lang="scss" scoped>
  h1 {
    text-align: center !important;
    display: block !important;
    color: #ff4500;
  }

  .call_to_action {

  }
</style>
