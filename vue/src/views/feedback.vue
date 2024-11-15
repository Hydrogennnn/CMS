<template>
  <div class="home" style ="padding: 10px">
    <!-- 搜索-->
    <div style="padding: 10px">
      <h1>问题反馈</h1>
      <br>
      <el-input type="textarea" v-model="feedContent" style="width: 50%; padding-bottom: 10px  " rows="10" ></el-input><br>
      <el-button size="large" type="primary">提交</el-button>
    </div>

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
      notice: [
        { title: "通知 1", content: "这是通知内容 1" },
        { title: "通知 2", content: "这是通知内容 2" },
        { title: "通知 3", content: "这是通知内容 3" }
      ]
    }
  },
}
</script>
