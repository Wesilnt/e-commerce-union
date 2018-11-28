<template>
  <transition name="fade">
    <div
      class="toast"
      :class="{ 'toast-mask': mask }"
      @click.self="handleBgClick"
      v-if="shown"
      :style="overlayStyle"
    >
      <div
        class="toast-inner"
        :class="[hasTypeClassName, positionClassName]"
        :style="{ backgroundColor: bgColor }"
      >
        <i
          class="toast-inner-icon"
          :class="spinningClassName"
          :style="iconStyle"
          v-show="!!iconStyle"
        ></i>
        <p>{{ message }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
const types = ['loading', 'success', 'fail']
export default {
  name: 'Toast',
  props: [
    'shown',
    'type',
    'mask',
    'message',
    'forbidClick',
    'spin',
    'icon',
    'position',
    'overlayStyle'
  ],
  data: () => {
    return {
      positionClassName: null,
      spinningClassName: null,
      hasTypeClassName: null,
      iconStyle: null,
      bgColor: null
    }
  },
  watch: {
    message: {
      handler(val) {
        this.positionClassName = `toast-${this.position}`
        this.spinningClassName =
          (this.spin || this.type === 'loading') && 'toast-spinning'
        this.bgColor = this.defaultBgColor
        if (this.icon) {
          this.iconStyle = {
            backgroundImage: `url(${this.icon})`
          }
          this.bgColor = this.loadingBgColor
          return (this.hasTypeClassName = 'toast-widthIcon')
        }
        if (types.includes(this.type)) {
          this.iconStyle = {
            backgroundImage: `url(${this[this.type + 'Icon']})`
          }
          this.bgColor = this[`${this.type}BgColor`]
          this.hasTypeClassName = 'toast-widthIcon'
        }
      },
      immediate: true
    }
  },
  methods: {
    handleToastHide() {
      if (!this.shown) return
      this.clear()
    },
    handleBgClick() {
      if (this.forbidClick) return
      this.handleToastHide()
    }
  }
}
</script>

<style scoped lang="less">
.toast {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  color: #fff;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.toast-mask {
  background-color: rgba(56, 56, 56, 0.57);
}
.toast-inner {
  position: absolute;
  left: 50%;
  padding: 20px 24px;
  max-width: 560px;
  border-radius: 10px;
  text-align: center;
  transform: translate(-50%, -50%);
  font-size: 28px;
  &.toast-widthIcon {
    height: 200px;
    width: 200px;
    .toast-inner-icon {
      display: inline-block;
      width: 80px;
      height: 80px;
      margin: 10px auto 10px;
      background: transparent center/cover no-repeat;
      &.toast-spinning {
        animation: spinning 800ms infinite linear;
      }
    }
  }
  &.toast-middle {
    top: 45%;
  }
  &.toast-top {
    top: 10%;
  }
  &.toast-bottom {
    top: auto;
    bottom: 10%;
  }
}
@keyframes spinning {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-360deg);
  }
}
</style>
