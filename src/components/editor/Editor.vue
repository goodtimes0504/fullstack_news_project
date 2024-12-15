<template>
  <div class="editor">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script setup>
// 引入 wangeditor 富文本编辑器的样式文件
import '@wangeditor/editor/dist/css/style.css'

// 从 Vue 框架导入必要的函数和响应式 API
import { defineEmits, onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
// 从 @wangeditor/editor-for-vue 包中导入 Editor 和 Toolbar 组件
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// 使用 defineEmits 定义要触发的自定义事件名称，这里用于和 v-model 配合实现双向绑定及向父组件传递数据
const emits = defineEmits(['update:valueHtml'])

// 编辑器实例，使用 shallowRef 创建较浅层次的响应式引用
const editorRef = shallowRef()

// 内容 HTML，使用 ref 创建响应式数据，初始值为一段简单的 HTML 字符串
const valueHtml = ref('<p>hello</p>')

// 模拟 ajax 异步获取内容，在组件挂载后通过 setTimeout 模拟延迟更新内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
  }, 1500)
})

// 工具栏配置对象，目前为空，可按需添加配置项
const toolbarConfig = {}

// 编辑器配置对象，设置了 placeholder 占位文本提示用户输入内容
const editorConfig = {
  placeholder: '请输入内容...',
}

// 组件销毁时的逻辑，获取编辑器实例并判断是否为空，不为空则调用 destroy 方法释放资源
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

// 处理编辑器创建完成后的回调函数，记录编辑器实例到 editorRef 响应式引用中
const handleCreated = editor => {
  editorRef.value = editor
}

// 处理编辑器内容变化的回调函数，打印相关内容信息，并通过 emits 触发自定义事件向父组件传递最新的 HTML 内容
const handleChange = editor => {
  //   console.log('change:', editor.getHtml())
  //   console.log('change:', valueHtml.value)
  emits('update:valueHtml', editor.getHtml())
}
const mode = 'default'
// 在 <script setup> 中不需要显式返回，内部定义的变量、函数等会自动暴露给模板使用，但这里可以明确一下导出的属性（非必需）
// defineExpose({
//   editorRef,
//   valueHtml,
//   mode: 'default',
//   toolbarConfig,
//   editorConfig,
//   handleCreated,
//   handleChange,
// })
</script>

<style lang="scss" scoped>
.editor {
  border: 1px solid #ccc;
  width: 100%;
}
</style>
