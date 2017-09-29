<template>
    <div class="sidebar">
        <el-menu default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
        <el-menu-item index="/todo"><i class="el-icon-setting"></i>待办事项</el-menu-item>
      <el-menu-item index="/items"><i class="el-icon-menu"></i>事项列表</el-menu-item>

    </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 180px;
        left: 0;
        top: 0;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
    .sidebar > ul > li .fa
    {
        width: 20px;
    }

    .sidebar > ul > li
    {
        border-bottom:1px solid #cdcdcd
    }


</style>
