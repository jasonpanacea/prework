<template>
<div>
<el-col>
    <el-form :model="form" :inline="true" label-width="100px">
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="重要性">
        <el-select v-model="form.priority" placeholder="请选择" clearable>
          <el-option label="不重要-不紧急" value=0></el-option>
          <el-option label="重要-不紧急" value=1></el-option>
          <el-option label="不重要-紧急" value=2></el-option>
          <el-option label="很重要-很紧急" value=3></el-option>
        </el-select>

      </el-form-item>
            <el-form-item label="到期时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.expire_date" style="width: 100%;"></el-date-picker>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
      </el-form-item>
    </el-form>
    </el-col>
</div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          content: '',
          priority: '',
          expire_date:''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>
