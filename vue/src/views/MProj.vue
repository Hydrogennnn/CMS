<template>
  <div style="padding: 20px;">
    <h2>项目管理</h2>

    <!-- 搜索框 -->
    <el-input
        v-model="searchQuery"
        placeholder="搜索项目名称或负责人"
        style="width: 300px; margin-bottom: 20px;"
        @input="handleSearch"
    />

    <!-- 新增项目按钮 -->
    <el-button type="primary" @click="openAddDialog" style="margin-bottom: 20px;">
      新增项目
    </el-button>

    <!-- 项目列表 -->
    <el-table :data="filteredProjects" style="width: 100%">
      <el-table-column label="项目编号" prop="id" width="100"></el-table-column>
      <el-table-column label="项目名称" prop="name"></el-table-column>
      <el-table-column label="参与人员" prop="participants"></el-table-column>
      <el-table-column label="施工单位" prop="contractor"></el-table-column>
      <el-table-column label="开始时间" prop="startDate" width="150"></el-table-column>
      <el-table-column label="负责人" prop="leader"></el-table-column>
      <el-table-column label="状态" prop="status" width="120"></el-table-column>
      <el-table-column label="操作" width="180">
        <template v-slot="scope">
          <el-button size="mini" @click="openEditDialog(scope.row)" type="warning">编辑</el-button>
          <el-button size="mini" @click="deleteProject(scope.row.id)" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增/编辑项目弹窗 -->
    <el-dialog
        title="新增/编辑项目"
        v-model="dialogVisible"
        width="50%"
        @close="clearForm"
    >
      <el-form :model="currentProject">
        <el-form-item label="项目名称" required>
          <el-input v-model="currentProject.name" placeholder="请输入项目名称"></el-input>
        </el-form-item>

        <el-form-item label="参与人员" required>
          <el-select
              v-model="currentProject.participants"
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

        <el-form-item label="施工单位" required>
          <el-input v-model="currentProject.contractor" placeholder="请输入施工单位"></el-input>
        </el-form-item>

        <el-form-item label="开始时间" required>
          <el-date-picker
              v-model="currentProject.startDate"
              type="date"
              placeholder="请选择开始时间"
              style="width: 100%"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="负责人" required>
          <el-select
              v-model="currentProject.leader"
              placeholder="请选择负责人"
              style="width: 100%"
          >
            <el-option label="张三" value="张三"></el-option>
            <el-option label="李四" value="李四"></el-option>
            <el-option label="王杰栋" value="王杰栋"></el-option>
            <el-option label="赵六" value="赵六"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" required>
          <el-select v-model="currentProject.status" placeholder="请选择状态">
            <el-option label="进行中" value="进行中"></el-option>
            <el-option label="已完成" value="已完成"></el-option>
            <el-option label="暂停" value="暂停"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注">
          <el-input
              type="textarea"
              v-model="currentProject.remarks"
              placeholder="请输入备注信息"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveProject">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "", // 搜索框的输入
      dialogVisible: false, // 控制弹窗显示
      currentProject: { // 当前编辑或新增的项目
        id: null,
        name: "",
        participants: [],
        contractor: "",
        startDate: "",
        leader: "",
        status: "进行中",
        remarks: "",
      },
      projects: [ // 项目数据
        {
          id: 1,
          name: "项目A",
          participants: ["张三", "李四"],
          contractor: "施工单位X",
          startDate: "2024-01-01",
          leader: "王杰栋",
          status: "进行中",
          remarks: "正常进行中",
        },
        {
          id: 2,
          name: "项目B",
          participants: ["赵六", "钱七"],
          contractor: "施工单位Y",
          startDate: "2024-02-15",
          leader: "李华",
          status: "已完成",
          remarks: "已按时完成",
        },
        {
          id: 3,
          name: "项目C",
          participants: ["孙八", "周九"],
          contractor: "施工单位Z",
          startDate: "2024-03-01",
          leader: "李四",
          status: "暂停",
          remarks: "由于不可抗力暂停",
        },
      ],
    };
  },
  computed: {
    // 过滤后的项目列表，根据搜索框内容过滤
    filteredProjects() {
      return this.projects.filter(project => {
        const query = this.searchQuery.toLowerCase();
        return (
            project.name.toLowerCase().includes(query) ||
            project.leader.toLowerCase().includes(query)
        );
      });
    },
  },
  methods: {
    // 打开新增项目弹窗
    openAddDialog() {
      this.currentProject = { id: null, name: "", participants: [], contractor: "", startDate: "", leader: "", status: "进行中", remarks: "" };
      this.dialogVisible = true;
    },
    // 打开编辑项目弹窗
    openEditDialog(project) {
      this.currentProject = { ...project };
      this.dialogVisible = true;
    },
    // 保存项目（新增或编辑）
    saveProject() {
      if (!this.currentProject.name || !this.currentProject.participants.length || !this.currentProject.contractor || !this.currentProject.startDate || !this.currentProject.leader) {
        this.$message.error("请填写完整的项目信息！");
        return;
      }

      // 如果是新增项目
      if (this.currentProject.id === null) {
        const newId = this.projects.length ? Math.max(...this.projects.map(p => p.id)) + 1 : 1;
        const newProject = { ...this.currentProject, id: newId };
        this.projects.push(newProject);
      } else {
        // 如果是编辑项目
        const index = this.projects.findIndex(p => p.id === this.currentProject.id);
        if (index !== -1) {
          this.projects[index] = { ...this.currentProject };
        }
      }

      this.dialogVisible = false;
      this.clearForm();
    },
    // 删除项目
    deleteProject(id) {
      this.$confirm("确定要删除这个项目吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.projects = this.projects.filter(p => p.id !== id);
        this.$message.success("项目已删除！");
      }).catch(() => {});
    },
    // 清空表单数据
    clearForm() {
      this.currentProject = { id: null, name: "", participants: [], contractor: "", startDate: "", leader: "", status: "进行中", remarks: "" };
    },
    // 处理搜索框输入
    handleSearch() {
      // 这个方法会根据 searchQuery 的变化自动过滤项目
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
