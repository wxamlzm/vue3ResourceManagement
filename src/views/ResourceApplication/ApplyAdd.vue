<template>
  <a-card>
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
    :type="typeProp"
    :resourceID="formData.id"
    :multiple="isMultiple(currentFormType)"
    @update:formData="val => updateFormData(currentFormType, val)"
  />

  <footer>
    <a-space>
      <a-button @click="submitDraft"> 提交草稿 </a-button>
      <s-button @click="submitApply">提交申请</s-button>
    </a-space>
  </footer>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { Card, Space, Button } from 'ant-design-vue'
import applyBasicForm from './components/ApplyBasicForm.vue' // 引入基础表单组件
import DynamicForm from './components/DynamicForm.vue' // 引入动态表单组件
import { isArray } from 'lodash'

const props = defineProps({
  initFormData: {
    type: Object,
    default: () => ({})
  },
  type: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:formData'])

const applyBasicFormData = ref({})
const formData = reactive({ ...props.initFormData })
const currentFormType = ref('') // 用于存储当前选中的表单类型

const isMultiple = (formType: string) => {
  return isArray(formData[formType])
}

function handleTypesChange(newType: string) {
  currentFormType.value = newType
}

function updateFormData(formType: string, value: any) {
  formData[formType] = value
  emit('update:formData', formData)
}

const submitData = ref([])

const submitDraft = () => {
  // 提交草稿的逻辑
}

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
    // 提交申请的逻辑
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  // 假设这是从后端获取的数据
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

  // 初始化数据
  applyBasicFormData.value = {
    name: backendData.name,
    email: backendData.email,
    applyType: backendData.applyType
  }

  for (const key of Object.keys(backendData)) {
    if (key !== 'name' && key !== 'email' && key !== 'applyType') {
      formData[key] = backendData[key]
    }
  }

  // 初始化当前表单类型
  currentFormType.value = backendData.applyType
})
</script>
