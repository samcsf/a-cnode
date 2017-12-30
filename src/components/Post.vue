<template>
  <div>
    <div class="my-input">
      <span class="my-input-label">分类</span>
      <select>
        <option v-for="opt in tabs">{{opt}}</option>
      </select>
      <span class="triangle"></span>
    </div>
    <mt-field label="主题" placeholder="请输入主题" v-model="inputTitle"></mt-field>
    <mt-field label="内容" placeholder="内容" type="textarea" v-model="inputContent"></mt-field>
    <mt-button type="primary" style="width:100%">发布</mt-button>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      inputTitle: '',
      inputContent: '',
      tabs: ['分享', '问答', '测试']
    }
  }
}
</script>

<style lang="scss">
.my-input {
  padding-top: 10px;
  padding-bottom: 10px;
  position: relative;
  .my-input-label {
    margin-left: 10px;
  }
  select {
    margin-left: 70px;
    font-size: 16px;
    appearance: none;
    padding-left: 5px;
    padding-right: 18px;
  }
}

.triangle {
  width: 0;
  height: 0;
  display: inline-block;
  border: 6px solid transparent;
  border-top-color: #2c3e50;
  top: 3px;
  left: -23px;
  position: relative;
}
</style>