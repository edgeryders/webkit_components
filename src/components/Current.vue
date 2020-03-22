<template>
  <div class="w-full px-6 md:px-20 md:py-0">
    <h2 class="font-display text-4xl text-left font-bold md:text-5xl mb-4 md:mb-0 md:mt-0 md:ml-0 md:mb-1 leading-tight md:leading-normal font-medium">
      {{ custom.title }}
    </h2>

    <h2 class="font-display text-2xl text-left font-bold leading-tight md:leading-normal">
      {{ custom.subtitle }}
    </h2>

    <div class="w-full py-4 md:py-8 flex flex-col md:flex-row">
      <div class="flex flex-col sidebar mr-10">
        <ul class="upcoming w-full h-20 mb-4 md:mb-0 md:px-0 md:h-auto text-left">
          <li class="pb-3 p-4 text-xl" @click="activate('events')" :class="{active: active == 'events'}"><span class="hidden md:inline">Current</span> Events</li>
          <li class="pb-3 p-4 text-xl" @click="activate('conversations')" :class="{active: active == 'conversations'}"><span class="hidden md:inline">Active</span> Conversations</li>
          <li class="pb-3 p-4 text-xl" @click="activate('calls')" :class="{active: active == 'calls'}"><span class="hidden md:inline">Community</span> Calls</li>
        </ul>

        <div class="w-full mt-8 rounded-lg bg-black p-4 hidden md:block now">
          <div class="question"></div>
          <p class="text-white font-body text-left">Want to know what we're up to <b>right now?</b> Check out <a href="https://ernow.netlify.com" class="font-bold underline" target="_blank">Now</a> for realtime updates from us.</p>
        </div>
      </div>

      <div class="w-full px-0 md:px-0 md:w-2/3 p-2 md:p-0 text-left events" v-if="active == 'events'">
        <swiper :options="sliderOptions" class='md:px-10' ref="mySwiper">
          <swiper-slide class="story_slide" v-for="(story, index) in events" :key="index" :index="index">
            <div class="story bg-cover bg-center flex flex-col shadow-lg" style="height: 400px; width: 100% !important; margin: 0 auto !important; background-repeat: no-repeat; background-color: RGBA(66, 103, 178, 1.00)" :style="{ backgroundImage: 'url(' + story.image + ')' }">
              <p class="px-0 w-full md:w-auto pb-0 event_date" v-if="story.date">{{story.date | formatDate }}</p>
              <a :href='story.link' target="_blank" class="mt-auto text-left p-4 md:p-12 pb-3 text-white z-20 relative z-9 ">
                <h4 class="font-body text-2xl border-b border-white-50 pb-4 mb-3 px-0 md:text-2xl font-bold text-left md:px-0 text-white leading-tight" style="text-shadow: 0px 1px 2px rgba(0,0,0,.9)">{{story.title}} </h4>
                <p class="px-0 pr-0 md:pr-0 pb-0 font-body">{{story.excerpt.substring(0,200)}}...</p>
                <span class="likes font-body">{{story.likes}}</span>
              </a>
            </div>
          </swiper-slide>
        </swiper>

        <div class="slider-arrow left hidden md:block" @click='back()'></div>
        <div class="slider-arrow right hidden md:block" @click='forward()'></div>
      </div>

      <div class="w-full px-0 md:px-0 md:w-2/3 p-2 md:p-0 text-left conversations" v-if="active == 'conversations'">
        <div class="entry" v-for="(entry, index) in activeConversations" :key="index">
          <div class="box" :style="{'background': colors[index]}">
            <h3>{{entry.title}}</h3>
          </div>
          <Profile class='profile' :data='entry.author' text="Started by" />
        </div>
      </div>

      <div class="w-full px-0 md:px-0 md:w-2/3 p-2 md:p-0 text-left conversations" v-if="active == 'calls'">
        <div class="entry" v-for="(entry, index) in activeCalls" :key="index">
          <div class="box" :style="{'background': colors[index]}">
            <div class="time">{{entry.created | formatDateShort}} @ {{entry.created | formatTime}}</div>
            <h3>
              <a :href="'https://edgeryders.eu/t/' + entry.slug">{{entry.title}}</a>
            </h3>
          </div>
          <Profile class='profile' text="Hosted by" :data="entry.author" :key="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Profile from "@/components/Profile.vue";
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
      events: [],
      conversations: [],
      calls: [],
      activeIndex: 0,
      colors: ["#845EC2", "#74b14f", "#6ea6be", "#fca524", "#f9530f", "#7ac58d", "#e83e68", "#ea7e4e", "#81669a"],
      active: 'events',
      sliderOptions: {
        autoplay: true,
        speed: 1200,
        delay: 500,
        slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            spaceBetween: 30,
            slidesPerColumnFill: "row",
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        breakpoints: {
          640: {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            centeredSlides: true,
            spaceBetween: 30,
            slidesPerColumnFill: "row",
          }
        }
      }
    };
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("dddd MMMM Do YYYY");
    },
    formatDateShort: function(value) {
      return moment(String(value)).format("DD MMMM YYYY");
    },
    formatTime: function(value) {
      return moment(String(value)).format("h:mma");
    }
  },
  methods: {
    activate:function(el){
      this.active = el;
    },
    back() {
      this.$refs.mySwiper.swiper.slidePrev();
    },
    forward() {
     this.$refs.mySwiper.swiper.slideNext();
    }
  },
  computed: {
    activeConversations() {
      return this.conversations.slice(0, 5);
    },
    activeCalls() {
      return this.calls.slice(0, 5);
    }
  },
  components: {
    swiper,
    swiperSlide,
    Profile
  },
  props: ["custom", "baseUrl"],
  mounted() {
    axios.get(`${this.baseUrl}/festival`).then(({ events, conversations, calls }) => {
      this.events = events;
      this.conversations = conversations;
      this.calls = calls;
    })
  }
};
</script>

