<template>
  <div class="section md:section-md" :style="containerStyle(data.style)">
    <div class="flex justify-between items-center p-0 m-0 mx-auto" v-if="data.title && $mq=='md'" :style="textStyle('title', data.style)">
      <h3 :class="titleClassSize(data.style)">{{ data.title }}</h3>
      <div class="toggle_menu">
          <div
          class="toggle previous"
          @click="previous"
          ></div>
          <div
            class="toggle next"
            @click="next"
          ></div>
      </div>
    </div>
    <div
      class="flex mx-auto px-5"
    >

      <List v-if="$mq=='sm'" :header="data.title" :items="people" image="image" title="name" info="excerpt" filter="name" url="url" :search="true" type="user" />

      <div class="user_grid md:user_grid-md mx-auto pb-8" v-else style="width: 80vw">
        <a
          class="user_avatar md:user_avatar-md"
          v-for="item in people.slice(thumbnail_index, thumbnail_index + thumbnail_count)"
          :key="item.name"
          :href="item.url"
          target="_blank"
          :style="{ backgroundImage: 'url(' + item.image + ')' }"
        >
          <div class="profile_info" :style="textStyle('paragraph', data.style)">
            <h2>{{item.name}}</h2>
            <p>{{item.excerpt}}</p>
          </div>
        </a>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import List from "@/components/ui/List.vue";
export default {
  props: ["data", "stylesheet", "baseUrl", "globalStyle"],
  data() {
    return {
      people: [],
      thumbnail_count: 12,
      thumbnail_index: 0,
      selected: null,
      toggle: false,
      search: '',
      view: 'custom_ngi_people'
    };
  },
  methods: {
    previous() {
      if (this.thumbnail_index - this.thumbnail_count < 0) {
        this.thumbnail_index = 0;
      } else {
        this.thumbnail_index = this.thumbnail_index - this.thumbnail_count;
      }
    },
    next() {
      if (this.thumbnail_index + this.thumbnail_count > this.data.profiles.length) {
        this.thumbnail_index = 0;
      } else {
        this.thumbnail_index = this.thumbnail_index + this.thumbnail_count;
      }
    },
    setActive(value) {
      this.selected = this.people.filter(x => x.id == value)[0];
      this.toggle = !this.toggle;
    },
    toggleView(view) {
      this.view = view;
    },
    getUser(excerpt) {
      var username = excerpt.match(/(@[^\s]*(?=<\/a>))/g);
      if (username == null) {
        return null;
      } else {
        return username[0];
      }
    },
    getPeople() {
      axios.get(
        `https://edgeryders.eu/t/${this.data.profiles}.json`
      ).then(({ data }) => {
        this.people = this.getJson(data.post_stream.posts[0].cooked);
      });
    }
  },
  computed: {
    filteredPeople() {
      return this.people.filter(item => {
        return item.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  components: {
    List
  },
  created: function() {
    this.getPeople();
  }
};
</script>
<style lang="scss">

@keyframes fadeInProfile {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.user_grid .user_avatar {
    @apply bg-cover inline-block relative;
    width: 13.33vw;
    height: 12vw;
    opacity: 0;
    animation: fadeInProfile .3s ease forwards;
    overflow: hidden;
  }

@for $i from 1 to 13 {
  .user_grid .user_avatar:nth-child(#{$i}) { animation-delay: $i * 0.05s; }
}
.user_grid .user_avatar .profile_info {
  height: 100%;
  width: 100%;
  @apply absolute bottom-0 p-2 inline-block;
  background: rgba(0,0,0,0.8);
  transform: translateY(100%);
  transition: all .7s ease;
}

.user_grid .user_avatar:hover .profile_info {
  transform: translateY(0%);
  color: white;
}

.user_grid .user_avatar .profile_info {
  h2 {
    @apply font-bold;
    font-size: 12px;
  }
  p {
    font-size: 12px;
  }
}

.info:hover {
  border-left: 4px solid #2EA48A !important;
  background: #fafafa;
  cursor: pointer;
}

// icons 
.toggle.previous {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 128 160'%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='16' d='M85 22L43 64l42 42'/%3E%3C/svg%3E") no-repeat center 65% #ddd;
  border-right: 1px solid white;
}

.toggle.previous:active {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 128 160'%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='16' d='M85 22L43 64l42 42'/%3E%3C/svg%3E") no-repeat center 65% #ddd;
}
.toggle.next:active {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 128 160'%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='16' d='M43 22l42 42-42 42'/%3E%3C/svg%3E") no-repeat center 65% #269079;
}

.toggle.next {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' data-name='Layer 1' viewBox='0 0 128 160'%3E%3Cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='16' d='M43 22l42 42-42 42'/%3E%3C/svg%3E") no-repeat center 65% #2EA48A;
}

// mobile_list

.list_container .list_header {
  background: #2EA48A;
  color: white;
}

.list_container .list_back {
  background: #2EA48A;
  color: white;
}

.toggle.search_list_mobile {
  margin-right: 14px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'%3E%3Cpath fill='rgba(0,0,0,0.4)' d='M47.1 32.6a14.6 14.6 0 100 29.2 14.6 14.6 0 000-29.2z'/%3E%3Cpath fill='rgba(0,0,0,0.4)' d='M50.1 1.4a48.7 48.7 0 100 97.4 48.7 48.7 0 000-97.4zm23.7 73.7c-.7.7-1.8 1.1-3 1.1s-2.2-.4-3-1.1l-9.2-9.2-.9.5a21.9 21.9 0 117.7-7.1l-.6 1 9.1 9.1c.7.8 1.2 1.8 1.2 2.9-.1 1-.5 2-1.3 2.8z'/%3E%3C/svg%3E") no-repeat center 4px;
  background-size: 33px !important;
  &.active {
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'%3E%3Cpath fill='white' d='M47.1 32.6a14.6 14.6 0 100 29.2 14.6 14.6 0 000-29.2z'/%3E%3Cpath fill='white' d='M50.1 1.4a48.7 48.7 0 100 97.4 48.7 48.7 0 000-97.4zm23.7 73.7c-.7.7-1.8 1.1-3 1.1s-2.2-.4-3-1.1l-9.2-9.2-.9.5a21.9 21.9 0 117.7-7.1l-.6 1 9.1 9.1c.7.8 1.2 1.8 1.2 2.9-.1 1-.5 2-1.3 2.8z'/%3E%3C/svg%3E") no-repeat center 4px;
  }
}

 .list_item_info {
    a.list_item_url {
      background: #2EA48A;
      color: white;
      border: none;
      border-radius: 4px;
    }
  }



.mobile_list {
  &.event {
    .list_item_info {
      .list_event_title {
        background: #2EA48A;
      }
    }
    a.list_item_url {
      background: #fff;
      color: #2EA48A;
      border-top: 1px solid #ddd;
      @apply mx-2 px-1;
      border-radius: 0;
    }
  }
}
</style>