<template>
    <div class="content_wrapper md:content_wrapper-md" :style="textStyle('paragraph', data.style)">
      <div class="hero_image md:hero_image-md" v-if="data.image" :style="{flexBasis: data.image.width + 'px'}">
        <img :src="data.image.url" />
      </div>
      <div class="hero_event md:hero_event-md">
        <div class="hero_title flex flex-col md:hero_title-md">
          <h1 v-if="data.title" :class="getClass('title', data.style)" :style="textStyle('title', data.style)" v-html="data.title"></h1>
          <a v-if="data.tag" class="hero_tag" :style="uiStyle('tag', data.style)" :href="'http://edgeryders.eu/tags/' + data.tag" target="_blank">#{{data.tag}}</a>
          <h3 v-if="data.subtitle" :style="textStyle('subtitle', data.style)"  :class="getClass('subtitle', data.style)" v-html="data.subtitle"></h3>
        </div>
        <div class="hero_description" v-html="data.text.content" :style="textStyle('paragraph', data.style)"></div>
        <div class="hero_event_info md:hero_event_info-md">
          <div class="flex flex-col md:flex-row md:border-r">
            <a class="action md:action-md" v-for="item in data.text.buttons" :style="uiStyle('action', data.style)" :href="item.url" :key="item.url">
              {{item.text}}
            </a>
          </div>
          <div class="event_info_container">
            <div class="event_info md:event_info-md" v-if="$globals.event" :style="uiStyle('highlight', data.style)">
              <span class="glyph location" :style="uiStyle('highlight', data.style)"></span>
              <div v-if="$globals.event.timezone">{{$globals.event.timezone}}</div>
              <div v-else>{{$globals.event.location}}</div>
            </div>
            <div class="event_info md:event_info-md" v-if="$globals.event" :style="uiStyle('highlight', data.style)">
              <span class="glyph date" :style="uiStyle('highlight', data.style)"></span>
              <div v-if="$globals.event.start"> 
                {{$globals.event.start | formatDate}} 
                <span v-if="$globals.event.end">to {{$globals.event.end | formatDate}}</span>
              </div>
              <div v-else>{{$globals.event.date}}</div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("MMMM Do YYYY");
    }
  },
  methods: {
    styleObj(item) {
      var styleObj = {
        background: '#000',
        color: '#fff'
      };
      if (item.background) {
        styleObj["background"] = item.background;
      };
      if (item.color) {
        styleObj["color"] = item.color;
      };
      return styleObj;
    }
  },
  props: ["data", "globalStyle", "event"]
};
</script>
