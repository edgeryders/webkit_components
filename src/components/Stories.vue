<template>
  <div class="wrapper other_stories">
    <div class="highlight">
      <h3>{{custom.title}}</h3>
      <p class="pb-4">
        By asking a question around a topic that matters to you right now, others in the community can share what they know or offer a helpful new perspective.
      </p>
      <p class="pb-4">
        By talking about what you are dealing with, you may even help someone else.
      </p>
      <a :href="`${custom.baseUrl}/c/${custom.category}`" target="_blank">{{ custom.submit }}</a>
      <div class="arrow_down"></div>
    </div>
    <h1>{{ custom.browse }}</h1>
    <swiper :options="swiperOption">
      <swiper-slide v-for="story in stories" :key="story.id">
        <div :style="{ background: `url(${story.image_url}) no-repeat` }" class="recent_post">
          <a :href="story.url" target="_blank">{{ story.title }}</a>
          <p class="timestamp">{{ story.created_at | formatDate }}</p>

          <div class="footer pb-4">
            <ul class="share">
              <a class="tweet" :href="'https://twitter.com/intent/tweet?url=http%3A%2F%2Fedgeryders.eu%2Ft%2F' + story.id + '&text=' + story.title + '%20%7C%20Edgeryders'" target="_blank"></a>
              <a class="fb" :href="'https://www.facebook.com/sharer/sharer.php?u=https://edgeryders.eu/t/' + story.id" target="_blank"></a>
              <a class="email" :href="'mailto:%20?body=https://edgeryders.eu/t/' + story.id + ',&subject=' + story.title " target="_blank"></a>
            </ul>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev" />
      <div class="swiper-button-next" slot="button-next" />
    </swiper>
  </div>

</template>


