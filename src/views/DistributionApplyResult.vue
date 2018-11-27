<template>
  <div class="apply-success">
    <!-- 头部 -->
    <header
      class="apply-success-header"
      :style="{
        backgroundImage: `url(${isDistributor ? successIcon : failureIcon})`
      }"
    ></header>

    <!-- 布局 -->
    <article class="apply-success-introduce">
      <p v-if="isDistributor">您已成功申请成为分销员</p>
      <p v-else>
        您目前的推广金额为<em>{{ extendAmount.toFixed(2) }}</em
        >元，还差<em>{{ limitAmount }}</em
        >元就可以成为分销员啦！
      </p>
    </article>

    <!-- 底部描述 -->
    <footer class="apply-success-footer" @click="nextOperate">
      <p>{{ isDistributor ? '查看详情' : '去分享' }}</p>
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      successIcon: require('../assets/distributor_success.png'),
      failureIcon: require('../assets/distributor_failure.png')
    }
  },
  computed: {
    ...mapState(['extendAmount', 'isDistributor']),
    limitAmount: function() {
      return (200 - this.extendAmount < 0
        ? 0
        : 200 - this.extendAmount
      ).toFixed(2)
    }
  },
  created() {
    this.checkDistributor(false)
  },
  methods: {
    ...mapActions(['checkDistributor']),
    nextOperate() {
      //分销员跳转查看详情， 非分销员跳转首页去分享
      window.location.href = `http://t.shbaoyuantech.com/#/${
        this.isDistributor ? 'my/my-distributionCenter' : ''
      }`
    }
  }
}
</script>

<style lang="less" scoped>
.apply-success {
  font-size: 28px;
  color: #333333;
  text-align: center;
  em {
    font-style: normal;
    color: #ffa32f;
  }
  /*icon*/
  &-header {
    width: 120px;
    height: 120px;
    margin: 80px auto 0;
    background-repeat: no-repeat;
    background-size: 100%;
  }
  /*描述*/
  &-introduce {
    padding: 40px 80px;
  }
  /*底部按钮*/
  &-footer {
    width: auto;
    height: 96px;
    border: 1px solid #ffa32f; /*no*/
    color: #ffa32f;
    border-radius: 48px;
    display: inline-flex;
    padding: 0 60px;
    p {
      line-height: 28px;
      margin: auto;
    }
  }
  &-footer:active {
    margin-top: 10px;
    opacity: 0.6;
  }
}
</style>
