<template>
  <el-container>
    <el-main>
      <!-- 首行 -->
      <el-button
        icon="el-icon-plus"
        type="primary"
        @click="add = true"
      >添加</el-button>
      <el-button type="primary" @click="ShowAdmin">banner类型管理</el-button>
      <!-- 表格 -->
      <el-table
        v-loading="listLoading"
        :data="bannerList"
        border
        stripe
        highlight-current-row
        style="width:100%;margin:20px 0 20px 0"
      >

        <el-table-column label="名称" prop="BannerName" align="center" />

        <el-table-column
          label="图片"
          prop="FileUrl"
          class="imageTable"
          align="center"
        >
          <template slot-scope="scope">
            <img
              :src="scope.row.FileUrl"
              style="cursor: pointer;"
              class="img"
            >

          </template>
        </el-table-column>
        <zfselect :v-if="false" :emitflag="true" :img-link="propUrl" @emitUrl2str="emitUrl2str" @setImgLink="setPropUrl" />
        <!-- <el-table-column label="跳转链接" prop="LinkUrl" align="center" /> -->
        <el-table-column label="跳转链接" prop="LinkUrl" align="center">
          <template slot-scope="scope">
            <span>
              <!-- {{ scope.row.LinkUrl }} -->
              {{ url2str(scope.row.LinkUrl) }}
            </span>
          </template>
        </el-table-column>
        <!--  -->
        <el-table-column label="备注" prop="Remarks" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.Remarks }} </span>
          </template>
        </el-table-column>
        <!-- 编辑 -->
        <el-table-column align="center" width="40%">
          <template slot-scope="scope">
            <el-row>
              <i
                class="el-icon-edit"
                style="cursor:pointer;color:blue"
                @click="updateRole(scope.row)"
              />
            </el-row>
          </template>
        </el-table-column>
        <!-- 删除 -->
        <el-table-column align="center" width="40%">
          <template slot-scope="scope">
            <el-row>
              <i
                class="el-icon-delete"
                style="cursor:pointer;color:red"
                @click="Delete(scope.row)"
              />
            </el-row>
          </template>
        </el-table-column>

        <el-dialog
          v-if="update"
          :visible.sync="update"
          title="修改"
          append-to-body
          width="50%"
        >
          <update :parentmsg="updatemsg" @func="getService" />
        </el-dialog>
        <el-dialog
          v-if="add"
          :visible.sync="add"
          title="添加"
          append-to-body
          width="50%"
        >
          <add @func="getService" />
        </el-dialog>

        <el-dialog
          v-if="showadmin"
          :visible.sync="showadmin"
          title=""
          append-to-body
          width="70%"
        >
          <typeadmin @func="getService" />
        </el-dialog>
      </el-table>

      <!-- 换页器 -->

      <div class="pagination-container">

        <el-pagination
          :current-page="queryParams.current"
          :page-sizes="[5,10, 20, 30]"
          :page-size="queryParams.limit"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          prev-text="上一页"
          next-text="下一页"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />

      </div>

    </el-main>
  </el-container>
</template>

<script>
import { queryBanner, deleteBanner } from '@/api/banner'
// import { deleteFile } from '@/api/file'
import imgupload from '@/mixins/ImgUpload-new'
import zfselect from '@/components/ZFSelect'

import add from './children/addBanner'
import update from './children/updateBanner'
import typeadmin from './children/typeadmin'

export default {
  components: {
    update,
    add,
    typeadmin,
    zfselect
  },
  mixins: [imgupload],
  data() {
    return {
      updatemsg: {},
      listLoading: false,
      update: false,
      add: false,
      queryParams: {
        current: 1,
        limit: 5
        //
      }, total: 0,
      updateService: false,
      publicPack: false,
      tableList: [],
      showadmin: false,
      FaUrl2str: () => null,
      propUrl: ''
    }
  },
  computed: {
    bannerList() {
      return this.tableList.map(e => {
        e.BannerName = e.BannerName === '' ? '未定义的' : e.BannerName
        return e
      })
    }
  },
  created() {
    console.log('0')
    this.query()
    console.log('1')
  },
  methods: {
    ShowAdmin() {
      this.showadmin = true
      console.log(this.showadmin)
    },
    sortByDate(obj1, obj2) {
      const val1 = obj1.SequenceID
      const val2 = obj2.SequenceID
      return val2 - val1
    },
    Delete(row) {
      this.$confirm('此操作将永久删除该服务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const _params = {}
          // console.log(row);
          _params.BannerId = row.BannerId
          // _params.BannerName = row.BannerName
          // console.log(row,_params);
          deleteBanner(_params).then(response => {
            if (response.data.success === true) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              // const _param = {}
              // _param.fileUrl = row.FileUrl
              console.log(row, 'row before del')
              this.deleteImg(row.FileUrl)
              // .then(res => {
              //   if (res.data.success === true) {
              //     console.log('删除服务器文件')
              //   }
              // })
              this.query()
            } else {
              this.$message({
                type: 'info',
                message: '删除失败!'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    updateRole(row) {
      this.update = true
      this.updatemsg = row
    },

    query() {
      console.log('????????', this.queryParams)
      this.listLoading = true

      queryBanner(this.queryParams)
        .then(res => {
          console.log(res, 'res')
          this.tableList = JSON.parse(res.data.data).Records || []

          console.log('zf', this.tableList)
          this.total = parseInt(
            JSON.parse(res.data.data).TotalSize
          )
          // console.log('zf',this.queryParams)
          this.listLoading = false
        })
        .catch(error => {
          console.log(error)
          this.listLoading = false
          this.tableList = []
        })
    },

    getService() {
      this.add = false
      this.update = false
      this.showadmin = false
      this.query()
    },
    handleCurrentChange(current) {
      this.queryParams.current = current
      this.query()
    },
    handleSizeChange(size) {
      this.queryParams.limit = size
      this.query()
    },
    emitUrl2str(fn) {
      this.FaUrl2str = fn
    },
    url2str(url) {
      this.propUrl = url
      // console.log(this.FaUrl2str)
      // console.log(url, this.FaUrl2str(url))
      return this.FaUrl2str(url)
    },
    setPropUrl(val) {
      this.propUrl = val
    }
  }
}
</script>
<style  lang="scss"  scoped>
@import "../../styles/container.scss";

.img {
  width: 90px;
  height: 50px;
}

.middle {
  padding: 8px;
}
</style>
