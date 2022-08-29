<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:</div>
    <ImageUpload @onsuccess="onsuccess" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  data() {
    return {
      color: 'red'
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    beforeUploads() {
      return false
    },
    onsuccess({ url }) {
      console.log(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
