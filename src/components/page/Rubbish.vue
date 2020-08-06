<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 回收站
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
                <el-table-column prop="productId" label="ID" width="85" align="center"></el-table-column>
                <el-table-column prop="intro" label="产品名称" width="270">
					<template slot-scope="scope">
						<span v-html="scope.row.intro"></span>
					</template>
				</el-table-column>
                <el-table-column prop="price" label="原价">
                    <template slot-scope="scope">{{scope.row.price}}</template>
                </el-table-column>
                <el-table-column prop="promotePrice" label="优惠价">
                    <template slot-scope="scope">{{scope.row.promotePrice}}</template>
                </el-table-column>
                <el-table-column prop="imgUrl" label="封面" align="center">
                    <template slot-scope="scope">
                       <el-image
                           class="table-td-thumb"
                           :src="scope.row.imgUrl[0]"
						   width="50" height="50"
                           :preview-src-list="[scope.row.imgUrl[0]]"
                       ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="shopName" label="店名" width="120">
                    <template slot-scope="scope">
						<span v-html="scope.row.shopName"></span>
					</template>
                </el-table-column>
                <el-table-column prop="userName" label="销量">
                    <template slot-scope="scope">{{scope.row.saleNum}}</template>
                </el-table-column>
                <el-table-column prop="collectNum" label="评论数">
                    <template slot-scope="scope">{{scope.row.collectNum}}</template>
                </el-table-column>
                <el-table-column prop="email" label="库存量">
                    <template slot-scope="scope">{{scope.row.stock}}</template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.row.id)"
                        >还原</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.row.id)"
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
    </div>
</template>

<script>
    import axios from 'axios'
export default {
    name: 'rubbis',
    data() {
        return {
            beforeImg: 'http://img14.360buyimg.com/n5/',
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 20
            },
            tableData: [],
			cid: 0,
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
            const _this=this;
			let keyward = 'null';
			if(this.query.name == '') {keyward = 'null';} else {keyward = this.query.name;}
            this.$http.get("/products/getRemoveProduct/"+_this.query.pageIndex+"/"+_this.query.pageSize)
                .then(response => {
					let res = response.data;
					if(res.code == 200) {
						console.log(response);
						this.tableData = res.data.list;
						this.pageTotal = res.data.total;
						this.$message.success(res.msg);
					} else {
						this.$message.error(res.msg);
					}
                })
        },
        // 触发搜索按钮
        handleSearch() {
			this.query.pageIndex = 1,
			this.query.pageSize = 10,
            this.getData();
        },
        // 删除操作
        handleDelete(index, id) {
            // 二次确认删除
            this.$confirm('确定要从回收站删除，删除之后不能恢复？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$http
					.delete()
					.then(resp => {
						let res = resp.data;
						if(res.code == 200) {
							this.getData();
						} else {
							this.$message.error(res.msg);
						}
					});
                });
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
