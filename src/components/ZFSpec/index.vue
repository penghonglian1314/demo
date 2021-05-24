<template>
  <div>
    <el-row>
      <el-row>
        <el-col :span="4" style="fontSize:20px;padding:10px 20px;">
          选择商品规格
        </el-col>
        <el-col :span="18">
          <el-form label-width="100px" :model="squeryForm" :inline="true">
            <el-row type="flex" align="center">
              <el-col :span="10">
                <el-form-item label="规格过滤:">
                  <el-input v-model="squeryForm.ModelsName" clearable placeholder="请输入规格名称" @clear="empty_query" @input="empty_query" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-button type="primary" size="small" @click="ifAddSpec = true">
                  增加新规格
                </el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <el-card class="box-card">
        <!-- {{ multipleSelection }} -->
        <el-checkbox-group v-if="ifReload" v-model="multipleSelection" style="display:flex;alignItems:start;flexWrap:wrap;justifyContent: spaceStart;" @change="handleSelectionChange">
          <span v-for="(item,k1) in specOptions" :key="k1" style="marginBottom:16px;marginRight:40px;display:flex;alignItems:center;">
            <el-checkbox :label="item" :checked="multipleSelection.some(i=>i.ModelsName===item.ModelsName)" border style="borderBottomRightRadius:0;borderTopRightRadius:0;">
              {{ item.ModelsName }}
            </el-checkbox>
            <el-button style="height:36px;width:36px;display:flex;alignItems:center;justifyContent:center;padding:0;borderBottomLeftRadius:0;borderTopLeftRadius:0;" icon="el-icon-search" type="primary" @click="selectSpec(item)" />
          </span>

          <el-popover
            placement="top-start"
            width="200"
            trigger="hover"
            content="如果需要更多数据，请通过搜索框限定规格名称。"
          >
            <el-button v-if="squeryForm.total>50" slot="reference" size="mini" style="marginTop:1px;marginLeft:40px;height:36px;fontSize:14px">
              更多
            </el-button>
          </el-popover>
        </el-checkbox-group>
      </el-card>
      <!-- <el-table
        ref="multipleTable"
        border
        :data="specOptions"
        style="width: 100%"
        max-height="300"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="65"
          align="center"
        />
        <el-table-column prop="ModelsName" label="规格名称" align="center" />

        <el-table-column align="center" width="400" label="操作">
          <template slot-scope="scope">
            <el-button style="color:rgb(233,195,65);fontSize:14px;" size="mini" type="text" @click="selectSpec(scope.row)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table> -->
      <!-- <div class="page">
        <el-pagination
          :page-sizes="[10, 20, 30, 50]"
          :page-size="squeryForm.limit"
          :total="squeryForm.total"
          :current-page="squeryForm.current"
          layout="total, sizes, prev, pager, next, jumper"
          prev-text="上一页"
          next-text="下一页"
          @size-change="shandleSizeChange"
          @current-change="shandleCurrentChange"
        />
      </div>
      </el-cardclass="box-card">-->
    </el-row>
    <el-divider />
    <el-row style="fontSize:20px;padding:10px 20px;height:60px;alignItems:center;" type="flex">
      <el-col :span="2">
        已选规格:
      </el-col>
      <el-col :span="22">
        <el-tag
          v-for="tag in multipleSelection"
          :key="tag.title"
          style="fontSize:14px;marginLeft:16px;"
          closable
          @close="closeTag(tag)"
        >
          {{ tag.ModelsName }}
        </el-tag>
      </el-col>
    </el-row>
    <el-divider />
    <el-row style="fontSize:20px;padding:10px 20px;height:60px;alignItems:center;" type="flex">
      <el-col :span="20">
        规格价格表：
      </el-col>
      <el-col :span="4">
        <el-button :disabled="multipleSelection.length===0" type="primary" @click="ifAddSpecPrice = true">
          新增规格价格
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        border
        :data="specPriceList"
        style="width: 100%"
        max-height="420"
      >
        <el-table-column prop="Models" label="规格" width="420" align="center" />
        <el-table-column prop="Price" label="价格" width="200" align="center" />
        <el-table-column prop="StockNum" label="库存数" width="200" align="center" />
        <el-table-column prop="PictureUrl" align="center" label="展示图片" width="140">
          <template slot-scope="scope">
            <img :src="scope.row.PictureUrl" style="width:80%" alt>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button style="color:rgb(233,195,65);fontSize:14px;" size="mini" type="text" @click="ifUpdateGoodsModelsPrice(scope.row)">
              修改
            </el-button>
            <el-button style="color:rgb(65,195,233);fontSize:14px;" size="mini" type="text" @click="deleteGoodsModelsPrice(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-dialog title="规格详情" width="80%" :visible.sync="ifSpecDetail">
      <el-divider />
      <el-row v-for="(item,k1) in showAttr" :key="k1" style="marginBottom:20px;">
        <el-col style="width:100px;fontSize:18px;lineHeight:36px;" :span="3">
          {{ item.title+':' }}
        </el-col>
        <el-col :span="21">
          <el-radio-group v-model="showAttr[item.title]">
            <el-radio v-for="(type,k2) in item.types" :key="k2" :label="type.type" border :disabled="ifDisableds(item,type)">
              {{ type.type }}
            </el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog v-if="ifAddSpecPrice" title="新增规格价格" width="80%" :visible.sync="ifAddSpecPrice">
      <add :which-attr="whichAttr" @addGoodsModelsPrice="addGoodsModelsPrice" @close="close" />
    </el-dialog>

    <el-dialog v-if="ifUpdateSpecPrice" title="修改规格价格" width="80%" :visible.sync="ifUpdateSpecPrice">
      <update :update-props="updateProps" @updateGoodsModelsPrice="updateGoodsModelsPrice" @close="close" />
    </el-dialog>

    <!-- <el-dialog v-if="update" :visible.sync="update" title="修改" width="50%">
      <update :parsemsg="parsemsg" @func="close" />
    </el-dialog> -->
    <el-dialog v-if="ifAddSpec" :visible.sync="ifAddSpec" title="添加规格" width="50%" :close-on-click-modal="false">
      <addSpec @close="closes" />
    </el-dialog>
  </div>
