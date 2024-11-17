// ResourceEditDialog.vue
<template>
  <a-modal
    :open="visible"
    :title="dialogTitle"
    :confirm-loading="loading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="姓名" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="邮箱" name="email">
        <a-input v-model:value="formState.email" />
      </a-form-item>
      <a-form-item label="年龄" name="age">
        <a-input-number v-model:value="formState.age" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, computed } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import type { DialogFormData } from '../types/ResourceType'

const props = defineProps<{
  visible: boolean
  editData: DialogFormData
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
  submit: [data: DialogFormData]
}>()

const formRef = ref<FormInstance>()

// 内部状态，用于表单数据管理
const formState = reactive<DialogFormData>({
  name: '',
  email: '',
  age: 0
})

// 表单校验规则
const rules = {
  name: [{ required: true, message: '请输入姓名' }],
  email: [
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '请输入正确的邮箱格式' }
  ],
  age: [{ required: true, message: '请输入年龄' }]
}

// 计算弹窗标题
const dialogTitle = computed(() => {
  return formState.age ? '编辑用户' : '新建用户'
})

// 监听编辑数据变化，同步到内部状态
watch(
  () => props.editData,
  newVal => {
    // 使用解构赋值来更新formState
    Object.assign(formState, { ...newVal })
  },
  { deep: true, immediate: true }
)

// 提交表单
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    // 提交时创建一个新对象，避免传递响应式对象
    emit('submit', { ...formState })
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

// 取消操作
const handleCancel = () => {
  formRef.value?.resetFields()
  emit('update:visible', false)
}
</script>
