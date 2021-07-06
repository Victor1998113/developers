<template>
    <div>
        <el-form :model="empForm" status-icon :rules="empRoles" ref="form" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="name">
                <el-input type="text" v-model="empForm.name" ></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input type="text" v-model.number="empForm.age" ></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="genders">
                <el-input v-model="empForm.genders"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="empForm.address"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button  type="success"  @click="publish" plain>保存</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>

        </el-form>
        <router-link to="/">返回首页</router-link>
    </div>
</template>

<script>
    export default {
        name: "AddEmp",
        data(){
            return{
                empForm:{
                    name:"",
                    age:"",
                    genders:"",
                    address:"",
                },

                //验证规则
                empRoles:{
                    name:[
                        {message:"请输入员工姓名...",trigger:'blur',required:true},
                        {min:1,message:"至少大于1个字符!",trigger:'blur'}
                    ],
                    age:[
                        {message:"请输入的年龄!",trigger:'blur',required:true},
                        {type: 'number',trigger: 'blur',message: "请输入数值!",required: true,}],

                    genders:[ {message:"请输入你的性别!",trigger:'blur',required:true}],
                    address:[
                        {message:"请输入的年龄",trigger:'blur',required:true},
                        {min:4,message:"输入正确的地址!",trigger: 'blur'}]
                }
            }
        },
        methods:{
            //添加新员工信息
            publish(){
                this.$refs.form.validate(async valid =>{
                    if(!valid) return;
                    const {data:res} = await this.$http.post("addEmp",this.empForm);
                    console.log(res);
                    if( res =="ok"){
                        this.$message.success("添加成功！");
                        this.getEmployeeDate();
                    }else{
                        this.$message.error("添加员工失败！");
                    }
                })
            },
            //重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }

    }
</script>

<style scoped>

</style>