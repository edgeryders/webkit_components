<template>
  <div class="section md:section-md" :style="containerStyle(data.style)">
    <div class="flex font-bold justify-between items-center mx-auto" v-if="data.title" :style="textStyle('title', data.style)" >
      <h3 class="m-0 p-0 w-full" :class="titleClassSize(data.style)">{{ data.title }}</h3>
      <div class="toggle_menu" v-if="data.views && data.views.length">
        <div v-for="(view, index) in getViews(data.views)"
          class="toggle"
          :class="[view, {active: activeView == view}]"
          @click="toggleView(view)"
          :key="index"
        ></div>
      </div>
    </div>
    <div v-for="(view, index) in data.views" :key="index">

              <TextView v-if="view.text && ready" class="wrapper md:wrapper-md py-4 pb-2 mx-auto" :stylesheet="view.style" :data="view.text" />

              <Slider
                v-if="topics && view.slider && activeView == 'slider' && ready"
                :data="topics"
                :baseUrl="config.baseUrl"
                :config="view.slider.config"
                :display="view.slider.config.display"
                :stylesheet="view.slider.style"
                class="mx-auto"
                ref="slider"
              />
      
              <Grid v-if="topics && view.grid && activeView == 'grid' && ready" v-bind:data="topics" :config="view.grid">
                <template v-slot:item="{ item }">
                  
                 <GridItem>
                    <template>
                      <div slot="header">
                        <a :href="getPermalink(item.slug)" target="_blank" class="">{{item.title}}</a>
                        <p class="item_date" v-if="show(view.grid.display, 'date')">
                          {{ item.created_at | formatDate }}
                        </p>
                      </div>
                      <div slot="content">
                        <div class="item_image" :style="{ background: 'url(' + item.image_url + ')' }"></div>
                        <div class="item_excerpt" v-html="item.excerpt"></div>
                      </div>
                      <div slot="footer">
                        <div class="item_meta">
                          <a class="item_favs" v-if="show(view.grid.display, 'favourites')" :href="getPermalink(item.slug)" target="_blank">{{item.like_count}}</a>
                          <a class="item_replies" v-if="show(view.grid.display, 'replies')" :href="getPermalink(item.slug)" target="_blank">{{item.reply_count}}</a>
                        </div>
                      </div>
                    </template>
                 </GridItem>

                </template>
              </Grid>

          <List v-if="topics && view.list && activeView == 'list' && ready" :data="topics" :config="view.list">
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
                <a :href="getPermalink(selected.slug)" target="_blank">
                  {{selected.title}}
                </a>
              </div>

               <div class="item_meta" v-if="view.list.display && show(view.list.display, 'favourites') || view.list.display && show(view.list.display, 'replies')">
                <a class="item_favs" v-if="show(view.list.display, 'favourites')" :href="getPermalink(selected.slug)" target="_blank">{{selected.like_count}}</a>
                <a class="item_replies" v-if="show(view.list.display, 'replies')" :href="getPermalink(selected.slug)" target="_blank">{{selected.reply_count}}</a>
              </div>

            </div>

            <div slot="content">
              <div class="item_excerpt" v-html="selected.excerpt"></div>
            </div>

            <div slot="footer">
            
            </div>

          </template>
        </List>

        <Row v-if="topics && view.cards && activeView == 'cards' && ready" :topics="topics" :stylesheet="data.style" :display="view.cards.display" />
  </div>
  </div>
</template>

<script>
import Slider from "@/components/views/Slider.vue";
import Grid from "@/components/views/Grid.vue";
import GridItem from "@/components/views/GridItem.vue";
import List from "@/components/views/ListView.vue";
import TextView from "@/components/views/Text.vue";

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
    TextView,
    Slider,
    Grid,
    GridItem,
    List,
    Row
  },
  created() {
    this.activeView = this.getViews(this.data.views)[0];
    if (this.data.config.view) {
      this.activeView = this.data.config.view
    }
    if (this.data.config.tag) {
      this.getTopics(this.data.config.tag, 'tags');
    }
    if (this.data.config.category) {
      this.getTopics(this.data.category, 'category');
    }
  },
  methods: {
    show(array, property) {
      if (array.includes(property)) {
        return true
      } else {
        return false
      }
    },
    getTopics(value, filter) {
      axios.get(
        `${this.baseUrl}/${filter}/${value}.json`
      ).then(({ data }) => {
        var topics = data.topic_list.topics;
        if (this.data.sort_by) {
           topics = this.sortBy(data, topics.sort_by.property, topics.sort_by.order)
         }
        this.topics = topics;
        this.ready = true
      });
    },
    getViews(data) {
      return data.reduce(function(result, view) {
        if (Object.keys(view)[0] !== "text") {
          result.push(Object.keys(view)[0]);
        }
        return result;
      }, []);
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
      opacity: 0.9;

    }
    &.active {
      background-color: #282C34 !important;
      &:hover {
        opacity: 0.9;
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


.item_favs {
  @apply font-bold mt-0 p-3 pl-6 pr-4 text-sm;
  color: rgba(0,0,0,0.7);
  text-decoration: none !important;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 45.8 54.7'%3E%3Cpath fill='rgba(0,0,0,0.7)' d='M9.6 27.3a2.1 2.1 0 01.6 1.9L8 41.3a2 2 0 003 2.2l10.9-5.8a2.1 2.1 0 012 0l10.9 5.8a2 2 0 003-2.2l-2.1-12.1a2.1 2.1 0 01.6-2l8.9-8.5a2.1 2.1 0 00-1.2-3.6l-12.2-1.6a2.1 2.1 0 01-1.6-1.2L24.8 1.2a2.1 2.1 0 00-3.8 0l-5.3 11.1a2.1 2.1 0 01-1.7 1.2L1.8 15a2.1 2.1 0 00-1.2 3.6z' data-name='Calque 2'/%3E%3C/svg%3E") no-repeat 15px 56%;
  background-size: 14px;
  padding-left: 35px;
}

.item_replies {
  @apply border-gray-200 font-bold p-3 pl-6 pr-4 text-sm;
  color: rgba(0,0,0,0.7);
  text-decoration: none !important;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 512 640'%3E%3Cpath fill='rgba(0,0,0,0.7)' d='M512 396v26c-3 7-5 14-11 19-18 14-43 7-52-15-9-24-26-39-48-50-30-15-63-21-96-23l-78-1a23 23 0 00-3 0v62a39 39 0 01-2 11c-6 22-34 33-55 12L15 284c-7-6-13-13-15-22v-12c2-9 8-16 15-22l87-87 66-66c10-11 23-14 36-8s20 17 20 31v62h7c6 0 58 1 105 13 28 7 73 19 109 50 66 57 67 150 67 173z'/%3E%3C/svg%3E") no-repeat 15px 56%;
  background-size: 14px;
  padding-left: 35px;
}

    .item_meta {
      @apply flex items-center bg-gray-100 overflow-hidden border-t border-gray-200;
      height: 45px;
      a {
        @apply border-l;
        &:nth-child(1) {
          border: none;
        }
      }
    }
</style>