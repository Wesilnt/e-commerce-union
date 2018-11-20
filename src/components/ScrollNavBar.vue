<template>
    <ul class="ea-flex scroll-navBar" ref="scrollTool">
        <li class="scroll-navBar-item" v-for="(item,index) in bars" :key="item.title" @click.stop.prevent.capture ="onTabClick(index)">
            <a class="scroll-navBar-item-btn" :class="{active:active===index}"> {{item.title}} </a>
        </li>
    </ul>
</template>

<script>
import { throttle } from '../utils/util'
let handleWindowScroll = () => {}
let scroll = 0
export default {
  name: 'ScrollNavBar',
  props: {
    bars: {
      type: Array,
      default: () => [
        {
          title: '全部',
          ref: 'title'
        },
        {
          title: '已结算',
          ref: 'describe'
        },
        {
          title: '待结算',
          ref: 'comment'
        }
      ]
    },
    offsetBottom: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.scroll-navBar {
  position: sticky;
  top: -1px;
  left: 0;
  right: 0;
  height: 79px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 1px 2px #ddd;
  z-index: 20;
}
.scroll-navBar-item {
  flex-grow: 1;
}
.scroll-navBar-item-btn {
  display: block;
  width: 120px;
  margin: 0 auto;
  height: 80px;
  line-height: 80px;
  font-weight: bolder;
  border-bottom: 4px solid transparent;
  font-size: 28px;
  color: #3e3e53;

  transition: border 0.2s linear 0.1s;
  &.active {
    border-bottom-color: #ffa32f;
    color: #ffa32f;
  }
}
</style>
