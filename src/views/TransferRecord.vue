<template>
    <div class="transfer-detail">
        <!--布局-->
        <main class="transfer-content">
            <ul class="transfer-content-list">
                <li v-for="item of transferList" :key="item.id">
                    <h4 v-if="item.showYear" class="transfer-content-title">
                        <hr class="title-line">
                        2018
                        <hr class="title-line">
                    </h4>
                    <section class="transfer-content-item">
                        <aside>{{item.createTime | formatDuring}}</aside>
                        <aside class="item-text">
                            {{item.isAdd?'+':'-'}} <span>{{item.amount.toFixed(2)}}</span>元
                        </aside>
                    </section>
                </li>
            </ul>
        </main>

        <!--底部描述-->
        <footer class="transfer-detail-footer" @click="onLoadMore">
            <p v-show="loading">加载中</p>
            <p v-show="!loading">{{finished?'无更多转账明细':'查看更多'}}</p>
        </footer>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  created() {
    this.getTransferRecord(true)
  },
  filters: {
    formatDuring: date => {
      let mss = new Date(date)
      let month = mss.getMonth()
      let day = mss.getDate()
      return `${month < 9 ? '0' + month : month}月${
        day < 9 ? '0' + day : day
      }日`
    }
  },
  computed: {
    ...mapState(['isDistributor', 'transferList', 'loading', 'finished'])
  },
  methods: {
    ...mapActions(['getTransferRecord', 'onDestroy']),
    onLoadMore() {
      if (this.loading || this.finished) return
      this.getTransferRecord(false)
    }
  },
  beforeDestroy() {}
}
</script>

<style lang="less" scoped>
.transfer-detail {
  font-size: 26px;
  text-align: center;
  color: #808080;
  &-footer {
    font-size: 24px;
    color: #cccccc;
    margin-bottom: 40px;
  }
}

.transfer-content {
  margin-bottom: 40px;
  font-size: 26px;
  color: #333333;
  &-title {
    display: inline-flex;
    align-items: center;
    color: #808080;
    margin: 40px 0;
    font-weight: 500;
    .title-line {
      margin: auto 32px;
      width: 48px;
      border: 0;
      height: 1px; /*no*/
      background-color: #e3e3e3;
    }
  }
  &-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin: 0 30px 56px;
  }
  .item-text span {
    color: #ffa32f;
  }
}
</style>
