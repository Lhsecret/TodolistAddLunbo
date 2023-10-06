<template>
 
<div class="Slider">

    <div class="inner"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    >
        <SliDot
        :hasDot="hasDot"
        :itemLen="itemLen"
        :currentIndex="currentIndex"
        :dotBgColor="dotBgColor"
        @dotClick="dotClick"
        ></SliDot>
        <SliDirector
        dir="prev"
        @dirClick="dirClick"
        ></SliDirector>
        <SliDirector
        dir="next"
        @dirClick="dirClick"
        ></SliDirector>
        <slot></slot>
    </div>
</div>
  
</template>
 
<script>
import { reactive,toRefs,onMounted, onBeforeMount, getCurrentInstance } from 'vue';
import SliDot from './Dot.vue'
import SliDirector from './Director.vue'
export default{
    name: 'Slider',
    components: {
        SliDot,
        SliDirector
    },
    props:{
        autoplay:{
            type: Boolean,
            default: true
        },
        duration:{
            type: Number,
            default: 3000
        },
        initial:{
            type: Number,
            default: 0
        },
        hasDot: {
            type: Boolean,
            default: true
       },
       hasDirection:{
            type: Boolean,
            default: true
       },
       dotBgColor: {
            type: String
       }
    },
    setup(props){
        const instance = getCurrentInstance();
        const state = reactive({
            currentIndex: props.initial,
            itemLen: 0
        });


        let t = null;
        
        const autoplay = () => {
            if(props.autoplay){
                t = setInterval(() => {
                    // console.log(1);
                    setIndex('next');
                }, props.duration)
            }
        }
        const setIndex = (dir) => {
            switch(dir){
                case 'next':
                    state.currentIndex += 1;
                    if(state.currentIndex === state.itemLen){
                        state.currentIndex = 0;
                    }
                    break;
                case 'prev':
                    state.currentIndex -= 1;
                    if(state.currentIndex === -1){
                        state.currentIndex = state.itemLen - 1;
                    }
                    break;
                default:
                    break;
            }
        }

        const dotClick = (index) =>{
            state.currentIndex = index
        }

        const mouseenter = () =>{
            clearFn();
        }
        const mouseleave = ()=>{
            autoplay();
        }
        const dirClick = (dir) => {
            setIndex(dir)
        }

        function  clearFn() {
            clearInterval(t);
            t = null;
        }
        onMounted(() => {
            state.itemLen = instance.slots.default()[0].children.length
            autoplay();
        })
        // onBeforeMount(() => {
        //     clearInterval(t);
        //     t = null;
        // })
        return {
            ...toRefs(state),
            dotClick,
            dirClick,
            mouseenter,
            mouseleave,
        }
    }
}

</script>
 
<style lang='scss' scoped>
 .Slider{
    height: 100%;
    width: 100%;
    .inner{
        position: relative;
        width: 100%;
        height: 100%;
    }
 }
</style>