<template>
    <div>
       <div>
           <el-input size="small" class="addPosInput"
                   placeholder="添加职位信息......."
                   prefix-icon="el-icon-plus"
                     @keydown.enter.native="addPosition"
                   v-model="pos.name">
           </el-input>
           <el-button icon="el-icon-plus" size="small" type="primary" @click="addPosition">添加</el-button>
       </div>
        <div class="posManagerMain">
            <el-table
                    :data="positions"
                    border
                    size="small"
                    @selection-change="handleSelectionChange"
                    style="width: 70%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="职位编号"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="职位名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建日期">
                </el-table-column>
                <!--
                   slot-scope:VUE插槽（VUE组件占位符）
                    scope.index:操作数据行行标
                    scope.row:操作数据行JSON数据
                    @cliek:单击事件处理函数
                -->
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="showPositionUpdate(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button @click="deleteManyPosition" size="small" type="danger" style="margin-top: 10px;" :disabled="multipleSelection.length==0">批量删除</el-button>
        </div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
              >
            <div>
                <el-tag>职位名称</el-tag>
                <el-input class="updatePosInput" v-model="updatePos.name" size="small"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="small">取 消</el-button>
    <el-button type="primary" @click="doUpdate" size="small">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "PositionManager",
        data() {
            return{
                pos: {
                    id:'',
                    name: '',
                },
                dialogVisible: false,
                loading: false,
                updatePos: {
                    id:'',
                    name: '',
                },
                positions: [],
                multipleSelection: []
            }
        },
        mounted() {
            this.initPositions();
        },
        methods:{
            deleteManyPosition()
            {
                /*
                  根据职位id删除职位，删除职位时需要查询该职位是否有人使用
                  有人使用时无法删除职位信息
                */
                this.$confirm('此操作将永久删除['+this.multipleSelection.length+']职位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids='?';
                    this.multipleSelection.forEach(item=>{
                        ids +='ids='+item.id+'&';
                    });

                    this.deleteRequest("/sys/basic/pos/"+ids).then(resp=>{
                        if(resp)
                        {
                            this.initPositions();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消批量删除'
                    });
                });
            },
            handleSelectionChange(val)
            {
                this.multipleSelection = val;
            },
            addPosition()
            {
                if(this.pos.name)
                {
                    this.postRequest("/sys/basic/pos/",this.pos).then(resp=>{
                        //添加成功刷新数据表格，清空文本框
                        if(resp)
                        {
                            this.initPositions();
                            this.pos.name='';
                        }
                    });
                }
                else
                {
                    this.$message.error("职位添加失败");
                }
            },
            showPositionUpdate(index,rowData)
            {
                Object.assign(this.updatePos,rowData);
                this.dialogVisible=true;
            },
            doUpdate() {
                this.putRequest("/sys/basic/pos/", this.updatePos).then(resp => {
                    if (resp) {
                        this.initPositions();
                        this.updatePos.name = '';
                        this.dialogVisible = false;
                    }
                })
            },
            handleDelete(index,rowData)
            {
                /*
                   根据职位id删除职位，删除职位时需要查询该职位是否有人使用
                   有人使用时无法删除职位信息
                 */
                this.$confirm('此操作将永久删除['+rowData.name+']职位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/sys/basic/pos/"+rowData.id).then(resp=>{
                        if(resp)
                        {
                            this.initPositions();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            initPositions(){
                this.getRequest("/sys/basic/pos/").then(resp => {
                    if (resp) {
                        this.positions = resp;
                    }
                })
            }
        }

    }
</script>

<style scoped>
    .addPosInput {
        width: 300px;
        margin-right: 8px
    }
    .updatePosInput
    {
        width: 200px;
        margin-left: 8px;
    }
    .posManagerMain
    {
        margin-top: 10px;
    }
</style>