<template>
  <div>
    <!-- 单词申请的表单 -->
    <div v-for="(type, i) in singleFormTypes" :key="i">
      <a-card :title="getFormTitle(type)">
        <component
          :formData="formData[type]"
          :is="getFormComponent(type)"
          :type="$props.type"
          :resourceID="FormData.id"
        >
        </component>
      </a-card>

      <div v-for="(type, i) in multipleFormTypes" :key="i">
        <a-card :title="getFormTitle(type)">
          <div v-for="(item, index) in FormData[type]" :key="index">
            <div class="multiple-form-item">
              <component
                :is="getFormComponent(type)"
                :formData="formData[type][index]"
                :type="$props.type"
                @update:formData="
                  val => updateMultipleFormData(type, index, val)
                "
              >
              </component>
              <a-button
                v-show="formData[type].length > 1 && $props.type === 'edit'"
                type="text"
                :danger="true"
                @click="() => removeItem(type, index)"
              >
                删除
              </a-button>
            </div>
          </div>

          <div v-show="type === 'edit'">
            <a-button> 添加 </a-button>
          </div>
        </a-card>
      </div>
    </div>
  </div>
</template>
