import config from "@/data/config.json";

import WebFontLoader from 'webfontloader';

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
    getData() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const font = urlParams.get('font');
      const toggle = urlParams.get('toggle');
      const highlight = urlParams.get('highlight');
      const action = urlParams.get('action');
      // const configId = urlParams.get('config');
      // var config = 13575;

      if (font || toggle || highlight || action) {
        this.overrideStyle = true;
      }
      // if (configId) {
      //   config = configId;
      // }

      // axios.get(
      // 'https://edgeryders.eu/t/' + config + '.json'
      // ).then(({ data }) => {
      //   var json = this.getJson(data.post_stream.posts[0].cooked);
      //   if (json.event) {
      //     this.$globals.event = json.event
      //   }
      //   this.loadData(json);
      // });

      this.loadData(this.config);

    },
    loadData(data){
      if (this.overrideStyle) {
        this.getUrlStyle(data.style);
      } else {
        this.globalStyleSheet = data.style;
      }
      this.sections = data.blocks;
      this.$globals.blocks = data.blocks;
      if (data.event) {
        this.$globals.event = data.event;
      }
      if (data.template) {
        this.$globals.template = data['template'];
      }
      this.loadFonts(data.style.fonts);
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
              title: el.title,
              id: el.id,
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
  	getJson(value) {
    	const doc = new DOMParser().parseFromString(value, "text/html");
    	var json = [...doc.querySelectorAll('code')].map(code => code.textContent);
    	var final = String(json).replace(/\n/g, " ");
    	if (final !== '') {
    		var obj = JSON.parse(final);
    		return obj;
    	} else {
    		return null
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
    titleClassSize(style) {
      this.sectionStyle = style;
      return this.applyStyle('title', 'size')
    }
	}
}