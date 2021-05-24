<template>
  <el-container>
    <el-main>
      <!-- 首行 -->
      <el-button icon="el-icon-plus" type="primary" @click="addType">新增</el-button>
      <!-- 表格 -->
      <el-table
        v-loading="listLoading"
        :data="typeList"
        border
        stripe
        highlight-current-row
        style="width:100%;margin:20px 0 20px 0"
      >

        <el-table-column label="Type" prop="BannerType" align="center" />

        <el-table-column label="名称" prop="BannerName" align="center" />

        <el-table-column label="备注" prop="Remarks" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.Remarks }} </span>
          </template>
        </el-table-column>
        <!-- 编辑 -->
        <el-table-column align="center" width="40%">
          <template slot-scope="scope">
            <el-row>
              <i class="el-icon-edit" style="cursor:pointer;color:blue" @click="updateType(scope.row)" />
            </el-row>
          </template>
        </el-table-column>
        <!-- 删除 -->
        <el-table-column align="center" width="40%">
          <template slot-scope="scope">
            <el-row>
              <i class="el-icon-delete" style="cursor:pointer;color:red" @click="deleteType(scope.row)" />
            </el-row>
          </template>
        </el-table-column>
        <!-- 换页器 -->
        <!-- <el-row>
          <div class="pagination-container">
            <el-col :span="12">
              <el-pagination
                :current-page="queryParams.current"
                :page-sizes="[10,20,30,50]"
                :page-size="queryParams.limit"
                :total="queryParams.total"
                layout="total, sizes, prev, pager, next, jumper"
                prev-text="上一页"
                next-text="下一页"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-col>
          </div>
        </el-row> -->
      </el-table>

      <!-- <el-button icon="el-icon-plus" type="primary" @click="">提交</el-button> -->

      <el-row v-if="isUpdate" title="修改" append-to-body width="50%">
        <el-form ref="updatef" :rules="rules" :model="updateTypeForm" label-width="100px">
          <el-form-item label="类型" prop="BannerType">
            <el-input v-model="updateTypeForm.BannerType" :disabled="true" />
          </el-form-item>

          <el-form-item label="名称" prop="BannerName">
            <el-input v-model="updateTypeForm.BannerName" />
          </el-form-item>

          <el-form-item label="备注" prop="Remarks">
            <el-input v-model="updateTypeForm.Remarks" />
          </el-form-item>

          <el-col :span="1" :offset="2">
            <el-button type="primary" @click="updateSubmit">提交</el-button>
          </el-col>
        </el-form>
      </el-row>

      <el-row v-if="isAdd" title="添加" append-to-body width="50%">
        <el-form ref="addf" :rules="rules" :model="addTypeForm" label-width="100px">
          <el-form-item label="类型" prop="BannerType">
            <el-input v-model="addTypeForm.BannerType" />
          </el-form-item>
          <el-form-item label="名称" prop="BannerName">
            <el-input v-model="addTypeForm.BannerName" />
          </el-form-item>
          <el-form-item label="备注" prop="Remarks">
            <el-input v-model="addTypeForm.Remarks" />
          </el-form-item>
          <el-col :span="1" :offset="2">
            <el-button type="primary" @click="addSubmit">提交</el-button>
          </el-col>
        </el-form>
      </el-row>

    </el-main>
  </el-container>
</template>

<script>
import { queryBannerType, deleteBannerType, updateBannerType, addBannerType } from '@/api/banner'
export default {
  data() {
    return {
      addTypeForm: {
        BannerType: '',
        BannerName: '',
        Remarks: ''
      },
      updateTypeForm: {
        BannerType: '',
        BannerName: '',
        Remarks: ''
      },
      isAdd: false,
      isUpdate: false,
      listLoading: false,
      typeList: [],
      rules: {
        BannerType: [{ required: true, message: '请选择类型' },
          { type: 'string', min: 1, max: 5, message: '范围在 1 到 5 的数字', trigger: 'blur' }
        ],
        BannerName: [{ required: true, message: '请输入名称' }]
        // Remarks: [{ required: true, message: '请输入简介' }]
      }
    }
  },

  created() {
    // console.log('type admin create')
    this.listLoading = true
    this.updateTypeList().then((res) => {
      // console.log(res)
      this.listLoading = false
    })
    // queryBannerType().then(res => {
    //   if (res.data.success) {
    //     // console.log(JSON.parse(res.data.data))
    //     this.typeList = JSON.parse(res.data.data).Records
    //   }
    //   // // console.log(this.typeList);

    // })
  },
  methods: {
  // 本页完成
    deleteType(row) {
      this.$confirm('此操作将永久删除该banner, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const _params = {}
        // console.log(row)
        _params.BannerType = row.BannerType
        // _params.BannerName = row.BannerName
        // console.log(row, _params)
        deleteBannerType(_params).then((response) => {
          if (response.data.success === true) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'info',
              message: '删除失败!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }).then(() => {
        this.updateTypeList()
        this.close()
      })
    },

    addType() {
    // 调用新增组件
      this.isUpdate = false
      this.isAdd = true
    },

    updateType(row) {
    // 更新组件数据
      this.updateTypeForm.BannerType = row.BannerType
      this.updateTypeForm.BannerName = row.BannerName
      this.updateTypeForm.Remarks = row.Remarks
      // 调用更新组件
      this.isAdd = false
      this.isUpdate = true
    },
    // 组件功能

    addSubmit() {
      this.$refs['addf'].validate(valid => {
        // console.log('验证', valid)
        if (valid) {
          addBannerType(this.addTypeForm).then(response => {
            if (response.data.success === true) {
              this.$message({
                message: '添加成功！',
                type: 'success'
              })
              this.close()
            } else {
              this.$message({
                message: '添加失败！',
                type: 'error'
              })
            }
          }).then(() => {
            this.updateTypeList()
            this.close()
          })
        }
      })
    },
    updateSubmit() {
      updateBannerType(this.updateTypeForm).then((res) => {
        if (res.data.success) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '修改失败'
          })
        }
      }).then(() => {
        this.updateTypeList()
        this.close()
      })
    },
    updateTypeList() {
      return queryBannerType().then(res => {
        if (res.data.success) {
          // console.log(JSON.parse(res.data.data))
          this.typeList = JSON.parse(res.data.data).Records
        }
        // // console.log(this.typeList);
        // this.listLoading = false;
      })
    },
    close() {
      // console.log('关闭')
      this.$emit('func', 'close')
    }
  }
}
</script>
