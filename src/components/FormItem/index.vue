<template>
  <el-col :lg="size.lg" :sm="size.sm" :xs="size.xs">
    <el-form-item v-bind="$attrs">
      <el-popover
        v-if="$attrs.label_name"
        slot="label"
        placement="top-start"
        :title="$attrs.label_title|| ''"
        width="200"
        trigger="hover"
        :content="$attrs.label_content"
      >
        <el-link slot="reference" :underline="false">{{ $attrs.label_name }}  <i :class="$attrs.label_icon" /></el-link>
      </el-popover>
      <div v-if="$attrs.slot_label" slot="label">
        <slot name="slot_label">
          <div />
        </slot>
      </div>
      <slot />
    </el-form-item>
  </el-col>
</template>

<script>
export default {
  name: 'FormItem',
  data() {
    return {
    }
  },
  computed: {
    size() {
      const span = parseInt(this.$attrs.span) || parseInt(6)
      return {
        lg: span,
        md: span + 2,
        sm: span + 6,
        xs: 24
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
