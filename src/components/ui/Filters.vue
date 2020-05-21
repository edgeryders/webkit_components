<template>
  <div class="filters md:filters-md mt-4" v-if="stylesheet"> 
      <h4 class="font-bold pb-2 text-lg w-full mb-3 border-b pl-1 mt-0 hidden md:block">Filters</h4>
      <div v-for="filter in filters" :key="filter.name" class="tag" @click="selectType(filter)" :class="{'active': type == filter}"> 
          <span class="event_color" :style="'background: ' + filter.color"></span>
          {{filter.name}}
      </div>
  </div>
</template>

<script>
import { bus } from '@/main'

export default {
  name: 'Filters',
  data() {
    return {
      location: null,
      type: null,
      locations: [],
      types: [],
      tags: []
    };
  },
  props: ["filters", "items", "stylesheet", "globalStyle"],
  methods: {
    mapLocations(){
      var array = this.items.map(obj => 
        obj.location
      );
      array = this.filterDuplicates(array);
      this.locations = array;
    },
     eventColor(type){
      var color = this.filters[type];
      if (color) {
        return color;
      } else {
        return null
      }
    },
    selectType(tag){
      if (this.type == tag) {
        this.type = null
      } else {
        this.type = tag;
      }

    },
    mapTypes(){
      var test = []
      this.items.map(obj => 
          obj.tags.map(obj => test.push(obj.name))
        );
      var newarray = this.filterDuplicates(test);

      this.types = newarray
    },
    filterDuplicates(array){
      let unique = [...new Set(array)];
      let new_array = unique.filter(word => word !== "call");
      return new_array;
    }
  },
  mounted() {
    this.mapTypes();
    this.mapLocations();
    bus.$on('filterType', (data) => {
      this.type = data;
    })
  },
  watch: {
    type() {
      if (this.type) {
       bus.$emit('clearDate', null);
      bus.$emit('filterType', this.type);
    } else {
      bus.$emit('filterType', null);
    }
    },
    location() {
      bus.$emit('filterLocation', this.location);
    }
  }
};
</script>

<style lang="scss" scoped>

.select {
  display: flex;
  align-items: center;
}
input {
  @apply w-full p-2 mb-2 border;
}

.tag {
  @apply float-left mr-2 mb-2 py-2 px-3 font-light border;
  border-radius: 5px;
  background: white;
  font-size: 12.5px;
    transition: padding .4s ease;

  &:hover {
    cursor: pointer;
    @apply bg-gray-200;
    background: rgba(0,0,0,0.04);
  }
  &.active {
  @apply font-bold;
    opacity: 1;
    background: #efefef;
    &:hover {
      cursor: pointer;
    }
  }
}

.event_color {
  width: 12px;
  height: 12px;
  display: inline-block;
  border-radius: 100%;
  position: relative;
  top: 2px;
  margin: 0 2px 0 0;
}
</style>
