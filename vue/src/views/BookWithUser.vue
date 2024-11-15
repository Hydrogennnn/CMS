<template>
  <div class="home" style ="padding: 10px">
    <!-- 搜索-->
    <el-card v-for="(item, index) in notice" :key="index" shadow="hover" style="margin-bottom: 15px;">
      <div style="width: 60%">
        <h3>{{item.title}}</h3>
        <p>{{item.content}}</p>
      </div>
      <el-button type="danger" size="mini" @click="handleDelete(index)" style="float: right;">
        删除
      </el-button>
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
  name: 'bookwithuser',
  methods: {

    handleSelectionChange(val){
      this.forms = val
    },
    deleteBatch(){
      if (!this.forms.length) {
        ElMessage.warning("请选择数据！")
        return
      }
    //  一个小优化，直接发送这个数组，而不是一个一个的提交删除
      request.post("bookwithuser/deleteRecords",this.forms).then(res =>{
        if(res.code === '0'){
          ElMessage.success("批量删除成功")
          this.load()
        }
        else {
          ElMessage.error(res.msg)
        }
      })
    },
    load(){
      if(this.user.role == 1){
        request.get("/bookwithuser",{
          params:{
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            search1: this.search1,
            search2: this.search2,
            search3: this.search3,
          }
        }).then(res =>{
          console.log(res)
          this.tableData = res.data.records
          this.total = res.data.total
        })
      }
      else {
        request.get("/bookwithuser",{
          params:{
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            search1: this.search1,
            search2: this.search2,
            search3: this.user.id,
          }
        }).then(res =>{
          console.log(res)
          this.tableData = res.data.records
          this.total = res.data.total
        })
      }
    },
    clear(){
      this.search1 = ""
      this.search2 = ""
      this.search3 = ""
      this.load()
    },
    handleDelete(row){
      const form3 = JSON.parse(JSON.stringify(row))
      request.post("bookwithuser/deleteRecord",form3).then(res =>{
        console.log(res)
        if(res.code == 0 ){
          ElMessage.success("删除成功")
        }
        else
          ElMessage.error(res.msg)
        this.load()
      })
    },
    handlereProlong(row){
      var nowDate = new Date(row.deadtime);
      nowDate.setDate(nowDate.getDate()+30);
      row.deadtime = moment(nowDate).format("yyyy-MM-DD HH:mm:ss");
      row.prolong = row.prolong -1;
      request.post("/bookwithuser",row).then(res =>{
        console.log(res)
        if(res.code == 0){
          ElMessage({
            message: '续借成功',
            type: 'success',
          })
        }
        else {
          ElMessage.error(res.msg)
        }
        this.load()
        this.dialogVisible2 = false
      })
    },
    save(){
      //ES6语法
      //地址,但是？IP与端口？+请求参数
      // this.form?这是自动保存在form中的，虽然显示时没有使用，但是这个对象中是有它的
        request.post("/bookwithuser",this.form).then(res =>{
          console.log(res)
          if(res.code == 0){
            ElMessage({
              message: '修改信息成功',
              type: 'success',
            })
          }
          else {
            ElMessage.error(res.msg)
          }
          this.load()
          this.dialogVisible2 = false
        })
    },

    handleEdit(row){
      this.form = JSON.parse(JSON.stringify(row))
      this.dialogVisible2 = true
    },
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum){
      this.pageNum = pageNum
      this.load()
    },

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
      notice: [
        { title: "通知 1", content: "这是通知内容 1" },
        { title: "通知 2", content: "这是通知内容 2" },
        { title: "通知 3", content: "这是通知内容 3" }
      ]
    }
  },
}
</script>