</template>

<script>
import {
  queryGoodsModels,
  queryGoodsModelsPrice,
  addGoodsModelsPrice,
  deleteGoodsModelsPrice,
  updateGoodsModelsPrice
} from '@/api/spec'
import {
  updateTabGoods
} from '@/api/goods'
import up from '@/mixins/ImgUpload-new'
import add from './child/add'
import update from './child/update'
import addSpec from './child/addSpec'
export default {
  name: 'Zfspec',
  components: {
    add: add,
    update: update, addSpec
  },
  mixins: [up],
  props: ['gid', 'selectTag'],

  data() {
    return {
      squeryForm: {
        limit: 50,
        current: 1,
        total: 0
      },
      pqueryForm: {
        GoodsID: null,
        limit: 100,
        current: 1,
        total: 0
      },
      specOptions: [],
      whichSpec: {},
      whichAttr: [],
      specPriceList: [],
      ifAddSpecPrice: false,
      // addForm: {},
      // ahideUpload: false,
      // afileList: [],
      // dialogVisible: false,
      // dialogImageUrl: '',
      ifUpdateSpecPrice: false,
      // updateForm: {},
      // uhideUpload: true,
      // ufileList: [],
      multipleSelection: [],
      ifSpecDetail: false,
      showAttr: [],
      updateProps: {},
      ifAddSpec: false,
      ifReload: true

    }
  },
  async created() {
    this.pqueryForm.GoodsID = this.gid
    await this.queryGoodsModels()

    const selectTagList = (this.selectTag ? this.selectTag : '').split(',')
    // console.log(this.specOptions, 'specOptions', selectTagList)
    this.multipleSelection = (this.specOptions.filter(e => selectTagList.includes(e.ModelsName)))
    this.whichAttr = []

    this.multipleSelection.map(row => {
      this.whichAttr.push(...this.spec2arr(row))
    })
    this.close()

    // this.queryGoodsModels()
    // this.queryGoodsModelsPrice()
  },
  methods: {
    // 分页器功能
    shandleCurrentChange(current) {
      this.squeryForm.current = current
      this.queryGoodsModels()
    },
    shandleSizeChange(val) {
      this.squeryForm.limit = val
      this.queryGoodsModels()
    },
    // 搜索框功能
    empty_query() {
      this.queryGoodsModels()
    },
    // 查询规格
    async queryGoodsModels() {
      const res = await queryGoodsModels(this.squeryForm)
      this.squeryForm.total = JSON.parse(res.data.data).TotalSize * 1
      this.specOptions = JSON.parse(res.data.data).Records ? JSON.parse(res.data.data).Records : []
      this.ifReload = true
    },
    // 查询规格价格
    async queryGoodsModelsPrice() {
      const res = await queryGoodsModelsPrice(this.pqueryForm)
      // this.pqueryForm.total = JSON.parse(res.data.data).TotalSize * 1
      this.specPriceList = JSON.parse(res.data.data).Records ? JSON.parse(res.data.data).Records : []
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
      this.whichAttr = []
      const OptionModels = []
      const OptionModelsName = []
      this.multipleSelection.map(row => {
        OptionModels.push(...JSON.parse(row['Models'].replace(/\\/g, ''))['Models'])
        OptionModelsName.push(row.ModelsName)
        this.whichAttr.push(...this.spec2arr(row))
      })
      console.log(this.whichAttr)
      const params = {
        GoodsID: this.gid,
        OptionModels: {
          Models: OptionModels
        },
        OptionModelsName: OptionModelsName.join(',')

      }
      console.log(params)
      updateTabGoods(params).then((res) => {
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
      })
    },
    closeTag(item) {
      // console.log(item, this.multipleSelection)
      this.handleSelectionChange(this.multipleSelection.filter(e => e !== item))
      // this.$refs.multipleTable.toggleRowSelection(item)
    },
    selectSpec(row) {
      this.showAttr = this.spec2arr(row)
      console.log(this.showAttr)
      this.ifSpecDetail = true
    },
    // 解析规格字符串
    spec2arr(spec) {
      console.log(spec)
      return JSON.parse(spec['Models'].replace(/\\/g, ''))['Models'].map(e => {
        const temp = {}
        temp.title = e.Title
        if (e.RelyOn) {
          temp.relyOn = e.RelyOn
          temp.types = []
          e.Values.split(';').map((t, k) => {
            t.split(',').map(w => {
              // const r = {}
              const ifE = temp.types.find(y => y.type === w)
              if (ifE) { ifE.relyOnIndex.push(k) } else {
                temp.types.push({
                  relyOnIndex: [k],
                  type: w
                })
              }
            }
            )
            return null
          })
        } else {
          temp.relyOn = null
          temp.types = e.Values.split(',').map(q => ({ type: q }))
        }
        console.log(temp)
        return temp
      })
    },

    close() {
      this.ifAddSpecPrice = false
      this.ifUpdateSpecPrice = false
      this.ifSpecDetail = false
      this.ifAddSpec = false
      // this.queryGoodsModels()
      this.queryGoodsModelsPrice()
      // this.afileList = []
      // this.ufileList = []
      // this.$refs.upload.clearFiles()
      // this.addForm = {}
    },
    closes() {
      // this.ifAddSpecPrice = false
      // this.ifUpdateSpecPrice = false
      // this.ifSpecDetail = false
      this.ifAddSpec = false
      this.ifReload = false
      this.queryGoodsModels()
      // this.$router.go(0)
    },
    addGoodsModelsPrice(addForm) {
      // this.ifAddSpecPrice = false
      // console.log(this.addForm, this.whichAttr)
      const Models = this.whichAttr.map(attr => addForm[attr.title]).join(',')
      console.log(Models)
      addGoodsModelsPrice({
        GoodsID: this.gid,
        Models,
        ...addForm
      }).then(res => {
        if (res.data.success) {
          this.$message({ message: '添加成功', type: 'success' })
          // this.$refs.upload.clearFiles()
          this.close()
        } else {
          this.$message({ message: '添加失败', type: 'error' })
          // this.$refs.upload.clearFiles()
          this.close()
        }
      })
    },
    ifUpdateGoodsModelsPrice(row) {
      console.log(row)
      // this.updateForm = { ...row }

      // this.ufileList = []
      // this.ufileList.push({ url: this.updateForm.PictureUrl })
      this.updateProps = { ...row }
      this.ifUpdateSpecPrice = true
    },
    updateGoodsModelsPrice(updateForm) {
      updateGoodsModelsPrice({
        ...updateForm
      }).then(res => {
        if (res.data.success) {
          this.$message({ message: '修改成功', type: 'success' })
          this.close()
        } else {
          this.$message({ message: '修改失败', type: 'error' })
          this.close()
        }
      })
    },
    deleteGoodsModelsPrice(row) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGoodsModelsPrice(row).then((response) => {
          if (response.data.success === true) {
            this.$message({ type: 'success', message: '删除该规格价格成功!' })
            this.queryGoodsModelsPrice()
            this.deleteImg(row.PictureUrl)
          } else {
            this.$message({ type: 'error', message: '删除该规格价格失败!' })
          }
        })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    },
    ifDisableds(item, type) {
      // console.log(item,type)
      if (type.relyOnIndex) {
        // console.log(this.whichAttr.find(q => q.title === item.relyOn).types.findIndex(w => w.type === this.addForm[item.relyOn]))
        return !type.relyOnIndex.includes(this.showAttr.find(q => q.title === item.relyOn).types.findIndex(w => w.type === this.showAttr[item.relyOn]))
      } else {
        return false
      }
    },
    ifDisabled(item, type) {
      // console.log(item,type)
      if (type.relyOnIndex) {
        // console.log(this.whichAttr.find(q => q.title === item.relyOn).types.findIndex(w => w.type === this.addForm[item.relyOn]))
        return !type.relyOnIndex.includes(this.whichAttr.find(q => q.title === item.relyOn).types.findIndex(w => w.type === this.addForm[item.relyOn]))
      } else {
        return false
      }
    }
    // ========================
    // 以下为图片上传相关
    // ========================
    // async beforeUpload(file) {
    //   await this.getToken()
    //   const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
    //   if (!isJPG) {
    //     this.$message.error('上传图片只能是 JPG 和 PNG 格式!')
    //   }
    //   return isJPG
    // },
    // handlePreview(file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },

    // ahandleRemove(file, fileList) {
    //   this.deleteImg(file.url)
    //   this.ahideUpload = fileList.length >= 1
    //   // this.uhideUpload = fileList.length >= 1
    // },

    // uhandlePreview(file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },

    // uhandleRemove(file, fileList) {
    //   this.deleteImg(file.url)
    //   // this.ahideUpload = fileList.length >= 1
    //   this.uhideUpload = fileList.length >= 1
    // },

    // OnSuccessA(response, file, fileList) {
    //   this.addForm.PictureUrl = this.getImgUrl(response)
    //   this.ahideUpload = fileList.length >= 1
    // },
    // OnSuccessU(response, file, fileList) {
    //   this.updateForm.PictureUrl = this.getImgUrl(response)
    //   this.uhideUpload = fileList.length >= 1
    // },

    // OnError() {
    //   this.$message({
    //     type: 'error',
    //     message: '上传图片失败！'
    //   })
    // },
    // OnExceed() {
    //   this.$message({
    //     type: 'info',
    //     message: '只能上传一张图片'
    //   })
    // }
    // ========================
    // 以上为图片上传相关
    // ========================
  }
}
</script>

<style>

</style>
