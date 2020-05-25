<template>
  <div class="section px-5 md:px-0 md:section-md events" id="events" :style="containerStyle(data.style)">

      <div class="flex justify-between items-center px-8 py-4 mx-auto mt-8 mb-6 w-full"  :style="textStyle('title', data.style)" :class="titleClassSize(data.style)">
        <h3 :class="titleClassSize(data.style)">{{data.config.title}}</h3>
        <div class="toggle_menu" v-if="data.views && data.views.length">
          <div v-for="(view, index) in data.views"
            class="toggle"
            :class="[Object.keys(view)[0], {active: activeView == Object.keys(view)[0]}]"
            @click="toggleView(Object.keys(view)[0])"
            :key="index"
          ></div>
        </div>
      </div>

      <TextView class="mt-4" v-if="data.config.text" :mq="viewport" :data="data.config" />
      
     <div v-for="(view, index) in data.views" class="w-full" :key="index">
      <div v-if="view.grid && activeView == 'grid'">
         <div class="event_grid_options w-full mb-6">
          <div class="event_search">
            <div v-for="filter in search.filters" :key="filter.tag" class="search_filter" :style="{background: filter.color}" :class="{plainTag: filter.color == null}" @click="setFilter(filter)">
              {{filter.tag}}
            </div>
            <div v-if="search.date" class="search_filter date" @click="setDate(date)">{{ formatSearchDate(search.date) }}</div>
            <input class="p-3 rounded-full" v-model="search.text" placeholder="search" />
          </div>
          <div class="popup">
            <div class="glyph filters" :class="{'active': popup == 'filters'}" @click="activePopup('filters')"></div>
            <transition name="fade">
            <div class="popup_container" v-if="popup == 'filters'">
              <p class="popup_title">Filters</p>
              <ul>
                <li v-for="filter in data.config.filters" :key="filter.tag" @click="setFilter(filter)" :class="{'active': isActiveFilter(filter) > -1}">
                  <span class="tag_marker" :style="{background: filter.color}"></span>
                  {{filter.tag}}
                </li>
              </ul>
            </div>
            </transition>
          </div>
          <div class="popup">
            <div class="glyph calendar" :class="{'active': popup == 'calendar'}" @click="activePopup('calendar')"></div>
            <transition name="fade">
              <div class="popup_container calendar_container"  v-if="popup == 'calendar'">
                <Calendar :dates="dataReverse" :stylesheet="data.style" :items="events" :filters="filters" :globalStyle="globalStyle" />
              </div>
            </transition>
          </div>
        </div>

      <Grid :mq="viewport" v-bind:data="filteredItems" :config="view.grid">
        <template v-slot:item="{ item }">
         <GridItem>
            <template>
              <div slot="header">
                <a :href="item.url" target="_blank" class="">{{item.title}}</a>
                <p class="item_date" v-if="item.event && show('date', view.grid.display)">
                  {{ item.event.start | formatDate }} <span v-if="show('time', view.grid.display)">at {{ item.event.start | formatTime }}</span>
                </p>
              </div>
              <div slot="content">
                <div class="item_image" v-if="item.image_url && show('image', view.grid.display)" :style="{ background: 'url(' + item.image_url + ')' }"></div>
                <div class="item_excerpt" v-html="item.excerpt"></div>
              </div>
            </template>
         </GridItem>
        </template>
      </Grid>
    </div>

       <List class="mt-6" v-if="view.list && activeView == 'list'" :mq="viewport" :data="filteredItems" :config="view.list">
          <template v-slot:item="{ item }">
            
            <h4 class="item_title">{{item.title}}</h4>
            <p class="item_date" v-if="item.event && show('date', view.list.display)">
              {{ item.event.start | formatDate }}
            </p>
            <p class="item_date" v-if="item.event && show('time', view.list.display) && !show('date', view.list.display)">
              {{ item.event.start | formatTime }}
            </p>

          </template>

          <template v-slot:selected="{ selected }">
            
            <div slot="image" v-if="selected.image_url">
              <div class="item_image" @click="showTopic()" :style="{ background: 'url(' + selected.image_url + ')' }">
              </div>
            </div>

            <div slot="title">
              <div class="selected_title">
                <a :href="selected.url" target="_blank">
                  {{selected.title}}
                </a>
              </div>
              <Profile class='mt-2 ml-5' :data="selected.author" v-if="show('author', view.list.display)" />
            </div>

            <div slot="content">
              <div class="item_excerpt" v-html="selected.excerpt"></div>
            </div>

            <div slot="footer">
            
            </div>

          </template>
        </List>

    </div>

  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

import Grid from "@/components/views/Grid.vue";
import GridItem from "@/components/views/GridItem.vue";
import List from "@/components/views/ListView.vue";
import Calendar from "@/components/ui/Calendar.vue";

import TextView from "@/components/views/Text.vue";

import { bus } from '@/main';

