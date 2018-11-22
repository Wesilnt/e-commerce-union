<template>
    <div class="order-container">
        <header>
            <ScrollNavBar v-model="tabIndex" @onTabClick="tabClick"></ScrollNavBar>
        </header>
        <main class="order-content">
            <ul>
                <li class="ea-flex order-item" v-for="item of orders">
                    <aside class="item-left">
                        <p>订单号: {{item.id}}</p>
                        <p>{{item.title}}</p>
                        <p>{{item.createTime}}</p>
                    </aside>
                    <aside class="item-right">
                        <p>收益</p>
                        <p>{{item.income}}</p>
                        <p :class="{active: !item.settlement}">{{item.settlement?'已结算':'未结算'}}</p>
                    </aside>
                </li>
                <div class="load-more" @click="onLoadMore">
                    <p v-show="loading">加载中</p>
                    <p v-show="!loading">{{finished?'无更多收益明细':'查看更多'}}</p>
                </div>
            </ul>
        </main>
    </div>
</template>

<script>
    import ScrollNavBar from '@/components/ScrollNavBar.vue'
    import {mapState, mapActions} from 'vuex'
    export default {
        name: "InvitationOrderDetail",
        data() {
            return {
                tabIndex: parseInt(this.$route.query.index),
                orders: [
                    {id: '212002000', title: '伍老师说历史', createTime: '2018-08-17 10:38:52', income: 25, settlement: 0},
                    {id: '212002001', title: '伍老师说历史', createTime: '2018-08-17 10:38:52', income: 25, settlement: 0},
                    {id: '212002002', title: '伍老师说历史', createTime: '2018-08-17 10:38:52', income: 25, settlement: 1},
                    {id: '212002003', title: '伍老师说历史', createTime: '2018-08-17 10:38:52', income: 25, settlement: 1}
                ]
            }
        },
        components: {ScrollNavBar},
        computed:{ ...mapState(['loading','finished'])},
        created(){
            this.getIncomeOrders({refresh:true,status:this.tabIndex})
        },
        methods: {
            ...mapActions(['getIncomeOrders']),
            tabClick(index) {
                this.tabIndex = index
                this.getIncomeOrders({refresh:true,status:this.tabIndex})
            },
            onLoadMore(){
                if(this.loading || this.finished) return
                this.getIncomeOrders({refresh:false,status:this.tabIndex})
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