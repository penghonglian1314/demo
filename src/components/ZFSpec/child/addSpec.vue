
<template>
  <el-container>
    <el-main>
      <el-form ref="addForm" :rules="rules" label-width="110px" :model="addForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="规格名称:" prop="ModelsName">
              <el-input
                v-model="addForm.ModelsName"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8" style="lineHeight:36px;">
            (仅用于后台数据展示使用)
          </el-col>
        </el-row>

        <el-divider />
        <el-row v-for="(models,k1) in ModelsList" :key="k1">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item
                label="规格属性："
                :prop="'title'+'_'+k1"
                :rules="[
                  { required: true, message: '请输入规格属性', trigger: 'blur' }
                ]"
              >
                <!--  v-model="models.title" -->
                <el-input
                  v-model="addForm['title'+'_'+k1]"
                  @change="models.title = $event"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8" style="lineHeight:36px;">
              (用于前端显示使用)
            </el-col>
          </el-row>
          <!-- <el-form-item label="规格属性：" prop="title">
            <el-input
              v-model="models.title"
            />
          </el-form-item> -->
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item v-if="k1>0" label="规格依赖：" prop="relyOn">
                <el-input
                  v-model="ModelsList[0].title"
                  disabled
                />
                <!-- <el-select v-model="models.relyOn" clearable placeholder="请选择" @change="selectChange(models)">
              <el-option
                v-for="item in ModelsList.filter(e=>e.title!==models.title)"
                :key="item.title"
                :value="item.title"
              />
            </el-select> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="k1!==0" style="padding:10px;">
            当 "{{ ModelsList[0].title }}" 选择相应值时该规格属性可选值
          </el-row>
          <el-row v-for="(type,k2) in models.typesList" :key="k2">
            <!-- {{ type }} -->
            <!-- {{ 'Values'+'_'+k1+'_'+k2 }}<br>
            {{ addForm ['Values'+'_'+k1+'_'+k2] }} -->
            <el-form-item
              :label="type.relyIndex?type.relyIndex+'：':'规格可选值：'"
              :prop="'Values'+'_'+k1+'_'+k2"
              :rules="[
                { required: true, validator:(rule,val,cb)=>cb(),message: '请输入可选值', trigger: 'blur' }
              ]"
            >
              <el-tag
                v-for="tag in type.dynamicTags"
                :key="tag"
                closable
                :disable-transitions="false"
                @close="handleClose(tag,type,models,{k1,k2})"
              >
                {{ tag }}
              </el-tag>
              <el-input
                v-if="type.inputVisible"
                ref="saveTagInput"
                v-model="type.inputValue"

                class="input-new-tag"
                size="small"
                @keyup.enter.native="handleInputConfirm(type,models,{k1,k2})"
                @blur="handleInputConfirm(type,models,{k1,k2})"
              />
              <el-button v-else class="button-new-tag" style="backgroundColor:white;color:black;fontSize:14px;" size="small" @click="showInput(type)">
                + New Tag
              </el-button>
            </el-form-item>
          </el-row>
          <el-button v-if="k1===0" class="button-new-son" style="marginLeft:110px;" size="medium" type="info" @click="addModels2List">
            增加下级属性
          </el-button>
          <el-button v-if="k1!==0" class="button-new-son" style="marginLeft:110px;" size="medium" type="info" @click="delModels2List(k1)">
            删除该下级属性
          </el-button>
          <el-divider />
        </el-row>
      </el-form>
      <!-- <el-row>
        <el-button class="button-new-tag" size="medium" type="info" @click="addModels2List">
          增加规格属性
        </el-button>
      </el-row>
      <el-divider /> -->
      <el-row class="dialog-footer" style="marginLeft:110px;">
        <el-button @click="close">
          取 消
        </el-button>
        <el-button type="primary" @click="addGoodsModels">
          确 定
        </el-button>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { addGoodsModels } from '@/api/spec'
