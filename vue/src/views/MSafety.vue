<template>
  <div style="padding: 20px;">
    <h2>安全检查信息</h2>

    <!-- 过滤框 -->
    <el-input
        v-model="searchQuery"
        placeholder="搜索报告标题或地点"
        style="width: 300px; margin-bottom: 20px;"
        @input="handleSearch"
    />

    <!-- 安全检查报告列表 -->
    <el-table :data="filteredReports" style="width: 100%">
      <el-table-column label="报告标题" prop="name"></el-table-column>
      <el-table-column label="检查地点" prop="region"></el-table-column>
      <el-table-column label="检查日期" prop="date1" width="150"></el-table-column>
      <el-table-column label="安全隐患" prop="delivery" width="120">
        <template v-slot="scope">
          <el-switch :disabled="true" v-model="scope.row.delivery" active-text="是" inactive-text="否"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="检查项目" prop="type"></el-table-column>
      <el-table-column label="操作" width="180">
        <template v-slot="scope">
          <el-button size="mini" @click="viewReport(scope.row)" type="primary">查看报告</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看报告弹窗 -->
    <el-dialog
        title="查看安全检查报告"
        v-model="reportDialogVisible"
        width="50%"
        @close="clearReportForm"
    >
      <el-form :model="currentReport">
        <el-form-item label="报告标题">
          <el-input v-model="currentReport.name" disabled />
        </el-form-item>
        <el-form-item label="检查地点">
          <el-input v-model="currentReport.region" disabled />
        </el-form-item>
        <el-form-item label="检查日期">
          <el-input v-model="currentReport.date1" disabled />
        </el-form-item>
        <el-form-item label="是否有安全隐患">
          <el-switch v-model="currentReport.delivery" disabled />
        </el-form-item>
        <el-form-item label="检查项目">
          <el-input v-model="currentReport.type" disabled />
        </el-form-item>
        <el-form-item label="检查结果描述">
          <el-input
              v-model="currentReport.desc"
              type="textarea"
              rows="10"
              disabled
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="reportDialogVisible = false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';

export default {
  data() {
    return {
      searchQuery: '', // 搜索框的内容
      reportDialogVisible: false, // 控制查看报告弹窗显示
      currentReport: { // 当前查看的报告
        name: '',
        region: '',
        date1: '',
        delivery: false,
        type: [],
        desc: ''
      },
      reports: [ // 假设的安全检查报告数据
        {
          id: 1,
          name: '上海安全检查报告',
          region: '上海',
          date1: '2024-10-01',
          delivery: true,
          type: ['生产设备', '安全设施'],
          desc: '检查发现设备运作正常，但安全设施需要加强。',
        },
        {
          id: 2,
          name: '北京安全检查报告',
          region: '北京',
          date1: '2024-10-02',
          delivery: false,
          type: ['辅助设施', '作业描述'],
          desc: '未发现安全隐患，所有设施正常。',
        },
        {
          id: 3,
          name: '广州安全检查报告',
          region: '广州',
          date1: '2024-10-03',
          delivery: true,
          type: ['生产设备', '作业描述'],
          desc: '生产设备部分故障，需尽快修复。',
        }
      ]
    };
  },
  computed: {
    // 根据搜索框内容过滤报告列表
    filteredReports() {
      return this.reports.filter(report => {
        const query = this.searchQuery.toLowerCase();
        return (
            report.name.toLowerCase().includes(query) ||
            report.region.toLowerCase().includes(query)
        );
      });
    }
  },
  methods: {
    // 处理搜索框输入
    handleSearch() {
      // 此方法在每次搜索框输入时触发，自动过滤报告列表
    },
    // 查看报告
    viewReport(report) {
      this.currentReport = { ...report };
      this.reportDialogVisible = true;
    },
    // 清空报告表单数据
    clearReportForm() {
      this.currentReport = {
        name: '',
        region: '',
        date1: '',
        delivery: false,
        type: [],
        desc: ''
      };
    }
  }
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
