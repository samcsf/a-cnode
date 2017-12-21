<template>
  <div>
    <mt-field label="主题" placeholder="请输入主题" v-model="inputTitle"></mt-field>
    <mt-field label="分类">
      <select>
        <option v-for="opt in tabs">{{opt}}</option>
      </select>
    </mt-field>
    <mt-field label="内容" placeholder="内容" type="textarea" v-modal="inputContent"></mt-field>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      inputTitle: '',
      inputContent: '',
      tabs: ['分享','问答','测试']
    }
  }
}
</script>
<style>
</style>