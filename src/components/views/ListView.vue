<template>
  <div class="list_view md:list_view-md" :class="{ 'list_view-md': $mq == 'md' }" :style="elementStyle(config.style, 'wrapper')">
  <div
    class="list_sidebar"
  >
    <div class="search" v-if="show('search', config.display)">
     <input v-model="search" placeholder="Search" />
    </div>
    <ul>
     <li v-for="(item, index) in filteredItems" :key="index" @click="selectItem(item)" :class="{active: selected.title == item.title}">
        <div class="item_time_marker" v-if="showDate(item, index)">
          {{ formatDate(item.event.start) }}
        </div>
        <slot name="item" v-bind:item="item">
        </slot>
      </li>
    </ul>
  </div>

  <div class="list_selected" :class="{'active': slideIn}">
    <div class="go_back" :class="{'overlay': selected && selected.image_url}" @click="showItem()">Go back</div>
    <slot name="selected" v-bind:selected="selected">
      <slot name="image"></slot>
      <slot name="title"></slot>
      <slot name="content"></slot>
      <slot class="footer" name="footer"></slot>
    </slot>
  </div>

</div>
</template>

<script>
import moment from "moment";

export default {
  name: "List",
  props: ["data", "mq", "config"],
  methods: {
    show(value, array) {
      if (array.includes(value)) {
        return true
      } else {
        return false
      }
    },
    selectItem(value) {
      this.selected = value;
      this.showItem();
    },
    showItem() {
      this.slideIn = !this.slideIn;
    },
    formatDate: function(value) {
      return moment(value).format("dddd, MMMM Do");
    },
    showDate(item, index){
      if (item.event) {
        if (!this.filteredItems[index-1] || this.filteredItems[index-1].event && this.formatDate(this.filteredItems[index-1].event.start) !== this.formatDate(item.event.start)) {
          return true
        } else {
          return false
        } 
      } else {
        return false
      }
    },
    sortBy(data, value, order) {
      var ord_val = -1;
      if (order == 'ascending') {
        ord_val = 1;
      };
      var sorted = data.sort((a,b) => (a[value] > b[value]) ? ord_val : ((b[value] > a[value]) ? -ord_val : 0));
      return sorted
    },
    sortByEventDate(data, order) {
      var ord_val = -1;
      if (order == 'ascending') {
        ord_val = 1;
      };
      var sorted = data.sort((a,b) => (a.event.start > b.event.start) ? ord_val : ((b.event.start > a.event.start) ? -ord_val : 0));
      return sorted
    }
  },
  data() {
    return {
      selected: 0,
      search: '',
      slideIn: false
    }
  },
  computed: {
    filteredItems() {
      let filtered = this.data;

      if (this.config && this.config.sort_by) {
        if (this.config.sort_by.property == 'event_date') {
          filtered = this.sortByEventDate(this.data, this.config.sort_by.order)
        } else {
          filtered = this.sortBy(this.data, this.config.sort_by.property, this.config.sort_by.order)
        }
      }

      if (this.search.text != "") {
        filtered = filtered.filter(e => e.title.toLowerCase().includes(this.search.toLowerCase()) || e.excerpt.toLowerCase().includes(this.search.toLowerCase()))
      }

      return filtered
    }
  },
  filters: {

  },
  created(){
    this.selected = this.filteredItems[0]
  }
};
</script>
<style lang="scss">
@responsive {
.list_view {
  @apply relative flex border border-gray-200 overflow-hidden rounded-lg p-0 bg-white;
  max-height: 400px;
  .list_sidebar {
    padding: 0;
    flex-basis: 100%;
    flex-shrink: 0;
    @apply flex flex-col;
    .search {
      height:50px;
      @apply border-b border-gray-200;
    }
    input {
      @apply py-3 w-full text-sm pl-4 font-bold h-full;
      &:focus {
        outline: none;
      }
    }
    ul {
       @apply m-0 p-0;
        overflow: scroll;
        flex-grow: 1;
    }
    li {
      @apply p-0 border-gray-200 border-b;
      list-style-type: none;
      padding: 0 !important;
      .item_time_marker {
        @apply m-0 px-3 py-2 w-full bg-gray-100 w-full font-bold bg-gray-200;
        font-size: 13px;
        color: #282C34;
      }
      h4.item_title {
        @apply pt-3 my-0 mx-3 text-sm;
        font-size: 16px !important;
      }
      p.item_date {
        @apply inline-block text-sm w-full m-0 px-3 pb-2;
        color: rgba(0,0,0,0.4);
      }
      &:last-child {
        @apply border-none;
      }
      &:hover {
        cursor: pointer;
        background: #efefef;
      }
      &.active {
        background: #282C34;
        h4.item_title {
          color: white;
        }
        p.item_date {
          color: rgba(255,255,255,0.7);
        }
      }
    }
  }
  .list_selected {
    @apply absolute w-full bg-white h-full;
    transition: left .34s ease;
    left: 100%;
    &.active {
      left: 0;
    }
    .item_image {
        @apply w-full relative;
        height: 120px;
        background-size: cover !important;
        background-position: 50% 50% !important;
    }
    .go_back {
      border-radius: 6px 6px 0 0;
      @apply px-5 py-3 font-bold bg-gray-100 border-b border-gray-200;
      color: #282C34;
      font-size: 14px;
      top: 0px;
      left: 0px;
      width: 100%;
      z-index: 99999;
      &:hover {
        cursor: pointer;
      }
      &.overlay {
        background: linear-gradient(180deg, rgba(0,0,0,0.6755077030812324) 0%, rgba(0,0,0,0) 200%);
        position: absolute;
        border: none;
        color: white;
      }
    }
    .selected_title {
      @apply inline-flex items-center border-b border-gray-200 pt-5 pb-2 mx-5;
      width: auto !important;
      display: block !important;
      a {
        @apply m-0 text-lg font-bold leading-tight;
      }
    }
    .item_excerpt {
      @apply mt-0 leading-normal;
      font-size: 15px;
    }
  }
}

.list_view-md {
  max-width: 85%;
  @apply mx-auto mt-2;
  .item_excerpt {
    @apply mx-5 pt-2
  }
  .list_sidebar {
    @apply border-r border-gray-200;
    flex-basis: 300px;
  }
  .list_selected {
    @apply relative;
    left: 0;
    .go_back {
      @apply hidden;
    }
  }
}
}

.list_selected { 
  height: 100%;
  @apply relative;
}

.list_view {
.item_meta {
  @apply relative px-2 border-none;
  background: none !important;
  a {
  @apply m-0 pr-0;
    border: none;
  }
}
}
</style>
