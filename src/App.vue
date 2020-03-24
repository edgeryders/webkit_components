<template>
  <div class="flex flex-col w-full">
    <Navigation style="margin-bottom: 60px" :data="selectedComponents" />
    <div v-for="section in data.sections" :key="section.title" :id="section.id">
      <Hero v-if="section.type == 'hero'" :baseUrl="data.baseUrl" :custom="section" />
      <Courses v-if="section.type == 'courses'" :baseUrl="data.baseUrl" :custom="section" />
      <Current v-if="section.type == 'current'" :baseUrl="data.baseUrl" :custom="section" />
      <Custom v-if="section.type == 'custom'" :custom="section" html=true />
      <Discussion v-if="section.type == 'discussion'" :baseUrl="data.baseUrl" :custom="section" />
      <Edgeryders v-if="section.type == 'edgeryders'" :custom="section" />
      <Events v-if="section.type == 'events'" :baseUrl="data.baseUrl" :custom="section" />
      <Form v-if="section.type == 'form'" :baseUrl="data.baseUrl" :custom="section" />
      <HowItWorks v-if="section.type == 'howItWorks'" />
      <Jobs v-if="section.type == 'jobs'" />
      <Mission v-if="section.type == 'mission'" :baseUrl="data.baseUrl" :custom="section" />
      <People v-if="section.type == 'people'" :baseUrl="data.baseUrl" :custom="section" />
      <Partners v-if="section.type == 'partners'" :custom="section" />
      <Share v-if="section.type == 'share'" :baseUrl="data.baseUrl" :custom="section" />
      <Stories v-if="section.type == 'stories'" :baseUrl="data.baseUrl" :custom="section" />
      <Topics v-if="section.type == 'topics'" :baseUrl="data.baseUrl" :custom="section" />
      <Users v-if="section.type == 'users'" :baseUrl="data.baseUrl" :custom="section" />
      <Video v-if="section.type == 'video'" :custom="section" />
    </div>

    <Terms />
  </div>
</template>

<script>
import data from "@/data/covid19.json";

import Discussion from "@/components/Discussion.vue";
import Courses from "@/components/Courses.vue";
import Current from "@/components/Current.vue";
import Custom from "@/components/Custom.vue";
import Edgeryders from "@/components/Edgeryders.vue";
import Events from "@/components/Events.vue";
import Form from "@/components/Form.vue";
import Hero from "@/components/Hero.vue";
import HowItWorks from "@/components/HowItWorks.vue";
import Jobs from "@/components/Jobs.vue";
import Mission from "@/components/Mission.vue";
import Navigation from "@/components/Navigation.vue";
import Partners from "@/components/Partners.vue";
import People from "@/components/People.vue";
import Share from "@/components/Share.vue";
import Stories from "@/components/Stories.vue";
import Terms from "@/components/Terms.vue";
import Topics from "@/components/Topics.vue";
import Users from "@/components/Users.vue";
import Video from "@/components/Video.vue";

export default {
  name: "home",
  data() {
    return { data };
  },
  components: {
    Discussion,
    Courses,
    Current,
    Custom,
    Edgeryders,
    Events,
    Form,
    Hero,
    HowItWorks,
    Jobs,
    Mission,
    Navigation,
    Partners,
    People,
    Share,
    Stories,
    Terms,
    Topics,
    Users,
    Video
  },
  computed: {
    selectedComponents() {
      return this.data.sections
        .filter(({ id }) => id)
        .map(({ id, title }) => ({ id, title }))
    }
  }
};
</script>
