<template>



  <div v-if="post && post.subject" class="container">
    <h1>{{ post.subject }}</h1>
    <p><strong>작성자:</strong> {{ post.regId }}</p>
    <p><strong>작성일:</strong> {{ post.regDt }}</p>
    <div class="content">
      {{ post.content }}
    </div>
    <button @click="goBack">목록으로</button>
  </div>

  <div v-else>
    
  </div>

</template>

<script scoped>
export default {
  name: 'vPostDetail',

  props: {
    
  },
  data() {
    return {
      post : {}
    };
  },
  created() {
    this.getPostDetail();
  },
  methods: {
    getPostDetail(){
      
      const URL = "http://localhost:9090/api/board/getDetail";
      this.$axios
        .post(URL, { 
            //body
            idx: this.$route.params.idx
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
        })
        .then(res => {
          console.log('getDetail result : ', res);
          this.post = res.data.body;

        });
    },
    goBack() {
      this.$router.push("/board"); // 게시판 목록 페이지로 이동
    },

  },
  
}

</script>

<style scoped>
/* 게시판 상세 페이지 */
.container {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-height: 500px; /* 최소 높이 설정 */
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: left;
}

p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 15px;
  text-align: left;
}

strong {
  color: #333;
}

.content {
  font-size: 1rem;
  color: #444;
  line-height: 1.6;
  border-top: 2px solid #f1f1f1;
  padding-top: 20px;
  margin-top: 20px;
  text-align: left;
  flex-grow: 1; /* 내용이 적을 경우 여유 공간을 차지하게 만들어서 버튼을 하단에 위치시킴 */
}

/* 버튼 스타일 */
button {
  padding: 12px 25px;
  background-color: #28a745; 
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
  margin-top: auto; /* 내용 하단에 버튼을 붙임 */
}

button:hover {
  background-color: #218838;
}

</style>
방법 2: 버튼을 화면 하단에 고정하기
vue
복사
편집
<style scoped>
/* 게시판 상세 페이지 */
.container {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  min-height: 500px; /* 최소 높이 설정 */
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: left;
}

p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 15px;
  text-align: left;
}

strong {
  color: #333;
}

.content {
  font-size: 1rem;
  color: #444;
  line-height: 1.6;
  border-top: 2px solid #f1f1f1;
  padding-top: 20px;
  margin-top: 20px;
  text-align: left;
  margin-bottom: 70px; /* 버튼 높이를 고려해 여유 공간 추가 */
}

/* 버튼 스타일 */
button {
  position: absolute;
  bottom: 20px; /* 화면 하단에 고정 */
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 25px;
  background-color: #28a745;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #218838;
}
</style>