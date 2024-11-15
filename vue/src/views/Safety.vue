<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px; padding: 10px">
    <el-form-item label="检查报告标题">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="选择地点">
      <el-select v-model="form.region" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="检查日期">
      <el-col :span="11">
        <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="是否出现安全隐患">
      <el-switch v-model="form.delivery" />
    </el-form-item>
    <el-form-item label="检查项目">
      <el-checkbox-group v-model="form.type">
        <el-checkbox value="Online_activities">
          生产设备
        </el-checkbox>
        <el-checkbox value="Promotion_activities">
          辅助设施
        </el-checkbox>
        <el-checkbox value="Offline_activities">
          安全设施
        </el-checkbox>
        <el-checkbox value="Simple_brand_exposure">
          作业描述
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="检查结果描述">
      <el-input v-model="form.desc" type="textarea" rows="20" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

// do not use same name with ref
import {ElMessage} from "element-plus";

export default {
  created(){
    let userStr = sessionStorage.getItem("user") ||"{}"
    this.user = JSON.parse(userStr)
    this.load()
  },
  name: 'safety',
  methods: {
    load(){
      ElMessage.warning("界面加载");
    },
    onSubmit(){
      console.log('submit!');
    }
  },
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
}


</script>