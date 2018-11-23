<template>
  <div class="home-container">
    <div class="index-header">
      <div class="user-wrapper">
        <Avatar :src="presidentInfo.avatarUrl" width="96" />
        <p class="text-center user-name">
          <strong>{{ presidentInfo.contanctName }}</strong>
        </p>
      </div>
      <div class="index-header_footer">
        提成比例: {{ presidentInfo && presidentInfo.incomePropors }}%
      </div>
    </div>
    <ul class="ea-flex big-border index-invite center-vertline">
      <li class="flex-item" @click="toMeInvitation">
        我的邀请（{{ presidentInfo.applyCount }}）
      </li>
      <li class="flex-item" @click="toInvitationLetter">分销员邀请函</li>
    </ul>
    <div class="big-border">
      <div class="body-nav">我的资产</div>
      <div class="body-screen" @click="toProfitDetail(0)">
        <p>当前累计收益</p>
        <p class="screen-giant">
          <strong>
            <Counter
              :num="presidentInfo && presidentInfo.totalIncome"
            /> </strong
          ><i class="arrow-right"></i>
        </p>
        <p>每月10日结算<span class="help">?</span></p>
      </div>
      <div class="ea-flex center-vertline body-foot">
        <div class="flex-item" @click="toProfitDetail(1)">
          已结算（
          <Counter :num="presidentInfo && presidentInfo.settled" />
          ）
        </div>
        <div class="flex-item" @click="toProfitDetail(2)">
          待结算（
          <Counter :num="presidentInfo && presidentInfo.noSettlement" />
          ）
        </div>
      </div>
    </div>
    <div class="ea-flex big-border body-foot">
      <div class="flex-item" @click="toMeDistributors">
        <p class="txt-giant">
          <strong>{{ presidentInfo && presidentInfo.disCount }}</strong>
        </p>
        <p>我的分销员</p>
      </div>
      <div class="flex-item" @click="toProfitDetail(0)">
        <p class="txt-giant">
          <strong>{{ presidentInfo && presidentInfo.orderCount }}</strong>
        </p>
        <p>推广订单</p>
      </div>
      <div class="flex-item" @click="toTransferRecord">
        <p class="txt-giant">
          <strong>{{ presidentInfo && presidentInfo.transRecordCount }}</strong>
        </p>
        <p>打款记录</p>
      </div>
    </div>
    <div class="ea-flex body-nav" @click="makeAToast">
      <p>常见问题</p>
      <i class="arrow-right"></i>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { encode } from '../utils/util'
// @ is an alias to /src
import Avatar from '@/components/Avatar.vue'
import Counter from '@/components/Counter.vue'

export default {
  name: 'Home',
  components: { Avatar, Counter },
  computed: { ...mapState(['presidentInfo']) },
  created() {
    this.getPresidentDetail()
  },
  methods: {
    ...mapActions(['getPresidentDetail']),
    makeAToast() {
      this.$router.push({ name: 'problem' })
      // this.$toast.loading({
      // mask: true,//遮罩
      // message: 'spinner', //文本
      // position: 'bottom',//位置
      // forbidClick: false, // 背景可点击
      // spin: true,//旋转
      // icon: require('../../public/Hourglass.svg'), //图标
      // duration: 5000 //时间
      // })
      // this.$toast( 'this is a toast' )
      // this.$toast.fail()
      //   setTimeout(()=>{
      //       this.$toast.clear()
      //   },2000)
    },
    toMeInvitation() {
      this.$router.push({ name: 'meInvitation' })
    },
    toInvitationLetter() {
      let info = {
        id: this.presidentInfo.userId,
        avatarUrl: this.presidentInfo.avatarUrl,
        contactName: this.presidentInfo.contanctName
      }
      const presidentInfo = encodeURIComponent(encode(JSON.stringify(info)))
      this.$router.push({ name: 'invitationLetter', query: { presidentInfo } })
    },
    toProfitDetail(index) {
      this.$router.push({ name: 'invitationOrderDetail', query: { index } })
    },
    toMeDistributors() {
      this.$router.push({ name: 'meDistributors' })
    },
    toTransferRecord() {
      this.$router.push({ name: 'transferRecord' })
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  background-color: #f7f7f7;
  height: 100vh;
}
.index-header {
  background-color: #323241;
}

.user-wrapper {
  padding: 16px;
  margin: 0 auto;
  text-align: center;
  border-bottom: 2px solid #5d5f6d;
}

.user-name {
  margin-top: 16px;
  font-size: 32px;
  color: #fff;
}

.index-header_footer {
  padding: 24px 32px;
  color: #fff;
}

.index-invite {
  padding: 48px 32px;
  font-size: 32px;
  background-color: #ffffff;
}

.body-nav {
  padding: 32px;
  background-color: #ffffff;
}

.center-vertline {
  position: relative;
  &:after {
    content: '';
    position: absolute;
    height: 64px;
    width: 2px;
    left: 50%;
    top: 50%;
    margin-left: -1px;
    margin-top: -32px;
    background-color: #eeeeee;
  }
}

.body-screen {
  padding: 32px;
  text-align: center;
  border: 2px solid #f5f5f5;
  border-left: none;
  border-right: none;
  font-size: 28px;
  color: #808080;
  background-color: #ffffff;
}

.screen-giant {
  padding: 24px 0;
  font-size: 60px;
  color: #ffa32f;
}

.screen-giant .arrow-right {
  position: absolute;
  right: 32px;
  margin-top: 30px;
}

.txt-giant {
  margin-bottom: 24px;
  font-size: 36px;
  color: #ffa32f;
}

.body-foot {
  padding: 40px 0;
  background-color: #ffffff;
}
</style>
