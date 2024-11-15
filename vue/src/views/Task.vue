<template>
  <div style="padding: 20px;">
    <h2>任务管理-{{project}}</h2>

    <!-- 未完成的任务列表 -->
    <el-table :data="unfinishedTasks" style="width: 100%" v-if="unfinishedTasks.length">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          label="任务名称"
          prop="name">
      </el-table-column>
      <el-table-column
          label="状态"
          prop="status">
      </el-table-column>
    </el-table>

    <div v-if="unfinishedTasks.length === 0">
      <p>没有未完成的任务。</p>
    </div>

    <!-- 已完成任务操作 -->
    <el-button type="primary" @click="submitCompletedTasks" :disabled="!completedTasks.length">
      提交已完成任务
    </el-button>

    <!-- 显示已完成的任务 -->
    <h3 style="margin-top: 20px;">已完成的任务</h3>
    <el-table :data="completedTasks" style="width: 100%" v-if="completedTasks.length">
      <el-table-column
          label="任务名称"
          prop="name">
      </el-table-column>
      <el-table-column
          label="状态"
          prop="status">
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  data() {
    return {
      project: "二基楼改造项目",
      // 初始的任务列表，包含状态
      tasks: [
        { name: "任务 A", status: "未完成", isSelected: false },
        { name: "任务 B", status: "未完成", isSelected: false },
        { name: "任务 C", status: "未完成", isSelected: false },
        { name: "任务 D", status: "未完成", isSelected: false },
      ],
    };
  },
  computed: {
    // 计算未完成的任务
    unfinishedTasks() {
      return this.tasks.filter(task => task.status === "未完成");
    },
    // 计算已完成的任务
    completedTasks() {
      return this.tasks.filter(task => task.status === "已完成");
    }
  },
  methods: {
    // 提交已完成的任务
    submitCompletedTasks() {
      // 将选中的任务状态改为已完成
      this.tasks.forEach(task => {
        if (task.isSelected) {
          task.status = "已完成";
          task.isSelected = false; // 选中状态重置
        }
      });
    }
  }
};
</script>

<style scoped>
/* 样式可以根据需求修改 */
h2 {
  margin-bottom: 20px;
}
.el-table {
  margin-bottom: 20px;
}
</style>
