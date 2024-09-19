<template>
  <el-col v-show="isShow" :lg="size.lg" :sm="size.sm" :xs="size.xs">
    <el-form-item ref="elItem" :class="[parentName === 'wtmSearch' ? 'form-item-search' : 'form-item']" v-bind="$attrs">
      <slot v-if="isEdit" />
      <template v-else>
        <img v-if="isImg" :src="value">
        <slot v-else name="editValue">
          <!--後备内容 -->
          {{ value }}
        </slot>
      </template>
    </el-form-item>
  </el-col>
</template>

<script>
export default {
  props: {
    isShow: { type: Boolean, default: true },
    isImg: { type: Boolean, default: true },
    isEdit: { type: Boolean, default: false },
    value: { type: String, default: '' }
  },
  data() {
    return {
    }
  },
  computed: {
    get size() {
      const span = parseInt(this.$attrs.span) || this.parentCmpt.span
      return {
        lg: span,
        md: span + 2,
        sm: span + 4,
        xs: 24
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
