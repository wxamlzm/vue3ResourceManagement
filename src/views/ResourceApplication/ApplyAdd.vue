<template>
  <a-card>
    <!-- 基础表单组件 -->
    <apply-basic-form
      v-model:formData="applyBasicFormData"
      type="add"
      @typeChange="handleTypesChange"
    />
  </a-card>

  <div style="height: 10px"></div>

  <!-- 动态表单部分 -->
  <dynamic-form
    v-if="currentFormType"
    :formType="currentFormType"
    :formData="formData[currentFormType]"
    :type="currentFormType"
    :resourceID="formData.id"
    :multiple="isMultiple(currentFormType)"
    @update:formData="val => updateFormData(currentFormType, val)"
  />

  <footer>
    <a-space>
      <a-button @click="submitDraft"> 提交草稿 </a-button>
      <a-button @click="submitApply">提交申请</a-button>
    </a-space>
  </footer>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { Card, Space, Button } from 'ant-design-vue'
import applyBasicForm from './components/ApplyBasicForm.vue' // 引入基础表单组件
import DynamicForm from './components/DynamicForm.vue' // 引入动态表单组件
import { isArray } from 'lodash'

// 定义组件接收的Props（如果有的话）
const props = defineProps({
  initData: {
    type: Object,
    default: () => ({})
  }
})

// 定义组件可以触发的事件
const emit = defineEmits(['update:formData'])

// 基础表单数据
const applyBasicFormData = ref({})

// 动态表单数据
const formData = reactive<Record<string, any>>({})

// 当前选中的表单类型
const currentFormType = ref('')

// 判断某个表单类型是否为多选
const isMultiple = (formType: string) => {
  return isArray(formData[formType])
}

// 处理表单类型变更
function handleTypesChange(newType: string) {
  currentFormType.value = newType
}

// 更新表单数据并向父组件发送事件
function updateFormData(formType: string, value: any) {
  formData[formType] = value
  emit('update:formData', formData)
}

// 提交的数据
const submitData = ref([])

// 提交草稿的方法
const submitDraft = () => {
  // TODO: 实现提交草稿的具体逻辑
  console.log('提交草稿', formData)
}

// 提交申请的方法
const submitApply = async () => {
  try {
    const params = {
      name: applyBasicFormData.value.name,
      email: applyBasicFormData.value.email,
      batchStatus: 'BATCH_STATUS.apply',
      applyInfo: {
        applyType: 1,
        ...submitData.value,
        applyDate: applyBasicFormData.value.applyDate
      }
    }
    // TODO: 实现提交申请的具体逻辑，如接口调用
    console.log('提交申请', params)
  } catch (err) {
    console.error(err)
  }
}

// 组件挂载时初始化数据
onMounted(() => {
  // 模拟从后端获取的数据
  const backendData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    applyType: 'additionalResources', // 后端传过来的类型
    additionalResources: [
      {
        resourceName: 'Resource 1',
        resourceType: 'Type 1'
      },
      {
        resourceName: 'Resource 2',
        resourceType: 'Type 2'
      }
    ],
    otherSingleForm: {
      someField: 'Some Value'
    }
  }

  // 初始化基础表单数据
  applyBasicFormData.value = {
    name: backendData.name,
    email: backendData.email,
    applyType: backendData.applyType
  }

  // 初始化动态表单数据
  // 对于数组类型的字段，直接赋值
  // 对于对象类型的字段，直接赋值
  Object.keys(backendData).forEach(key => {
    if (!['name', 'email', 'applyType'].includes(key)) {
      formData[key] = backendData[key]
    }
  })

  // 初始化当前表单类型
  currentFormType.value = backendData.applyType
})
</script>
