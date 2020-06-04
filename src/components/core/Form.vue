<template>
  <div class="section w-full mt-6 mb-6 md:section-md" :style="[textStyle('paragraph', data.style), containerStyle(data.style)]" id="form">
    <div class="md:flex flex-col mx-auto items-start" :style="wrapperStyle(data.style)">
      <div class="w-full">
        <h3 :class="titleClassSize(data.style)" :style="textStyle('title', data.style)">{{ data.title }}</h3>
        <div :class="getClass('paragraph', data.style)" :style="textStyle('paragraph', data.style)" v-html="data.content">
        </div>
      </div>
      <div class="form mt-4" v-if="!submitted">
        <div class="field" v-for="(field, index) in data.fields" :key="index">
          <h4 :class="{title_underline: field.type == 'create_account'}">{{field.title}} <span v-if="field.required && field.id !== 'create_account'" class="required">*</span></h4>
          <p class="small pt-2" v-if="field.subtitle">{{field.subtitle}}</p>
          <input v-if="field.type == 'text'" type="text" v-model="form[field.id]" :placeholder="field.placeholder"/>
          <textarea v-if="field.type == 'textarea'" v-model="form[field.id]" :placeholder="field.placeholder"/>
          <div class="flex items-center mt-4 px-1" v-if="field.type == 'create_account'">
            <label class="checkbox bounce">
              <input type="checkbox" v-model="form[field.id]">
              <svg viewBox="0 0 21 21">
                <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
              </svg>
            </label>
            <span class="terms">Yes, and I accept the <a href='https://communities.edgeryders.eu/tos' targer='_blank'>terms of service</a> and <a href='https://communities.edgeryders.eu/tos' targer='_blank'>privacy policy</a> <span class="required">*</span></span>
          </div>
        </div>
        <div class="border p-3 bg-gray-100 rounded-lg" v-if="errors.length > 0">
          Please <span v-if="errors[0] !== 'create_account'">enter a valid</span> <span v-for="(error, index) in errors" :key="error"><span v-if="index !== errors.length-1 && index !== 0">, </span><span v-if="index == errors.length-1 && errors.length-1 !== 0"> &amp; </span><span class="font-bold" v-if="error !== 'create_account'">{{error}}</span><span class="font-bold" v-if="error == 'create_account'">accept the terms</span></span>
        </div>
        <input class="submit" :class="{'active': !validateForm().length}" :style="[!validateForm().length ? uiStyle('highlight', data.style) : {'background': '#ddd'}]"  @click="sendForm()" type="submit" placeholder='send'>
      </div>
      <div v-else class="form_confirmation md:form_confirmation-md">
      
         <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>

        <div class="confirmation_message md:confirmation_message-md">
          <h3 class="text-xl font-bold border-b pb-2 mb-2">{{data.success.title}}</h3>
          <p class="text-lg">{{data.success.text}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import submit from "@/helpers/discourse";

export default {
  props: ["data", "stylesheet", "baseUrl", "globalStyle"],
  data() {
    return { form: {}, submitted: false, errors: [] };
  },
  created() {
     this.form = this.data.fields.reduce((obj, item) => {
         obj[item.id] = ''
         return obj
       }, {})
  },
  methods: {
    submitForm(){
       submit(this.transformForSubmit(this.form).then(() => window.alert('success')))
     },
     transformForSubmit(obj) {
       return Object.entries(JSON.parse(JSON.stringify(obj)))
         .reduce((result, [key, value]) => {
           result[key] = { value: (value && value.text) || value };
           return result;
         }, {});
     },
     validateForm() {
      var array = [];
      this.data.fields.forEach((field) => {
        if (field.required && this.form[field.id] == '') {
          array.push(field.id)
        }
      })
      return array;
     },
     sendForm() {
        this.errors = this.validateForm();
        if (!this.errors.length) {
          this.sendAirtable()
        }
     },
     sendAirtable() {
        var self = this;
        const data = {
          "records": [
            {
              "fields": ''
            }
          ]
        };

        data['records'][0]['fields'] = this.form;

        let axiosConfig = {
          headers: {
          'Authorization': 'Bearer keyocggSHfh6E9gSg',
          'Content-Type': 'application/json'
          }
        };

        axios.post('https://api.airtable.com/v0/' + this.data.settings.airtable.base + '/' + this.data.settings.airtable.table, data, axiosConfig)
        .then(function (response) {
          window.console.log(response);
          self.submitted = true;
        })
        .catch(function (error) {
          window.console.log(error);
        })

     }
  }
};
</script>
<style lang="scss">
.content_block .form p {
  margin-bottom: 0 !important;
}
</style>
