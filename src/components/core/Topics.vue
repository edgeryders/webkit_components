<template>
  <div class="section md:section-md" :style="containerStyle(data.style)">
    <div class="flex font-bold justify-between items-center mx-auto" v-if="data.title" :style="textStyle('title', data.style)" >
      <h3 class="m-0 p-0 w-full" :class="titleClassSize(data.style)">{{ data.title }}</h3>
      <div class="toggle_menu" v-if="data.views && data.views.length">
        <div v-for="(view, index) in data.views"
          class="toggle"
          :class="[Object.keys(view)[0], {active: activeView == Object.keys(view)[0]}]"
          @click="toggleView(Object.keys(view)[0])"
          :key="index"
        ></div>
      </div>
    </div>

    <div
      class="wrapper md:wrapper-md mx-auto"
      v-if="data.text"
      :style="wrapperStyle(data.style)"
    >
      <div v-if="data.text.content" class="section_text" :style="textStyle('paragraph', data.style)" v-html="data.text.content">
      </div>
    </div>

    <div v-for="(view, index) in data.views" :key="index">

              <Slider
                v-if="topics && view.slider && activeView == 'slider' && ready"
                :autoplay="5000"
                :data="topics"
                :config="view"
                :baseUrl="config.baseUrl"
                :stylesheet="data.style"
                class="mx-auto"
                ref="slider"
                :mq="viewport"
              />
      
              <Grid v-if="topics && view.slider && activeView == 'grid' && ready" :mq="viewport" v-bind:data="topics">
                <template v-slot:item="{ item }">
                  
                 <GridItem>
                    <template>
                      <div slot="header">
                        <a :href="item.url" target="_blank" class="">{{item.title}}</a>
                        <p class="item_date">
                          {{ item.created_at | formatDate }}
                        </p>
                      </div>
                      <div slot="content">
                        <div class="item_image" :style="{ background: 'url(' + item.image_url + ')' }"></div>
                        <div class="item_excerpt" v-html="item.excerpt"></div>
                      </div>
                    </template>
                 </GridItem>

                </template>
              </Grid>

             

          <List v-if="topics && view.list && activeView == 'list' && ready" :mq="viewport" :data="topics" :config="data">
            <template v-slot:item="{ item }">
              
              <h4 class="item_title">{{item.title}}</h4>
              <p class="item_date">
                {{ item.created_at | formatDate }}
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
            </div>

            <div slot="content">
              <div class="item_excerpt" v-html="selected.excerpt"></div>
            </div>

            <div slot="footer">
            
            </div>

          </template>
        </List>

    <Row v-if="topics && view.cards && activeView == 'cards' && ready" :topics="topics" :stylesheet="data.style" :display="data.display" :globalStyle="globalStyle" />

  </div>
  </div>
</template>

<script>
import Slider from "@/components/views/Slider.vue";
import Grid from "@/components/views/Grid.vue";
import GridItem from "@/components/views/GridItem.vue";
import List from "@/components/views/ListView.vue";

import Row from "@/components/ui/Row.vue";
import axios from "axios";
import moment from "moment";

export default {
  props: ["data", "stylesheet", "baseUrl", "globalStyle"],
  data() {
    return {
      topics: null,
      full_width: false,
      reset: 0,
      ready: false,
      activeView: ''
    };
  },
  components: {
    Slider,
    Grid,
    GridItem,
    List,
    Row
  },
  created() {
    this.activeView = Object.keys(this.data.views[0])[0];
    if (this.data.tag) {
      this.getTopics(this.data.tag, 'tags');
    }
    if (this.data.category) {
      this.getTopics(this.data.category, 'category');
    }
  },
  methods: {
    getTopics(value, filter) {
      axios.get(
        `${this.baseUrl}/webkit_components/topics.json?${filter}=${value}&per=500&serializer=organizer`
      ).then(({ data }) => {
        this.topics = data;
        if (this.data.sort_by) {
           data = this.sortBy(data, this.data.sort_by.property, this.data.sort_by.order)
         }
        this.topics = data;
        this.ready = true
      });
    },
    sortBy(data, value, order) {
      var ord_val = -1;
      if (order == 'ascending') {
        ord_val = 1;
      };
      var sorted = data.sort((a,b) => (a[value] > b[value]) ? ord_val : ((b[value] > a[value]) ? -ord_val : 0));
      return sorted
    },
    toggleView(value){
      this.activeView = value;
    }
  },
  watch: {
    // whenever question changes, this function will run
    'data.tag'(newTag) {
      this.ready = false
      this.getTopics(newTag, 'tags');
      this.reset = this.reset + 1
    }
  },
  filters: {
    formatDate: function(value) {
      return moment(String(value)).format("dddd, MMMM Do YYYY");
    }
  }
};
</script>
<style lang="scss">
.toggle_menu {
    @apply items-center;
    background: none !important;
    border-radius: 6px;
    overflow: hidden;
    flex-shrink: 0;
  }

  .toggle {
    float: left;
    @apply border-r border-gray-100;
    width: 45px;
    height: 40px;
    &:last-child {
      border: none;
    }
    &:hover {
      cursor: pointer;
      background-color: #ddd !important;
    }
    &.active {
      background-color: #282C34 !important;
      &:hover {
        background-color: #000 !important;
      }
    }
  }

  .toggle.slider {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 40'%3E%3Cg data-name='1'%3E%3Crect x='5' y='8' width='22' height='16' rx='2' ry='2'/%3E%3Cpath d='M29 10a1 1 0 00-1 1v10a1 1 0 002 0V11a1 1 0 00-1-1zM3 10a1 1 0 00-1 1v10a1 1 0 002 0V11a1 1 0 00-1-1z'/%3E%3C/g%3E%3C/svg%3E") no-repeat center 75% #efefef;
    background-size: 50% !important;
  }

