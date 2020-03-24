<template>
  <div class="section md:section-md" id="subscribe">
    <div class="wrapper md:wrapper-md">
      <div class="pr-8 email">
        <h1 class="flex">
          <div class="subscribe_icon"></div>
          {{title}}
        </h1>
        <div class="content md:content-md" v-html="text"></div>
        <vue-mailchimp-email-signup-form :elementId="'first-email-signup-form'" :url="'https://edgeryders.us2.list-manage.com/subscribe/post?u=2426561089e1f5ab32da252cd&amp;id=21ed4ca53d'" />
      </div>

      <div class="p-2 mt-4 flex items-center">
        <img :src="getAsset('mailchimp-gdpr.svg')" class="mr-3" />
        <p class="text-xs">We use Mailchimp as our marketing platform. By clicking subscribe, you acknowledge that your information will be transferred to Mailchimp for processing. <a class="underline" href="Learn more about Mailchimp's privacy practices here.">Learn more about Mailchimp's privacy practices here.</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { email: "" };
  },
  methods: {
    getAsset(file) {
      return require("@/assets/" + file);
    }
  },
  props: ["title", "text"]
};
</script>
<style lang="scss">
.wrapper {
  @apply pt-2 pb-6;
}
.subscribe_icon {
  width: 35px;
  height: 35px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25.4 36.5'%3E%3Cpath fill='white' d='M18.2 24.5a3.4 3.4 0 11-6.5 1.3l5.7-2.5c.3.3.6.7.8 1.2zM.8 15.5c-1.6-4-.8-7.8 1.6-10.3l-.3-.5A3.4 3.4 0 118.4 2l.1.5c3.6 0 7 2.1 9 5.8 0 0 2.6 6.3 5.6 6.8.1 0 1.7 0 2.2 1.2.5 1-.5 2.5-2.1 3.3l-18 7.7c-1.6.7-3.4.4-3.8-.7-.4-1.2.5-2.2.6-2.3C3.7 21.7.8 15.5.8 15.5z'/%3E%3C/svg%3E%0A") no-repeat 53% 59% blue;
  border-radius: 100px;
  margin-right: 10px;
  background-size: 35% !important;
}
.subscribe-container {
  width: 100% !important;
}
#first-email-signup-formmc_embed_signup_scroll {
  width: 100%;
}
.email .subscribe-container {
  width: 100% !important;
}
.email button {
  background: blue !important;
  color: white !important;
  @apply p-3;
  margin: 0 !important;
}
.email input {
width: 100% !important;
}
#first-email-signup-formmc_embed_signup {
  width: 70%;
}
    .content {
      p {
         @apply text-lg mb-2 font-bold;
      }
      a {
        @apply underline;
      }
    }
#subscribe {
  @apply bg-gray-100;
  .wrapper {
    h1 {
      @apply text-2xl mb-3 pb-2 font-bold border-b;
      width: 100%;
      color: #0010FF;
      span {
        font-weight: 300;
      }
    }
    .email {
      @apply flex w-full flex-col items-start mb-2;
      input {
        @apply p-3 bg-white my-3 border;
        width: 100%;
        &:focus {
          outline: none;
          border: 1px solid #ddd;
        }
      }
    }

  }
}
$checkbox-diameter: 20px;
$checkbox-bg: #c8dbff;
$checkbox-bg-selected: #0034C9;
$checkbox-tick: #fff;
.checkbox-wrapper {
  @apply ml-1 mr-1;
  height: $checkbox-diameter;
  text-align: center;
}
.checkbox:not(last-of-type) {
  display: inline-block;
  margin-right: $checkbox-diameter;
}
.checkbox {
  position: relative;
  label {
    position: absolute;
    top: 0;
    left: 0;
    width: $checkbox-diameter;
    height: $checkbox-diameter;
    background-color: $checkbox-bg;
    border: 1px solid $checkbox-bg;
    border-radius: 10%;
    cursor: pointer;
    transition:
      background-color 300ms ease,
      colour 300ms ease,
      box-shadow 300ms ease;

    // tick
    &:after {
      content: '';
      position: absolute;
      top: 40%;
      left: 35%;
      width: 35%;
      height: 14%;
      opacity: 0;
      border-left: 1px solid $checkbox-tick;
      border-bottom: 1px solid $checkbox-tick;
      transform: rotate(-45deg);
      transition: opacity 300ms ease;
    }
  }

  input {
    visibility: hidden;
    // selected state bg
    &:checked + label {
      background-color: $checkbox-bg-selected;
      border-color: $checkbox-bg-selected;

      // selected state tick
      &:after {
        opacity: 1;
      }
    }
  }
}
</style>
