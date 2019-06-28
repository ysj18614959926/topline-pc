<template>
    <el-select clearable :value='value' @change='handelChange'>
        <el-option
            v-for="item in options"
            :key="item.name"
            :label="item.name"
            :value="item.id">
        </el-option>
    </el-select>
</template>
<script>
export default {
  name: 'ArticalChannel',
  data () {
    return {
      options: []
    }
  },
  created () {
    this.getChannel()
  },
  props: {
    value: {
    //   type: [String, Number],
      required: true
    }
  },
  methods: {
    handelChange (e) {
      this.$emit('input', e)
    },
    async getChannel () {
      const res = await this.$http({
        url: '/channels',
        method: 'GET'
      })
      this.options = res.channels
    }
  }
}
</script>
<style>

</style>
