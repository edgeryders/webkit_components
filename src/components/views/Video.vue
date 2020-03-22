<template>
    <div>
        <div class="VueVid" v-if="sources" ref="videoWrap">
            <!-- Main Video Element Wrap -->
            <div class="VueVid__video">
                <!-- If User pass few mime-types then loop over them and assign correct to each source element -->
                <div v-if="splash" class="play_large" @click="togglePlay" ></div>
                <video
                    v-if="Array.isArray(sources)"
                    @timeupdate="handleProgress"
                    @click="togglePlay"
                    ref="videoEl"
                    :poster="poster"
                >
                    <source v-for="source in sources" :key="source" :src="source" :type="'video/' + getType(source)" />
                </video>
                <!-- In case user pass video from other service as String, just assign src attribute to video -->
                <video
                    v-else
                    :src="sources"
                    @timeupdate="handleProgress"
                    @click="togglePlay"
                    ref="videoEl"
                    :poster="poster"
                >
                </video>

            </div>
            <!-- Video Controls -->
            <div class="VueVid__controls">
              <div class="container">
                <button class="VueVid__button toggle" title="Toggle Play" @click="togglePlay">
                    <span v-if="isPlaying">
                        <span class="pause"></span>
                    </span>
                    <span v-else>
                        <span class="play"></span>
                    </span>
                </button>

                <div
                    class="Progress"
                    ref="progress"
                    @click="scrub($event)"
                    @mousemove="isMouseDown && scrub($event)"
                    @mousedown="isMouseDown = true"
                    @mouseup="isMouseDown = false"
                >
                    <div class="Progress__filled" :style="{ 'flex-basis':  progressActivity + '%'  }"></div>
                </div>

                <div class="remaining">{{remainingTime}}</div>

                <input
                    type="range"
                    @change="handleRangeUpdate('volume', volumeValue)"
                    class="volume"
                    min="0"
                    max="1"
                    step="0.05"
                    v-model="volumeValue"
                >

                <button @click="toggleFullScreen" class="VueVid__button">
                    <span class="expand"></span>
                </button>
    </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "Video",
  props: {
    sources: {
      type: [String, Array]
    },
    poster: String,
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    if (this.autoPlay) {
      this.togglePlay();
    }
  },
  data() {
    return {
      isPlaying: false,
      splash: true,
      progressActivity: 0,
      remainingTime: null,
      volumeValue: 1,
      playbackRateValue: 1,
      isMouseDown: false
    };
  },
  methods: {
    togglePlay() {
      this.$refs.videoEl.paused
        ? this.$refs.videoEl.play()
        : this.$refs.videoEl.pause();
      this.splash = false;
      this.updateButton();
    },
    updateButton() {
      this.isPlaying = !this.isPlaying;
    },
    handleProgress() {
      if (this.$refs.videoEl.currentTime) {
        const percent =
          (this.$refs.videoEl.currentTime / this.$refs.videoEl.duration) * 100;
        this.progressActivity = percent;
        const convert = (current, duration) => {
          var remaining = duration - current;
          var minutes = Math.trunc(remaining / 60),
            seconds_int = remaining - minutes * 60,
            seconds_str = seconds_int.toString(),
            seconds = seconds_str.substr(0, 2),
            time = minutes + ":" + seconds;
          return time;
        }
        var time = convert(
          this.$refs.videoEl.currentTime,
          this.$refs.videoEl.duration
        );
        this.remainingTime = time;
      }
    },
    handleRangeUpdate(name, value) {
      this.$refs.videoEl[name] = value;
    },
    scrub(e) {
      const scrubTime =
        (e.offsetX / this.$refs.progress.offsetWidth) *
        this.$refs.videoEl.duration;
      this.$refs.videoEl.currentTime = scrubTime;
    },
    toggleFullScreen() {
      if (this.$refs.videoWrap.mozRequestFullScreen) {
        this.$refs.videoWrap.mozRequestFullScreen();
      } else {
        this.$refs.videoWrap.webkitRequestFullScreen();
      }
    },
    getType(path) {
      const pattern = /\.[0-9a-z]+$/i;
      return path.match(pattern)[0].slice(1);
    }
  }
};
</script>

