<template>
  <el-container>
    <el-main>
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="咨讯标题" prop="ArticleTitle">
          <el-input v-model="formData.ArticleTitle" placeholder="请输入咨讯标题" clearable :style="{width: '100%'}" />
        </el-form-item>
        <el-form-item label="优先级" prop="Priority">
          <el-input-number v-model="formData.Priority" placeholder="优先级" :max="9" :min="0" step-strictly controls-position="right" />
        </el-form-item>
        <el-form-item label="咨讯内容" prop="DetailsFileUrl">
          <editor
            id="editor_id"
            :content.sync="editorText"
            :after-change="afterChange()"
            :load-style-mode="false"
            height="500px"
            width="700px"
            plugins-path="../../../static/kindeditor/plugins/"
            @on-content-change="onContentChange"
          />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-main>
  </el-container>
</template>
<script>
import { saveFileContent } from '@/api/file'
import {
  addMallArticle
} from '@/api/article'//
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        ArticleTitle: undefined,
        Priority: 0
      },
      rules: {
        ArticleTitle: [{
          required: true,
          message: '请输入咨讯标题',
          trigger: 'blur'
        }],
        Priority: [{
          required: true,
          message: '优先级',
          trigger: 'blur'
        }]
      },
      editorText: '' // 双向同步的变量

    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
    //   var that = this
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
        if (this.editorText) {
          const params = {}
          params.FileName = 'editorText'
          // console.log(this.editorText, '-----1111-------')
          var data = escape(this.editorText)
          saveFileContent(params, data).then(response => {
            if (response.data.success) {
              // console.log(response.data.data, '=============')
              this.formData.DetailsFileUrl = response.data.data
              this.addarticle()
            }
          })
        } else {
          this.addarticle()
        }
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    afterChange() {},
    onContentChange(val) {
      this.editorTextCopy = val
      // console.log(this.editorText, '---------')
    },
    addarticle() {
      addMallArticle(this.formData).then(res => {
        if (res.data.success) {
          this.$message.success('添加成功')
          this.$emit('func', 'close')
        } else {
          this.$message.error('添加失败')
        }
      })
    }
  }
}

</script>
<style>
</style>