export default {
  props: ["data", "stylesheet", "baseUrl", "globalStyle"],
  data() {
    return {
      activeView: '',
      events: [],
      popup: '',
      filters: [],
      search: {
        text: '',
        filters: [],
        date: null
      }
    };
  },
   components: {
    Grid,
    GridItem,
    List,
    TextView,
    Calendar
  },
  methods: {
    activePopup(value) {
      if (this.popup == value) {
        this.popup = ''
      } else {
        this.popup = value
      }
    },
    toggleView(value){
      this.activeView = value;
    },
    show(value, array) {
      if (array.includes(value)) {
        return true
      } else {
        return false
      }
    },
    titleObj() {
      var titleObj = {
        maxWidth: ''
      };
      if (this.stylesheet && this.stylesheet.wrapper) {
        titleObj["maxWidth"] = this.stylesheet.title;
      };
      if (this.data.style && this.data.style.wrapper) {
        titleObj["maxWidth"] = this.data.style.title;
      };
      return titleObj;
    },
    isView(type) {
      if (this.$mq == "md") {
        return true
      } else {
        if (this.view == type) {
          return true
        } else {
          return false
        }
      }
    },
    selectView(type) {
      if (this.view == type) {
        if (this.view == 'calendar') {
          bus.$emit('clearDate', null);
        }
        this.view = null;
      } else {
        this.view = type;
        if (type == 'calendar') {
          bus.$emit('clearType', null);
          bus.$emit('clearSearch', null);
          bus.$emit('clearDate', null);
        }
        if (type == 'filter') {
          bus.$emit('clearSearch', null);
          bus.$emit('clearType', null);
          bus.$emit('clearDate', null);
        }
        if (type == 'search') {
          bus.$emit('clearType', null);
          bus.$emit('clearDate', null);
        }
      }
    },
    getEventTags(events) {
      var array = [];
      events.map(obj => {
        return obj.tags.map(tag => {
          if (!array.includes(tag.name) && this.data.config.filters[tag.name]) {
            array.push(tag.name)
          }
        });
      });
      return array;
    },
    getTags(obj) {
      var array = [];
      obj.tags.map(tag => {
        if (!array.includes(tag.name) && this.data.config.filters[tag.name]) {
          array.push(tag.name)
        }
      });
      return array;
    },
    getTag(value) {
      return this.filters.filter(obj => obj.name == value)[0]
    },
    getEventFilters(){
      var colors = ["turquoise", "yellow", "red"]
      var tags = this.getEventTags(this.events);
      var array = [];
      var i;
      
      for (i = 0; i < tags.length; i++) { 
        var obj = {
          name: tags[i],
          color: this.data.filters[tags[i]] || colors[i]
        }
        array.push(obj)
      }      

      this.filters = array;
    },
    getEvents(tag) {
      axios.get(
        `${this.baseUrl}/webkit_components/topics.json?serializer=event&tags=${tag}&per=500`
      ).then(({ data }) => {
        this.events = data;
        this.getEventFilters();
      });
    },
    isActiveFilter(obj){
      return this.search.filters.findIndex(tag => tag.name == obj.name);
    },
    setFilter(obj) {
      var index = this.isActiveFilter(obj);
      if (index > -1) {
          this.search.filters.splice(index, 1);
      }
      else {
        this.search.filters.push(obj)
      }
      this.popup = '';
    },
    setDate(value) {
      if (this.date == value) {
        this.search.date = null;
        bus.$emit('clearDate', null);
      } else {
        this.search.date = value
      }
      this.popup = '';
    },
    formatDate(value) {
      return moment(value).format("dddd MMMM Do");
    },
    formatTime(value) {
      return moment(value).format("HH:mm");
    },
    formatSearchDate(value) {
      return moment(value).format("DD MMMM YYYY");
    },
  },
  created() {
    this.getEvents(this.data.config.tags.event);
    this.activeView = Object.keys(this.data.views[0])[0];
    bus.$on('setFilterDate', (data) => {
      this.setDate(data);
    })
    bus.$on('clearDate', (data) => {
      this.search.date = data
    })
  },
  computed: {
   filteredItems() {
    let filtered = this.events;

    if (this.search.date != null) {
      filtered = filtered.filter(e => e.event && moment(e.event.start).format("YYYYMMDD") == moment(this.search.date).format("YYYYMMDD"));
    }

    if (this.search.text != "") {
      filtered = filtered.filter(e => e.title.toLowerCase().includes(this.search.text.toLowerCase()) || e.excerpt.toLowerCase().includes(this.search.text.toLowerCase()))
    }

    if (this.search.filters.length > 0) {
      var self = this;
      var filters = this.search.filters.map(obj => obj.name);
      var filter = filtered.filter(function(obj) {
        var tags = self.getTags(obj);
        var tag_filter = tags.filter(value => filters.includes(value));
        if (tag_filter.length) {
          return obj
        }
      })

      filtered = filter;
    }

    return filtered
    }
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("dddd, MMMM Do YYYY");
    },
    formatTime: function(value) {
      return moment(String(value)).format("HH:mm a");
    },
  }
};
</script>
<style lang="scss" scoped>
.events_sidebar {
  background: rgba(0,0,0,0.01);
  border-radius: 0 10px 10px 0;
  padding: 30px 20px 0 20px;
}
.events_title {
    @apply text-2xl font-bold;

  padding: 20px 30px !important;
}
</style>