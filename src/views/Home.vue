<template>
    <div>
        <div class="index-header">
            <div class="user-wrapper">
                <Avatar width="96"/>
                <p class="text-center user-name"><strong>柳岩</strong></p>
            </div>
            <div class="index-header_footer">
                提成比例: 6%
            </div>
        </div>
        <ul class="ea-flex big-border index-invite center-vertline">
            <li class="flex-item" @click="toMeInvitation">我的邀请（0）</li>
            <li class="flex-item" @click="toInvitationLetter">分销员邀请函</li>
        </ul>
        <div class="big-border" @click="toProfitDetail">
            <div class="body-nav">我的资产</div>
            <div class="body-screen">
                <p>当前累计收益</p>
                <p class="screen-giant"><strong>
                    <Counter :num="9360.08"/>
                </strong><i class="arrow-right"></i></p>
                <p>每月10日结算<span class="help">?</span></p>
            </div>
            <div class="ea-flex center-vertline body-foot">
                <div class="flex-item">已结算（
                    <Counter :num="60.08"/>
                    ）
                </div>
                <div class="flex-item">待结算（
                    <Counter :num="162.88"/>
                    ）
                </div>
            </div>
        </div>
        <div class="ea-flex big-border body-foot">
            <div class="flex-item" @click="toMeDistributors">
                <p class="txt-giant"><strong>5</strong></p>
                <p>我的分销员</p>
            </div>
            <div class="flex-item" @click="toProfitDetail">
                <p class="txt-giant"><strong>3</strong></p>
                <p>推广订单</p>
            </div>
            <div class="flex-item">
                <p class="txt-giant"><strong>5</strong></p>
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
    import {  mapState, mapActions } from 'vuex'
    // @ is an alias to /src
    import Avatar from '@/components/Avatar.vue'
    import Counter from '@/components/Counter.vue'

    export default {
        name: 'Home',
        components: {
            Avatar,
            Counter
        },
        mounted() {
            // this.makeAToast()
        },
        methods: {
            makeAToast() {
                this.$router.push({name: 'problem'})
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
                this.$router.push({name: 'meInvitation'})
            },
            toInvitationLetter() {
                this.$router.push({name: 'invitationLetter'})
            },
            toProfitDetail() {
                this.$router.push({name: 'invitationOrderDetail'})
            },
            toMeDistributors() {
                this.$router.push({name: 'meDistributors'})
            },
            // toIntroduce() {
            //     this.$router.push({name: 'DistributionIntroduce'})
            // }
        }
    }
</script>
<style lang="less">
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
    }

    .body-nav {
        padding: 32px;
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
    }
</style>
