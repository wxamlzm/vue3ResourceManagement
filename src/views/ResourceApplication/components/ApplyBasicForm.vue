<template>
  <a-form
    :model="localFormData"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
  >
    <a-form-item label="姓名">
      <a-input v-model:value="localFormData.name" placeholder="请输入姓名" />
    </a-form-item>
    <a-form-item label="邮箱">
      <a-input v-model:value="localFormData.email" placeholder="请输入邮箱" />
    </a-form-item>
    <a-form-item label="申请类型">
      <a-select
        v-model:value="localFormData.applyType"
        placeholder="请选择申请类型"
      >
        <a-select-option value="additionalResources">额外资源</a-select-option>
        <a-select-option value="otherSingleForm">其他单表单</a-select-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, onMounted, watch } from 'vue'
import { Form, Input, Select, Option } from 'ant-design-vue'

const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:formData', 'typeChange'])

// 本地数据
const localFormData = ref({ ...props.formData })

// 监听 formData 的变化，并更新本地数据
watch(
  () => props.formData,
  newVal => {
    localFormData.value = { ...newVal }
  },
  { deep: true, immediate: true }
)

// 监听本地数据的变化，并通过事件通知父组件
watch(
  () => localFormData.value,
  newVal => {
    emit('update:formData', newVal)
  },
  { deep: true }
)

// 监听 applyType 的变化，并通过事件通知父组件
watch(
  () => localFormData.value.applyType,
  newVal => {
    emit('typeChange', newVal)
  }
)

// 初始化数据
onMounted(() => {
  localFormData.value = { ...props.formData }
})
</script>
