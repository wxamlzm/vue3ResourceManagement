<!-- 当前i健康项目用的table组件 -->
<template>
  <a-table
    size="small"
    :rowKey="rowKey"
    :bordered="false"
    :loading="needLoading ? tableLoading : undefined"
    :dataSource="tableDataSource"
    :rowSelection="rowSelection"
    ref="tableRef"
  ></a-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
interface ITableProps {
  fetchList: (params: any) => Promise<object>
  needLoading?: boolean
  rowKey?: string
}

const props = withDefaults(defineProps<ITableProps>(), {
  rowKey: 'id'
})
const emit = defineEmits<{ updateSelectedRowKeys }>()

const tableLoading = ref(false)
const tableDataSource = ref([])
const selectedRowKeys = ref<(number | string)[]>([])

const rowSelection = {
  checkStrictly: false,
  selectedRowKeys: selectedRowKeys,
  onSelect: (record, selected, selectedRows) => {
    if (selected) {
      // 如果是选中操作，将当前行的id添加到
      selectedRowKeys.value = [...selectedRowKeys.value, record.id]
    } else {
      selectedRowKeys.value = selectedRowKeys.value.filter(
        id => id !== record.id
      )
    }
    emit('updateSelectedRowKeys', selectedRowKeys.value)
  }
}
</script>