<style lang="scss">
    .VueVid {
        max-width:750px;
        border:5px solid white;
        border-radius: 10px;
        box-shadow:0 0 20px rgba(0,0,0,0.2);
        position: relative;
        font-size: 0;
  position: relative;
        overflow: hidden;
    }
    .play_large {
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125'%3E%3Cswitch%3E%3Cg%3E%3Cpath fill='white' d='M50 2.5a47.5 47.5 0 100 95 47.5 47.5 0 000-95zm15.3 49.9L42.9 67.3a2.9 2.9 0 01-4.5-2.4V35.1c0-2.3 2.6-3.7 4.5-2.4l22.4 14.9a2.9 2.9 0 010 4.8z'/%3E%3C/g%3E%3C/switch%3E%3C/svg%3E") rgba(0,0,0,0.1) no-repeat center 55%;
    background-size: 70px;
    position: absolute;
    top: 0px;
    left: 0%;
    margin: 0 auto;
    &:hover {
    cursor: pointer;
  }
  }
    .remaining {
      color: white;
      display: inline !important;
      margin-top: .5rem;
      padding: 0px 10px 0 0;
      width: auto !important;
      flex-grow: 0 !important;
      font-size: 1rem;
    }
    .VueVid:fullscreen {
        max-width:none;
        width:100%;
        border:0;
    }
    .VueVid:-webkit-full-screen {
        max-width:none;
        width:100%;
    }
    .VueVid__video  video {
        width:100%;
        object-fit:cover;
    }
    .VueVid__button {
        background:none;
        border:0;
        line-height:1;
        color:white;
        text-align: center;
        outline:0;
        padding: 0;
        cursor:pointer;
        max-width:40px;
     }
     .VueVid__button:focus {
        border-color:#ffc600;
     }
     .VueVid__slider {
        width:10px;
        display: flex;
        flex-basis: 10%;
        height: 30px;
     }
     .VueVid__controls {
         position:absolute;
         bottom:0px;
         width: 100%;
            border-radius: 20px;
         transform:translateY(100%) translateY(-5px);
         transition:all .3s;
         background:rgba(0,0,0,0.1);
     }
     .container {
      position: relative;
      display:flex;
       justify-content: space-between;
     }
     .VueVid:hover .VueVid__controls {
         transform:translateY(0);
                     border-radius: 0 0 8px 8px;
     }
     .VueVid__button span {
       width: 40px;
      height: 40px;
      display: block;
      background-size: 1rem !important;
     }
     .play {
      background: url("data:image/svg+xml,%3Csvg aria-hidden='true' data-prefix='fas' data-icon='play' class='svg-inline--fa fa-play fa-w-14' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='%23fff' d='M424 215L72 7C44-10 0 6 0 48v416c0 38 41 60 72 41l352-208c32-18 32-64 0-82z'/%3E%3C/svg%3E") no-repeat center;
     }
     .pause {
      background: url("data:image/svg+xml,%3Csvg aria-hidden='true' data-prefix='fas' data-icon='pause' class='svg-inline--fa fa-pause fa-w-14' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath fill='%23fff' d='M144 479H48c-26 0-48-21-48-48V79c0-26 22-48 48-48h96c27 0 48 22 48 48v352c0 27-21 48-48 48zm304-48V79c0-26-21-48-48-48h-96c-26 0-48 22-48 48v352c0 27 22 48 48 48h96c27 0 48-21 48-48z'/%3E%3C/svg%3E") no-repeat center;
     }
     .volume {
      border-radius: 10px;
     }
     .expand {
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Cpath fill='%23fff' d='M492 602c0 6-2 11-7 15L274 829l91 92c8 8 12 17 12 28 1 11-3 21-12 29-8 8-17 12-28 12H51c-11 0-21-4-29-12s-12-18-12-29V663c0-11 4-20 12-28 8-9 18-13 29-13s20 4 28 13l92 91 212-211a20 20 0 0130 0l72 72c5 5 7 10 7 15zM990 51v286c0 11-4 20-12 28s-18 12-29 12-20-4-29-12l-91-92-212 212a20 20 0 01-30 0l-72-72a20 20 0 010-30l211-212-91-91c-9-9-13-18-13-29s4-21 13-29c8-8 17-12 28-12h286c11 0 21 4 29 12s12 18 12 29z'/%3E%3C/svg%3E") no-repeat center;
      background-size: 3rem !important;
     }

     .Progress {
        position: absolute;
        display:flex;
        width: 100%;
        flex-basis:100%;
        height:5px;
        transition:height 0.3s;
        background:rgba(0,0,0,0.5);
        cursor:pointer;
        border-radius: 0 0 5px 5px;
     }
     .Progress__filled {
        width:50%;
        background:#00ACC2;
        flex:0;
        flex-basis:50%;
        border-radius: 0 0 0 4px;
     }
     .VueVid__button {
     opacity: 0;
     transition: opacity .5s ease;
   }
     .VueVid:hover {
        .VueVid__button {
     opacity: 1;
   }
      .Progress {
           position: relative;
        display:flex;
        flex-basis:100%;
        height:3px;
        border-radius: 10px;
        border-radius: 10px;
        margin: 12px 10px 0 0px;
        transition:height 0.3s;
        background:rgba(0,0,0,0.5);
        cursor:pointer;
         height:15px;
     }
           .Progress__filled {
                  border-radius: 10px;
         }
   }
     input[type=range] {
        -webkit-appearance: none;
        background:transparent;
        width: 40%;
        margin: 0 0px;
     }
     input[type=range]:focus {
        outline: none;
     }
     input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 15px;
        cursor: pointer;
        background: rgba(255,255,255,0.8);
        border-radius: 10px;
     }
     input[type=range]::-webkit-slider-thumb {
        height: 15px;
        width: 15px;
        border-radius: 50px;
        background: #00ACC2;
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: 0px;
     }
     input[type=range]:focus::-webkit-slider-runnable-track {
        background: #41B883;
     }
     input[type=range]::-moz-range-track {
        width: 100%;
        height: 15px;
        cursor: pointer;
        background: rgba(255,255,255,0.8);
        border-radius: 10px;
     }
     input[type=range]::-moz-range-thumb {
         height: 15px;
        width: 15px;
        border-radius: 50px;
        background: #00ACC2;
        cursor: pointer;
        margin-top: 0px;
     }
</style>
