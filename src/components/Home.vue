<template>
  <div>
    欢迎使用麦总的项目
   welcome to use Victor project Vue.js<hr/>
<!--   新增员工信息链接area--------------------------------------------      -->

      <el-card>
          <!-- Form -->
          <el-row :gutter="10">
              <el-col :span="2">
                  <el-button type="primary" @click="oepnAddDialog" icon="el-icon-document-add" size="big">
<!--                      <router-link to="/addEmp">添加新员工</router-link>-->
                       修改
                  </el-button>
              </el-col>

              <el-col :span="10">
                  <el-form :inline="true" :model="query">
                      <el-form-item>
                          <el-input v-model="query.search" placeholder="请输入员工名称">
                          <el-button class="btn bg-primary" translate="yes" slot="append" @click="onSubmitSearch" icon="el-icon-search">查询</el-button>
                          </el-input>
                      </el-form-item>
                  </el-form>
              </el-col>
          </el-row>
      </el-card>


      <!--      表单渲染区-->
      <el-table  :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="编号" width="180"></el-table-column>
           <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="genders" label="性别"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                  <el-button @click="deleteEmp(scope.row.id)" type="danger" size="small">删除</el-button>
                  <el-button @click="startUpdataEmp(scope.row.id)" type="text" size="small">修改</el-button>
              </template>
          </el-table-column>
      </el-table>
<!--      table area finish-->

<!--      修改员工信息区-->
      <el-dialog title="修改员工信息" :visible.sync="dialogFormVisible">
          <el-form ref="form" :model="updateForm">
              <el-form-item label="姓名" prop="name" :label-width="formLabelWidth">
              <el-input v-model="updateForm.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="年龄" prop="age" :label-width="formLabelWidth">
                  <el-input v-model="updateForm.age" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="genders" :label-width="formLabelWidth">
                  <el-input v-model="updateForm.genders" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="address" :label-width="formLabelWidth">
                  <el-input v-model="updateForm.address" auto-complete="off"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="absoluteUpdateEmp">确认</el-button>
          </div>
      </el-dialog>


      <el-dialog title="添加员工":visible.sync="dialogFormVisible2">
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
                      <el-button @click="dialogFormVisible2 = false">取消</el-button>
                      <el-button @click="resetForm('form')">重置</el-button>
                      <el-button  type="success"  @click="publish" plain>保存</el-button>
              </el-form-item>
          </el-form>
      </el-dialog>

<!--      分页区this is a paging area start-->
      <!--分页区域-->
      <div>
          <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="query.pageIndex"
                  :page-sizes="[1, 3, 5, 10]"
                  :page-size="query.pageSize"
                  layout="sizes, prev, pager, next"
                  :total="total">
          </el-pagination>
      </div>
<!--      :page-sizes="[1,3,5,10]"-->
      <!-- finish pagination area-->


<!--    this is a add new employee information dialog   -->





<!--      <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>-->
  </div>
</template>

<script>
    export default {
    name:"Home",
     created() {
        //钩子事件，当出窗体加载时候 变量所有数据
        this.getEmployeeDate();
    },
    data(){
        return{
            tableData:[],
            query:{
                search:"",
                pageIndex:1,
                pageSize:5,
            },
            total:0,
            dialogFormVisible:false,
            formLabelWidth:"120px",
            updateForm:{
                id:"",
                name:"",
                age:"",
                genders:"",
                address:""
            },
            dialogFormVisible2:false,
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
        //这里是获取分页成的数据
        async getEmployeeDate(){
            const {data:res} = await
                this.$http.get("findAllEmpBypage?pageIndex="+this.query.pageIndex+"&pageSize="+this.query.pageSize+"&search="+this.query.search);
         this.tableData = res.records;
         this.total = res.total;
        },
        //分页触发事件
        handleSizeChange(newSize){
            this.query.pageSize = newSize;
            this.getEmployeeDate();
        },
        handleCurrentChange(newPage){
            this.query.pageIndex = newPage;
            this.getEmployeeDate();
        },
        //点击按钮搜素function
        onSubmitSearch(){
            this.getEmployeeDate();
        },
        //删除员工信息
        async deleteEmp(id){
            const res = await this.$confirm('确认删除此信息吗？','系统提示',{
                confirmButtonText:"确认",
                cancelButtonText:"取消",
                type:'warning'
            }).catch(err=> err)
            //判断是否移除信息如果取消移除给提示已取消如果不是提示信息已删除
            if(res!=='confirm'){
                return this.$message.info("操作已取消！");
            }
            const {data:res2} =await this.$http.delete("deleteEmp?id="+id);
            if(res2!=="ok"){
                return this.$message.info("删除失败！");
            }
            this.$message.success("成功删除!");
            await this.getEmployeeDate();
        },

    //    显示要修改的员工信息
        async startUpdataEmp(id){
            this.dialogFormVisible=true;
            const {data:res} = await this.$http.get("findEmpById?id="+id);
            this.updateForm.name = res.name;
            this.updateForm.age = res.age;
            this.updateForm.genders = res.genders
            this.updateForm.address = res.address;
            this.updateForm.id = res.id;
        },
    //    确认修改员工信息
      async absoluteUpdateEmp(){
            this.dialogFormVisible = false;

                const {date:res} = await this.$http.post("updateEmp",this.updateForm);

                if(res == "ok"){
                    this.$message.success("修改失败！");
                }else {
                    this.$message.info("修改成功！");
                  await this.getEmployeeDate();
                }
        },
        async oepnAddDialog(){
            this.dialogFormVisible2=true;
        },
        //添加新员工信息
        async publish(){ this.dialogFormVisible = false;
            this.$refs.form.validate(async valid =>{
                if(!valid) return;
                const {data:res} = await this.$http.post("addEmp",this.empForm);
                console.log(res);
                if( res =="ok"){
                    this.$message.success("添加成功！");
                    this.getEmployeeDate();
                    this.dialogFormVisible2=false;
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
