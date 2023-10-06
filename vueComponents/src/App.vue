<template>
  <div id="app">
    <div class="container">
        <Slider
        :autoplay="true"
        :duration="3000"
        :initial="0"
        :hasDot="true"
        :hasDirection="true"
        >
            <SliderItem
            v-for="(item, index) in imgAll"
            :key="index"
            >
            <img :src="require(`./assets/img/${item.img_name}`)"/>
          </SliderItem>
        </Slider>
    </div>
  </div>
</template>

<script>
import imgAll from './data/Slider'

  export default{
    name: 'App',
    setup(){
      return {
        imgAll
      }
    }
  }
</script>


<style lang="scss" scoped>
.container{
  width: 520px;
  height: 280px;
  margin: 150px auto;
  overflow: hidden;
  img{
    width: 100%;
    height: 100%;
 }
}
</style>
