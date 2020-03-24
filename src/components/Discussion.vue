<template>
  <div class="bg-white pt-10 md:pt-0 md:bg-gray-200">
    <div class="section md:bg-gray-200">
      <h1 v-if="custom.title" class="section_title">
        {{ custom.title }}
      </h1>
      <h3 v-if="custom.subtitle" class="font-display text-2xl">
        {{ custom.subtitle }}
      </h3>

      <div class="w-full flex flex-col md:flex-row justify-between">
        <div class="flex flex-col items-stretch w-full md:w-1/2 px-6 md:px-10 mt-4 md:p-12 md:mt-0 text-left">
          <p v-html="custom.description" class="flex-grow text-xl" />
          <a href='#events'>
            <button class="text-white bg-primary border border-primary text-xm font-semibold rounded-lg px-4 py-3 leading-normal">
              {{ custom.submit }}
            </button>
          </a>
        </div>

        <div class="md:w-1/2 px-4 md:block md:px-8 md:mt-8 md:pt-4 text-left text-xl border-l border-gray leading-normal discussion-wrapper">
          <div v-for="post in discussion.posts" :key="post.id" class="w-full flex content-align discussion">
            <div class="w-full flex flex-col md:flex-row items-center md:content-center mb-8">
              <div class="mt-10 mb-8 md:mt-0 md:mr-8 w-20 h-20 flex-none bg-white rounded-full shadow-lg border-4 border-white overflow-hidden object-cover bg-cover" :style="{ backgroundImage: `url(${post.avatar_url})` }" />
              <div class="p-8 flex-grow bg-white rounded-lg md:shadow-xl bubble">
                <p v-html="post.cooked" v-if='post.excerpt' />
                <div class="footer text-lg mt-4 flex items-stretch items-center h-12">
                  <a :href="post.url" target="_blank" class="font-bold pr-4 border-r border-gray-200 flex items-center" v-if='post.username'>@{{ post.username }}</a>
                  <a :href="post.url" target="_blank" class="date flex items-center text-base px-4 bg-white border-r border-gray-200" v-if='post.created'>{{ post.created_at | formatDate() }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  props: ["custom", "baseUrl"],
  data() {
    return { discussion: {} }
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("DD/MM/YY");
    }
  },
  created() {
    axios.get(`${this.baseUrl}/webkit_components/topics/${this.custom.discussionId}.json`).then(({ data }) => {
      this.discussion = data.discussion
    })
  }
};
</script>

<style lang="scss" scoped>

.discussion-wrapper {
  max-height: 400px;
  overflow: auto;
}

.discussion {
  min-height: 400px;
}

.bubble {
  position: relative;
  border-radius: .4em;
}
.bubble:after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  border: 20px solid transparent;
  border-bottom-color: #fff;
  border-top: 0;
  margin-left: -20px;
  margin-top: -20px;
}
@media (min-width: 640px) {
.bubble:after {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 0;
  height: 0;
  border: 20px solid transparent;
  border-right-color: #fff;
  border-left: 0;
  border-top: 0;
  margin-top: -10px;
  margin-left: -20px;
}
 }
</style>
