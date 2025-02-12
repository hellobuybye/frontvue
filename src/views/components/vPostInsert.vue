<template>
git test
  <div class="write-container">
    <h1>글 작성</h1>
    
    <div class="form-group">
      <label for="subject">제목</label>
      <input type="text" id="subject" v-model="post.subject" placeholder="제목을 입력하세요." />
    </div>

    <div class="form-group">
      <label for="regId">작성자</label>
      <input type="text" id="regId" v-model="post.regId" placeholder="작성자를 입력하세요." />
    </div>

    <div class="form-group">
      <label for="content">내용</label>
      <textarea id="content" v-model="post.content" placeholder="내용을 입력하세요."></textarea>
    </div>

    <!-- 하단 버튼 -->
    <div class="btn-group">
      <button class="cancel-btn" @click="cancel">취소</button>
      <button class="save-btn" @click="insertPost">저장하기</button>
    </div>
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
    
  },
  methods: {
    insertPost(){
      
      const URL = "http://localhost:9090/api/board/insertBoard";
      this.$axios
        .post(URL, this.post, {
            headers: {
              'Content-Type': 'application/json',
            },
        })
        .then(res => {
          console.log('insertPost result : ', res);
          alert('게시글이 등록되었습니다.');
          this.$router.push(`/board/${res.data.body}`);
        })
        .catch(() => {
          alert('게시글이 등록에 실패하였습니다.');
        });
    },
    cancel() {
      this.$router.push("/board");
    },

  },
  
}

</script>

<style scoped>

.write-container {
  width: 60%;
  margin: 0 auto;
  padding: 20px;
}

/* 폼 그룹 */
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

/* textarea 크기 조정 */
.form-group textarea {
  min-height: 200px;
  resize: vertical;
}

/* 버튼 그룹 */
.btn-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

/* 취소 버튼 */
.cancel-btn {
  background-color: #ccc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 10px;
}

.cancel-btn:hover {
  background-color: #999;
}

/* 저장 버튼 */
.save-btn {
  background-color: #42b883;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.save-btn:hover {
  background-color: #369f6f;
}

</style>