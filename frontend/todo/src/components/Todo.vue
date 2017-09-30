<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="新建">
        <el-row>
          <el-col :span="8">
            <el-form :model="form" label-position="left" label-width="100px">
              <el-form-item label="内容">
                <el-input type="textarea" v-model="form.content" placeholder="不超过140字"></el-input>
              </el-form-item>
              <el-row>
                <el-form-item label="优先级">
                  <el-radio-group v-model="form.priority">
                    <el-radio-button :label=0>低</el-radio-button>
                    <el-radio-button :label=1>中</el-radio-button>
                    <el-radio-button :label=2>高</el-radio-button>
                  </el-radio-group>

                </el-form-item>
                <el-form-item label="到期时间">
                  <el-date-picker type="date" placeholder="选择日期" v-model="form.expire_date"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-row>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">创建</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="列表">
      <el-button style="float: left; margin-bottom: 20px" type="primary" @click="handleAdd(1)">新建待办事项</el-button>

      <el-button type="primary" icon="search" style="float: right" @click="getData">搜索</el-button>
      <el-input v-model="select_word" style="float: right; width: 300px" placeholder="关键词"></el-input>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="content" :formatter="contentFormat" width="" label="内容">
          </el-table-column>
          <el-table-column prop="priority" :formatter="priorityFormat" label="优先级" width="120" sortable>
          </el-table-column>
          <el-table-column prop="expire_date" label="到期时间" width="180" sortable>
          </el-table-column>
          <el-table-column prop="created_date" label="创建时间" width="180" sortable>
          </el-table-column>
          <el-table-column prop="status" :formatter="statusFormat" label="状态" width="120" sortable>
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template scope="scope">
              <el-button size="small" :disabled="scope.row.status==1" type="success"
                         @click="handleComplete(scope.$index, scope.row)">完成
              </el-button>
              <el-button size="small" type="info"
                         @click="handleEdit(scope.$index, scope.row)">详情
              </el-button>
              <el-button size="small" type="danger"
                         @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination style="float:right;margin-top: 10px;" @size-change="handleSizeChange"
                         @current-change="handleCurrentChange" :page-size="page_size" :page-sizes="page_sizes"
                         layout="total, sizes, prev, pager, next, jumper" :total="rawlist.length">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="事项详情" :visible.sync="modifyFormVisible" size="small">
<el-form :model="modifyForm" label-position="left" label-width="100px">
              <el-form-item label="内容">
                <el-input type="textarea" v-model="modifyForm.content" placeholder="不超过140字"></el-input>
              </el-form-item>
              <el-row>
                <el-form-item label="优先级">
                  <el-radio-group v-model="modifyForm.priority">
                    <el-radio-button :label=0>低</el-radio-button>
                    <el-radio-button :label=1>中</el-radio-button>
                    <el-radio-button :label=2>高</el-radio-button>
                  </el-radio-group>

                </el-form-item>
                <el-form-item label="到期时间">
                  <el-date-picker type="date" placeholder="选择日期" v-model="modifyForm.expire_date"
                                  style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-row>
            </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="modifyFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="modifyFormVisible = false">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          content: '',
          priority: 1,
          expire_date: '2018-09-12'
        },
        modifyForm:{
        },
        tableData: [
          {
            content: 'asdsad',
            priority: 0,
            expire_date: '2018-09-12',
            created_date: '2018-09-12',
            status: 0,
          },
          {
            content: 'asdsad',
            priority: 2,
            expire_date: '2018-09-12',
            created_date: '2018-09-12',
            status: 1,
          },
        ],
        rawlist: new Array(),
        page_sizes: [10, 20, 50],
        page_size: 20,
        modifyFormVisible: false,
        select_word: '',
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      getData(){

      },
      contentFormat(row, column) {
        if (row.content.length > 20) {
          return row.content.substr(0, 20) + "..."
        }
        return row.content
      },
      priorityFormat(row, column) {
        if (row.priority == 0)
          return "低"
        else if (row.priority == 1)
          return "中"
        else
          return "高"
      },
      statusFormat(row, column) {
        if (row.status == 1)
            return "已完成"
        else if (row.status == 2)
            return "已过期"
        else
            return "待完成"
      },
      handleAdd(){
        this.modifyForm = {
          content: '',
          priority: 1,
          expire_date: ''
        }
        this.modifyFormVisible = true
      },
      handleEdit(index, row) {
        this.modifyForm = row;
        this.modifyFormVisible = true
      },
      handleComplete(index, row) {
        console.log('finifhs')
      },
      handleDelete(index, row) {
        console.info(row);
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then();
      },
      handleCurrentChange(val){
        this.cur_page = val;
        console.log(`当前页: ${val}`);
        // this.changePageData();
      },
      handleSizeChange(val) {
        this.page_size = val;
        console.log(`每页 ${val} 条`);
        // this.changePageData();
      },

    }
  }
</script>