<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
      stories: [],
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
         navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        breakpoints: {
          640: {
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
          }
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("MM/DD/YYYY");
    }
  },
  mounted() {
    axios.get(`${this.baseUrl}/webkit_components/topics.json?tags=${this.custom.tags.join(',')}&per=8`).then(({ data }) => {
      this.stories = data
    })
  },
  props: ['baseUrl', 'custom'],
};
</script>
<style type="text/css" lang="scss">
@keyframes scale-easeInElastic {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  4% {
    transform: scale(1);
  }
  8% {
    transform: scale(1);
  }
  14% {
    transform: scale(1);
  }
  18% {
    transform: scale(1);
  }
  26% {
    transform: scale(1.01);
  }
  28% {
    transform: scale(1.01);
  }
  40% {
    transform: scale(0.98);
  }
  42% {
    transform: scale(0.98);
  }
  56% {
    transform: scale(1.05);
  }
  58% {
    transform: scale(1.04);
  }
  72% {
    transform: scale(0.87);
  }
  86% {
    transform: scale(1.07);
  }
  100% {
    transform: scale(0);
    opacity: 1;
  }
}
@keyframes slideup {
  0% {
  transform: translateY(20px);
  opacity: 0;
}
100% {
  transform: translateY(0px);
  opacity: 1;
}
}
.other_stories {
.swiper-container {
      margin-top: -50px;
width: 100% !important;
}
}
.other_stories {
    animation: slideup 3s ease forwards;
    h3 {
      animation: slideup 1.2s ease forwards .2s;
  }
   a {
    animation: scale-easeInElastic 1s ease reverse forwards 1s;
    }
    .arrow_down {
     animation: slideup 1.2s ease forwards 1.2s;
  }
.swiper-container {
  animation: slideup 2s ease forwards 1s;
}
}
 .swiper-button-prev {
  top: 12px;
  width: 40px;
  opacity: 0.7;
  height: 50px;
  left: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'%3E%3Cswitch%3E%3Cg%3E%3Cpath fill='%23152637' d='M2.5 23v54c0 11.3 9.2 20.5 20.5 20.5h54c11.3 0 20.5-9.2 20.5-20.5V23c0-11.3-9.2-20.5-20.5-20.5H23A20.5 20.5 0 0 0 2.5 23zm51.3 1.9l15.4 15.4a5.4 5.4 0 0 1 1.6 3.8 5 5 0 0 1-1.6 3.8 5.5 5.5 0 0 1-7.7 0l-6.1-6.1v29.4c0 3-2.4 5.4-5.4 5.4s-5.4-2.4-5.4-5.4V41.9L38.4 48a5.5 5.5 0 0 1-7.7 0 5.5 5.5 0 0 1 0-7.7l15.4-15.4a5.5 5.5 0 0 1 7.7 0z'/%3E%3C/g%3E%3C/switch%3E%3C/svg%3E") no-repeat ;
  background-size: cover;
  transform: rotate(-90deg) scale(.8);
}
  .swiper-button-next {
  top: 12px;
  width: 40px;
    opacity: 0.7;
  height: 50px;
  right: 0;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'%3E%3Cswitch%3E%3Cg%3E%3Cpath fill='%23152637' d='M2.5 23v54c0 11.3 9.2 20.5 20.5 20.5h54c11.3 0 20.5-9.2 20.5-20.5V23c0-11.3-9.2-20.5-20.5-20.5H23A20.5 20.5 0 0 0 2.5 23zm51.3 1.9l15.4 15.4a5.4 5.4 0 0 1 1.6 3.8 5 5 0 0 1-1.6 3.8 5.5 5.5 0 0 1-7.7 0l-6.1-6.1v29.4c0 3-2.4 5.4-5.4 5.4s-5.4-2.4-5.4-5.4V41.9L38.4 48a5.5 5.5 0 0 1-7.7 0 5.5 5.5 0 0 1 0-7.7l15.4-15.4a5.5 5.5 0 0 1 7.7 0z'/%3E%3C/g%3E%3C/switch%3E%3C/svg%3E") no-repeat ;
  background-size: cover;
  transform: rotate(90deg) scale(.8);
}
.highlight {
      width: 70%;
      padding: 0;
      display: flex;
      flex-direction: column;
      margin: 20px auto 20px;
      align-items: center;;
      justify-content: center;
      h3 {
        text-align: center;
            color: #001021;
    border-radius: 10px;
    display: inline-block;
    font-size: 2.2em;
letter-spacing: -1px !important;
    line-height: 1.34em;
    width: 400px;
    margin: 0 0 10px 0;
      }
      a {
        color: white !important;
        text-decoration: none !important;
        padding: 12px 20px;
        opacity: 0;
        width: auto !important;
        align-self: flex-start;
        display: inline-block;
        font-weight: bold !important;
        font-size: 1.15em;
        display: inline-block;
        border-radius: 4px;
        margin: 10px auto 20px !important;
        background: orangered;
      }
      .arrow_down {
        background: url("data:image/svg+xml,%3Csvg width='20' height='85' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-rule='nonzero'%3E%3Cpath d='M6.3 23.5c0-7.3 0-14.7.3-22a1.5 1.5 0 0 1 3 0A912 912 0 0 0 11 79a1.5 1.5 0 1 1-3 .2 922 922 0 0 1-1.7-55.7z'/%3E%3Cpath d='M.3 66.6a1.5 1.5 0 0 1 3-.5 139 139 0 0 0 5.9 13.8 137 137 0 0 1 8-16 1.5 1.5 0 0 1 2.6 1.4 134 134 0 0 0-9.2 18.8 1.5 1.5 0 0 1-2.7.1A141.5 141.5 0 0 1 .3 66.6z'/%3E%3C/g%3E%3C/svg%3E")
          no-repeat center 0;
        background-size: contain;
        width: 90px;
        opacity: 0;
        height: 100px;
        position: relative;
        top: 10px;
        margin: 0 auto;
      }
  .arrow1 {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'%3E%3Cpath d='M41.4 62.7a54.5 54.5 0 0 0 16.2 10.1 97 97 0 0 0 13.9 4.3c-5 .9-10 2.3-14.7 4.3-1.7.7 1.4 4.2 2.8 3.6 6.3-2.6 13-4.3 19.8-5 1.9-.2.1-2.9-1.4-3.5l-.3-.5a129 129 0 0 1-8-12.7c-.5-.9-1.5-1.9-2.6-1.9s-.9 1.1-.5 1.8c2.2 3.9 4.6 7.6 7.1 11.3a68.6 68.6 0 0 1-29.2-12.1 56.2 56.2 0 0 1-10.8-12.5A66.6 66.6 0 0 1 23.3 18c-.1-1.1-1.1-2.1-2-2.5-.7-.3-1.8-.5-1.7.6a70.1 70.1 0 0 0 21.8 46.6z' fill='%23231f20'/%3E%3C/svg%3E")
      no-repeat 0 0;
    width: 300px;
    display: block;
    height: 270px;
    position: relative;
    top: -300px;
    left: 200px;
    transform: rotate(26deg);
  }
}
.recent_post {
  height: 370px;
  width: 250px;
  overflow: hidden;
  margin: 0;
  display: inline-block;
  float: left;
  position: relative;
 background-color: orangered;
background: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E") !important;
  background-size: 4px !important;
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
  &:hover {
    .post_excerpt {
    }
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
.recent_post {
  overflow: hidden;
  margin: 0;
  display: inline-block;
  float: left;
  position: relative;
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
    opacity: 0.7;
    z-index: 1;
    background: #000;
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
    margin-bottom: 20px !important;
    opacity: 1;
    z-index: 2;
    text-decoration: none !important;
    font-weight: bold !important;
    color: white !important;
    display: inline-block;
    line-height: 1.2em !important;
    text-shadow: 0px 1px 0px rgba(0, 0, 0, 0.7);
    position: relative;
    font-size: 1.3em !important;
  }
  p.timestamp {
  color: white !important;
  margin: 25px auto !important;
  width: 70%;
  padding-top: 10px;
  position: relative;
      border-top: 1px solid rgba(255,255,255,0.5) !important;
font-size: 1.1em !important;
  z-index: 99;
      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.8);
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
  .other_stories {
  width: 80%;
  margin: 0px auto 0;
  h1 {
  padding-bottom: 12px;
  margin: 20px 0 0;
}
  .swiper-container {
  width: 90% !important;
}
  .swiper-wrapper {
    width: 100% !important;
    padding-top: 90px;
    padding-bottom: 0px;
  }
  .swiper-slide {
    .recent_post {
      width: 100% !important;
      margin: 0 auto 5%;
    }
  }
  h1 {
    width: 90%;
    margin: 0 auto;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
}
.recent_post {
  color: #fff;
  position: relative;
  .share {
  position: relative;
bottom: 25px;
    padding: 0px 5px;
    width: 100%;
    display: flex;
    justify-content: center;
    border-radius: 0 0 0.4em 0.4em;
    height: 40px;
    left: 0;
    a {
      border-right: 0.4px solid rgba(255, 255, 255, 0.2);
      width: 50px;
      height: 40px;
      float: left;
      &.tweet {
        background: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='white' d='M24 4.6c-1 .4-1.9.6-2.9.7a5 5 0 0 0 2.2-2.7c-1 .6-2 1-3.1 1.2-1-1-2.2-1.6-3.6-1.6a5 5 0 0 0-4.8 6 14 14 0 0 1-10.2-5c-.4.7-.6 1.5-.6 2.4a5 5 0 0 0 2.2 4.1c-.8 0-1.6-.2-2.3-.6A5 5 0 0 0 5 14a5 5 0 0 1-2.2 0 5 5 0 0 0 4.6 3.5 9.9 9.9 0 0 1-7.3 2 14 14 0 0 0 7.6 2.3c9 0 14-7.5 14-14V7A10 10 0 0 0 24 4.6z'/%3E%3C/svg%3E")
          no-repeat center;
        background-size: 20px;
      }
      &.fb {
        background: url("data:image/svg+xml,%3Csvg aria-hidden='true' data-prefix='fab' data-icon='facebook-square' class='svg-inline--fa fa-facebook-square fa-w-14' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='white' d='M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137V328h-63v-72h63v-55c0-62 37-96 94-96 27 0 55 5 55 5v61h-31c-31 0-40 19-40 38v47h69l-11 72h-58v152h137a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z'/%3E%3C/svg%3E")
          no-repeat center;
        background-size: 18.5px;
        width: 50px;
      }
      &.email {
        background: url("data:image/svg+xml,%3Csvg aria-hidden='true' data-prefix='fas' data-icon='envelope' class='svg-inline--fa fa-envelope fa-w-16' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='white' d='M502 191c4-3 10 0 10 5v204c0 27-21 48-48 48H48c-26 0-48-21-48-48V196c0-5 6-8 10-5l154 114c21 15 56 47 92 47s72-33 92-47l154-114zM256 320c23 0 57-29 73-41 133-97 143-105 174-129 6-5 9-12 9-19v-19c0-26-22-48-48-48H48C22 64 0 86 0 112v19c0 7 3 14 9 19 31 24 41 32 174 129 16 12 50 41 73 41z'/%3E%3C/svg%3E")
          no-repeat center;
        background-size: 20px;
        width: 53px;
        border-right: none;
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0px;
    left: 0px;
    background: linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%);
    z-index: 9;
    width: 100%;
  }
}
.other_stories {
  .swiper-wrapper {
}
h1 {
  text-align: center;
  float: none;
}
}
@media (max-width: 860px) {
.other_stories {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  .highlight {
  padding-top: 0px !important;
  h3 {
  font-size: 1.6em !important;
  color: RGBA(21, 38, 55, 1) !important;
}
 .arrow_down {
        background: url("data:image/svg+xml,%3Csvg width='20' height='85' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='RGBA(21, 38, 55, 1.00)' stroke='RGBA(21, 38, 55, 1.00)' stroke-width='1' fill-rule='nonzero'%3E%3Cpath d='M6.3 23.5c0-7.3 0-14.7.3-22a1.5 1.5 0 0 1 3 0A912 912 0 0 0 11 79a1.5 1.5 0 1 1-3 .2 922 922 0 0 1-1.7-55.7z'/%3E%3Cpath d='M.3 66.6a1.5 1.5 0 0 1 3-.5 139 139 0 0 0 5.9 13.8 137 137 0 0 1 8-16 1.5 1.5 0 0 1 2.6 1.4 134 134 0 0 0-9.2 18.8 1.5 1.5 0 0 1-2.7.1A141.5 141.5 0 0 1 .3 66.6z'/%3E%3C/g%3E%3C/svg%3E")
          no-repeat center 0;
        top: 0px;
      }
}
h1 {
        border-bottom: none !important;
        margin-bottom: 0 !important;
        margin: 0 auto;
        display: inline-block !important;
        width: 90% !important;
        font-size: 1.5em !important;
        text-align: center !important;
        position: relative;
        line-height: 1.3em !important;
        color: RGBA(21, 38, 55, 1.00) !important;
        padding-bottom: 80px;
        &:after {
          width: 50px;
          height: 50px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'%3E%3Cg color='%23000'%3E%3Cpath fill='%23fff' d='M45 20c-5 0-9 4-9 9v24.3c-1.5-2-3.1-3.5-5-4-2.6-.7-5 .2-6.5 1.1-1.9 1.5-3.6 2.7-4.2 5.1-.6 2.3-.2 4.7 1 7.6A126.6 126.6 0 0 0 40.6 97a3 3 0 0 0 2.3 1h27a3 3 0 0 0 1.8-.6c3.1-2.3 5.5-6 7.4-10.5 2-4.4 3.5-9.5 4.2-14.5.8-5 .9-10-.3-14-1.1-4.2-4.2-7.9-8.8-8.4l-2.2.2c-.6-1.1-1.4-2-2.3-2.7A8 8 0 0 0 65 46c-1 0-2 .4-2.9.9l-1-1.3a8.2 8.2 0 0 0-7-1.3V29c0-5-4-9-9-9zm0 6a3 3 0 0 1 3 3v21a3 3 0 0 0 2.3 3 3 3 0 0 0 3.4-1.7c1.1-1.4 2.2-1.4 3.7-.9.3.3.6.4.6 1.6 0 1.3 1 2.6 2.3 3a3 3 0 0 0 3.4-1.7c.8-1.6 1.3-1.4 2.6-.9.5.3.7.5.7 1.6a3 3 0 0 0 1.8 2.7 3 3 0 0 0 3.2-.5s1.4-.4 1.8-.2c1.9.3 2.8 1.3 3.6 4 .8 2.8.8 7 .1 11.5-.7 4.4-2 9-3.8 13a23 23 0 0 1-5 7.5H44.5C38.9 84.4 26 64 26.1 57.1c.8-1.3 2-2.2 3.3-2 1.6.8 2 1.6 3 3.3l4 8a3 3 0 0 0 3.3 1.5A3 3 0 0 0 42 65V29a3 3 0 0 1 3-3z' overflow='visible' style='text-indent:0;text-transform:none;block-progression:tb'/%3E%3Cpath fill='%23fff' d='M25.9 2.9l-9 9c-.5.4-.9 1.3-.9 2 0 .9.2 1.6.9 2.2l9 9c1 1.2 3.2 1.1 4.4.1 1.2-1 1-3.3-.2-4.3l-3.9-4h37.6l-3.9 4c-1.2 1-1.4 3.3-.2 4.3s3.4 1.1 4.4 0l9-9a3.1 3.1 0 0 0 0-4.3l-9-9c-1-1-3.2-1.3-4.3-.2-1.2 1.2-1.1 3.3.1 4.4l3.9 3.9H26.2L30.1 7c1.2-1 1.3-3.2.2-4.4-1.4-1-3-.8-4.4.2z' overflow='visible' style='text-indent:0;text-transform:none;block-progression:tb'/%3E%3C/g%3E%3C/svg%3E")
            no-repeat center 78% RGBA(21, 38, 55, .7);
          border-radius: 100px;
          content: "";
          background-size: 26px !important;
          position: absolute;
          left: 40%;
          bottom: 24px;
        }
      }
.swiper-container {
  padding-bottom: 0px !important;
  margin-bottom: 0 !important;
      margin-top: -100px;
      width: 100% !important;
.swiper-wrapper {
  width: 100% !important;
  .swiper-slide {
      width: 100% !important;
      margin: 0 !important;
    }
}
}
  .swiper-slide {
  .recent_post{
  width: 100% !important;
margin: 0 !important;
  box-shadow: none;
border-radius: 10px !important;
a {
  width: 87% !important;
}
.share {
  bottom: 20px;
}
.timestamp {
  border: 1px solid white;
  display: inline-block;
  width: auto;
  clear: both;
  float: none;
  font-size: .9em !important;
  padding: 7px 8px 6px;
  border-radius: 10px;
  margin: 20px auto 0 !important;
}
}
}
  }
}
@keyframes scale-easeInElastic {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  4% {
    transform: scale(1);
  }
  8% {
    transform: scale(1);
  }
  14% {
    transform: scale(1);
  }
  18% {
    transform: scale(1);
  }
  26% {
    transform: scale(1.01);
  }
  28% {
    transform: scale(1.01);
  }
  40% {
    transform: scale(0.98);
  }
  42% {
    transform: scale(0.98);
  }
  56% {
    transform: scale(1.05);
  }
  58% {
    transform: scale(1.04);
  }
  72% {
    transform: scale(0.87);
  }
  86% {
    transform: scale(1.07);
  }
  100% {
    transform: scale(0);
    opacity: 1;
  }
}
@media (max-width: 860px) {
#stories .featuredStories .featured_post {
    margin: 0 !important;
    border-radius: 10px !important;
    width: 90% !important;
  }
}
</style>
