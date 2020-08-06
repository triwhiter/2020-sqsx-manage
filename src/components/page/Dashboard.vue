<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{user.name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                    	 邮箱：
                        <span>{{user.email}}</span>
                    </div>
                    <div class="user-info-list">
						 电话：
                        <span>{{user.phoneNumber}}</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>语言详情</span>
                    </div>Vue
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>JavaScript
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>CSS
                    <el-progress :percentage="13.7"></el-progress>HTML
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{Utotal}}</div>
                                    <div>用户数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{Ptotal}}</div>
                                    <div>商品数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{Ototal}}</div>
                                    <div>订单数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
				 <el-card shadow="hover" style="height:403px;">
					<div slot="header" class="clearfix">
						<span>待办事项</span>
						<el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
					</div>
					<el-table :show-header="false" :data="todoList" style="width:100%;">
						<el-table-column width="40">
							<template slot-scope="scope">
								<el-checkbox v-model="scope.row.status"></el-checkbox>
							</template>
						</el-table-column>
						<el-table-column>
							<template slot-scope="scope">
								<div
									class="todo-item"
									:class="{'todo-item-del': scope.row.status}"
								>{{scope.row.title}}</div>
							</template>
						</el-table-column>
						<el-table-column width="60">
							<template>
								<i class="el-icon-edit"></i>
								<i class="el-icon-delete"></i>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                   <div id="main-left" style="width: 100%;height: 300px;"></div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                   <div id="main-right" style="width: 100%;height: 300px;"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import echarts from 'echarts'