<style type="text/css" lang="scss" scoped>
.slider-arrow {
  top: 44%;
  position: absolute;
  z-index:99999;
  border-radius: 100px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 30' %3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.1 4.6A1.5 1.5 0 0 0 15 2.4l-8.5 8.1a2 2 0 0 0 0 3l8.5 8.1a1.5 1.5 0 1 0 2.1-2.2L9.4 12l7.7-7.4z' fill='%23FFF'/%3E%3C/svg%3E") #000 no-repeat 43% 65%;
  width: 50px;
  height: 50px;
  box-shadow: 0 2px 10px rgba(0,0,0,.4);
  background-size: 50%;
  &.left {
    left: 15px;
    background-position: 43% 67%;
  }
  &.right {
    left: auto;
    right: 15px;
    transform: scale(-1);
    box-shadow: 0 -2px 10px rgba(0,0,0,0.4);
    background-position: 45% 67%;
  }
  &:hover {
    cursor: pointer;
  }
  &.left:active {
    transform: scalex(1.05)
  }
  &.right:active {
    transform: scalex(-1.05)
  }
}
.question {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'%3E%3Cpath fill='%23fff' d='M50 4.3a45.8 45.8 0 10.1 91.6A45.8 45.8 0 0050 4.2zm4.7 71.3H44.5V66h10.2v9.6zm6.6-25.8c-3 2.2-6.2 4-6.8 8.1v2.7H45v-3.2c.5-6 3.3-8.8 6.1-11 2.7-2.1 5.1-3.7 5.1-7.5 0-4.2-2.2-6.3-6-6.3-5 0-7 4.2-7.1 9.1H32.8c.2-10 6.8-17.3 17-17.3 13.2 0 17.4 8.2 17.4 13.5a13 13 0 01-5.9 11.9z'/%3E%3C/svg%3E") no-repeat;
  width: 35px;
  height: 35px;
}
.now {
  min-width: 330px !important;
  max-width: 330px !important;
}
.upcoming {
  border-radius: 10px !important;
  overflow: hidden;
  height: auto !important;
  min-width: 330px !important;
  max-width: 330px !important;
  li {
    font-weight: bold;
    background: rgba(0,0,0,0.07);
    &:last-child {
      border-radius: 0 0 10px 10px;
    }
    &:hover {
      cursor: pointer;
    }
    &.active {
      background: rgba(0,0,0,0.9);
      color: white;
      width: 100%;
      position: relative;
    }
  }
}
.conversations {
  columns: 2;
  @for $i from 1 to 10 {
    .entry:nth-child(#{$i}) {
      animation-delay: $i * 0.05s !important;
    }
  }
  .entry {
    height: auto;
    opacity: 0;
    width: 100%;
    position: relative;
    padding-bottom: 20px;
    break-inside: avoid;
    animation: scale-easeInElastic 1.5s reverse forwards;

    .profile {
      border-radius: 0 0 10px 10px !important;
      overflow: hidden;
      position: absolute;
      bottom: 20px;
    }
    .box {
      border-radius: 10px 10px 0 0;
      color: white;
      border-radius: 10px !important;
      padding: 0px 0 50px;
      position: relative;
      overflow: hidden;
      font-weight: bold;
      .time {
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 443 553.8' %3E%3Cpath fill='white' d='M222 0c122 0 221 99 221 222 0 122-99 221-221 221a221.5 221.5 0 110-443zm0 20a201.4 201.4 0 100 403c111 0 201-90 201-201 0-112-90-202-201-202z'/%3E%3Cpath stroke='2px'  fill='white' d='M215 47c0-4 3-7 7-7 3 0 6 3 6 7v21c0 3-3 6-6 6-4 0-7-3-7-6V47zM129 73c-2-3-1-7 2-8 3-2 7-1 9 2l10 18c2 3 1 7-2 9s-7 1-9-3l-10-18zM67 140c-3-2-4-6-2-9 1-3 5-4 8-2l19 10a6.5 6.5 0 11-7 11l-18-10zM47 228c-4 0-7-3-7-6 0-4 3-7 7-7h21c3 0 6 3 6 7 0 3-3 6-6 6H47zM73 315c-3 1-7 0-8-3-2-3-1-7 2-8l18-11c3-2 7-1 9 2 2 4 1 7-3 9l-18 11zM140 376c-2 4-6 5-9 3s-4-6-2-9l10-18c2-3 6-4 9-2 3 1 4 5 2 8l-10 18zM228 397c0 3-3 6-6 6-4 0-7-3-7-6v-21c0-4 3-7 7-7 3 0 6 3 6 7v21zM315 370c1 3 0 7-3 9s-7 1-8-3l-11-18c-2-3-1-7 2-8 4-2 7-1 9 2l11 18zM376 304c4 2 5 5 3 8s-6 4-9 3l-18-11c-3-2-4-6-2-9 1-3 5-4 8-2l18 11zM397 215c3 0 6 3 6 7 0 3-3 6-6 6h-21c-4 0-7-3-7-6 0-4 3-7 7-7h21zM370 129c3-2 7-1 9 2s1 7-3 9l-18 10c-3 2-7 1-8-2-2-3-1-7 2-9l18-10zM304 67c2-3 5-4 8-2 3 1 4 5 3 8l-11 19a6.5 6.5 0 11-11-7l11-18zM212 137c0-6 4-10 10-10 5 0 10 4 10 10v81l39 39c4 4 4 10 0 14s-10 4-14 0l-45-45v-89z'/%3E%3C/svg%3E") no-repeat rgba(255,255,255,0.2) 15px 70% ;
        height: 50px;
        display: flex;
        align-items: center;
        padding-left: 50px;
        width: 100%;
        background-size: 24px;
      }

      .footer {
        background: white;
        width: 100%;
        height: 50px;
      }
      h3 {
        margin: 20px;
        font-size: 1.3rem;
        line-height: 1.6rem;
        padding-right: 50px;
      }
    }
  }
}