.toggle.grid {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 100 125'%3E%3Cpath fill='black' d='M35 0a32 32 0 015 2c3 2 4 6 4 10v21c0 5-2 8-6 10a13 13 0 01-5 1H12c-6 0-10-3-12-9V9c1-3 2-5 5-7a41 41 0 015-2h25zM0 65a34 34 0 012-5 10 10 0 019-4h23a11 11 0 0111 11v22c-1 6-5 11-11 11H11c-5 0-9-3-11-9V65zM90 0a14 14 0 016 3 10 10 0 014 7v23a11 11 0 01-12 11H67c-6 0-11-4-11-10a478 478 0 010-23c0-6 3-10 9-11h25zm10 78v12a11 11 0 01-10 10H66a10 10 0 01-10-10V66a10 10 0 0110-10h24a11 11 0 0110 10v12z'/%3E%3C/svg%3E%0A")
      no-repeat center 62% #efefef;
    background-size: 34% !important;
    border-right: 1px solid white;
  }

  .toggle.grid.active {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 100 125'%3E%3Cpath fill='white' d='M35 0a32 32 0 015 2c3 2 4 6 4 10v21c0 5-2 8-6 10a13 13 0 01-5 1H12c-6 0-10-3-12-9V9c1-3 2-5 5-7a41 41 0 015-2h25zM0 65a34 34 0 012-5 10 10 0 019-4h23a11 11 0 0111 11v22c-1 6-5 11-11 11H11c-5 0-9-3-11-9V65zM90 0a14 14 0 016 3 10 10 0 014 7v23a11 11 0 01-12 11H67c-6 0-11-4-11-10a478 478 0 010-23c0-6 3-10 9-11h25zm10 78v12a11 11 0 01-10 10H66a10 10 0 01-10-10V66a10 10 0 0110-10h24a11 11 0 0110 10v12z'/%3E%3C/svg%3E%0A")
      no-repeat center 60% #282C34;
    background-size: 34% !important;
  }

    .toggle.slider.active {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 40'%3E%3Cg data-name='1'%3E%3Crect fill='white' x='5' y='8' width='22' height='16' rx='2' ry='2'/%3E%3Cpath fill='white' d='M29 10a1 1 0 00-1 1v10a1 1 0 002 0V11a1 1 0 00-1-1zM3 10a1 1 0 00-1 1v10a1 1 0 002 0V11a1 1 0 00-1-1z'/%3E%3C/g%3E%3C/svg%3E") no-repeat center 75% #282C34;
    background-size: 50% !important;
  }



  .toggle.list {
    background: url("data:image/svg+xml,%3Csvg width='75' height='76' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-rule='nonzero'%3E%3Cpath d='M7.6 15.5h52.3a7.6 7.6 0 100-15.2H7.6A7.6 7.6 0 000 7.9a7.7 7.7 0 007.6 7.6zM59.9 30.4H7.6a7.6 7.6 0 100 15.2h52.3a7.6 7.6 0 100-15.2zM59.9 60.5H7.6a7.6 7.6 0 100 15.2h52.3a7.6 7.6 0 100-15.2z'/%3E%3C/g%3E%3C/svg%3E")
      no-repeat center 53% #efefef;
    background-size: 31% !important;
    border-right: 1px solid white;
  }
  .toggle.list.active {
    background: url("data:image/svg+xml,%3Csvg width='75' height='76' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-rule='nonzero'%3E%3Cpath d='M7.6 15.5h52.3a7.6 7.6 0 100-15.2H7.6A7.6 7.6 0 000 7.9a7.7 7.7 0 007.6 7.6zM59.9 30.4H7.6a7.6 7.6 0 100 15.2h52.3a7.6 7.6 0 100-15.2zM59.9 60.5H7.6a7.6 7.6 0 100 15.2h52.3a7.6 7.6 0 100-15.2z'/%3E%3C/g%3E%3C/svg%3E")
      no-repeat center 53% #282C34;
    background-size: 31% !important;
  }
</style>