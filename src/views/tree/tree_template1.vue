<template>
  <el-container>
    <!--  -->
    <el-main style="width:40%">
      <tree
        v-if="listInfo.length"

        highlight-current="false"
        :title="Const_TreeName"
        :list="listInfo"
        @updateInfo="updateInfo"
        @deleteInfo="deleteInfo"
        @insertInfo="insertInfo"
        @treeItemClick="treeItemClick"
      />
    </el-main>

    <el-main style="width:60%">
      <el-table :data="FtableList" style="width: 100%">
        <el-table-column label="当前节点" align="center">
          <el-table-column prop="ItemCode" label="当前节点编号" align="center" />
          <el-table-column prop="ItemType" :label="Const_ItemType" align="center" />
          <el-table-column prop="Title" :label="Const_Title" align="center" />
          <el-table-column prop="IconID" :label="TableTcon" width="80%">
            <template slot-scope="scope">
              <span v-if="scope.row.IconID === ''" />
              <img
                v-else
                :src="imgUrl + scope.row.IconID"
                width="50%"
                style="cursor: pointer;"
                @click="updateImg(scope.row.IconID)"
              >
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <span style="display:inline-block;margin:30px 0" />
      <el-table :data="tableList" style="width: 100%">
        <el-table-column label="子级" align="center">
          <!-- <el-table-column prop="ItemCode" label="编号" align="center"/> -->
          <el-table-column prop="ItemCode" label="子级编号" align="center" />
          <el-table-column prop="ItemType" :label="Const_ItemType" align="center" />
          <el-table-column prop="Title" :label="Const_Title" align="center" />
          <el-table-column prop="IconID" :label="TableTcon" width="80%">
            <template slot-scope="scope">
              <span v-if="scope.row.IconID === ''" />
              <img
                v-else
                :src="imgUrl + scope.row.IconID"
                width="50%"
                style="cursor: pointer;"
                @click="updateImg(scope.row.IconID)"
              >
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-main>

    <el-dialog
      v-if="insertNode"
      :visible.sync="insertNode"
      title="增加节点"
      width="50%"
      center
      @close="queryTree"
    >
      <!-- 1231 -->
      <el-form ref="insertForm" :model="insertForm" :rules="rules" label-width="120px">
        <el-form-item prop="IconID" label="图标：">
          <el-upload
            ref="upload"
            :class="{hide:hideUpload}"
            :file-list="fileList"
            :auto-upload="false"
            :limit="1"
            :before-upload="beforeUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :on-error="OnError"
            :on-change="handleChange"
            :with-credentials="true"
            :action="uploadUrl()"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
            <img :src="dialogImageUrl" width="100%" alt>
          </el-dialog>
        </el-form-item>

        <!-- <el-form-item label="编号："> -->
        <el-row :gutter="25">
          <el-col :span="13">
            <el-form-item label="编号：" prop="ItemCode">
              <el-input v-model="insertForm.ItemCode" style="width:250px" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <div class="middle">{{ insertMsg.ItemCode+ '_' +insertForm.ItemCode }}</div>
          </el-col>
        </el-row>
        <el-form-item :label="Const_ItemType+'：'">
          <el-input v-model="insertForm.ItemType" style="width:250px" />
        </el-form-item>
        <el-form-item :label="Const_Title+'：'">
          <el-input v-model="insertForm.Title" style="width:250px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">增加</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      v-if="updateNode"
      :visible.sync="updateNode"
      title="修改节点"
      width="50%"
      center
      @close="queryTree"
    >
      <el-form ref="updateMsg" :model="updateForm" label-width="120px">
        <!-- <el-form-item label="类型：">
          <el-input v-model="updateForm.ItemType" style="width:250px" disabled/>
        </el-form-item>-->
        <el-form-item prop="IconID" label="图标：">
          <!-- <span v-if="updateForm.IconID" /> -->
          <el-upload
            ref="upload"
            :class="{hide:hideUpload}"
            :file-list="fileList"
            :auto-upload="false"
            :limit="1"
            :before-upload="beforeUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemoves"
            :on-success="handleUpdateSuccess"
            :on-error="OnError"
            :on-change="handleChange"
            :with-credentials="true"
            :action="uploadUrl()"
            list-type="picture-card"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" append-to-body size="tiny">
            <img :src="dialogImageUrl" width="100%" alt>
          </el-dialog>
        </el-form-item>

        <el-form-item label="编号：">
          <el-input v-model="updateForm.ItemCode" style="width:250px" disabled />
        </el-form-item>
        <el-form-item label="名称：">
          <el-input v-model="updateForm.Title" style="width:250px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitUpdate">修改</el-button>
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import {
  queryTree,
  insertTreeData,
  updateTreeData,
  deleteTreeData,
  queryTreeInfo,
  deleteFile
} from '@/api/tree'
import tree from '../tree/tree'
export default {
  components: {
    tree
  },
  data() {
    return {
      options: [],
      value: '',
      FtableList: [],
      listInfo: [],
      rules: { ItemCode: [{ required: true, message: '功能编号不能为空', trigger: 'blur' }] },
      tableList: [],
      insertNode: false,
      updateNode: false,
      insertForm: {
        ItemCode: '',
        TreeType: this.Const_TreeType,
        ItemType: '',
        Title: '',
        IconID: '',
        GroupID: this.Const_GroupID
      },
      updateForm: {
        ItemCode: '',
        Title: '',
        IconID: ''
      },
      insertMsg: {},
      updateMsg: {},
      clickMsg: {},
      filenames: '',

      fileList: [],
      dialogImageUrl: '',
      hideUpload: false,
      dialogVisible: false,
      imgUrl: BASE_API.SERVER_IP + '/colcms/file.action?fileUrl=',
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '120px',
      TableTcon: '图标',
      InsertCode: '33_2',
      // 配置参数区域  ================================================================
      Const_TreeName: '品牌分类', // 配置树的名称
      Const_ItemType: '类型', // 配置树的每一项的标题
      Const_Title: '名称', // 配置树的每一项的值
      Const_ApiUri: '/colcms/queryTabTreeData.actGoupIDion', //
      Const_TreeType: 'type_brand', // 配置不同的类型值代表不同的树 //type_brand
      Const_GroupID: 0, // 通常用于sass产品，区分不同客户ID
      Const_EntCode: 35
      // 配置参数区域  ================================================================

    }
  },
  created() {
    this.insertMsg = {}
    this.updateMsg = {}
    this.clickMsg = {}
    this.queryTree()
    console.log('00000000')
    console.log(this.filename, '00000000')
  },
  methods: {
    upitemType() {
      console.log(11111)
      this.dialogFormVisible = true
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    beforeUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 2048 / 2048 < 4
      if (!isJPG) this.$message.error('上传图片只能是 JPG 格式!')
      if (!isLt2M) this.$message.error('上传图片大小不能超过 4MB!')
      return isJPG && isLt2M
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      console.log('移除')
      console.log(file, fileList)
      this.fileList[0].url = '' // 删除默认图标则清空
      this.hideUpload = fileList.length >= 1
    },
    handleRemoves(file, fileList) {
    //   const params = {}
    //   params.fileUrl = this.updateForm.IconID

      // deleteFile(params).then(response => {
      //   if (response.data.success) {
      //     console.log('删除服务器文件')
      //     this.submitUpload()
      //   }
      // })
      // this.updateForm.IconID = ''
      // this.dialogImageUrl = ''
      // this.dialogVisible = false
      // console.log('移除')
      // console.log(file, fileList)
      this.fileList[0].url = '' // 删除默认图标则清空
      this.hideUpload = fileList.length >= 1
    },
    handleSuccess(res, file, fileList) {
      console.log('0----')
      this.insertForm.IconID = res.data
      this.hideUpload = fileList.length >= 1
      this.insertSubmit()
    },
    handleUpdateSuccess(res, file, fileList) {
      console.log('update')

      const params = {}
      params.fileUrl = this.updateForm.NewIconID
      deleteFile(params).then(response => {
        if (response.data.success) {
          console.log('删除服务器文件')
        }
      })
      this.updateForm.IconID = res.data
      this.updateSubmit()
    },
    OnError() {
      this.$message({ type: 'error', message: '上传图片失败！' })
    },
    handleChange(file, fileList) {
      console.log('change file')
      console.log(file)
      this.filenames = file.name
      this.hideUpload = fileList.length >= 1
    },

    submit() {
      this.$refs['insertForm'].validate(valid => {
        console.log(valid, this.insertForm.IconID, this.filenames === '')
        if (valid) {
          if (this.filenames === '') {
            console.log('00000000002')
            this.insertSubmit()
          } else {
            console.log('0000000000')
            this.submitUpload()
          }
        }
      })
    },
    submitUpdate() {
      this.$refs['updateMsg'].validate(valid => {
        console.log(valid, this.updateMsg.IconID, this.filenames === '')
        if (valid) {
          // this.updateSubmit()
          // 直接提交

          // this.updateSubmit()
          if (this.fileList[0].url === '') {
            this.submitUpload()
          } else {
            this.updateSubmit()
          }

          // 修改图片并提交
        }
      })
    },
    uploadUrl() {
      console.log(BASE_API.SERVER_IP + '/colcms/uploadFile.action')
      return BASE_API.SERVER_IP + '/colcms/uploadFile.action'
    },

    queryTree() {
      this.listInfo = []
      const params = {}
      params.TreeType = this.Const_TreeType
      params.GroupID = this.Const_GroupID
      console.log(params, '99999999999999999')
      queryTree(params).then(response => {
        console.log(response, 'kkgkgkgkgkgkgkgk')
        if (response.data.success) {
          console.log(this.listInfo)
          this.listInfo.push(JSON.parse(response.data.data))
        }
      })
    },
    insertInfo(item) {
      console.log(item)
      console.log('insert')
      var code = item.ItemCode === undefined ? '33_2' : item.ItemCode
      this.InsertCode = code
      this.insertMsg = item
      this.insertNode = true
      this.hideUpload = false
      this.fileList = []
    },
    updateInfo(item) {
      console.log(item, '000000')
      this.updateMsg = item
      console.log(this.updateMsg.ItemCode)
      this.updateForm.Title = item.Title
      this.updateNode = true
      this.hideUpload = true
      this.updateForm.IconID = item.IconID
      this.updateForm.NewIconID = item.IconID
      this.updateForm.ItemCode = item.ItemCode
      console.log(this.updateForm.IconID)
      this.fileList = [{ name: '', url: '' }]
      this.fileList[0].url = this.imgUrl + this.updateForm.IconID
    },
    treeItemClick(item) {
      console.log(item.ItemCode)
      console.log('点击')
      this.clickMsg = item
      this.queryTreeInfo(item.ItemCode)
      this.queryTreeInfo_F(item.ItemCode)
    },
    queryTreeInfo(SuperiorItemCode) {
      const params = {}
      console.log(SuperiorItemCode)
      params.TreeType = this.Const_TreeType
      params.GroupID = this.Const_GroupID
      params.SuperiorItemCode = SuperiorItemCode
      queryTreeInfo(params).then(response => {
        console.log(response)
        if (response.data.success) {
          this.tableList = JSON.parse(response.data.data).Records
        }
      })
    },
    queryTreeInfo_F(ItemCode) {
      const params = {}
      console.log(ItemCode)
      params.TreeType = this.Const_TreeType
      params.GroupID = this.Const_GroupID
      params.ItemCode = ItemCode
      queryTreeInfo(params).then(response => {
        console.log(response)
        if (response.data.success) {
          this.FtableList = JSON.parse(response.data.data).Records
        }
      })
    },
    insertSubmit() {
      console.log(this.Const_GroupID, 'pppppppppppppppp')
      this.insertForm.SuperiorItemCode = this.insertMsg.ItemCode
      this.insertForm.TreeType = this.Const_TreeType
      this.insertForm.GroupID = this.Const_GroupID
      this.insertForm.ItemCode = `${(this.InsertCode + '_')}${(this.insertForm.ItemCode)}` // 29_1_this.insertForm.ItemCode
      this.insertForm.Level = this.insertMsg.Level * 1 + 1 // 节点等级
      insertTreeData(this.insertForm).then(response => {
        console.log(response)
        if (response.data.success) {
          this.close()
        }
      })
    },
    // submitUpdate() {
    // if (this.fileList[0].url) {
    //   this.updateSubmit()
    // } else {
    //   this.submitUpload()
    // }
    // },
    updateSubmit() {
      this.updateForm.ItemCode = this.updateMsg.ItemCode
      updateTreeData(this.updateForm).then(response => {
        console.log(response)
        if (response.data.success) {
          this.close()
        }
      })
    },
    deleteInfo(item) {
      console.log(item)
      console.log('delete')
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {}
        params.ItemCode = item.ItemCode
        console.log(params)
        deleteTreeData(params).then(response => {
          console.log(response)
          if (response.data.success) {
            this.$message({ type: 'success', message: '删除成功' })
            this.queryTree()
          } else {
            this.$message({ type: 'error', message: '删除失败' })
          }
        })
      })
    },
    close() {
      this.insertNode = false
      this.updateNode = false
      this.insertForm = {
        TreeType: this.Const_TreeType,
        ItemType: '',
        Title: '',
        SuperiorItemCode: ''
      }
      this.updateForm = {
        ItemCode: '',
        Title: ''
      }
      this.queryTree()
    }
  }
}
</script>

<style>
.hide .el-upload--picture-card {
  display: none;
}
.middle {
padding: 8px;
}
</style>
