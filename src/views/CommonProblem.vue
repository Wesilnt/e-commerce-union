<template>
    <div>
        <ul class="rules-list">
            <li class="rules-item" v-for="item of list">
                <h3 class="rules-item-title">{{item.title}}</h3>
                <summary class="rules-item-content" v-html="item.content"></summary>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "commonproblem",
        data() {
            return {
                list: [
                    {
                        id: 1,
                        title: 'Q: 提成如何提取怎样?',
                        createTime: '2018-08-08 18:38:50',
                        content: 'A: 秦汉胡同在线产品内得虚拟货币,书币可以在您购买商品得时候抵扣现金。'
                    },
                    {
                        id: 2,
                        title: 'Q2: 提成如何提取怎样?',
                        createTime: '2018-08-08 15:20:50',
                        content: 'A: 基于秦汉胡同在线公众号中，您的完善资料、邀请好友购买等行为都是您获取书币的渠道。书币获得后的有效期为永久。'
                    },
                ]
            }
        },
    }
</script>
<style lang="less" scoped>
    .rules-list{
        height: 100vh;
        background-color: #ffffff;
    }
    .rules-item {
        padding: 0px 46px;
        &-title {
            font-size: 32px;
            color: #333333;
            line-height: 32px;
            padding:  40px 0;
        }
        &-content {
            word-break: break-all;
            color: #666666;
            font-size: 30px;
            margin-bottom: 8px;
        }
    }
</style>