import bus from '../common/bus';
export default {
    name: 'dashboard',
	mounted () {
	  // 3.基于准备好的dom，初始化echarts实例
	  // var myChart = echarts.init(document.getElementById('main'), 'light')
	  var myChar2 = echarts.init(document.getElementById('main-left'), 'light')
	  var myChar3 = echarts.init(document.getElementById('main-right'))
	  // 4.准备数据项和配置项
	  // 指定图表的配置项和数据
	  var option = {
	    title: {
	      text: '网上书店一周统计'
	    },
	    tooltip: {
	      trigger: 'axis'
	    },
	    legend: {
	      data: ['用户数量', '订单数量', '总营业额', '评论数量']
	    },
	    grid: {
	      left: '3%',
	      right: '4%',
	      bottom: '3%',
	      containLabel: true
	    },
	    toolbox: {
	      feature: {
	        saveAsImage: {}
	      }
	    },
	    xAxis: {
	      type: 'category',
	      boundaryGap: false,
	      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
	    },
	    yAxis: {
	      type: 'value'
	    },
	    series: [
	      {
	        name: '总营业额',
	        type: 'line',
	        stack: '总量',
	        data: [120, 132, 101, 134, 90, 230, 210]
	      },
	      {
	        name: '用户数量',
	        type: 'line',
	        stack: '总量',
	        data: [220, 182, 191, 234, 290, 330, 310]
	      },
	      {
	        name: '订单数量',
	        type: 'line',
	        stack: '总量',
	        data: [150, 232, 201, 154, 190, 330, 410]
	      },
	      {
	        name: '评论数量',
	        type: 'line',
	        stack: '总量',
	        data: [320, 332, 301, 334, 390, 330, 320]
	      }
	    ]
	  }
	  var option2 = {
		  title: {
		    text: '各类商品统计',
			left: 'center'
		  },
	      tooltip: {
	          trigger: 'item',
	          formatter: '{a} <br/>{b}: {c} ({d}%)'
	      },
	      legend: {
	          orient: 'vertical',
	          left: 10,
	          data: ['熟食腊味', '休闲零食', '坚果炒货', '肉干肉脯', '蜜饯果干','糖果/巧克力','饼干蛋糕','方便食品']
	      },
	      series: [
	          {
	              name: '访问来源',
	              type: 'pie',
	              radius: ['50%', '70%'],
	              avoidLabelOverlap: false,
	              label: {
	                  show: false,
	                  position: 'center'
	              },
	              emphasis: {
	                  label: {
	                      show: true,
	                      fontSize: '30',
	                      fontWeight: 'bold'
	                  }
	              },
	              labelLine: {
	                  show: false
	              },
	              data: [
	                  {value: 73, name: '熟食腊味'},
	                  {value: 76, name: '休闲零食'},
	                  {value: 68, name: '坚果炒货'},
	                  {value: 72, name: '肉干肉脯'},
	                  {value: 126, name: '蜜饯果干'},
	                  {value: 99, name: '糖果/巧克力'},
	                  {value: 82, name: '饼干蛋糕'},
	                  {value: 86, name: '方便食品'}
	              ]
	          }
	      ]
	  }
	  var option3 = {
	    color: ['#96BFFF'],
	    title: {
	      text: '品牌月销榜',
	      left: 'center'
	    },
	    tooltip: {
	      trigger: 'axis',
	      axisPointer: {
	        type: 'shadow'
	      }
	    },
	    grid: {
	      left: '3%',
	      right: '4%',
	      bottom: '3%',
	      containLabel: true
	    },
	    xAxis: [
	      {
	        type: 'category',
	        data: ['良品铺子','三只松鼠','百草园','果园老农','好想你'],
	        axisTick: {
	          alignWithLabel: true
	        }
	      }
	    ],
	    yAxis: [
	      {
	        type: 'value'
	      }
	    ],
	    series: [
	      {
	        name: '月销量',
	        type: 'bar',
	        barWidth: '50%',
	        data: [32500,48500,26400,16823,26451]
	      }
	    ]
	  }
	  // this.$http.get('/products/top5').then(resp => {
	  //   myChar3.setOption({
	  //     xAxis: [
	  //       {
	  //         data: resp.data.data.cid,
	  //         axisLabel: {
	  //           interval: 0,
	  //           rotate: 0
	  //         }
	  //       }
	  //     ],
	  //     series: [
	  //       {
	  //         data: res.data.data.saleNum
	  //       }
	  //     ]
	  //   })
	  // })
	  // 数据合并
	  //  const result = _.merge(res.data, this.options)
	  // 5.展示数据
	  // myChart.setOption(option)
	  myChar2.setOption(option2)
	  myChar3.setOption(option3)
	},
    data() {
        return {
            admin: [],
            user: JSON.parse(sessionStorage.getItem('ms_username')), 
            data: [],
            options: {},
            options2: {},
			Ptotal: 0,
			Ototal: 0,
			Utotal: 0,
			todoList: [
			{
				title: '今天要修复100个bug',
				status: false
			},
			{
				title: '今天要修复100个bug',
				status: false
			},
			{
				title: '今天要写100行代码加几个bug吧',
				status: false
			},
			{
				title: '今天要修复100个bug',
				status: false
			},
			{
				title: '今天要修复100个bug',
				status: true
			},
			{
				title: '今天要写100行代码加几个bug吧',
				status: true
			}
		]
        };
    },
    components: {
        Schart
    },
    computed: {
        role() {
            return this.user.isSadmin === 1 ? '超级管理员' : '普通管理员';
        }
    },
    created() {
        // this.getAdmin();
		this.getPtotal();
		this.getOtotal();
		this.getUtotal();
    },
    methods: {
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        },
		getPtotal() {
			this.$http
			.get('products/total')
			.then(resp => {
				let res = resp.data;
				if(res.code == 200) {
					this.Ptotal = res.data;
				} else {
					this.$message.error(res.msg);
				}
			});
		},
		getUtotal() {
			this.$http
			.get('/user/total')
			.then(resp => {
				let res = resp.data;
				if(res.code == 200) {
					this.Utotal = res.data;
				} else {
					this.$message.error(res.msg);
				}
			});
		},
		getOtotal() {
			this.$http
			.get('/orderList/total')
			.then(resp => {
				let res = resp.data;
				if(res.code == 200) {
					this.Ototal = res.data;
				} else {
					this.$message.error(res.msg);
				}
			});
		}
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
