import config from "@/data/config.json";
import WebFontLoader from 'webfontloader';
var YAML = require('yamljs');
import axios from "axios";

export default {
  data: function() {
    return {
      config,
      globalStyleSheet: null,
      sectionStyle: null,
      sections: null,
      navItems: null,
      event: null,
      overrideStyle: false
    };
  },
  methods: {
    getUrlStyle(style) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      const font = urlParams.get('font');
      const toggle = urlParams.get('toggle');
      const highlight = urlParams.get('highlight');
      const action = urlParams.get('action');

      var obj = style;
   
      if (font) {
        WebFontLoader.load({
          google: {
            families: [font]
          }
        });
        obj['fonts'] = [font];
        obj['title']['font'] = [font];
        obj['subtitle']['font'] = [font];
        obj['paragraph']['font'] = [font];
      }

      if (toggle) {
        obj['toggle']['background'] = toggle;
      }

      if (highlight) {
        obj['highlight']['background'] = [highlight];
      }

      if (action) {
        obj['action']['background'] = [action];
      }
  
      this.globalStyleSheet = obj;

    },
    remoteConfig(configId) {
      axios.get(
        'https://edgeryders.eu/t/' + configId + '.json'
        ).then(({ data }) => {
          if (this.getJson(data.post_stream.posts[0].cooked)){
            var json = this.getJson(data.post_stream.posts[0].cooked);
            this.loadData(json);
          } else {
            var yaml = this.getYaml(data.post_stream.posts[0].cooked);
            this.loadData(yaml);
          } 
        });
    },
    localConfig(){
      var config;
      try {
        config = require('@/data/config.yaml');
      }
      catch(err) {
        config = require('@/data/config.json');
      }
      if (config.config.configId) {
       axios.get(
          'https://edgeryders.eu/t/' + config.config.configId + '.json'
          ).then(({ data }) => {
            if (this.getJson(data.post_stream.posts[0].cooked)){
              var json = this.getJson(data.post_stream.posts[0].cooked);
              this.loadData(json);
            } else if (this.getYaml(data.post_stream.posts[0].cooked)) {
              var yaml = this.getYaml(data.post_stream.posts[0].cooked);
              this.loadData(yaml);
            } else {
              this.loadData(config);
            }
          });
      } else {
        this.loadData(config);
      }
    },
    isNumeric(num){
      return !isNaN(num)
    },
    getData() {
      var pathname = window.location.pathname.substring(1);
      var address = window.location.hostname;
      axios.get(
          'https://edgeryders.eu/t/13671.json'
          ).then(({ data }) => {
            var directories = this.getYaml(data.post_stream.posts[0].cooked);
            window.console.log(directories);
            var result = directories.filter(x => x.alias == pathname || x.id == pathname || x.domain == address)[0];
            window.console.log(address);
            if (result && result.id) {
              try {
                this.remoteConfig(result.id);
              }
              catch(e) {
                this.localConfig();
              }
            } else if (pathname && this.isNumeric(pathname)) {
              try {
                this.remoteConfig(pathname);
              }
              catch(e) {
                this.localConfig();
              }
            } else {
              this.localConfig();
            }
          });
    },
    loadData(data){

      if (this.overrideStyle) {
        this.getUrlStyle(data.style);
      } else {
        this.globalStyleSheet = data.style;
      }
      this.sections = data.blocks;
      this.$globals.blocks = data.blocks;
      this.$globals.config = data.config;
      if (data.event) {
        this.$globals.event = data.event;
      }
      if (data.template) {
        this.$globals.template = data['template'];
      }
      if (data.style && data.style.fonts) {
      this.loadFonts(data.style.fonts);
      }
      this.getNavElements(data.blocks);
    },
    getEvent(){
        return this.event
    },
    getNavElements(sections) {
      if (sections.length) {
        var navArray = sections.map(function(el) {
          if (el.id) {
            return {
              text: el.id,
              url: '#' + el.id
            } 
          }
        });
        this.$globals.navItems = navArray.filter(function (el) {
            return el != null;
        });
      }
    },
    loadFonts(fontFamily) {
      WebFontLoader.load({
        google: {
          families: fontFamily,
        },
      });
    },
    validateJson(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    },
    validateYaml(str) {
      try {
        YAML.parse(str);
      } catch (e) {
        return false;
      }
      return true;
    },
  	getJson(value) {
    	const doc = new DOMParser().parseFromString(value, "text/html");
    	var json = [...doc.querySelectorAll('code')].map(code => code.textContent);
    	var final = String(json).replace(/\n/g, " ");
    	if (this.validateJson(final)) {
    		var obj = JSON.parse(final);
        return obj;
    	} else {
    		return false
    	}
    },
    getYaml(value) {
      const doc = new DOMParser().parseFromString(value, "text/html");
      var yaml = [...doc.querySelectorAll('code')].map(code => code.textContent);
      if (this.validateYaml(yaml[0])) {
        return YAML.parse(yaml[0]);
      } else {
        return false
      }
    },
    MediaQueryIndex() {
      var index = 0;
      if (this.$mq=='md') {
        index = 1;
      }
      return index;
    },
    applyStyle(element, property) {
      var index = this.MediaQueryIndex();
      var style = '';

      if (this.globalStyle && this.globalStyle[element] && this.globalStyle[element][property]) {
        if (this.globalStyle[element][property][index]) {
          style = this.globalStyle[element][property][index];
        } else {
          style = this.globalStyle[element][property][0];
        }
      } 
  
      if (this.sectionStyle && this.sectionStyle[element] && this.sectionStyle[element][property]) {
        if (this.sectionStyle[element][property][index]) {
          style = this.sectionStyle[element][property][index];
        }
        else {
          style = this.sectionStyle[element][property][0];
        }
      }

      if (this.overrideStyle && this.globalStyle[element] && this.globalStyle[element][property]) {
        if (this.globalStyle[element][property][index]) {
          style = this.globalStyle[element][property][index];
        } else {
          style = this.globalStyle[element][property][0];
        }
      }
      return style;
    },
    style(element, property) {
      var index = this.MediaQueryIndex();
      var style = '';

      if (this.globalStyle && this.globalStyle[element] && this.globalStyle[element][property]) {
        if (this.globalStyle[element][property][index]) {
          style = this.globalStyle[element][property][index];
        } else {
          style = this.globalStyle[element][property][0];
        }
      } 
  
      if (this.sectionStyle && this.sectionStyle[property]) {
        if (this.sectionStyle[property][index]) {
          style = this.sectionStyle[property][index];
        }
        else {
          style = this.sectionStyle[property][0];
        }
      }

      if (this.overrideStyle && this.globalStyle[element] && this.globalStyle[element][property]) {
        if (this.globalStyle[element][property][index]) {
          style = this.globalStyle[element][property][index];
        } else {
          style = this.globalStyle[element][property][0];
        }
      }
      return style;
    },
    getClass(element, style) {
      var index = this.MediaQueryIndex();
      if (style[element] && style[element].class) {
        if (index !== 0 && style[element].class.length > 1) {
          return style[element].class[index]
        }
        else {
          return style[element].class[0]
        }
      } else {
        return null
      }
    },
    getImageWidth(value) {
      var index = this.MediaQueryIndex();
      var width = "100%";
      if (Array.isArray(value)) {
        if (index !== 0 && value.length > 1) {
          width = value[index]
        }
        else {
          width = value[0]
        }
      }
      else if (typeof value === 'string' || value instanceof String) {
        width = value
      } 

      var obj = {
        "width": width
      }

      return obj;

    },
    heroStyle(style) {
      var index = this.MediaQueryIndex();
      this.sectionStyle = style;
      var backgroundUrl = style.background.url[index] || style.background.url[0];
      var backgroundColor = style.background.color[index] || style.background.color[0];
      var backgroundSize = style.background.size[index] || style.background.size[0];
      var backgroundRepeat = style.background.repeat[index] || style.background.repeat[0];
      var containerPadding = style.container.padding[index] || style.container.padding[0];
      return {
        background: 'url(' + backgroundUrl + '), ' + backgroundColor,
        backgroundSize: backgroundSize,
        backgroundRepeat: backgroundRepeat,
        padding: containerPadding
      }
    },
    textStyle(element, style) {
      this.sectionStyle = style;
      var styleObj = {
        maxWidth: this.applyStyle(element, 'width'),
        textAlign: this.applyStyle(element, 'align'),
        background: this.applyStyle(element, 'background'),
        padding: this.applyStyle(element, 'padding'),
        margin: this.applyStyle(element, 'margin'),
        fontFamily: this.applyStyle(element, 'font'),
        fontWeight: this.applyStyle(element, 'weight'),
        borderBottom: this.applyStyle(element, 'border'),
        color: this.applyStyle(element, 'color')
      };
     
      return styleObj;
    },
    uiStyle(element, style) {
      this.sectionStyle = style;
      var background = this.applyStyle(element, 'background');
      if (background == '') {
        background = 'black'
      }
      var color = this.applyStyle(element, 'color');
      if (color == '') {
        color = 'white'
      }
      var styleObj = {
        color: color,
        backgroundColor: background,
        fontWeight: this.applyStyle(element, 'weight'),
        fontFamily: this.applyStyle('paragraph', 'font'),
      };
      return styleObj;
    },
    hoverStyle(style) {
      this.sectionStyle = style;
      var background = this.applyStyle('highlight', 'background', style);
      if (background == '') {
        background = 'black';
      }
      var styleObj = {
        '--hover-border-color': background
      };
      return styleObj;
    },
    containerStyle(style) {
      this.sectionStyle = style;
      var styleObj = {
        padding: this.applyStyle('container', 'padding'),
        backgroundColor: this.applyStyle('container', 'background')
      };
      return styleObj;
    },
    wrapperStyle(style) {
      this.sectionStyle = style;
      var styleObj = {
        width: this.applyStyle('wrapper', 'width'),
        padding: this.applyStyle('wrapper', 'padding'),
        backgroundColor: this.applyStyle('wrapper', 'background'),
      };
      return styleObj;
    },
    elementStyle(style, element) {
      this.sectionStyle = style;

      var styleObj = {};
      
      for (var propName in style) { 
        if (style[propName] !== null || style[propName] !== undefined || style[propName] !== '' || style[propName] !== "") {
          styleObj[propName] = this.style(element, propName)
        }
      }
      return styleObj;
    },
    elementClass(array, element) {
      var index = this.MediaQueryIndex();
      if (array) {
        if (index !== 0 && array.length > 1) {
          return array[index]
        }
        else {
          return array[0]
        }
      } else if (element) {
        if (index !== 0 && this.globalStyle[element] && this.globalStyle[element]['class']) {
          return this.globalStyle[element]['class'][index]
        }
        else {
          return this.globalStyle[element]['class'][0]
        }
      } else {
        return null
      }
    },
    customUiStyle(style, ui) {
      if (style && style[ui]) {

        this.sectionStyle = style;
        window.console.log(style, ui);

        var styleObj = {};
        
        for (var propName in style[ui]) { 
          if (style[ui][propName] !== null || style[ui][propName] !== undefined || style[ui][propName] !== '' || style[ui][propName] !== "") {
            styleObj[propName] = this.applyStyle(ui, propName)
          }
        }
        return styleObj;
      } else {
        return null
      }
    },
    titleClassSize(style) {
      this.sectionStyle = style;
      return this.applyStyle('title', 'class')
    },
    getPermalink(slug) {
      return this.$globals.config.baseUrl + '/t/' + slug;
    }
	}
}