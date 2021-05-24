<template>
  <el-container>
    <!-- <button @click="handleaa"></button> -->
    <div class="content">
      <div class="mix-tree-list">
        <div v-for="(item, index) in treeList" :key="index">
          <div
            :style="[{paddingLeft: item.rank*15 + 'px',zIndex: item.rank*-1 +50,}]"
            :class="{border: treeParams.border === true,show: item.show,last: item.lastRank,showchild: item.showChild, back:index==num}"
            class="mix-tree-item"
          >
            <i :class="item.lastRank ? treeParams.lastIcon : item.showChild ? treeParams.currentIcon : treeParams.defaultIcon" class="mix-tree-icon" @click.stop.prevent="treeItemTap(item, index)" />
            <i
              :class="'el-icon-' + Icon.insert"
              :style="{color:Icon.i_color, margin:Icon.margin, cursor:Icon.cursor}"
              @click="insert(item)"
            />
            <i
              :class="'el-icon-' + Icon.update"
              :style="{color:Icon.u_color, margin:Icon.margin, cursor:Icon.cursor}"
              @click="update(item)"
            />
            <i
              v-if="item.lastRank"
              :class="'el-icon-' + Icon.delete"
              :style="{color:Icon.d_color, margin:Icon.margin, cursor:Icon.cursor}"
              @click="del(item)"
            />
            <i />
            <div class="title" @click.stop="treeItemTap(item, index)">{{ title }}-{{ item.Title }}</div>
          </div>
        </div>
      </div>
    </div>
  </el-container>
</template>
<script>
export default {

  // eslint-disable-next-line vue/require-prop-types
  props: ['list', 'title'],
  data() {
    return {
      num: 0,
      treeList: [],
      treeParams: {
        defaultIcon: 'el-icon-arrow-right', // 合
        currentIcon: 'el-icon-arrow-down', // 开
        lastIcon: '',
        border: false
      },
      Icon: {
        update: 'edit',
        delete: 'delete',
        insert: 'plus',
        u_color: '#09a0f7',
        d_color: '#ec4d4d',
        i_color: '#000000',
        margin: '0 5px 0 5px',
        cursor: 'pointer'
      },
      data: [{
        label: '一级 1',
        children: [
          this.treeList
        ]
      }]
    }
  },
  // watch: {
  //   list(list) {
  //     console.log(123313)
  //     this.treeParams = Object.assign(this.treeParams, this.params)
  //     console.log(this.treeParams, this.params)
  //     this.renderTreeList(list)
  //   }
  // },
  created() {
    console.log(123313)
    console.log(this.title)
    this.renderTreeList(this.list)
  },
  methods: {
    // 扁平化树结构
    renderTreeList(list = [], rank = 0, parentId = []) {
      // console.log(123313)
      list.forEach(item => {
        this.treeList.push({
          Data: item.Data,
          IconID: item.IconID,
          ItemCode: item.ItemCode,
          PTime: item.PTime,
          SItemCode: item.SItemCode,
          Title: item.Title,
          Child: item.Child,
          Level: item.Level,
          parentId, // 父级id数组
          rank, // 层级
          showChild: true, // 子级是否显示
          show: rank === 0 // 自身是否显示
        })
        if (Array.isArray(item.Child) && item.Child.length > 0) {
          const parents = [...parentId]
          // console.log(123313)
          // console.log(parents)
          parents.push(item.ItemCode)
          this.renderTreeList(item.Child, rank + 1, parents)
        } else {
          this.treeList[this.treeList.length - 1].lastRank = true
        }
      })
      this.treeItemTap(list[0])
    },

    // 点击
    treeItemTap(item, i) {
      const list = this.treeList
      const ItemCode = item.ItemCode
      console.log(item)
      this.num = i
      console.log(i)
      console.log(this.num)
      this.$emit('treeItemClick', item)
      if (item.lastRank === true) {
      // 点击最后一级时触发事件
        return
      }
      item.showChild = !item.showChild
      list.forEach(childItem => {
        if (item.showChild === false) {
          // 隐藏所有子级
          if (!childItem.parentId.includes(ItemCode)) {
            return
          }
          if (childItem.lastRank !== true) {
            childItem.showChild = false
          }
          childItem.show = false
        } else {
          if (childItem.parentId[childItem.parentId.length - 1] === ItemCode) {
            childItem.show = true
          }
        }
      })
    },

    update(item) {
      this.$emit('updateInfo', item)
    },
    del(item) {
      this.$emit('deleteInfo', item)
    },
    insert(item) {
      this.$emit('insertInfo', item)
    }
  }
}
</script>
<style scoped>
.mix-tree-list {
  cursor:pointer;
  display: flex;
  flex-direction: column;
  padding-left: 30px;
}
.back{
  background: #ccc;
}
.mix-tree-item {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #333;
  height: 0;
  opacity: 0;
  transition: 0.2s;
  position: relative;
}
.mix-tree-list :hover{
  background: #ccc;
}
.mix-tree-item.border {
  border-bottom: 1px solid #eee;
}
.mix-tree-item.show {
  height: 50px;
  opacity: 1;
}
.mix-tree-icon {
  /* width: 26px;
  height: 26px; */
  margin-right: 8px;
  opacity: 0.9;
}

.mix-tree-item.showchild:before {
  transform: rotate(90deg);
}
.mix-tree-item.last:before {
  opacity: 0;
}
.title {
  max-width: 100%;
  margin-right: 40px;
}
</style>

