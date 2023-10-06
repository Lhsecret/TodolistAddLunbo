<template>
 
<Transition name="slide" appear>
    <div class="SliItem" v-if="selfIndex === currentIndex">
        <slot></slot>
    </div>
    
</Transition>
  
</template>
 
<script>
import { getCurrentInstance, reactive, toRefs, watch } from 'vue';


export default{
    name: 'SliderItem',
    setup(){
        const instance = getCurrentInstance();
        const state = reactive({
            selfIndex: instance.vnode.key,
            currentIndex: instance.parent.ctx.currentIndex
        })
        
        watch(() => {
            return instance.parent.ctx.currentIndex;
        }, (value) => {
            state.currentIndex = value;
        })

        return {
            ...toRefs(state)
        }
    }

}

</script>
 
<style lang='scss' scoped>
.SliItem{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}
.slide-enter-active,
.slide-leave-active{
    transition: all .3s linear;
}
.slide-leave-from,
.slide-enter-to{
    transform: translateX(0);
}
.slide-enter-from{
    transform: translateX(100%);
}
.slide-leave-to{
    transform: translateX(-100%);
}
</style>