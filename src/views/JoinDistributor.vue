<template>
    <div class="join-distributor">
       <section class="join-distributor-section">
           <Avatar></Avatar>
           <aside class="join-distributor-content">
               <p class="join-distributor-name">刘岩</p>
               <p>邀请您成为秦汉胡同分销员</p>
           </aside>
       </section>
        <p class="confirm-submit">立即加盟</p>
    </div>
</template>

<script>
    import Avatar from '@/components/Avatar.vue'
    import {  mapState, mapActions } from 'vuex'
    export default {
        name: "JoinDistributor",
        data(){
          return{
              preUserId:0,
              distributorName:'',
          }
        },
        computed:{...mapState([])},
        components: { Avatar},

    }
</script>

<style lang="less" scoped>
   .join-distributor{
       font-size: 24px;
       color: #333333;
       height: 100vh;
       line-height: 24px;
       background-color: #FFE0B9;
       &-section{
           margin: 64px 40px;
           display: inline-flex;
           align-items: center;
       }
       &-name{
           line-height: 30px;
           font-size: 30px;
           margin-bottom: 16px;
       }
       &-content{
           margin-left: 20px;
       }
       .confirm-submit:active{
           opacity: 0.5;
       }
   }
</style>