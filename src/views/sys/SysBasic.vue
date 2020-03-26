<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="部门管理" name="first"><DeptManager></DeptManager></el-tab-pane>
            <el-tab-pane label="职位管理" name="second"><PositionManager></PositionManager></el-tab-pane>
            <el-tab-pane label="职称管理" name="third"><JobLevelManager></JobLevelManager></el-tab-pane>
            <el-tab-pane label="奖惩规则" name="fourth"><RewardsManager></RewardsManager></el-tab-pane>
            <el-tab-pane label="权限组" name="last"><PermissManager></PermissManager></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import DeptManager from "../../components/sys/basic/DeptManager";
    import JobLevelManager from "../../components/sys/basic/JobLevelManager";
    import PermissManager from "../../components/sys/basic/PermissManager";
    import PositionManager from "../../components/sys/basic/PositionManager";
    import RewardsManager from "../../components/sys/basic/RewardsManager";
    export default {
        name: "SysBasic",
        components: {RewardsManager, JobLevelManager, DeptManager,PermissManager,PositionManager}
    }
</script>

<style scoped>

</style>