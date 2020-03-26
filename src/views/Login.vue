<template>
    <div>
        <!--登录表单
            :rules:表单校验规则
            ref:表单校验别名
            :model:绑定表单模型
        -->
        <el-form
                :rules="rules"
                ref="loginForm"
                :model="loginForm"
                class="loginContainer">
            <h3 class="loginTitle">系统登录</h3>
            <!--
                prop:表单校验属性字段
                v-model:组件绑定表单属性名
                auto-complete:是否开启自动补全
                placeholder:表单元素未输入提示内容
            -->
            <el-form-item prop="username">
                <el-input size="normal" type="text" v-model="loginForm.username" auto-complete="off"
                          placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input size="normal" type="password" v-model="loginForm.password" auto-complete="off"
                          placeholder="请输入密码" @keydown.enter.native="submitLogin"></el-input>
            </el-form-item>
            <!--
                @click:表单提交单击事件
            -->
            <el-button size="normal" type="primary" style="width: 100%;" @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script>



export default {
        name: "Login",
        data() {
            return {
                //配置登录表单属性值
                loginForm: {
                    username: 'admin',
                    password: '123'
                },
                //配置校验规则(required:是否必填,message:校验未通过提示信息,trigger:触发校验规则事件)
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                }
            }
        },
        //配置表单事件触发方法
        methods: {
            //表单登录提交事件($refs.loginForm:通过$refs.ref属性值获取需校验表单)
            submitLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                      this.postKeyValueRequest("/doLogin",this.loginForm).then(resp=>{
                           if(resp)
                           {
                              //this.$message.success(JSON.stringify(resp.obj));
                                window.sessionStorage.setItem("user",JSON.stringify(resp.obj));
                                let targetPath=this.$route.query.redirect;
                                this.$router.replace((targetPath=='/'||targetPath==undefined)?'/home':targetPath);
                           }
                       })
                    } else {
                        this.$message.error('表单校验未通过');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle {
        margin: 15px auto 20px auto;
        text-align: center;
        color: #505458;
    }

    .loginRemember {
        text-align: left;
        margin: 0px 0px 15px 0px;
    }
</style>