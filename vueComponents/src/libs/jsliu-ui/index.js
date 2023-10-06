import Slider from './Slider';
import SliderItem from './Slider/item.vue'
let JsliuUi = {};

JsliuUi.install = function(Vue){
    Vue.component(Slider.name, Slider);
    Vue.component(SliderItem.name, SliderItem);
}

export default JsliuUi;