<template>
  <div style="padding: 20px;">
    <h2>发布通知</h2>

    <!-- 发布新通知按钮 -->
    <el-button type="primary" @click="openAddDialog" style="margin-bottom: 20px;">
      发布通知
    </el-button>

    <!-- 通知列表 -->
    <el-table :data="notifications" style="width: 100%">
      <el-table-column label="通知编号" prop="id" width="100"></el-table-column>
      <el-table-column label="通知标题" prop="title"></el-table-column>
      <el-table-column label="通知内容" prop="content"></el-table-column>
      <el-table-column label="发布时间" prop="date" width="200"></el-table-column>
      <el-table-column label="操作" width="180">
        <template v-slot="scope">
          <el-button size="mini" @click="openEditDialog(scope.row)" type="warning">编辑</el-button>
          <el-button size="mini" @click="deleteNotification(scope.row.id)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑通知弹窗 -->
    <el-dialog
        title="发布/编辑通知"
        v-model="dialogVisible"
        width="50%"
        @close="clearForm"
    >
      <el-form :model="currentNotification">
        <el-form-item label="通知标题" required>
          <el-input v-model="currentNotification.title" placeholder="请输入通知标题"></el-input>
        </el-form-item>

        <el-form-item label="通知内容" required>
          <el-input
              type="textarea"
              :rows="4"
              v-model="currentNotification.content"
              placeholder="请输入通知内容"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveNotification">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 通知列表数据
      notifications: [
        {
          id: 1,
          title: "系统维护通知",
          content: "将于今晚进行系统维护，届时系统可能无法访问。",
          date: "2024-11-10 10:00:00",
        },
        {
          id: 2,
          title: "假期安排",
          content: "请大家提前安排好工作，放假期间不安排加班。",
          date: "2024-11-12 08:00:00",
        },
      ],
      dialogVisible: false, // 控制弹窗显示
      currentNotification: { // 当前编辑/添加的通知
        id: null,
        title: "",
        content: "",
        date: "",
      },
    };
  },
  methods: {
    // 打开新增通知的弹窗
    openAddDialog() {
      this.currentNotification = { id: null, title: "", content: "", date: "" };
      this.dialogVisible = true;
    },
    // 打开编辑通知的弹窗
    openEditDialog(notification) {
      this.currentNotification = { ...notification }; // 深拷贝，防止修改原数据
      this.dialogVisible = true;
    },
    // 保存通知（新增或编辑）
    saveNotification() {
      if (!this.currentNotification.title || !this.currentNotification.content) {
        this.$message.error("请填写完整的通知信息！");
        return;
      }

      // 如果是新增通知
      if (this.currentNotification.id === null) {
        const newId = this.notifications.length ? Math.max(...this.notifications.map(n => n.id)) + 1 : 1;
        const newNotification = { ...this.currentNotification, id: newId, date: new Date().toLocaleString() };
        this.notifications.push(newNotification);
      } else {
        // 如果是编辑通知
        const index = this.notifications.findIndex(n => n.id === this.currentNotification.id);
        if (index !== -1) {
          this.notifications[index] = { ...this.currentNotification };
        }
      }

      this.dialogVisible = false;
      this.clearForm();
    },
    // 删除通知
    deleteNotification(id) {
      this.$confirm("确定要删除这个通知吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.notifications = this.notifications.filter(n => n.id !== id);
        this.$message.success("通知已删除！");
      }).catch(() => {});
    },
    // 清空表单数据
    clearForm() {
      this.currentNotification = { id: null, title: "", content: "", date: "" };
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
