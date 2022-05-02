<template>
  <div
    ref="pref"
    :class="`natal-chart__palace natal-chart__palace__${ dizhiCode }`"
    :style="{ gridArea: dizhiCode }"
  >
    <div class="palace-stars">
      <div class="palace-star palace-star__main" v-for="star in mainStars" :key="star.code">
        <span>{{ star.name }}</span>
        <span class="star-sihua">{{ star.sihua }}</span>
      </div>

      <div class="palace-star palace-star__sub" v-for="star in subStars" :key="star.code">
        <span>{{ star.name }}</span>
        <span class="star-sihua">{{ star.sihua }}</span>
      </div>
      <div class="palace-star palace-star__small" v-for="(star, index) in smallStars" :key="star.code">
        <span>{{ star.name }}</span>
      </div>
    </div>

    <div class="palace-info">
      <div class="info palace-name">
        {{ name }}
      </div>
      <div class="info flow-years">

      </div>
      <div class="info tiangan-dizhi">
        {{ tiangan + dizhi }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false
}
</script>
<script setup>
import { ref, reactive, onMounted, inject } from 'vue';
const props = defineProps({
  dizhiCode: String,
  code: String,
  dizhi: String,
  tiangan: String,
  isFate: Boolean,
  isBody: Boolean,
  name: String,
  mainStars: Array,
  subStars: Array,
  smallStars: Array
})

const pref = ref(null)
const { pRefs, addRef } = inject('prefs')
addRef(props.dizhiCode, pref)


</script>

<style>
  .natal-chart__palace {
    padding-top: .2rem;
    font-size: 1rem;
    background-color: #fff;
    box-sizing: border-box;
    border: 1px solid #00000080;
  }
  .palace-stars {
    height: 40%;
    display: flex;
  }
  .star-sihua {
    color: #fff;
    margin-top: .3rem;
    background-color: rgb(255, 29, 67);
    border-radius: 4px;
  }
  .palace-star {
    line-height: 1.3;
    writing-mode: vertical-lr;
  }
  .palace-star__main {
    color: rgb(193, 83, 5);
  }
  .palace-star__sub {
    color:rgb(200, 88, 200);
  }
  .palace-star__small {
    color: rgb(67, 127, 239);
  }

  /* 宫信息 */
  .palace-info {
    height: 60%;
    position: relative;
  }
  .info {
    text-align: center;
    position: absolute;
  }
  .palace-name {
    width: 3rem;
    /* font-size: 1rem; */
    background-color:rgb(0, 133, 205);
    border-radius: 4px;
    color: #fff;
    bottom: .1rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .tiangan-dizhi {
    bottom: 0;
    right: 0;
    font-size: 1.1rem;
    /* font-weight: bold; */
  }
</style>
