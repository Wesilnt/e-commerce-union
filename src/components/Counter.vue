<template>
  <span>{{ showNum }}</span>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    num: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      count: 0,
      origin: 0,
      smallNum: '.00',
      step: 0,
      animation: null
    }
  },
  computed: {
    showNum: function() {
      return this.animation ? this.count.toFixed(2) : this.num
    }
  },
  mounted() {
    this.origin = parseInt(this.num)
    if (this.origin !== this.num) {
      this.smallNum = '.' + `${this.num}`.split('.')[1]
    }
    this.step = parseFloat((this.num / (60 / 1000) / 1000).toFixed(2))
    this.$nextTick(() => {
      this.animation = this.handleCounter()
    })
  },
  methods: {
    handleCounter() {
      return requestAnimationFrame(this.counter)
    },
    counter() {
      if (this.count >= this.origin) {
        cancelAnimationFrame(this.animation)
        return (this.animation = null)
      }
      this.count = this.count + this.step
      this.handleCounter()
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animation)
    this.animation = null
  }
}
</script>
