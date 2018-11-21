<template>
    <div class="login-container">
        <header>
            <Avatar :src="userInfo&&userInfo.avatarUrl"></Avatar>
        </header>
        <main class="login-content">

            <li class="phone-item">
                <label>+86 |</label>
                <input placeholder="手机号" v-model="phone"/>
            </li>
            <li class="code-item">
                <input placeholder="验证码" v-model="code"/>
                <label @click.stop="getCode">{{getCodeTip}}</label>
            </li>
            <p class="confirm-submit" @click="onSubmit" :class="{active:active}">登录</p>
        </main>
    </div>
</template>

<script>
    import Avatar from '../components/Avatar.vue'
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "Login",
        data() {
            return {
                phone: '',
                code: ''
            }
        },
        components: {Avatar},
        computed: {
            ...mapState(['userInfo', 'getCodeTip', 'clickAble', 'sending', 'validate']),
            active: function () {
                return this.phone.length > 0 && this.code.length > 0
            }
        },
        created() {
            document.title = '登录'
            this.getUserInfo()
        },
        methods: {
            ...mapActions(['getUserInfo', 'sendMobileCode', 'validateMobileCode']),
            getCode() {
                if (!this.clickAble) return
                let phoneNum = this.phone.trim()
                if (phoneNum === '') {
                    this.$toast('请输入手机号')
                    return
                }
                if (!this.isPoneAvailable(phoneNum)) {
                    this.$toast('手机号格式不正确').clear()
                    return
                }
                this.sendMobileCode({mobileNo: phoneNum})
            },
            onSubmit() {
                // this.$router.push({name: 'home'})
                // return
                let phoneNum = this.phone.trim();
                if (phoneNum === '') {
                    this.$toast({position: 'bottom', message: '请输入手机号'});
                    return;
                }
                if (this.code === '') {
                    this.$toast({position: 'bottom', message: '请输入正确的验证码'});
                    return;
                }
                this.validateMobileCode({code: this.code})
                    .then(isSuccess => {
                        if (!isSuccess) return
                        this.$router.push({name: 'home'})
                    })
            },
            isPoneAvailable(str) {
                return /^[1][3,4,5,7,8][0-9]{9}$/.test(str);
            }
        },

        beforeDestroy() {
            document.title = '电商联盟'
        }
    }
</script>

<style scoped>
    .login-container {
        height: 100vh;
        background-color: white;
        text-align: center;
        padding-top: 120px;
        font-size: 24px;
        color: #333333;
    }

    .login-content {
        margin-top: 100px;
    }

    li {
        display: flex;
        text-align: left;
        margin: 0 30px;
        align-items: center;
        border-bottom: 1px solid #ededed; /*no*/
        padding: 10px;
    }

    label {
        font-size: 24px;
        line-height: 24px;
    }

    .phone-item input {
        margin-left: 10px;
    }

    .code-item {
        margin-top: 50px;
    }

    .code-item label {
        color: #96BADD;
    }

    input {
        border: 0;
        flex: 1;
        outline: none;
        color: #c9c9c9;
    }

    .confirm-submit {
        position: inherit;
        margin: 180px 50px;
        border-radius: 10px;
        background-color: #D7D7D7;
    }

    .confirm-submit :after {
        opacity: 0.5;
    }

    .active {
        background-color: #ffa32f;
    }
</style>