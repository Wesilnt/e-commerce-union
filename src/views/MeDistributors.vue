<template>
    <div class="distributors-container">
        <ul class="distributors-list">
            <li class="ea-flex  distributor-item" v-for="item of distributors" :key="item.id">
                <aside class="ea-flex item-left">
                    <Avatar></Avatar>
                    <div class="item-left-content">
                        <h4 class="name">{{item.distributorNickName}} </h4>
                        <p class="item-text bottom"> 关系绑定时间:{{item.createTime | formatDuring}} </p>
                    </div>
                </aside>
                <aside class="item-right">
                    <p class="item-text">推广金额</p>
                    <p class="item-text bottom"><span>{{item.extendAmount.toFixed(2)}}元</span></p>
                </aside>
            </li>
            <div class="load-more" @click="onLoadMore">
                <p v-show="isLoading">加载中</p>
                <p v-show="!isLoading">{{finished?'无更多收益明细':'查看更多'}}</p>
            </div>
        </ul>
    </div>
</template>

<script>
    import Avatar from '@/components/Avatar.vue'
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "MeDistributors",
        data() {
            return {
                distributors: [
                    {id: 1, distributorNickName: 'Anson', createTime: '2018-11-20 12:23:32', extendAmount: 100},
                    {id: 2, distributorNickName: 'Anson', createTime: '2018-11-20 12:23:32', extendAmount: 100},
                ]
            }
        },
        computed: {...mapState(['isLoading', 'finished'])},
        filters: {
            formatDuring: date => {
                let mss = new Date(date)
                let year = mss.getFullYear()
                let month = mss.getMonth()
                let day = mss.getDate()
                return `${year}-${month < 9 ? '0' + month : month}-${day < 9 ? '0' + day : day}`
            }
        },
        components: {Avatar},
        created(){
            this.getMeDistributors(true)
        },
        methods: {
            ...mapActions([]),
            onLoadMore() {
                this.getMeDistributors(false)
            }
        }
    }
</script>

<style lang="less" scoped>
    .distributors-container{
        height: 100vh;
        background-color: white;
    }
    .distributors-list{
        font-size: 24px;
        color: #333333;
        text-align: center;
    }
    li+li{
        border-top: 1px solid #ededed;/*no*/
    }
    .distributor-item{
        margin: 0 30px;
        padding: 28px 0px;
    }
    .item-left {
       text-align: left;
        &-content{
            margin-left: 20px;
        }
        &-content .name{
            font-size: 32px;
            line-height: 32px;
        }
    }
    .item-right{
        text-align: right;
    }
    .item-text.bottom{
        margin-top: 20px;
    }
    .item-text span{
        color: #ffa32f;
    }

</style>