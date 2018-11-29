<template>
  <div class="order-container">
    <header>
      <ScrollNavBar
        v-model="tabIndex"
        :bars="bars"
        @onTabClick="tabClick"
      ></ScrollNavBar>
    </header>
    <main class="order-content">
      <ul>
        <li
          class="ea-flex order-item"
          v-for="item of incomeOrderList"
          :key="item.id"
        >
          <aside class="item-left">
            <p>订单号: {{ item.id }}</p>
            <p>{{ item.goodsName || '0' }}</p>
            <p>{{ item.createTime | formatYMDHMS }}</p>
          </aside>
          <aside class="item-right">
            <p>收益</p>
            <p>{{ item.incomeAmount.toFixed(2) }}</p>
            <p
              :class="{
                active:
                  item.accountStatus === 3802 || 3801 === item.accountStatus
              }"
            >
              {{ status[item.accountStatus].title }}
            </p>
          </aside>
        </li>
        <div class="load-more" @click="onLoadMore">
          <p v-show="loading">加载中</p>
          <p v-show="!loading">
            {{ finished ? '无更多收益明细' : '查看更多' }}
          </p>
        </div>
      </ul>
    </main>
  </div>
</template>

<script>
import ScrollNavBar from '@/components/ScrollNavBar.vue'
import { mapState, mapActions } from 'vuex'

export default {
  //     NO_SETTLE("3801","未结算"),
  // FOR_SETTLE("3802","待结算"),
  //     SETTLED("3803","已结算");
  name: 'InvitationOrderDetail',
  data() {
    return {
      tabIndex: parseInt(this.$route.query.index),
      bars: [
        { id: '0', title: '全部' },
        // {id:'3801',title:'未结算', },
        { id: '3802', title: '待结算' },
        { id: '3803', title: '已结算' }
      ],
      status: {
        '3801': { title: '未结算' },
        '3802': { title: '待结算' },
        '3803': { title: '已结算' }
      }
    }
  },
  components: { ScrollNavBar },
  computed: { ...mapState(['incomeOrderList', 'loading', 'finished']) },
  created() {
    this.getIncomeOrders({ refresh: true, status: this.bars[this.tabIndex].id })
  },
  methods: {
    ...mapActions(['getIncomeOrders']),
    tabClick(index) {
      this.tabIndex = index
      this.getIncomeOrders({
        refresh: true,
        status: this.bars[this.tabIndex].id
      })
    },
    onLoadMore() {
      if (this.loading || this.finished) return
      this.getIncomeOrders({
        refresh: false,
        status: this.bars[this.tabIndex].id
      })
    }
  }
}
</script>

<style lang="less" scoped>
.order-container {
  height: 100vh;
  background-color: white;
}

.order-content {
  font-size: 28px;
  color: #808080;
}

li + li {
  border-top: 1px solid #ededed; /*no*/
}

.order-item {
  margin: 0 30px;
  padding: 26px 0;
}

.item-left {
  text-align: left;
  color: #808080;
}

.item-left :nth-child(1) {
  color: #333333;
}

.item-left :nth-child(2) {
  margin-top: 24px;
  font-size: 26px;
}

.item-left :nth-child(3) {
  margin-top: 20px;
  font-size: 24px;
}

.item-right {
  color: #333333;
  font-size: 26px;
  text-align: right;
}

.item-right :nth-child(2) {
  margin-top: 28px;
}

.item-right :nth-child(3) {
  margin-top: 14px;
  color: #808080;
}

.item-right .active {
  color: #ffa32f;
}
</style>
