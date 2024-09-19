<template>
  <div>
    <el-form
      ref="searchForm"
      :model="searchForm"
      label-width="120px"
      :size="$s_size"
      label-position="top"
      inline
      class="search-form"
    >
      <el-row class="row" type="flex">
        <FormItem v-for="(config, c) in searchConfig" v-show="needCollapse && c > 2 || c <= 2" :key="c" :label="config.label" :label_name="config.label_name" :prop="config.key" :label_icon="config.label_icon" :label_content="config.label_content" :slot_label="config.slot_label">
          <!-- slot_label -->
          <template #slot_label>
            <el-select v-if="config.label_type === 'select'" v-model="searchForm[config.label_key]" class="FormItem_slot_label_select" :style="config.slot_label_style" @change="(e)=>changeLabelSelect(e,config)">
              <el-option
                v-for="item in config.options?config.options:options?options[`${config.label_key}_enum`]:[]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
          <!-- slot_label -->

          <!-- 輸入框 -->
          <el-input v-if="config.type === 'input'" v-model="searchForm[config.key]" clearable :placeholder="config.placeholder?config.placeholder:`請輸入${config.label}`" @keyup.enter.native="onSearch" />
          <div v-if="config.type === 'interval'">
            <el-row>
              <el-col :span="11">
                <el-input v-model="searchForm[config.key+'_min']" clearable :placeholder="config.placeholder?config.placeholder:`請輸入最小值`" @keyup.enter.native="onSearch" />
              </el-col>
              <el-col :span="2" style="text-align: center;">
                ~
              </el-col>
              <el-col :span="11">
                <el-input v-model="searchForm[config.key+'_max']" clearable :placeholder="config.placeholder?config.placeholder:`請輸入最大值`" @keyup.enter.native="onSearch" />
              </el-col>
            </el-row>
          </div>
          <!-- 選擇框 -->
          <el-select v-if="config.type === 'select'" v-model="searchForm[config.key]" clearable :placeholder="config.placeholder?config.placeholder:`請選擇${config.label}`">
            <el-option
              v-for="item in config.options?config.options:options?options[`${config.key}_enum`]:[]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!-- 单选组 -->
          <el-radio-group v-if="config.type === 'radio'" v-model="searchForm[config.key]">
            <el-radio v-for="items in config.options" :key="items.label" :label="items.value">{{ items.label }}</el-radio>
          </el-radio-group>
          <!-- 多选组 -->
          <el-checkbox-group v-if="config.type === 'checkbox'" v-model="searchForm[config.key]">
            <el-checkbox v-for="item in config.options" :key="item.value" :indeterminate="item.indeterminate" :label="item.label" :disabled="item.disabled" />
          </el-checkbox-group>
          <!-- 時間選擇器 -->
          <el-date-picker
            v-if="config.type === 'datetimerange'"
            v-model="searchForm[config.key]"
            class="date-piceker"
            type="datetimerange"
            :picker-options="config.pickerOptions || 'timestamp'"
            :format="config.format"
            :value-format="config.valueFormat || 'timestamp'"
            range-separator="至"
            start-placeholder="开始時間"
            end-placeholder="结束時間"
            @change="(e)=>{ datePickerChange(e, config) }"
          />
          <!-- 年、月、周 -->
          <el-date-picker
            v-if="config.type === 'year'||config.type === 'month'||config.type === 'week'"
            v-model="value2"
            :type="config.type"
            placeholder="選擇月"
          />
          <!-- 輸入建议组件 -->
          <el-autocomplete
            v-if="config.type === 'autocomplete'"
            v-model="searchForm[`${config.key}_query_str`]"
            clearable
            :value-key="config.valueKey?config.valueKey:'label'"
            class="inline-input"
            :fetch-suggestions="config.fetchSuggestions"
            placeholder="請輸入内容"
            @select="(event)=>{ handleSelect(event, config) }"
            @change="(event)=>{ handleChange(event, config) }"
          />
        </FormItem>
        <slot />
        <FormItem class="search-action-con">
          <div class="search-action">
            <el-button
              :size="$s_size"
              icon="el-icon-search"
              type="primary"
              @click="onSearch"
            >查詢</el-button>
            <el-button
              :size="$s_size"
              style="margin-left:8px;"
              icon="el-icon-refresh"
              @click="onInit"
            />
            <el-button
              v-if="searchConfig.length>3"
              :size="$s_size"
              type="text"
              style="margin-left:8px;"
              @click="needCollapse = !needCollapse"
            >
              {{ needCollapse?'折疊':'展開' }}<i :class="needCollapse?'el-icon-arrow-up':'el-icon-arrow-down'" />
            </el-button>
          </div>
        </FormItem>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import FormItem from '@/components/FormItem/index.vue'
