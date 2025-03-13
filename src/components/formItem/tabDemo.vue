<template>
  <div class="centered-year-slider">
    <div class="year-slider-title">年份选择器</div>

    <div class="year-slider-container">
      <!-- 左侧箭头 -->
      <a-button
        class="slider-arrow"
        type="text"
        :disabled="isLeftEnd"
        @click="handlePrevYear"
      >
        <template #icon><LeftOutlined /></template>
      </a-button>

      <!-- 年份选项卡 -->
      <a-tabs
        v-model:activeKey="activeYear"
        class="year-tabs"
        @change="handleTabChange"
      >
        <a-tab-pane v-for="year in visibleYears" :key="year" :tab="year" />
      </a-tabs>

      <!-- 右侧箭头 -->
      <a-button
        class="slider-arrow"
        type="text"
        :disabled="isRightEnd"
        @click="handleNextYear"
      >
        <template #icon><RightOutlined /></template>
      </a-button>
    </div>

    <!-- 当前选择的年份展示 -->
    <a-card class="selected-year-card">
      <p class="selected-year-label">当前选择年份:</p>
      <p class="selected-year-value">{{ activeYear }}</p>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue'

// 定义Props接口（可选）
interface Props {
  initialYear?: string
  yearList?: string[]
}

// 使用withDefaults定义默认值
const props = withDefaults(defineProps<Props>(), {
  initialYear: '2020',
  yearList: () => [
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
    '2024',
    '2025'
  ]
})

// 定义emit
const emit = defineEmits<{
  (e: 'update:year', year: string): void
}>()

// 配置常量
const VISIBLE_TAB_COUNT = 3

// 响应式状态
const allYears = ref<string[]>([...props.yearList])
const activeYear = ref<string>(props.initialYear)
const activeYearIndex = ref<number>(allYears.value.indexOf(props.initialYear))
const visibleStartIndex = ref<number>(0)

// 初始化
onMounted(() => {
  // 设置初始窗口位置使活动项居中
  updateVisibleStartIndex()
})

// 计算属性
const middleOffset = computed(() => Math.floor(VISIBLE_TAB_COUNT / 2))

const visibleYears = computed(() => {
  return allYears.value.slice(
    visibleStartIndex.value,
    visibleStartIndex.value + VISIBLE_TAB_COUNT
  )
})

const isLeftEnd = computed(() => activeYearIndex.value === 0)
const isRightEnd = computed(
  () => activeYearIndex.value === allYears.value.length - 1
)

// 监听活动年份索引变化，调整窗口位置
watch(activeYearIndex, () => {
  updateVisibleStartIndex()
  activeYear.value = allYears.value[activeYearIndex.value]
  emit('update:year', activeYear.value)
})

// 监听活动年份变化，同步索引
watch(activeYear, newYear => {
  const index = allYears.value.indexOf(newYear)
  if (index !== -1 && index !== activeYearIndex.value) {
    activeYearIndex.value = index
  }
})

// 计算窗口起始位置，使活动项居中
function updateVisibleStartIndex() {
  let startIndex = activeYearIndex.value - middleOffset.value

  // 处理边界情况
  if (startIndex < 0) {
    startIndex = 0
  } else if (startIndex + VISIBLE_TAB_COUNT > allYears.value.length) {
    startIndex = allYears.value.length - VISIBLE_TAB_COUNT
  }

  visibleStartIndex.value = startIndex
}

// 处理前一年点击
function handlePrevYear() {
  if (!isLeftEnd.value) {
    activeYearIndex.value--
  }
}

// 处理下一年点击
function handleNextYear() {
  if (!isRightEnd.value) {
    activeYearIndex.value++
  }
}

// 处理标签点击
function handleTabChange(year: string) {
  const index = allYears.value.indexOf(year)
  if (index !== -1) {
    activeYearIndex.value = index
  }
}
</script>

<style scoped>
.centered-year-slider {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.year-slider-title {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
}

.year-slider-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-arrow {
  margin: 0 8px;
}

.year-tabs {
  flex: 1;
}

.selected-year-card {
  margin-top: 20px;
  text-align: center;
  background-color: #f0f5ff;
  border: 1px solid #d6e4ff;
}

.selected-year-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.selected-year-value {
  font-size: 24px;
  font-weight: bold;
  color: #1890ff;
  margin: 0;
}

/* 覆盖Ant Design Tabs样式 */
:deep(.ant-tabs-nav) {
  margin-bottom: 0 !important;
}

:deep(.ant-tabs-tab) {
  padding: 8px 16px !important;
}
</style>