export default {
  data() {
    return {
      addForm: {

      },
      ModelsList: [
        {
          typesList: [{
            dynamicTags: [],
            inputVisible: false,
            inputValue: ''
          }]

        }
      ],
      rules: {
        ModelsName: [
          { required: true, message: '请输入规格名称', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
        // title: [
        //   //
        //   { required: true, validator: validateTit, message: '请输入规格属性', trigger: 'blur' }
        // ],
        // relyOn: [
        //   { required: true, message: '请输入规格可选值', trigger: 'change' }
        // ],
        // Values: [
        //   //
        //   { required: true, validator: validateVal, message: '请输入规格可选值', trigger: 'blur' }
        // ]
        // date2: [
        //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        // ],
      }

    }
  },
  computed: {
    rootTitle() {
      return this.ModelsList[0].title
    },
    rootTags() {
      return this.ModelsList[0].typesList[0].dynamicTags
    }
  },
  watch: {
    rootTitle() {
      this.ModelsList.map(e => {
        if (e.title !== this.rootTitle) { e.relyOn = this.ModelsList[0].title }
      })
    }
    // 未完成
    // rootTags() {
    //   this.ModelsList.map(e => {
    //     if (e.relyOn) {
    //       if (e.typesList.length < this.rootTags.length) {
    //         // 新增
    //       } else {
    //         // 减少
    //       }
    //     }
    //   })
    // }
  },
  created() {

  },
  methods: {

    // selectChange(models) {
    //   console.log(models)
    //   // 需修改
    //   models.typesList = this.ModelsList.filter(m => m.title === models.relyOn)[0].typesList.dynamicTags.flat()
    // },
    // inputChange(val,a){

    // }
    delModels2List(idx) {
      this.ModelsList.splice(idx, 1)
    },
    addModels2List() {
      // console.log(this.ModelsList)
      if (!this.ModelsList[0].title) return
      const obj = {}
      obj.relyOn = this.ModelsList[0].title
      obj.typesList = []
      // console.log(this.ModelsList[0].typesList[0].dynamicTags)
      this.ModelsList[0].typesList[0].dynamicTags.map(w => {
        obj.typesList.push({
          relyIndex: w,
          dynamicTags: [],
          inputVisible: false,
          inputValue: ''
        })
      })
      // console.log(obj)
      this.ModelsList.push(obj)
      // this.ModelsList.push({
      //   relyOn: null,
      //   typesList: [{
      //     dynamicTags: [],
      //     inputVisible: false,
      //     inputValue: ''
      //   }
      // })
    },
    handleClose(tag, type, models, idx) {
      console.log(tag, type, models)
      const index = type.dynamicTags.indexOf(tag)
      type.dynamicTags.splice(index, 1)

      // ====
      if (!models.relyOn) {
        this.ModelsList.map(k => {
          // console.log('k', k)
          if (k.relyOn && k.relyOn === models.title) {
            k.typesList.splice(index, 1)
          }
        })
      }
      this.addForm['Values' + '_' + idx.k1 + '_' + idx.k2] = type.dynamicTags ? type.dynamicTags.join('#') : ''
      // ====
    },

    showInput(models) {
      models.inputVisible = true
      // console.log(this.$refs.saveTagInput)
      this.$nextTick(_ => {
        this.$refs.saveTagInput[0].$refs.input.focus()
      })
    },

    handleInputConfirm(type, models, idx) {
      // console.log(this.ModelsList, type, models)
      const inputValue = type.inputValue
      if (inputValue) {
        type.dynamicTags.push(inputValue)
      }
      // ====
      if (!models.relyOn) {
        this.ModelsList.map(k => {
          // console.log('k', k)
          if (k.relyOn && k.relyOn === models.title) {
            k.typesList.push({
              relyIndex: type.inputValue,
              dynamicTags: [],
              inputVisible: false,
              inputValue: ''
            })
          }
        })
      }

      this.addForm['Values' + '_' + idx.k1 + '_' + idx.k2] = type.dynamicTags ? type.dynamicTags.join('#') : ''
      // ====

      type.inputVisible = false
      type.inputValue = ''
      // this.addModels2List()
      // const obj = {}
      // obj.relyOn = this.ModelsList[0].title
      // obj.typesList = []
      // this.ModelsList[0].typesList[0].dynamicTags.map(w => {
      //   obj.typesList.push({
      //     relyIndex: w,
      //     dynamicTags: [],
      //     inputVisible: false,
      //     inputValue: ''
      //   })
      // })
    },

    addGoodsModels() {
      console.log(this.ModelsList, 'ModelsList')
      console.log('========')
      this.$refs['addForm'].validate((valid) => {
        if (valid) {
          // alert('submit!');
          const p = {}
          p.ModelsName = this.addForm.ModelsName
          p.Models = ({
            Models: this.ModelsList.map(m => {
              const o = {
                Title: m.title
              }
              if (m.relyOn) {
                o.RelyOn = m.relyOn
                o.Values = m.typesList.map(s => s.dynamicTags.join(',')).join(';')
              } else {
                o.Values = m.typesList[0].dynamicTags.join(',')
              }

              return o
            })
          })
          console.log(p)
          addGoodsModels(p).then(response => {
            if (response.data.success) {
              this.$message({ message: '添加成功', type: 'success' })
              this.close()
            } else {
              this.$message({ message: '添加失败', type: 'error' })
            }
          })
        }
      })
    },
    close() {
      this.$emit('close')
    }

  }
}
</script>

<style>
.ruleForm .el-form-item__error {
  color: #F56C6C;
    font-size: 12px;
    line-height: 7px;
    /* padding-top: 4px; */
    position: absolute;
    top: 11px;
    left: 400px;
    width: 200px;
    text-align: left;
}
/* .el-tag{
  margin-left:0 ;
} */
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag{
    /* margin-left: 0px!important; */
    height: 32px!important;
    line-height: 30px!important;
    padding-top: 0!important;
    padding-bottom: 0!important;
    /* background-color: #fff!important; */
  }
  .el-tag + .button-new-tag{
    margin-left: 10px!important;
  }
  .input-new-tag {
    width: 90px!important;
    margin-left: 10px!important;
    vertical-align: bottom!important;
  }
</style>
