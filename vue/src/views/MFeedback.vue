<template>
  <div style="padding: 20px;">
    <h2>问题反馈管理</h2>

    <!-- 反馈列表 -->
    <el-table :data="feedbacks" style="width: 100%">
      <el-table-column label="反馈编号" prop="id" width="100"></el-table-column>
      <el-table-column label="用户" prop="user" width="150"></el-table-column>
      <el-table-column label="反馈内容" prop="content"></el-table-column>
      <el-table-column label="状态" prop="status" width="120"></el-table-column>

      <!-- 操作列，使用 slot-scope -->
      <el-table-column label="操作" width="180">
        <template v-slot="scope">
          <!-- 确保只有当 `scope.row` 存在时才访问 -->
          <el-button
              v-if="scope.row && scope.row.status === '待回复'"
              size="mini"
              @click="handleReply(scope.row)"
              type="primary"
          >
            回复
          </el-button>
          <span v-else>{{scope.row && scope.row.reply}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 回复弹窗 -->
    <el-dialog
        title="回复用户反馈"
        width="50%"
        v-model="dialogVisible"
        @close="clearReplyForm"
    >
      <el-form :model="currentFeedback">
        <el-form-item label="反馈内容">
          <el-input
              type="textarea"
              :rows="3"
              v-model="currentFeedback.content"
              disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="管理员回复">
          <el-input
              type="textarea"
              :rows="4"
              v-model="currentFeedback.reply"
              placeholder="请输入回复内容"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitReply">提交回复</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      feedbacks: [
        {
          id: 1,
          user: "用户A",
          content: "我在使用产品时遇到了无法登录的问题，请尽快处理。",
          status: "待回复", // 反馈状态：待回复/已回复
          reply: "", // 回复内容
        },
        {
          id: 2,
          user: "用户B",
          content: "产品的某个功能无法正常使用，出现了错误提示。",
          status: "待回复",
          reply: "",
        },
        {
          id: 3,
          user: "用户C",
          content: "感谢产品，使用过程中没有任何问题。",
          status: "已回复",
          reply: "感谢您的支持，祝您使用愉快！",
        },
      ],
      dialogVisible: false, // 控制回复弹窗显示
      currentFeedback: null, // 当前要回复的反馈
    };
  },
  methods: {
    // 点击回复按钮时弹出回复窗口
    handleReply(feedback) {
      this.currentFeedback = { ...feedback }; // 复制反馈数据
      this.dialogVisible = true; // 显示回复弹窗
      console.log(this.dialogVisible);
    },
    // 提交回复
    submitReply() {
      if (this.currentFeedback && this.currentFeedback.reply.trim() !== "") {
        // 更新反馈状态和回复内容
        const feedbackIndex = this.feedbacks.findIndex(
            (feedback) => feedback.id === this.currentFeedback.id
        );
        if (feedbackIndex !== -1) {
          this.feedbacks[feedbackIndex].status = "已回复";
          this.feedbacks[feedbackIndex].reply = this.currentFeedback.reply;
        }

        // 关闭回复窗口
        this.dialogVisible = false;
        this.currentFeedback = null;
      } else {
        this.$message.error("请输入回复内容");
      }
    },
    // 清空回复表单
    clearReplyForm() {
      this.currentFeedback = null;
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
.el-table {
  margin-bottom: 20px;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
