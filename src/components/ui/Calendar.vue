<template>
 <div class="container border border-gray-200">
  <div class="navigation">
    <div class="nav left" @click="previous"></div>
    <div class="month">{{months[selected][0].format('MMMM YYYY')}}</div> 
    <div class="nav right" @click="next"></div>
  </div>
  <div id="calendar">
    <div v-for="(day, index) in months[selected]" class="date" :style="{ gridColumn: column(index) }" :key="day" @click="select(day)">
      <span :style="marked(day)" class="day" :class="{ active: isActive(day) }">{{ day.format('D') }}</span>
    </div>
  </div>
</div>
</template>

<script>
import moment from "moment";
import { bus } from '@/main'
export default {
  name: 'Calendar',
  data() {
    return {
      months: [],
      eventDates: [],
      selected: 0,
      active: null,
      event: null,
      events: null
    };
  },
  props: ["dates", "filters", "items", "stylesheet", "globalStyle"],
  methods: {
    column(index) {
      if (index == 0) {
        var month = this.months[this.selected];
        return month[0].day() + 1
      }
    },
    isActive(day) {
      if (day == this.active){
        return true
      } else {
        return false
      }
    },
    previous() {
      if (this.selected == 0) {
        this.selected = this.months.length-1
      } else {
        this.selected--
      }
    },
    next() {
      if (this.selected == this.months.length-1) {
        this.selected = 0;
      } else {
        this.selected++
      }
    },
    filterEvent(date) {
      var event = this.events.filter(function(obj) {
          return moment(obj.event.start).format("YYYY-MM-DD") == moment(date).format("YYYY-MM-DD");
      });
      if (event.length) {
        return event[0];
      } else {
        return null;
      }
    },
    select(date) {
      var obj = this.filterEvent(date);
      if (this.active == date) {
        bus.$emit('clearDate', null);
        this.active = null
      } else {
        this.active = date;
        var event_date = moment(obj.event.start).format("YYYYMMDD")
        bus.$emit('setDate', event_date);
        bus.$emit('setFilterDate', obj.event.start);
        bus.$emit('clearType', null);
      }
      
    },
    eventColor(type){
      var color = this.filters[type];
      if (color) {
        return color;
      } else {
        return "#ddd"
      }
    },
    marked(date) {
      if (this.filterEvent(date) !== null) {
        var background = 'black'
        // var color = this.eventColor(this.filterEvent(date).event_type);
        // if (this.stylesheet.highlight && this.stylesheet.highlight.background) {
        //   background = this.stylesheet.highlight.background;
        // } else if (this.globalStyle.highlight && this.globalStyle.highlight.background) {
        //   background = this.globalStyle.highlight.background;
        // }

        var obj = {
          "display": "flex",
          "color": "white",
          "background": background,
          "align-items": "center",
          "justify-content": "center",
          "width": "32px",
          "height": "30px",
          "font-size": "12px",
          "font-weight": "bold",
          "border-radius": "7px"
        }
        return obj;
      } else {
        return null
      }
    }
  },
  mounted() {
    this.events = this.items.filter(({ event }) => event);

    var eventDates = this.events.map(obj => {
      var date = moment(obj.event.start).format("YYYY-MM-01");
      return date;
    })

    var uniqueDates = [...new Set(eventDates)];

    this.eventDates = uniqueDates;

    function getMonths(value) {
      let month = moment(value).startOf();
      return [...Array(month.daysInMonth())].map((_, i) => month.clone().add(i, 'day'))
    }

    this.months = uniqueDates.map(getMonths);
  },
  created() {
    bus.$on('clearDate', (data) => {
      this.active = data
    })
  }
};
</script>

<style lang="scss" scoped>
.navigation {
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #efefef;
  background: #fafafa;
  overflow: hidden;
  .month {
    font-weight: bold;
    color: black;
    font-size: 14px;
    flex-grow: 1;
    text-align: center;
    padding: 10px;
  }
  .nav {
    width: 30px;
    height: 100%;
    display: inline-block;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'%3E%3Cpath d='M38.2 68.2a2.5 2.5 0 003.6 3.6l20-20c1-1 1-2.6 0-3.6l-20-20a2.5 2.5 0 00-3.6 3.6L56.5 50 38.2 68.2z' fill='%23000' fill-rule='evenodd'/%3E%3C/svg%3E") no-repeat center 76%;
    background-size: 20px;
    &.left {
      transform: scaleX(-1);
    }
    &:hover {
    cursor: pointer;
  }
  }
}

.date {
  font-weight: 100;
}
.container {
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font: 14px;
  background: rgba(255,255,255,0.8);
  border-radius: 10px;
  padding: 5px 10px 15px;
  width: 100%;
  justify-content: center;
}

#calendar{
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  max-width: 1024px;
  width: 92%;
}

#calendar > *{
  align-items: center;
  display: flex;
  justify-content: center;
}

#calendar > *::before {
  content: "";
  display: inline-block;
  height: 0;
  padding-bottom: 100%;
  width: 1px;
}

.day {
  font-size: 12px;
  &.active {
   
  border: 2px solid rgba(255,255,255,0.2) !important;
}
  &:hover {
  cursor: pointer;
}
}
</style>
