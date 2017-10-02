<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="TODO LIST">
        <el-button style="float: left; margin-bottom: 20px" type="primary" @click="handleAdd()">新建待办事项</el-button>

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
                         layout="total, sizes, prev, pager, next" :total="rawlist.length">
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
            <el-date-picker type="date" @change="date_change" placeholder="选择日期" v-model="modifyForm.expire_date"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditFormSubmit" :disabled="isdisabled">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import urllist from "../url/urllist";
  export default {
    data() {
      return {
        form: {
          content: '',
          priority: 1,
          status: 0,
          expire_date: ''
        },
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        isdisabled: false,
        modifyForm: {},
        tableData: [],
        rawlist: new Array(),
        cur_page: 1,
        page_sizes: [10, 20, 50],
        page_size: 20,
        modifyFormVisible: false,
        select_word: '',
      }
    },
    mounted(){
      this.initData(
        function () {
          this.getData();
          this.changePageData();
        }
      );
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      contentFormat(row, column) {
        if (row.content.length > 30) {
          return row.content.substr(0, 30) + "..."
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
          status:0,
          expire_date: ''
        }
        this.isdisabled = false
        this.modifyFormVisible = true
      },
      handleEdit(index, row) {
        this.isdisabled = row.status != 0
        this.modifyForm.id = row.id;
        this.modifyForm.priority = row.priority;
        this.modifyForm.status = row.status;
        this.modifyForm.content = row.content;
        this.modifyForm.expire_date = row.expire_date;
        this.modifyFormVisible = true
        this.tempIndex = index
      },
      handleComplete(index, row) {
        var value = {
          content: row.content,
          priority: row.priority,
          status: 1,
          expire_date: row.expire_date
        }
        let self = this
        self.$axios.patch(urllist.Items.editurl + row.id + "/", {status:1}).then(function (response) {
          console.log(response);
          value.id = row.id
          self.rawlist.splice(index, 1, value)
          self.changePageData()
          self.$message.success("更新成功");
        }).catch(function (error) {
          console.log(error);
          self.$message.warning("更新失败，请检查网络");
        });
        self.fullscreenLoading = false;
      },
      handleDelete(index, row) {
        console.info(row);
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let self = this;
          this.$axios.delete(urllist.Items.deleteurl + row.id.toString() + '/').then(function (res) {
            self.rawlist.splice(index, 1);
            self.changePageData()
            self.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(function (err) {
            self.$message({
              type: 'warning',
              message: '删除失败'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleCurrentChange(val){
        this.cur_page = val;
        console.log(`当前页: ${val}`);
        this.changePageData();
      },
      handleSizeChange(val) {
        this.page_size = val;
        console.log(`每页 ${val} 条`);
        this.changePageData();
      },
      changePageData(){
        this.rawlist_s = [];
        let startIndex = this.page_size * (this.cur_page - 1);
        let endIndex = (startIndex + this.page_size > this.rawlist.length) ? this.rawlist.length : (startIndex + this.page_size);
        for (let i = startIndex; i < endIndex; i++) {
          this.rawlist_s.push(this.rawlist[i]);
        }
        this.getData();
      },
      getData(){
        let self = this;
        if (self.select_word != '') {
          self.tableData = self.rawlist_s.filter(function (item) {
            return (item.content.indexOf(self.select_word) >= 0);
          });
        }
        else
          self.tableData = self.rawlist_s;
      },
      initData: function (callback) {
        let self = this;
        self.fullscreenLoading = true;
        self.$axios.get(urllist.Items.listurl).then(function (res) {
          console.log(res);
          for (let i = 0; i < res.data.length; i++) {
            let value = res.data[i];
            self.rawlist.push({
              id: value.id,
              content: value.content,
              priority: value.priority,
              status: value.status,
              expire_date: value.expire_date
            });
          }
          console.log(JSON.stringify(self.rawlist));
          callback.call(self);
          self.fullscreenLoading = false;
        }).catch(function (error) {
          self.fullscreenLoading = false;
          console.log(error);
        });
      },
      handleEditFormSubmit: function () {
        let self = this;
        this.modifyFormVisible = false;
        self.fullscreenLoading = true;
        //create
        if (self.modifyForm.id === undefined) {
          self.$axios.post(urllist.Items.addurl, {
            content: self.modifyForm.content,
            priority: self.modifyForm.priority,
            status: 0,
            expire_date: self.modifyForm.expire_date
          }).then(function (response) {
            console.log(response);
            self.rawlist.push({
              id: response.data.id,
              content: response.data.content,
              status: response.data.status,
              priority: response.data.priority,
              expire_date: response.data.expire_date
            })
            self.modifyForm = {
              content: '',
              priority: 1,
              status: 0,
              expire_date: ''
            }
            self.changePageData()
            self.$message.success("添加成功");
          }).catch(function (error) {
            console.log(error);
            self.$message.warning("添加失败，请检查网络");
          });
          self.fullscreenLoading = false;
        }
        else { //edit
          self.$axios.patch(urllist.Items.editurl + self.modifyForm.id + "/", {
            content: self.modifyForm.content,
            priority: self.modifyForm.priority,
            status: self.modifyForm.status,
            expire_date: self.modifyForm.expire_date
          }).then(function (response) {
            console.log(response);
            self.rawlist.splice(self.tempIndex, 1, self.modifyForm)
            self.changePageData()
            self.modifyForm = {
              id: '',
              content: '',
              priority: 1,
              status: 0,
              expire_date: ''
            }
            self.$message.success("更新成功");
          }).catch(function (error) {
            console.log(error);
            self.$message.warning("更新失败，请检查网络");
          });
          self.fullscreenLoading = false;
        }
      },
      date_change (val) {
        this.modifyForm.expire_date = val
      },
    }
  }
</script>