.story {
  position: relative;
  overflow: hidden;
  align-items: flex-start !important;
  .event_date {
    background: #000;
    display: inline;
    width: auto;
    font-weight: bold;
    position: relative;
    z-index: 999;
    margin: 20px 40px;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.4);
    align-self: flex-start !important;
    border-radius: 5px;
    text-align: center;
    padding: 12px 15px 10px;
    color: white;
    margin-bottom: 10px !important;
  }
  .likes {
    display: inline-block;
    background: white;
    padding: 12px 15px 10px 30px;
    border-radius: 5px;
    margin: 2px 0px 0 5px;
    color: white;
    font-size: 1rem !important;
    font-weight: bold;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 100 125'%3E%3Cpath fill='white' d='M99.8 31.2c-1.4-16-12.8-27.7-27-27.7a26.9 26.9 0 00-23 13.3A26 26 0 0027.2 3.5C13 3.5 1.6 15.2.2 31.2c-.2.7-.6 4.5.8 10.6a45.2 45.2 0 0013.8 23l34.9 31.7 35.4-31.6A45.2 45.2 0 0099 41.8c1.4-6.1 1-9.8.8-10.6z'/%3E%3C/svg%3E") no-repeat 0 70%;
    background-size: 20px;
  }
  &:after {
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    content: '';
    z-index: 1;
    background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4990371148459384) 75%, rgba(0,0,0,0) 100%);
  }
}
.recent_post {
  height: 250px;
  width: 250px;
  overflow: hidden;
  margin: 0;
  display: inline-block;
  float: left;
  background: #000;
  position: relative;
  background-color: #000 !important;
  background-size: cover !important;
  border-radius: 10px;
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.4);
  &.animated {
    animation: scale-easeInElastic 1.5s reverse forwards;
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    z-index: 1;
    background: #000;
  }
  .date {
    color: white;
    border: 1px solid white;
    border-radius: 10px;
    position: relative;
    font-size: 15px !important;
    width: auto;
    display: inline-block;
    padding: 6px 14px 4px;
    z-index: 1;
    top: 30px;
    left: 20px;
  }
  .post_excerpt {
    color: white !important;
    overflow: hidden;
    height: 20%;
    position: absolute;
    bottom: 0;
    background: #09192b;
    font-size: 15px;
    padding: 4% 5% 25% !important;
    z-index: 1;
    width: 100%;
    transition: transform 0.65s ease;
  }
  a {
    padding: 0 20px 0;
    top: 30px;
    opacity: 1;
    z-index: 2;
    text-decoration: none !important;
    font-weight: bold !important;
    color: white !important;
    display: block;
    line-height: 30px !important;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.7);
    position: relative;
    font-size: 21px !important;
  }
  .thumbnail {
    position: absolute;
    top: 0;
    widh: 100%;
    height: 100%;
    left: 0;
    z-index: 2;
    opacity: 0.2;
    background-size: cover !important;
    background-repeat: no-repeat !important;
  }
}
#stories {
  padding-top: 30px;
  padding-bottom: 0;
  h1 {
    text-align: center;
    color: black;
    width: 80% !important;
    padding: 12px;
    float: none;
    border-bottom: 1px solid #ddd !important;
    margin: 0px auto 20px !important;
    display: block !important;
  }
  .featuredStories {
    .swiper-button-prev,
    .swiper-button-next {
      top: 40% !important;
    }
    .swiper-button-prev {
      background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l2.1%2C2.1L4.2%2C22l19.9%2C19.9L22%2C44L0%2C22L0%2C22L0%2C22z'%20fill%3D'%232c86b8'%2F%3E%3C%2Fsvg%3E");
    }
    .swiper-button-next {
      background: url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L27%2C22L5%2C44l-2.1-2.1L22.8%2C22L2.9%2C2.1L5%2C0L27%2C22L27%2C22z'%20fill%3D'%232c86b8'%2F%3E%3C%2Fsvg%3E");
    }
    .swiper-slide {
      display: flex;
      align-items: center;
    }
    .featured_post {
      width: 80% !important;
      margin: 0 auto !important;
      height: auto;
      display: inline-block !important;
      a {
        text-decoration: none;
        color: #2c86b8 !important;
        h3 {
          color: #2c86b8 !important;
        }
      }
      .excerpt a {
        text-decoration: underline !important;
      }
      .footer {
        border-radius: 10px;
        display: inline-flex;
        width: auto !important;
        margin: 5px 0 0 0;
        overflow: hidden;
        box-shadow: 0 1px 0px rgba(0, 0, 0, 0.1);
        p {
          float: left;
          padding: 13px 20px 10px;
          margin: 0;
          height: 100%;
          font-size: 0.9em;
          background: rgba(0, 0, 0, 0.02);
          border-right: 1px solid #efefef;
        }
        a {
          padding: 13px 20px 10px;
          height: 100%;
          font-size: 0.9em;
          border: none;
          background: orangered;
          color: white !important;
        }
      }
      .photo {
        width: 33%;
        float: left;
        margin-right: 4%;
        height: 400px;
        background-color: #dfdbe5;
        position: relative;
        overflow: hidden;
        background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
        .image_fill {
          width: 100%;
          height: 100%;
          background-size: cover !important;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      .summary {
        width: 63%;
        float: left;
        text-align: left !important;
      }
      h3 {
        font-size: 1.7em;
        font-weight: bold;
        line-height: 1.4em;
        margin: 10px 0 0 0;
        color: black;
        width: 100%;
        text-align: left !important;
      }
      .excerpt {
        font-size: 1.1em;
        margin: 10px 0 0 0;
      }
    }
  }
  .other_stories {
    width: 80%;
    margin: -40px auto 0;
    padding: 0;
    .swiper-wrapper {
      width: 100% !important;
    }
    .swiper-slide {
      width: 31% !important;
      margin: 0% 1.1% 2%;
      .recent_post {
        width: 100% !important;
      }
    }
    h1 {
      width: 100%;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }
  }
}
@media (max-width: 640px) {
  .upcoming {
    overflow: auto;
    position: relative;
    width: 100% !important;
    display: flex;
    min-width: none !important;
    max-width: none !important;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    li {
      float: left;
      display: inline-block;
      width: auto;
      padding: 14px 20px;
      border-right: 1px solid rgba(0,0,0,0.05);
      &:first-child {
        border-radius: 10px 0 0 10px;
      }
      &:last-child {
        border-radius: 0 10px 10px 0;
        border-right: none;
      }
    }
  }
  .conversations {
    columns: 1 !important;
  }
  .event_date {
    margin: 0 !important;
    width: 100% !important;
    text-align: center !important;
    padding: 14px 0 !important;
  }
}
</style>
