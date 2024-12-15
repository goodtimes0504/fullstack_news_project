<template>
  <el-upload
    class="avatar-uploader"
    :show-file-list="false"
    :auto-upload="false"
    :on-change="handleAvatarChange"
    action="#"
  >
    <img v-if="props.avatar" :src="uploadAvatarUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup>
import { computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'

//从父组件获取avatar的值
const props = defineProps({
  avatar: {
    type: String,
    default: '',
  },
})
const emits = defineEmits(['update:avatar'])
const uploadAvatarUrl = computed(() => {
  if (props.avatar.includes('blob:')) {
    return props.avatar
  } else {
    return 'http://localhost:3000' + props.avatar
  }
})
//每次选择完头像的回调函数
const handleAvatarChange = file => {
  // console.log(file)
  if (file && file.raw) {
    emits('update:avatar', file.raw)
  }
}
</script>

<style lang="scss" scoped>
:deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  width: 178px;
  height: 178px;
}

:deep(.el-upload:hover) {
  border-color: var(--el-color-primary);
}

:deep(.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  line-height: 178px;
  display: inline-block;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
