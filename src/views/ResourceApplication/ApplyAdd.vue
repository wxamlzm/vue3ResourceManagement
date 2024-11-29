<template>
  <a-card>
    <applyBasicForm
      v-model:formData="applyBasicFormData"
      type="add"
      @typeChange="handleTypesChange"
    />
  </a-card>

  <div style="height: 10px"></div>

  <ApplyResourcePane
    :applyBasicFormData="applyBasicFormData"
    :initFormData="formData"
    type="add"
    @update:formData="updateFormData"
  />

  <footer>
    <a-space>
      <a-button @click="submitDraft"> 提交草稿 </a-button>
      <s-button @click="submitApply">提交申请</s-button>
    </a-space>
  </footer>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

// 基础数据表
const applyBasicFormData = ref({})

const handleTypesChange = () => {}

// 动态表单的数据
const formData = reactive({})

const submitData = ref([])
const updateFormData = (value: any) => {
  submitData.value = Object.assign({}, value)
}

const submitApply = (async = () => {
  try {
    const params = {
      ...applyBasicFormData.value,
      batchStatus: BATCH_STATUS.apply,
      applyInfo: {
        applyType: 1,
        ...submitData.value,
        applyDate: applyBasicFormData.value.applyDate
      }
    }
  } catch (err) {
    console.error(err)
  }
})
</script>
