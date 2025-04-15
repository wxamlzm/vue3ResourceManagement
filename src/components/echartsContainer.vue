// EChartsContainer.vue
<template>
  <div ref="containerRef" class="echarts-container"></div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted, nextTick, PropType } from 'vue'
import { debounce } from 'lodash-es'
import * as echarts from 'echarts'
import type { ECharts, EChartsOption, SetOptionOpts } from 'echarts'

const props = defineProps({
  // ECharts 配置项（必传）
  option: {
    type: Object as PropType<EChartsOption>,
    required: true
  },
  // 初始化附加参数
  initOptions: {
    type: Object as PropType<{
      devicePixelRatio?: number
      renderer?: 'canvas' | 'svg'
      width?: number | string
      height?: number | string
      locale?: string
    }>,
    default: () => ({})
  },
  // 主题配置
  theme: {
    type: [String, Object],
    default: null
  },
  // 是否显示加载状态
  loading: Boolean,
  // 窗口 resize 防抖时间（毫秒）
  resizeDebounce: {
    type: Number,
    default: 300
  },
  // setOption 配置
  setOptionOpts: {
    type: Object as PropType<SetOptionOpts>,
    default: () => ({})
  }
})

const emit = defineEmits(['init', 'resize'])

const containerRef = ref<HTMLElement>()
const chartRef = ref<ECharts>()
let observer: ResizeObserver | null = null

// 初始化图表
const initChart = () => {
  if (!containerRef.value) return

  // 清理已有实例
  if (chartRef.value) {
    chartRef.value.dispose()
  }

  // 创建实例
  chartRef.value = echarts.init(
    containerRef.value,
    props.theme,
    props.initOptions
  )
  chartRef.value.setOption(props.option, props.setOptionOpts)

  // 处理加载状态
  props.loading ? chartRef.value.showLoading() : chartRef.value.hideLoading()

  // 触发初始化事件
  emit('init', chartRef.value)
}

// 响应式处理
const resizeHandler = debounce(() => {
  if (!chartRef.value?.isDisposed()) {
    chartRef.value?.resize()
    emit('resize')
  }
}, props.resizeDebounce)

// 监听容器变化
const initResizeObserver = () => {
  if (!containerRef.value) return

  observer = new ResizeObserver(resizeHandler)
  observer.observe(containerRef.value)
}

// 销毁监听器
const destroyResizeObserver = () => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

// 暴露实例方法
const getEchartsInstance = () => chartRef.value

// 生命周期
onMounted(() => {
  nextTick(() => {
    initChart()
    initResizeObserver()
  })
})

onUnmounted(() => {
  destroyResizeObserver()
  if (chartRef.value && !chartRef.value.isDisposed()) {
    chartRef.value.dispose()
  }
})

// 监听配置变化
watch(
  () => props.option,
  newOption => {
    if (chartRef.value && !chartRef.value.isDisposed()) {
      chartRef.value.setOption(newOption, props.setOptionOpts)
    }
  },
  { deep: true }
)

// 监听加载状态
watch(
  () => props.loading,
  loading => {
    if (!chartRef.value) return
    loading ? chartRef.value.showLoading() : chartRef.value.hideLoading()
  }
)

// 暴露实例
defineExpose({
  getEchartsInstance
})
</script>

<style scoped>
.echarts-container {
  width: 100%;
  height: 100%;
  min-height: 300px; /* 防止容器高度坍塌 */
}
</style>
