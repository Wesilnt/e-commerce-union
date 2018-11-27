<template>
  <div class="distributor-poster">
    <main class="distributor-poster-main">
      <canvas ref="canvasId" :width="canvasW" :height="canvasH"></canvas>
      <div class="top-container">
        <img ref="saveImage" />
        <p>长按发送给好友</p>
      </div>
    </main>
    <vue-qr
      :logoSrc="imageUrl"
      :logoScale="20 * radio"
      :style="{ display: 'none' }"
      colorDark="#123456"
      colorLight="#ff0000"
      :text="shareUrl"
      error-level="Q"
      :size="136"
      :margin="0"
    />
  </div>
</template>
<script>
import VueQr from 'vue-qr'
import { mapActions as rootActions } from 'vuex'
import { decode } from '../utils/util'

export default {
  data() {
    let screenW = document.body.offsetWidth
    let radio = screenW / 375
    let canvasW = 335 * radio
    let canvasH = 491 * radio
    let centerX = canvasW / 2
    return {
      presidentInfo: this.$route.query.presidentInfo,
      shareUrl: `${
        window.location.href.split('#')[0]
      }#/home/joinDistributor?presidentInfo=${this.$route.query.presidentInfo}`,
      user: {},
      pixelRatio: 1, //像素比
      radio, //
      canvasW, //canvas宽度
      canvasH, //canvas高度
      centerX, //canvas中心x坐标
      qrcodeWidth: 68 * radio, //二维码大小
      ctx: null,
      canvasData: null,
      isLoading: true,
      imageUrl: require('../assets/logo.png')
    }
  },
  components: { VueQr },
  mounted: function() {
    let canvasData = this.$refs.canvasId
    this.canvasData = canvasData
    this.ctx = canvasData.getContext('2d')
    this.ctx.mozImageSmoothingEnabled = false
    this.ctx.webkitImageSmoothingEnabled = false
    this.ctx.msImageSmoothingEnabled = false
    this.ctx.imageSmoothingEnabled = false
    let getPixelRatio = function(context) {
      let backingStore =
        context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1
      return (window.devicePixelRatio || 1) / backingStore
    }
    this.pixelRatio = getPixelRatio(this.ctx)
    //1. 将画布放 屏幕像素比
    this.canvasData.height = this.canvasH * this.pixelRatio
    this.canvasData.width = this.canvasW * this.pixelRatio
    //2. 指定绘制上下文, 放大 this.pixelRatio 比例进行绘制所有的内容
    this.ctx.scale(this.pixelRatio, this.pixelRatio)
    //3. 显示画布大小时 按原来大小显示, 这里的用的图片，所以下面两行可以不要
    // this.canvasData.style.height = this.canvasH + 'px'
    // this.canvasData.style.width = this.canvasW + 'px'
    //重新生成图片
    this.drawBottomMap()
    //制定显示大小
    const { saveImage } = this.$refs
    let bodyHeight = document.body.offsetHeight
    let scale = 1
    if (bodyHeight < this.canvasH) scale = bodyHeight / this.canvasH
    saveImage.style.width = this.canvasW * scale + 'px'
  },
  methods: {
    ...rootActions(['getUserInfo']),
    //绘制海报
    drawBottomMap: function() {
      this.$toast.loading({
        mask: true, //遮罩
        message: '加载中...', //文本
        // position: 'bottom',//位置
        forbidClick: false, // 背景可点击
        spin: true, //旋转
        // icon: require('../../public/Hourglass.svg'), //图标
        duration: -1 //时间
      })
      this.getUserInfo()
        .then(user => (this.user = user))
        .then(() => new Promise(resolve => this.setShareUrl(resolve)))
        .then(() => new Promise(resolve => this.drawBackground(resolve)))
        .then(() => new Promise(resolve => this.drawQrcode(resolve)))
        // .then(() => new Promise(resolve => this.drawHeadImage(resolve)))
        .then(() => new Promise(resolve => this.drawTip1(resolve)))
        .then(() => new Promise(resolve => this.drawTip2(resolve)))
        .then(
          () =>
            (this.$refs.saveImage.src = this.canvasData.toDataURL('images/png'))
        )
        .then(() => this.$toast.clear(), () => this.$toast.clear())
        .catch(() => this.$toast.clear())
    },
    //0.设置分享地址
    setShareUrl(resolve) {
      // this.shareUrl += `?presidentInfo=${this.presidentInfo}`
      resolve()
    },
    //1. 绘制背景图和颜色
    async drawBackground(resolve) {
      this.ctx.save()
      this.ctx.fillStyle = '#ffc7c7'
      this.ctx.fillRect(0, 0, this.canvasW, this.canvasH)
      this.ctx.restore()
      let cover = new Image()
      cover.setAttribute('crossOrigin', 'anonymous')
      cover.src = require('../assets/poster_bg.png')
      cover.onload = () => {
        this.ctx.drawImage(cover, 0, 0, this.canvasW, this.canvasH)
        resolve()
      }
    },
    //2. 绘制提示1
    async drawTip1(resolve) {
      const presidenter = JSON.parse(
        decode(decodeURIComponent(this.presidentInfo))
      )
      let tip = `${presidenter.contactName} 邀请你成为秦汉胡同分销员`
      this.ctx.fillStyle = '#262626'
      this.ctx.font = `${parseInt((24 * this.radio) / 2)}px Georgia`
      let textW = this.ctx.measureText(tip).width
      this.ctx.fillText(
        tip,
        this.centerX - textW / 2,
        ((716 + 12) * this.radio) / 2
      )
      resolve()
    },
    //3. 绘制提示2
    async drawTip2(resolve) {
      let tip = '想要收入翻番，扫码加盟秦汉胡同分销员'
      this.ctx.fillStyle = '#262626'
      this.ctx.font = `${parseInt((24 * this.radio) / 2)}px Georgia`
      let textW = this.ctx.measureText(tip).width
      this.ctx.fillText(
        tip,
        this.centerX - textW / 2,
        ((716 + 24 + 12 + 12) * this.radio) / 2
      )
      resolve()
    },
    //4. 绘制二维码
    async drawQrcode(resolve) {
      let top = ((716 + 24 + 12 + 12 + 30) * this.radio) / 2
      let width = this.qrcodeWidth
      let left = this.centerX - width / 2
      let img = this.$el.children[1].children[0]
      if (img.currentSrc && img.complete) {
        this.ctx.drawImage(img, left, top, width, width)
        return resolve() //如果二维码没有加载则走下面的加载回调绘制
      }
      img.onload = () => {
        this.ctx.drawImage(img, left, top, width, width)
        resolve()
      }
    },
    //5. 绘制头像
    async drawHeadImage(resolve) {
      const header = new Image()
      header.setAttribute('crossOrigin', 'anonymous')
      header.src = require('../assets/logo.png')
      header.onload = () => {
        // let radius = this.headImageW * this.radio
        this.ctx.save()
        // this.ctx.beginPath()
        // this.ctx.arc(x + this.headImageW / 2, y + this.headImageW / 2, this.headImageW / 2, 0, Math.PI * 2, false)
        // this.ctx.clip()
        // this.ctx.drawImage(header, x, y, 40, 40)
        // this.ctx.restore()
        resolve()
      }
    },
    //圆角矩形
    roundedRect(ctx, x, y, width, height, radius) {
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(x, y + radius)
      ctx.lineTo(x, y + height - radius)
      ctx.quadraticCurveTo(x, y + height, x + radius, y + height)
      ctx.lineTo(x + width - radius, y + height)
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width,
        y + height - radius
      )
      ctx.lineTo(x + width, y + radius)
      ctx.quadraticCurveTo(x + width, y, x + width - radius, y)
      ctx.lineTo(x + radius, y)
      ctx.quadraticCurveTo(x, y, x, y + radius)
      ctx.fill()
      ctx.restore()
    }
  }
}
</script>
<style lang="less" scoped>
.distributor-poster {
  &-main {
    position: relative;
    width: 100%;
    height: 100vh;
    canvas {
      height: 100%;
      width: 100%;
      display: none;
    }
    .top-container {
      top: 0;
      left: 0;
      position: absolute;
      height: 100%;
      width: 100%;
      display: inline-flex;
      text-align: center;
      background-color: rgba(33, 33, 33, 0.5);
    }
    .top-container img {
      top: 0;
      margin: 40px auto auto;
      height: auto;
      display: block;
      width: 100%;
      background-size: 100%;
    }
    .top-container p {
      z-index: 1000;
      left: 40px;
      right: 40px;
      font-size: 32px;
      position: absolute;
      color: #808080;
      text-align: center;
      color: white;
      border-radius: 48px;
      line-height: 96px;
      height: 96px;
      bottom: 40px;
      background-color: #ffa32f;
    }
  }
}
</style>
