<template>
<div>
    <el-row>
    <el-col :span="12">
    <el-form :model="form" label-width="100px">
      <el-form-item label="内容">
        <el-input type="textarea" v-model="form.content" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="重要性">
          <el-radio-group v-model="form.priority">
      <el-radio label="不重要-不紧急"></el-radio>
      <el-radio label="重要-不紧急"></el-radio>
      <el-radio label="不重要-紧急"></el-radio>
      <el-radio label="很重要-很紧急"></el-radio>
    </el-radio-group>

      </el-form-item>
            <el-form-item label="到期时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.expire_date" style="width: 100%;"></el-date-picker>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
      </el-form-item>
    </el-form>
    </el-col>
    </el-row>
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
