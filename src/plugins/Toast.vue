<template>
    <transition name="fade">
        <div class="toast" :class="{'toast-mask':mask}" v-if="!hidden" @click.self="handleBgClick">
            <div  class="toast-inner" :class="[hasTypeClassName,positionClassName]" :style="{backgroundColor: bgColor}">
                <i class="toast-inner-icon"
                   :class="spinningClassName"
                   :style="iconStyle"
                   v-show="!!iconStyle"></i>
                <p>{{message}}</p>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  name: 'Toast',
  data: () => {
    const defaultBgColor = 'rgba(37, 37, 37, 0.82)'
    const successBgColor = 'rgba(2, 142, 7, 0.85)'
    const failBgColor = 'rgba(255, 20, 3, 0.85)'
    const loadingBgColor = 'rgba(0, 0, 0, 0.81)'
    return {
      hidden: true,
      forbidClick: true,
      duration: 3000,
      inter: null,
      message: '',
      mask: false,
      spin: false,
      type: '',
      icon: null,
      hasTypeClassName: null,
      iconStyle: null,
      spinningClassName: null,
      successBgColor,
      failBgColor,
      loadingBgColor,
      successIcon: require(`../../public/success.svg`),
      failIcon: require(`../../public/fail.svg`),
      loadingIcon: require(`../../public/loading.svg`),
      bgColor: defaultBgColor,
      position: 'middle'
    }
  },
  computed: {
    positionClassName: function() {
      return `toast-${this.position}`
    }
  },
  methods: {
    async show(params) {
      clearInterval(this.inter)
      const { type, message } = params
      if (type) {
        Object.assign(params, {
          bgColor: this[`${type}BgColor`],
          message: message ? message : type
        })
      }
      await this.mapParamsToToast(params)
      await this.handleClassName(type)
      this.handleToastShow()
    },
    mapParamsToToast(params) {
      Object.assign(this, params)
      if (this.spin) {
        this.spinningClassName = 'toast-spinning'
      }
    },
    handleClassName(type) {
      const typeLen = type.length
      if (typeLen) {
        this.hasTypeClassName = 'toast-widthIcon'
        this.iconStyle = {
          backgroundImage: `url(${this[type + 'Icon']})`
        }
      }
      if (type === 'loading') {
        this.spinningClassName = 'toast-spinning'
      }
      if (this.icon && !typeLen) {
        this.hasTypeClassName = 'toast-widthIcon'
        this.iconStyle = {
          backgroundImage: `url(${this.icon})`
        }
      }
    },
    handleToastShow() {
      this.hidden = false
        if(this.duration===-1)return
        this.inter = setTimeout(() =>   this.handleToastHide(), this.duration)
    },
    handleToastHide() {
        this.$toast.clear()
    },
      handleBgClick(){
          if (this.forbidClick) return
          this.handleToastHide()
      }
  },

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
    top: 90%;
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
