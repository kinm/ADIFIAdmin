<template>
  <div>
    <el-dialog :close-on-click-modal="false" :title="{ add: '新增角色', edit: '編輯角色' }[mode]" :before-close="handleClose" :visible.sync="dialogFormVisible">
      <el-form ref="ruleForm" label-position="top" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="角色名稱：" prop="name">
          <el-input v-model="ruleForm.name" clearable placeholder="請輸入角色名稱" />
        </el-form-item>
        <el-form-item label="角色權限：" required>
          <el-tree
            v-if="dialogFormVisible"
            ref="tree"
            :data="treeData"
            show-checkbox
            check-on-click-node
            node-key="id"
            :default-expand-all="true"
            :default-checked-keys="defaultCheckedKeys"
            :props="{ children: 'child', label: 'name' }"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button :size="$s_size" @click="handleClose">取 消</el-button>
        <el-button :size="$s_size" type="primary" @click="submitForm">確 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { elMessage } from '@/utils/message-remind.js'
import { authAllAuth, setRole } from '@/api/limit-authority.js'
export default {
  name: '',
  data() {
    return {
      mode: '',
      dialogFormVisible: false,
      defaultCheckedKeys: [],
      ruleForm: {
        id: 0,
        name: '',
        auth: []
      },
      treeData: [],
      rules: {
        name: [{ required: true, message: '必填', trigger: 'blur' }],
        auth: [{ type: 'array', required: true, message: '必填', trigger: 'change' }]
      }

    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    handleClose() {
      this.ruleForm = {
        id: 0,
        name: '',
        auth: []
      }
      this.defaultCheckedKeys = []
      this.$refs.ruleForm.resetFields()
      this.dialogFormVisible = false
    },
    async onInit() {
      const { data } = await authAllAuth()
      data.forEach(el => {
        if (el.child) {
          el.child.unshift({ id: el.id, is_choice: false, name: '頁面權限' })
        } else {
          el.child = [{ id: el.id, is_choice: false, name: '頁面權限' }]
        }
      })
      this.treeData = data
    },
    submitForm() {
      this.ruleForm.auth = this.$refs.tree.getCheckedKeys(true)
      if (!this.ruleForm.auth.length) return elMessage('請選擇角色權限！')
      this.$refs.ruleForm.validate(async(valid) => {
        if (!valid) return elMessage('請按要求填寫！')
        await setRole(this.ruleForm)
        elMessage(this, '操作成功！', 'success')
        this.$emit('getData')
        this.handleClose()
      })
    }
  }
}
</script>
<style lang='scss'  scoped>

/* 控制树形节点横向显示 */
::v-deep .el-tree-node.is-expanded>.el-tree-node__children{
    display:flex;
    flex-wrap: wrap; /* flex横向布局换行显示 */
}

/* 去除点击收缩图标时：横向显示的数据会先晃动成纵向显示的再收缩的现象*/
::v-deep .collapse-transition{
    transition:none !important;
}
</style>
