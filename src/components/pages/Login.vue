<template>
    <div>
        <van-nav-bar
            title="用户登录"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />
        <div class="register-panel">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username = ''"
                :error-message="usernameErrorMsg"
            />
            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
                :error-message="passwordErrorMsg"
            />
            <div class="register-button">
                <van-button type="primary" @click="LoginAction" :loading="openLoading" size="large">登录</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import {Toast} from 'vant'

export default {
    data() {
        return {
            username: '',
            password: '',
            openLoading: false,    // 是否开启用户的Loading
            usernameErrorMsg: '',  // 当用户名出现错误的时候
            passwordErrorMsg: '',  // 当密码出现错误的时候
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },

        LoginAction() {
            this.checkForm() && this.axiosLoginUser()
        },

        // axios注册用户
        axiosLoginUser() {
            this.openLoading = true
            axios({
                url: url.loginUser,
                method: 'post',
                data: {
                    userName: this.username,
                    passWord: this.password
                }
            })
            .then(response => {
                console.log(response)
                // 如果code为200,代表注册成功,我们给用户提示
                if (response.data.code == 200) {
                    new Promise((resolve, reject) => {
                        localStorage.userInfo = {userName: this.username}
                        setTimeout(() => {
                            resolve()
                        }, 500)
                    }).then(() => {
                        Toast.success('登录成功')
                        this.$router.push('/')
                    }).catch(err => {
                        Toast.fail('登录状态保存失败')
                        console.log(err)
                    })
                } else {
                    console.log(response.data.message)
                    Toast.fail('登录失败')
                    this.openLoading = false
                }
                console.log(response.data.code)
            })
            .catch((error) => {
                console.log(error)
                Toast.fail('登录失败')
                this.openLoading = false
            })
        },

        // 验证
        checkForm() {
            let isOK = true
            if (this.username.length < 5) {
                this.usernameErrorMsg = '用户名不能少于5位'
                isOK = false
            } else {
                this.usernameErrorMsg = ''
            }

            if (this.password.length < 6) {
                this.passwordErrorMsg = '密码不能少于6位'
                isOK = false
            } else {
                this.passwordErrorMsg = ''
            }
            return isOK
        }
    },
    created() {
        if (localStorage.userInfo) {
            Toast.success('已登录')
            this.$router.push('/')
        }
    },
}
</script>

<style scoped>
.register-panel{
    width: 96%;
    border-radius: 5px;
    margin: 20px auto;
    padding-bottom: 50px;
}
.register-button{
    padding-top: 10px;
}
</style>
