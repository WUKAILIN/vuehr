<template>
    <div>
        <!--顶部操作栏-->
        <div>
            <el-tag>职称名称</el-tag>
            <el-input size="small"
                      v-model="jobLevel.name"
                      style="width: 300px;margin-left: 15px;margin-right: 15px"
                      placeholder="职称名称..."
            >
            </el-input>
            <el-tag>职称等级</el-tag>
            <el-select size="small" v-model="jobLevel.titleLevel" style="margin-left: 15px;margin-right: 15px">
                <el-option
                    v-for="item in titleLevels"
                    :key="item"
                    :value="item"
                    :label="item"
                ></el-option>
            </el-select>
            <el-button icon="el-icon-plus" size="small" type="primary">添加</el-button>
        </div>
        <!--职称数据表格区域-->
        <div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "JobLevelManager",
        data() {
            return{
                jobLevel:{
                    name:'',
                    titleLevel:''
                },
                titleLevels: [
                    '正高级',
                    '副高级',
                    '中级',
                    '初级',
                    '员级',
                ]
            }
        }
    }
</script>

<style scoped>

</style>