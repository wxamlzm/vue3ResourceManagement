<template>
  <a-modal
    :open="visible"
    :title="dialogTitle"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-item label="姓名" name="name">
        <a-input v-model:value="formData.name" />
      </a-form-item>
      <a-form-item label="邮箱" name="email">
        <a-input v-model:value="formData.email" />
      </a-form-item>
      <a-form-item label="年龄" name="age">
        <a-input-number v-model:value="formData.age" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import type { FormInstance } from 'ant-design-vue'
import type { DialogFormData } from '../types/ResourceType'

const props = defineProps<{
  visible: boolean
  editData?: DialogFormData | null
}>()

const emit = defineEmits(['update:visible', 'submit'])

const formRef = ref<FormInstance>()
const formData = ref<DialogFormData>({
  name: '',
  email: '',
  age: 0
})

const rules = {
  name: [{ required: true, message: '请输入姓名' }],
  email: [
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '请输入正确的邮箱格式' }
  ],
  age: [{ required: true, message: '请输入年龄' }]
}

const dialogTitle = computed(() => {
  return props.editData ? '编辑用户' : '新建用户'
})

// 监听编辑数据变化
watch(
  () => props.editData,
  newVal => {
    if (newVal) {
      formData.value = { ...newVal }
    } else {
      formData.value = {
        name: '',
        email: '',
        age: 0
      }
    }
  }
)

const handleSubmit = async () => {
  try {
    await formRef.value?.validate()
    emit('submit', formData.value)
    handleCancel()
  } catch (error) {
    console.error('表单验证失败:', error)
  }
}

const handleCancel = () => {
  formRef.value?.resetFields()
  emit('update:visible', false)
}
</script>
