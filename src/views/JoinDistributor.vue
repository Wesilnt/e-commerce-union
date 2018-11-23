<template>
  <div class="join-distributor">
    <section class="join-distributor-section">
      <Avatar :src="presidenter.avatarUrl"></Avatar>
      <aside class="join-distributor-content">
        <p class="join-distributor-name">{{ presidenter.contactName }}</p>
        <p>邀请您成为秦汉胡同分销员</p>
      </aside>
    </section>
    <p class="confirm-submit" @click="onJoin">立即加盟</p>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue'
import { mapState, mapActions } from 'vuex'
import { decode } from '../utils/util'
export default {
  name: 'JoinDistributor',
  data() {
    return {
      presidentInfo: this.$route.query.presidentInfo,
      presidenter: {},
      distributorName: ''
    }
  },
  computed: { ...mapState(['isDistributor']) },
  components: { Avatar },
  created() {
    this.presidenter = JSON.parse(
      decode(decodeURIComponent(this.presidentInfo))
    )
    console.log(this.presidenter)
    this.checkDistributor(false).then(res => {
      if (res)
        window.location.href =
          'http://t.shbaoyuantech.com/#/my/my-distributionCenter'
    })
  },
  methods: {
    ...mapActions(['checkDistributor', 'applyDistributor']),
    onJoin() {
      this.applyDistributor({ preUserId: this.presidenter.id }).then(res => {
        if (res) this.$router.replace({ name: 'distributionApplyResult' })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.join-distributor {
  font-size: 24px;
  color: #333333;
  height: 100vh;
  line-height: 24px;
  background-color: #ffe0b9;
  &-section {
    margin: 64px 40px;
    display: inline-flex;
    align-items: center;
  }
  &-name {
    line-height: 30px;
    font-size: 30px;
    margin-bottom: 16px;
  }
  &-content {
    margin-left: 20px;
  }
  .confirm-submit:active {
    opacity: 0.5;
  }
}
</style>
