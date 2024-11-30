<template>
  <a-card :title="getFormTitle(formType)">
    <div v-if="!multiple">
      <component
        :is="getFormComponent(formType)"
        :formData="formData"
        :type="type"
        @update:formData="val => $emit('update:formData', val)"
      ></component>
    </div>
    <div v-else>
      <div
        v-for="(item, index) in formData"
        :key="index"
        class="multiple-form-item"
      >
        <component
          :is="getFormComponent(formType)"
          :formData="item"
          :type="type"
          @update:formData="
            val => $emit('update:formData', { ...formData, [index]: val })
          "
        ></component>
        <a-button
          v-show="formData.length > 1 && type === 'edit'"
          type="text"
          danger
          @click="() => removeItem(index)"
        >
          删除
        </a-button>
      </div>
      <div v-show="type === 'edit'">
        <a-button @click="addItem"> 添加 </a-button>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Card, Button } from 'ant-design-vue'
import { isArray } from 'lodash'

const props = defineProps({
  formType: {
    type: String,
    required: true
  },
  formData: {
    type: [Object, Array],
    required: true
  },
  type: {
    type: String,
    required: true
  },
  resourceID: {
    type: [String, Number],
    default: null
  },
  multiple: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:formData'])

function getFormTitle(formType: string) {
  return `表单标题 - ${formType}`
}

function getFormComponent(formType: string) {
  // 根据 formType 返回相应的组件
  switch (formType) {
    case 'additionalResources':
      return 'AdditionalResourcesForm' // 替换为实际的组件名称
    case 'otherSingleForm':
      return 'OtherSingleForm' // 替换为实际的组件名称
    default:
      return 'DefaultForm' // 默认表单组件
  }
}

function addItem() {
  if (isArray(props.formData)) {
    props.formData.push({})
    emit('update:formData', [...props.formData])
  }
}

function removeItem(index: number) {
  if (isArray(props.formData) && props.formData.length > 1) {
    const newFormData = [...props.formData]
    newFormData.splice(index, 1)
    emit('update:formData', newFormData)
  }
}
</script>

<style scoped>
.multiple-form-item {
  margin-bottom: 10px;
}
</style>
