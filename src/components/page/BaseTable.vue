<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 订单管理
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
                <el-table-column prop="user_name" label="下单姓名"></el-table-column>
				<el-table-column prop="amount" label="总价格"></el-table-column>
<!--                <el-table-column prop="actor" label="歌手名称">
                    <template slot-scope="scope">{{scope.row.player}}</template>
                </el-table-column> -->
<!--                <el-table-column prop="poster" label="海报(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                                class="table-td-thumb"
                                :src="scope.row.poster"
                                :preview-src-list="[scope.row.poster]"
                        ></el-image>
                    </template>
                </el-table-column> -->
                <el-table-column prop="area" label="收获地址"></el-table-column>
                <el-table-column label="审核状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                        :type="scope.row.status==='已审核'?'success':(scope.row.status==='未审核'?'danger':'')"
                        >{{scope.row.status}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="phone_number" label="联系方式"></el-table-column>
                <el-table-column prop="create_time" label="下单时间"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="light" open-delay="500" content="审核订单" placement="bottom" :enterable="false">
                    <el-button type="primary" size="mini" icon="el-icon-edit"
                    circle
                    @click="checkOrderById(scope.row.id)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="light" open-delay="500" content="查看明细" placement="bottom" :enterable="false">
                    <el-button
                      type="success"
                      size="mini"
                      icon="el-icon-location"
                      circle
                      @click="showOrderDetailById(scope.row.id)"
                    ></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="light" open-delay="500" content="删除订单" placement="bottom" :enterable="false">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      circle
                      @click="removeOrderById(scope.row.id)"
                    ></el-button>
                    </el-tooltip>
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

        <!-- 展示物订单详情对话框 -->
        <el-dialog title="查看订单详情" :visible.sync="detailVisible" width="50%">
        <!-- 订单详情 -->
        <template>
        <el-table
            :data="detailData"
            height="250"
            border
            style="width: 100%">
            <el-table-column
              label="图片"
              align="center"
            >
            <template slot-scope="scope">
              <img :src="beforeImg + scope.row.img_url" width="50" height="50" />
            </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="食品名"
              width="300">
            </el-table-column>
            <el-table-column
              prop="promote_price"
              label="单价 (单位:元)"
              >
            </el-table-column>
            <el-table-column
              prop="number"
              label="购买数量">
            </el-table-column>
          </el-table>
          </template>
        </el-dialog>
    </div>
</template>

<script>
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
                detailData: [],
                delList: [],
				detailVisible: false,
                pageTotal: 12,
                addForm: {},
                editForm: {},
                idx: -1,
                id: -1,
				beforeImg: "http://img14.360buyimg.com/n5/",
            };
        },
        created() {
            this.getData();
        },
        methods: {
            // 获取 easy-mock 的模拟数据
            getData() {
                const _this=this
                this.$http.get("/orderList/getAllOrderInfo/"+_this.query.pageIndex+"/"+_this.query.pageSize)
                    .then(response => {
						// console.log(response);
						let res = response.data;
						console.log(res);
                        if(res.code == 200){
                            this.tableData = [];
                            this.tableData = res.data;
							this.pageTotal = res.data[0].total;
                        } else {
							this.$message.error(res.msg);
						}
                    });
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
            // 审核订单
            checkOrderById(id) {
				this.$confirm('确定审核？', '提示', {
					type: 'warning'
				})
				.then(() => {
				this.$http.put("/orderList/updateStatusById/"+ id)
					.then(resp => {
						let res = resp.data;
						if(res.code == 200) {
							this.getData();
							this.$message.success(res.msg);
						} else {
							this.$message.error(res.msg);
						}
					});
					});
            },
			//展示订单详情
            showOrderDetailById (id) {
				this.detailVisible = true;
				this.$http
				.get('/orderList/getProductInfoById/' + id)
				.then(resp => {
					let res = resp.data;
					console.log(res);
					if(res.code == 200) {
						this.detailData = res.data;
					} else {
						this.$message.error(res.msg);
					}
				});
			},
			removeOrderById (id) {
				this.$confirm('确定要删除吗？','提示', {
					type: Error
				})
				.then(() => {
					//删除订单
					this.$http
					.delete('/orderList/delOrder/'+ id)
					.then(resp => {
						let res = resp.data;
						console.log(res);
						if(res.code == 200) {
							this.getData();
							this.$message.success(res.msg);
						} else {
							this.$message.error(res.msg);
						}
					})
				});
			},
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