export default {
  name: 'SearchForm',
  components: { FormItem },
  props: {
    searchConfig: { type: Array, default: () => [] },
    options: { type: Object, default: () => {} }
  },
  data() {
    return {
      needCollapse: false,
      dateTime: [],
      searchForm: {},
      value2: ''
    }
  },
  created() {
    // this.onInit()
    this.searchForm = this.initForm()
    this.$emit('init', this.searchForm)
  },
  methods: {
    handleChange(e, config) {
      if (!e) {
        this.searchForm[config.key] = ''
      }
    },
    handleSelect(e, config) {
      this.searchForm[config.key] = e.value
    },
    datePickerChange(e, config) {
      if (config.type === 'datetimerange') { // 時間戳处理
        if (e) {
          if (config.is_simple) {
            this.searchForm[`start`] = e[0] / 1000
            this.searchForm[`end`] = e[1] / 1000
          } else {
            this.searchForm[`${config.key}_start`] = e[0] / 1000
            this.searchForm[`${config.key}_end`] = e[1] / 1000
          }
        } else {
          if (config.is_simple) {
            this.searchForm[`start`] = ''
            this.searchForm[`end`] = ''
          } else {
            this.searchForm[`${config.key}_start`] = ''
            this.searchForm[`${config.key}_end`] = ''
          }
        }
      }
    },
    // 重置搜索
    onInit() {
      this.searchForm = this.initForm()
      this.$emit('init', this.searchForm)
    },
    // 依据当前條件搜索
    onSearch() {
      this.$emit('search', this.searchForm)
    },
    restForm() {
      const searchForm = {}
      const type_map = ['datetimerange']
      this.searchConfig.forEach((item) => {
        if (type_map.indexOf(item.type) === -1) {
          if (item.type === 'autocomplete') {
            searchForm[`${item.key}_query_str`] = ''
          } else if (item.type === 'interval') {
            if (item.is_simple) {
              searchForm[`min`] = ''
              searchForm[`max`] = ''
            } else {
              searchForm[`${item.key}_min`] = ''
              searchForm[`${item.key}_max`] = ''
            }
          }
          searchForm[item.key] = ''
        } else if (item.slot_label) {
          searchForm[item.label_key] = this.options[`${item.label_key}_enum`][0].value // 'accu_withdraw'
        } else { // 设置初始值數组
          searchForm[item.key] = []
          if (item.is_simple) {
            searchForm[`start`] = ''
            searchForm[`end`] = ''
          } else {
            searchForm[`${item.key}_start`] = ''
            searchForm[`${item.key}_end`] = ''
          }
        }
      })
      return searchForm
    },
    initForm() {
      const searchForm = {}
      const type_map = ['datetimerange']
      const type_map1 = ['interval']
      this.searchConfig.forEach((item) => {
        const is_date_picker = type_map.indexOf(item.type) !== -1
        const is_date_interval = type_map1.indexOf(item.type) !== -1
        if (item.value) { // 初始值
          searchForm[item.key] = item.value
          if (is_date_picker) { // 初始值关聯字段初始化
            if (item.is_simple) {
              searchForm[`start`] = item.value[0]
              searchForm[`end`] = item.value[1]
            } else {
              searchForm[`${item.key}_start`] = item.value[0]
              searchForm[`${item.key}_end`] = item.value[1]
            }
          } else if (is_date_interval) {
            if (item.is_simple) {
              searchForm[`min`] = item.value[0]
              searchForm[`max`] = item.value[1]
            } else {
              searchForm[`${item.key}_min`] = item.value[0]
              searchForm[`${item.key}_max`] = item.value[1]
            }
          }
        } else {
          if (item.slot_label) { // 设置初始值數组
            searchForm[item.label_key] = this.options[`${item.label_key}_enum`][0].value // 'accu_withdraw'
            if (is_date_interval) {
              if (item.is_simple) {
                searchForm[`min`] = ''
                searchForm[`max`] = ''
              } else {
                searchForm[`${item.key}_min`] = ''
                searchForm[`${item.key}_max`] = ''
              }
            } else {
              searchForm[item.key] = ''
            }
          } else if (is_date_picker) {
            searchForm[item.key] = []
            if (item.is_simple) {
              searchForm[`start`] = ''
              searchForm[`end`] = ''
            } else {
              searchForm[`${item.key}_start`] = ''
              searchForm[`${item.key}_end`] = ''
            }
          } else if (is_date_interval) {
            if (item.is_simple) {
              searchForm[`min`] = ''
              searchForm[`max`] = ''
            } else {
              searchForm[`${item.key}_min`] = ''
              searchForm[`${item.key}_max`] = ''
            }
          } else if (!is_date_picker) {
            if (item.type === 'autocomplete') {
              searchForm[`${item.key}_query_str`] = ''
            }
            searchForm[item.key] = ''
          }
        }
      })
      return searchForm
    },
    changeLabelSelect(e, a) {
      this.searchForm[a.key] = ''
      if (a.type === 'interval') {
        if (a.is_simple) {
          this.searchForm[`min`] = ''
          this.searchForm[`max`] = ''
        } else {
          this.searchForm[`${a.key}_min`] = ''
          this.searchForm[`${a.key}_max`] = ''
        }
      } else if (a.type === 'datetimerange') {
        if (a.is_simple) {
          this.searchForm[`start`] = ''
          this.searchForm[`end`] = ''
        } else {
          this.searchForm[`${a.key}_start`] = ''
          this.searchForm[`${a.key}_end`] = ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.row{
  display: flex;
  flex-wrap: wrap;
}
.search-action{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  padding-bottom: 18px;
}
.el-date-editor--datetimerange.el-input__inner{
  width: 100%;
}
.date-piceker{
  v-deep .el-input__inner{
    width: 100% !important;
  }
}

.search-form{
  ::v-deep .el-form-item{
    width: 90%;
    .el-form-item__content{
      .el-autocomplete{
        width: 100%;
      }
      .el-select{
        width: 100%;
      }
      .el-date-editor {
        width: 100%;
      }
    }
  }
}
.search-action-con{
 ::v-deep .el-form-item{
    height: 100%;
    .el-form-item__content{
      height: 100%;
    }
  }
}
</style>
