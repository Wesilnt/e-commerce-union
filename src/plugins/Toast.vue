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
let timeout = null
export default {
  name: 'Toast',
  props: [
    'shown',
    'type',
    'mask',
    'message',
    'duration',
    'forbidClick',
    'spin',
    'icon',
    'bgColor',
    'successBgColor',
    'failBgColor',
    'loadingBgColor',
    'successIcon',
    'failIcon',
    'loadingIcon',
    'position',
    'overlayStyle'
  ],
  data: () => {
    return {
      iconStyle: null
    }
  },
  computed: {
    positionClassName: function() {
      return `toast-${this.position}`
    },
    spinningClassName: function() {
      return (this.spin || this.type === 'loading') && 'toast-spinning'
    },
    hasTypeClassName: function() {
      if (this.icon) {
        this.iconStyle = {
          backgroundImage: `url(${this.icon})`
        }
        return 'toast-widthIcon'
      }
      if (types.includes(this.type)) {
        this.iconStyle = {
          backgroundImage: `url(${this[this.type + 'Icon']})`
        }
        return 'toast-widthIcon'
      }
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
  border-radius: 16px;
  text-align: center;
  transform: translate(-50%, -50%);
  font-size: 24px;
  &.toast-widthIcon {
    height: 240px;
    width: 240px;
    font-size: 32px;
    .toast-inner-icon {
      display: inline-block;
      width: 100px;
      height: 100px;
      margin: 20px auto 16px;
      background: transparent center/cover no-repeat;
      &.toast-spinning {
        animation: spinning 800ms infinite linear;
      }
    }
  }
  &.toast-middle {
    top: 50%;
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
