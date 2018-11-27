<template>
  <i class="user-avatar" :style="avatarstyle"></i>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    width: {
      default: 88
    },
    src: {
      default: null
    }
  },
  computed: {
    avatarstyle: function() {
      const winWidth = window.innerWidth * 2
      const length = (this.width / winWidth) * 100 + 'vw'
      return {
        width: length,
        height: length,
        backgroundColor: '#fda0a0',
        background: this.src
          ? `url(${this.src}) center/100% no-repeat`
          : 'transparent'
      }
    }
  }
}
</script>
