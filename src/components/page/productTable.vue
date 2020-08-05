<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 音乐管理
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
                <el-input v-model="query.name" placeholder="音乐名称" class="handle-input mr10"></el-input>
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
                <el-table-column prop="name" label="音乐名称"></el-table-column>
                <el-table-column prop="actor" label="歌手名称">
                    <template slot-scope="scope">{{scope.row.player}}</template>
                </el-table-column>
                <el-table-column prop="poster" label="海报(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                                class="table-td-thumb"
                                :src="scope.row.poster"
                                :preview-src-list="[scope.row.poster]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="profile" label="音乐介绍"></el-table-column>
                <el-table-column label="资源状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.status==='上映中'?'success':(scope.row.status==='已下线'?'danger':'')"
                        >{{scope.row.status}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="releaseDate" label="发布时间"></el-table-column>
                <el-table-column prop="classId" label="类别"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row,scope.row.id)"
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
                        small
                        layout="prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="editForm" label-width="70px">
                <el-form-item label="ID">
                    <el-input v-model="editForm.id"></el-input>
                </el-form-item>
                <el-form-item label="音乐">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="歌手">
                    <el-input v-model="editForm.player"></el-input>
                </el-form-item>
                <el-form-item label="海报">
                    <el-input v-model="editForm.poster"></el-input>
                </el-form-item>
                <el-form-item label="音乐介绍">
                    <el-input v-model="editForm.profile"></el-input>
                </el-form-item>
                <el-form-item label="上线状态">
                    <el-input v-model="editForm.status"></el-input>
                </el-form-item>
                <el-form-item label="发布时间">
                    <el-input v-model="editForm.releaseDate"></el-input>
                </el-form-item>
                <el-form-item label="类别">
                    <el-input v-model="editForm.classId"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog title="添加" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="addForm" label-width="70px">
                <el-form-item label="ID">
                    <el-input v-model="addForm.id"></el-input>
                </el-form-item>
                <el-form-item label="音乐">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="歌手">
                    <el-input v-model="addForm.player"></el-input>
                </el-form-item>
                <el-form-item label="海报">
                    <el-input v-model="addForm.poster"></el-input>
                </el-form-item>
                <el-form-item label="音乐介绍">
                    <el-input v-model="addForm.profile"></el-input>
                </el-form-item>
                <el-form-item label="上线状态">
                    <el-input v-model="addForm.status"></el-input>
                </el-form-item>
                <el-form-item label="发布时间">
                    <el-input v-model="addForm.releaseDate"></el-input>
                </el-form-item>
                <el-form-item label="类别">
                    <el-input v-model="addForm.classId"></el-input>
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
        name: 'producttable',
        data() {
            return {
                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 4
                },
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                addVisible :false,
                pageTotal: 12,
                addForm: {},
                editForm: {},
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
                axios.get("http://localhost:8083/admin/getMusic/"+_this.query.pageIndex+"/"+_this.query.pageSize)
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
                        axios.get("http://localhost:8083/admin/deleteMusic/"+id)
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
            handleEdit(index, row ,id) {
                axios.get("http://localhost:8083/admin/getMusicOne/"+id)
                    .then(response => {
                        if(response.data){
                            console.log(response.data);
                            this.editForm = [];
                            this.editForm = response.data;
                        }
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
                this.idx = index;
                this.editForm = row;
                this.editVisible = true;
            },
            // 保存编辑
            saveEdit() {
                axios.post("http://localhost:8083/admin/updateMusic/",this.editForm)
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                this.$set(this.tableData, this.idx, this.editForm);
            },
            // 添加操作
            handleAdd() {
                this.addVisible = true;
            },
            // 保存添加
            saveAdd() {
                axios.post("http://localhost:8083/admin/addMusic/",this.addForm)
                this.addVisible = false;
                this.$message.success(`添加成功`);
                this.$set(this.tableData, this.idx, this.form);
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
