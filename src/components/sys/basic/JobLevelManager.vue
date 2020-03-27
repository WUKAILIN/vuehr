<template>
    <div>
        <!--职称顶部操作栏-->
        <div>
            <el-tag>职称名称</el-tag>
            <el-input size="small"
                      v-model="jobLevel.name"
                     class="addJobLevelInput"
                      placeholder="职称名称..."
            >
            </el-input>
            <el-tag>职称等级</el-tag>
            <el-select size="small" class="addJobLevelSelect" v-model="jobLevel.titleLevel" style="">
                <el-option
                    v-for="item in titleLevels"
                    :key="item"
                    :value="item"
                    :label="item"
                ></el-option>
            </el-select>
            <el-button @click="addJobLevel" icon="el-icon-plus" size="small" type="primary">添加</el-button>
        </div>
        <!--职称数据表格区域-->
        <div>
            <el-table
                    :data="jobLevels"
                    border
                    tooltip-effect="dark"
                    style="width: 76%"
                    @selection-change="handleSelectionChangeByJobLevel">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>

                <el-table-column
                        prop="id"
                        label="职位编号"
                        width="120">
                </el-table-column>
                <el-table-column
                        label="职位名称"
                        prop="name"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建日期"
                        show-overflow-tooltip>
                </el-table-column>
                <!--
                   slot-scope:VUE插槽（VUE组件占位符）
                   scope.index:操作数据行行标
                   scope.row:操作数据行JSON数据
                   @click:单击事件处理函数
               -->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="showJobLevelUpdate(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDeleteJobLevel(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button @click="deleteManyJobLevel" size="small" type="danger" style="margin-top: 10px;" :disabled="multipleSelectionJobLevel.length==0">批量删除</el-button>
        </div>
        <!--职称更新区域-->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="40%"
        >
            <div class="updateJobLevelInputContainer">
                <el-tag>职称名称</el-tag>
                <el-input class="updateJobLevelInput" v-model="updateJobLevel.name" size="small"></el-input>
            </div>
            <div class="updateJobLevelSelectContainer">
                <el-tag>职称等级</el-tag>
                <el-select size="small" class="updateJobLevelSelect" v-model="updateJobLevel.titleLevel" style="">
                    <el-option
                            v-for="updateJobLevelItem in updateTitleLevels"
                            :key="updateJobLevelItem"
                            :value="updateJobLevelItem"
                            :label="updateJobLevelItem"
                    ></el-option>
                </el-select>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="small">取 消</el-button>
    <el-button type="primary" @click="doUpdateJobLevel" size="small">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "JobLevelManager",
        data() {
            return{
                //添加职称数据
                jobLevel:{
                    id:'',
                    name:'',
                    titleLevel:''
                },
                //更新职称数据
                updateJobLevel:{
                    id:'',
                    name:'',
                    titleLevel:''
                },
                //添加职称级别数组
                titleLevels: [
                    '正高级',
                    '副高级',
                    '中级',
                    '初级',
                    '员级',
                ],
                //更新职称级别数组
                updateTitleLevels:[
                    '正高级',
                    '副高级',
                    '中级',
                    '初级',
                    '员级',
                ],
                dialogVisible:false,//隐藏职位更新对话框
                jobLevels:[],//页面加载初始化数据表格数组
                multipleSelectionJobLevel:[]//批量删除职称数组信息
            }
        },
        mounted() {
            //钩子函数，页面加载后初始化职位数据表格
            this.initJobLevel();
        },
        methods:{
            /*
                点击编辑时显示更新职称窗体，并对待更新数据进行赋值
                index:更新数据行下标
                rowData:更新数据行数据
                Object.assign(待更新职称数据信息，待更新数据行信息)
            */
            showJobLevelUpdate(index,rowData){
                Object.assign(this.updateJobLevel,rowData);
                this.dialogVisible=true;
            },
            /*
            更新职称信息
            */
            doUpdateJobLevel(){
                //职称名称和职称级别均不为空，执行更新操作
                if(this.updateJobLevel.name!='' && this.updateJobLevel.titleLevel!='')
                {
                    this.putRequest("/sys/basic/jobLevel/",this.updateJobLevel).then(resp =>{
                        //操作成功回调函数
                        if(resp)
                        {
                            this.dialogVisible=false;//隐藏更新职称对话框
                            this.initJobLevel();//刷新职称数据表格
                            this.jobLevel.name='';//顶部区域职称名称赋值为空
                            this.jobLevel.titleLevel='';//顶部区域职称级别赋值为空
                        }
                    });
                }
                else
                {
                    this.$message.error("字段为必填项，职称信息更新失败");
                }
            },
            /*
               删除单条职称信息
               index:数据行下标
               rowData:数据行数据
             */
            handleDeleteJobLevel(index,rowData){
                this.$confirm('此操作将永久删除['+rowData.name+']职称, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                  /*
                    点击确定按钮回调函数，执行删除操作
                  */
                  this.deleteRequest("/sys/basic/jobLevel/"+rowData.id).then(resp =>{
                      if(resp)
                      {
                          //删除成功刷新职称数据表格
                          this.initJobLevel();
                      }
                      else
                      {
                          this.$message.error("职称删除失败");
                      }
                  })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //添加职称信息
            addJobLevel(){
                if(this.jobLevel.name!='' && this.jobLevel.titleLevel!=''){
                    this.postRequest("/sys/basic/jobLevel/",this.jobLevel).then(resp =>{
                        if(this.jobLevel.name)
                        {

                            this.initJobLevel();
                            this.jobLevel.name='';
                            this.jobLevel.titleLevel='';
                        }
                        else
                        {
                            this.$message.error("职称添加失败");
                        }
                    })
                }
                else
                {
                    this.$message.error("字段不能为空");
                }

            },
            //初始化职称数据表格
            initJobLevel(){
                this.getRequest("/sys/basic/jobLevel/").then(resp => {
                    if (resp) {
                        this.jobLevels = resp;
                    }
                })
            },
            /*
             复选框选中事件
             val:选中数据行数据信息
             */
            handleSelectionChangeByJobLevel(val)
            {
                //将选中数据赋值给data内定义的数组
                this.multipleSelectionJobLevel=val;
            },
            //批量删除按钮单击事件
            deleteManyJobLevel()
            {
                this.$confirm('此操作将永久删除['+this.multipleSelectionJobLevel.length+']条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    /*
                      确认框确定按钮单击事件回调函数
                      ids:用于存放选中数据行复选框数据标识
                      对选中数据数组进行迭代，将标识信息叠加至ids字符串
                      叠加后字符串结果信息添加至批量删除接口后进行批量删除操作
                      批量删除成功刷新职称数据表格信息
                     */
                    let ids='?';
                    this.multipleSelectionJobLevel.forEach(item =>{
                        ids+='ids='+item.id+'&';
                    });
                    this.deleteRequest("/sys/basic/jobLevel/"+ids).then(resp=>{
                        if(resp)
                        {
                            this.initJobLevel();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>

<style scoped>
 .addJobLevelInput
 {
     width: 300px;
     margin-left: 15px;
     margin-right: 15px
 }
 .addJobLevelSelect
 {
     width: 300px;
     margin-left: 15px;
     margin-right: 15px
 }
 .updateJobLevelInput
 {
     width: 300px;
     margin-top: 15px;
     margin-left: 15px;
     margin-right: 15px;
 }
 .updateJobLevelSelect
 {
     width: 300px;
     margin-top: 15px;
     margin-left: 15px;
     margin-right: 15px;
 }
 .updateJobLevelInputContainer
 {
     margin-top: 5px;
     margin-left: 25px;
 }
 .updateJobLevelSelectContainer
 {
     margin-top: 5px;
     margin-left: 25px;
 }
</style>