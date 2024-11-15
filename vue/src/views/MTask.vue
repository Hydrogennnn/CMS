<template>
  <div style="padding: 20px;">
    <h2>任务管理</h2>

    <!-- 显示当前项目名称 -->
    <h3>{{ currentProject.name }} - 任务管理</h3>

    <!-- 新增任务按钮 -->
    <el-button type="primary" @click="openAddTaskDialog" style="margin-bottom: 20px;">
      新增任务
    </el-button>

    <!-- 任务列表 -->
    <el-table :data="filteredTasks" style="width: 100%">
      <el-table-column label="任务编号" prop="id" width="100"></el-table-column>
      <el-table-column label="任务内容" prop="taskContent"></el-table-column>
      <el-table-column label="参与人员" prop="participants"></el-table-column>
      <el-table-column label="截至时间" prop="dueDate" width="150"></el-table-column>
      <el-table-column label="状态" prop="status" width="120"></el-table-column>
      <el-table-column label="操作" width="180">
        <template v-slot="scope">
          <el-button size="mini" @click="openEditTaskDialog(scope.row)" type="warning">编辑</el-button>
          <el-button size="mini" @click="deleteTask(scope.row.id)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑任务弹窗 -->
    <el-dialog
        title="新增/编辑任务"
        v-model="taskDialogVisible"
        width="50%"
        @close="clearTaskForm"
    >
      <el-form :model="currentTask">
        <el-form-item label="任务内容" required>
          <el-input v-model="currentTask.taskContent" placeholder="请输入任务内容"></el-input>
        </el-form-item>

        <el-form-item label="参与人员" required>
          <el-select
              v-model="currentTask.participants"
              multiple
              placeholder="请选择参与人员"
              style="width: 100%"
          >
            <el-option label="张三" value="张三"></el-option>
            <el-option label="李四" value="李四"></el-option>
            <el-option label="王杰栋" value="王杰栋"></el-option>
            <el-option label="赵六" value="赵六"></el-option>
            <el-option label="钱七" value="钱七"></el-option>
            <el-option label="孙八" value="孙八"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="截至时间" required>
          <el-date-picker
              v-model="currentTask.dueDate"
              type="date"
              placeholder="请选择截至时间"
              style="width: 100%"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="状态" required>
          <el-select v-model="currentTask.status" placeholder="请选择状态">
            <el-option label="未开始" value="未开始"></el-option>
            <el-option label="进行中" value="进行中"></el-option>
            <el-option label="已完成" value="已完成"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注">
          <el-input
              type="textarea"
              v-model="currentTask.remarks"
              placeholder="请输入备注信息"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="taskDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveTask">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "", // 搜索框的输入
      taskDialogVisible: false, // 控制任务弹窗显示
      currentTask: { // 当前编辑或新增的任务
        id: null,
        taskContent: "",
        participants: [],
        dueDate: "",
        status: "未开始",
        remarks: "",
      },
      // 假设项目的初始数据
      currentProject: {
        id: 1,
        name: "项目A",
      },
      tasks: [ // 任务数据
        {
          id: 1,
          taskContent: "任务1",
          participants: ["张三", "李四"],
          dueDate: "2024-12-31",
          status: "未开始",
          remarks: "任务描述",
        },
        {
          id: 2,
          taskContent: "任务2",
          participants: ["王杰栋", "赵六"],
          dueDate: "2024-12-20",
          status: "进行中",
          remarks: "任务进行中",
        },
        {
          id: 3,
          taskContent: "任务3",
          participants: ["钱七", "孙八"],
          dueDate: "2024-12-15",
          status: "已完成",
          remarks: "任务已完成",
        },
      ],
    };
  },
  computed: {
    // 过滤后的任务列表，根据搜索框内容过滤
    filteredTasks() {
      return this.tasks.filter(task => {
        const query = this.searchQuery.toLowerCase();
        return (
            task.taskContent.toLowerCase().includes(query) ||
            task.participants.some(p => p.toLowerCase().includes(query))
        );
      });
    },
  },
  methods: {
    // 打开新增任务弹窗
    openAddTaskDialog() {
      this.currentTask = { id: null, taskContent: "", participants: [], dueDate: "", status: "未开始", remarks: "" };
      this.taskDialogVisible = true;
    },
    // 打开编辑任务弹窗
    openEditTaskDialog(task) {
      this.currentTask = { ...task };
      this.taskDialogVisible = true;
    },
    // 保存任务（新增或编辑）
    saveTask() {
      if (!this.currentTask.taskContent || !this.currentTask.participants.length || !this.currentTask.dueDate) {
        this.$message.error("请填写完整的任务信息！");
        return;
      }

      // 如果是新增任务
      if (this.currentTask.id === null) {
        const newId = this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
        const newTask = { ...this.currentTask, id: newId };
        this.tasks.push(newTask);
      } else {
        // 如果是编辑任务
        const index = this.tasks.findIndex(t => t.id === this.currentTask.id);
        if (index !== -1) {
          this.tasks[index] = { ...this.currentTask };
        }
      }

      this.taskDialogVisible = false;
      this.clearTaskForm();
    },
    // 删除任务
    deleteTask(id) {
      this.$confirm("确定要删除这个任务吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.$message.success("任务已删除！");
      }).catch(() => {});
    },
    // 清空任务表单数据
    clearTaskForm() {
      this.currentTask = { id: null, taskContent: "", participants: [], dueDate: "", status: "未开始", remarks: "" };
    },
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
h3 {
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
