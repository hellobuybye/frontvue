<template>
     
    
        

    <div class='vBoard'>
        

        <h2 class="title">기본 게시판</h2>


        <table class="board">
            <thead>
                <tr>
                    <th>#</th>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>날짜</th>
                    <!-- <th>조회수</th> -->
                </tr>
            </thead>
            <tbody>
                <vPost v-for="post in postList" :key="post.id" :post="post"></vPost>
                
            </tbody>
        </table>

        <div class="bottom-write-btn">
            <button class="write-btn" @click="writeBoard">글 작성</button>
        </div>

        <vPagination :totalPage="totalPage" :currentPage="pageVal" :pageSize="6" @change-page="doPaging"/>
        
    </div>
    <!-- <v-overlay :model-value="overlay" class="align-center justify-center">
      <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>            
    </v-overlay> -->

    <!-- <v-overlay v-model="overlay"></v-overlay> -->
     
</template>

<script>

import vPost from "./components/vPost.vue";
import vPagination from "./components/vPagination.vue";


export default{
    name:'vBoard',
	components : {
		vPost,
		vPagination,        
	},
    
    data() {
        return {
            postList : [],            
            totalPage:0,
            pageVal : 1,
        }
    },
	setup(){		

        return{};
    
	},
    // beforeRouteUpdate(to, from, next) {
    //     console.log("🔄 beforeRouteUpdate 감지:", to.fullPath);
    //     next(); // 이게 없으면 URL 변경이 안 됨!
    // },
    watch: {
        overlay (val) {
            val && setTimeout(() => {
            this.overlay = false
            }, 2000)
        },
    },

    computed:{

        // getCurPage(){
        //     let page = this.pageVal;            
        //     page = ( page ? Number(page)  : 1 ); // undefined 체크
        //     return page;

        //     // let page = this.$route.query.page;
        //     // return page && !isNaN(page) ? Number(page) : 1; 
        // },    
        
        // Vuex의 overlay 상태 가져오기
        overlay() {            
            return this.$store.state.overlay;
        },
    },
    methods: {
        doPaging(newPage){
            // console.log('doPaging(), newPage : ' + newPage);

            // this.$router.push({query: { page: newPage } } )
            // .then(() =>{
            //     this.pageVal = newPage;
            //     this.getPostList();
            // })
            // .catch(() => {
            //     console.log('router push query fail !!')
            // });

            this.$router.push({query: { page: newPage } }).then(() => {
                this.$nextTick(() => {
                    this.pageVal = newPage;
                    this.getPostList();
                    
                });
            });
            
            
        },

        getPostList(){
            
            // console.log('getPostList() , page : ' + this.pageVal);
            this.$store.commit('overlayOn');

            const URL = "http://localhost:9090/api/board/getList";
            this.$axios
                .get(URL,{
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    params:{
                        page: this.pageVal
                    },
                })
                .then( res => {
                    // console.log('getList result : ', res);
                    this.$store.commit('overlayOff');

                    this.postList = res.data.body;

                    this.totalPage = res.data.pagingInfo.finalPage;

                });

        },

        writeBoard() {
            this.$router.push({ path: "/board/write" });
        }
        

    },
    created() {
        
    },
    mounted(){
        this.getPostList();
    },
}

</script>

<style scoped>

.title {
	text-align: center;
	color: #333;
	margin-bottom: 20px;
}

.board {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.board th {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  background-color: #f4f4f4;
  color: #333;
  font-weight: bold;
}

.board tr:hover {
  background-color: #f1f1f1;
}

.write-btn {
  background-color: #42b883;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.write-btn:hover {
  background-color: #369f6f;
}

/* 하단 버튼 */
.bottom-write-btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}


</style>



  