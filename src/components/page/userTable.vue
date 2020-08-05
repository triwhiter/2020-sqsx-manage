<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 人员管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>
                <el-button
                        type="primary"
                        icon="el-icon-plus"
                        class="handle-del mr10"
                        @click="handleAdd"
                >添加</el-button>
                <el-input v-model="query.name" placeholder="搜索内容" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="nickName" label="昵称"></el-table-column>
                <el-table-column prop="sexual" label="性别">
                    <template slot-scope="scope">{{scope.row.sex}}</template>
                </el-table-column>
                <el-table-column prop="avatar" label="头像" align="center">
                    <template slot-scope="scope">
<!--                        <el-image-->
<!--                            class="table-td-thumb"-->
<!--                            :src="beforeImg+scope.row.avatar"-->
<!--                            :preview-src-list="[scope.row.avatar]"-->
<!--                        ></el-image>-->
                        <img :src="scope.row.avatar+'' +'?'+scope.row.sex+'&'+scope.row.id" class="table-td-thumb">
                    </template>
                </el-table-column>
                <el-table-column prop="level" label="会员等级">
                    <template slot-scope="scope">{{scope.row.level}}</template>
                </el-table-column>
                <el-table-column prop="userName" label="姓名">
                    <template slot-scope="scope">{{scope.row.userName}}</template>
                </el-table-column>
                <el-table-column prop="phoneNumber" label="电话">
                    <template slot-scope="scope">{{scope.row.phoneNumber}}</template>
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                    <template slot-scope="scope">{{scope.row.email}}</template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row.id)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="editForm" label-width="70px">
                <el-form-item label="昵称">
                    <el-input v-model="editForm.nickName"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="editForm.sex"></el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <el-input v-model="editForm.avatar"></el-input>
                </el-form-item>
                <el-form-item label="会员等级">
                    <el-input v-model="editForm.level"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="editForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="editForm.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="editForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="editForm.password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="添加" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="addForm" label-width="70px">
                <el-form-item label="昵称">
                    <el-input v-model="addForm.nickName"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="addForm.sex"></el-input>
                </el-form-item>
                <el-form-item label="头像">
                    <el-input v-model="addForm.avatar"></el-input>
                </el-form-item>
                <el-form-item label="会员等级">
                    <el-input v-model="addForm.level"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="addForm.userName"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="addForm.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="addForm.password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios'
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 20
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            addVisible :false,
            pageTotal: 0,
            addForm: {},
            editForm:{},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            const _this=this
            this.$http.get("/user/getAllUserInfo/"+_this.query.pageIndex+"/"+_this.query.pageSize)
                .then(response => {
                    if(response.data){
                        console.log(response.data);
                        this.tableData = [];
                        this.pageTotal= response.data.data.total;
                        this.tableData = response.data.data.records;
                    }
                })
                .catch(error => {
                    console.log(error.message);
                    alert(error.message);
                })
        },
        // 触发搜索按钮
        handleSearch() {
            const _this=this
            axios.get("http://localhost:8083/admin/selectMusic/" + _this.query.name + '/' +_this.query.pageIndex+"/"+_this.query.pageSize)
                .then(response => {
                    if(response.data){
                        console.log(response.data.records);
                        this.tableData = [];
                        this.tableData = response.data.records;
                    }
                })
                .catch(error => {
                    console.log(error.message);
                    alert(error.message);
                })
            this.$set(this.query, 'pageIndex', 1);
        },
        // 删除操作
        handleDelete(index, id) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    axios.delete("http://localhost:8088/api/user/del/"+id);
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.editForm = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            axios.put("http://localhost:8088/api/user/editUser",this.editForm)
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 添加操作
        handleAdd() {
            this.addVisible = true;
        },
        // 保存添加
        saveAdd() {
            axios.post("http://localhost:8088/api/user/addUser",this.addForm)
            this.addVisible = false;
            this.$message.success(`添加成功`);
            this.$set(this.tableData, this.idx, this.addForm);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
