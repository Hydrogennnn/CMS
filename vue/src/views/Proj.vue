<template>
  <div style="padding: 10px">
    <h2>我的项目</h2>
    <el-card v-for="(item,i) in projects" :key="i"
             class="box-card"
             style="width: 400px; margin-top: 10px;margin-right: 10px; float: left"
             shadow="hover">
      <template #header>
        <div class="card-header">
          <span>项目 {{i+1}}</span>
          <el-button class="button" text style="margin-left: 10px">任务管理</el-button>
        </div>
      </template>
      {{item}}



    </el-card>
  </div>


</template>



<script>
// @ is an alias to /src
import request from "../utils/request";
import {ElMessage} from "element-plus";
import moment from "moment";
export default {
  created(){
    let userStr = sessionStorage.getItem("user") ||"{}"
    this.user = JSON.parse(userStr)
    this.load()
  },
  name: 'feedback',
  methods: {
    load(){
      ElMessage.warning("界面加载");
    }
  },
  data() {
    return {
      // form: {},
      // form2:{},
      // form3:{},
      // dialogVisible: false,
      // dialogVisible2: false,
      // search1:'',
      // search2:'',
      // search3:'',
      // total:10,
      // currentPage:1,
      // pageSize: 10,
      // tableData: [],
      // user:{},
      // forms:[],
      feedContent: "",
      projects: [
          "四川大学校园拆迁项目",
          "计算机学院二基楼改造项目",
          "小西门改造项目"
      ]
    }
  },
}
</script>
