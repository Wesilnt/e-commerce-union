<template>
    <div class="me-invitation">
        <ul>
            <li class="ea-flex me-invitation-item" v-for="item of invitationList" :key="item.id">
                <Avatar :src="item.avatar" :width="88" class="me-invitation-item-head"></Avatar>
                <aside class="me-invitation-item-aside">
                    <h3>{{item.name}}</h3>
                    <div class="me-invitation-item-bottom">
                        <label>推广进度</label>
                        <span>0</span>
                        <progress :max="item.max" :value="item.value"></progress>
                        <span>{{item.max}}</span>
                    </div>
                </aside>
            </li>

        </ul>
    </div>
</template>

<script>
    import Avatar from '@/components/Avatar.vue'

    export default {
        name: "MeInvitation",
        data() {
            return {
                invitationList: [
                    {id: 1,avatar: '',name:'Anson',max:100,value:0},
                    {id: 2,avatar: '',name:'Anson',max:100,value:0},
                    {id: 3,avatar: '',name:'Anson',max:100,value:0},
                    {id: 4,avatar: '',name:'Anson',max:100,value:0},
                    {id: 5,avatar: '',name:'Anson',max:100,value:0},
                    {id: 6,avatar: '',name:'Anson',max:100,value:0},
                    {id: 7,avatar: '',name:'Anson',max:100,value:0},
                ]
            }
        },
        components: {Avatar},
        created(){
            setTimeout(()=>{
                this.invitationList = [
                    {id: 1,avatar: '',name:'Anson',max:100,value:50},
                    {id: 2,avatar: '',name:'Anson',max:100,value:50},
                    {id: 3,avatar: '',name:'Anson',max:100,value:50},
                    {id: 4,avatar: '',name:'Anson',max:100,value:50},
                    {id: 5,avatar: '',name:'Anson',max:100,value:50},
                    {id: 6,avatar: '',name:'Anson',max:100,value:50},
                    {id: 7,avatar: '',name:'Anson',max:100,value:50},
                ]
            },600)
        }
    }
</script>

<style lang="less" scoped>
    .me-invitation {
        height: 100vh;
        background-color: #ffffff;
    }

    li + li {
        border-top: 1px solid #ededed;
    }

    .me-invitation-item {
        margin: 0 30px;
        font-size: 24px;
        color: #333333;
        padding: 30px 0 28px;
        &-head {
            margin-right: 16px;
        }
        &-aside {
            flex: 1;
            h3 {
                font-size: 32px;
                color: #333333;
                line-height: 32px;
            }
        }
        &-bottom {
            display: flex;
            align-items: center;
            margin-top: 16px;
        }
        &-bottom label {
            margin-right: 30px;
        }
        &-bottom progress {
            background-color: #eee;
            flex: 1;
            height: 8px;
            margin: 0 16px;
            transition: value 2.5s ease 0.4s;
        }
    }

    progress::-webkit-progress-bar {
        background-color: #ededed;
    }

    progress::-webkit-progress-value {
        background-color: #ffa32f;
    }
</style>