import axios from "axios";
import store from "./store"; 
import router from '../router'

const api = axios.create({
  baseURL: "http://localhost:9090",  
  withCredentials: true, // 쿠키 자동 포함
  validateStatus: function (status) {
    return status >= 200 && status < 300; // 200~299만 성공으로 간주
  }
});


api.interceptors.response.use(
  response => response,
  async error => {
    console.log('!!! response.interceptors : Get Error')
    console.log(error)

    if (error.response.status === 401) {
      
      if(error.response.data ==='LOGIN_001'){ 
        // 로그인 실패 - 아이디 또는 비밀번호 틀림       
        return Promise.reject(error);
      }
      
      // if(store.state.user == null){
      //   // 로그인 필요
      //   alert('로그인이 필요합니다.');        
      //   router.push({ path: "/login" });
      //   return Promise.reject(error);
      // }

      console.log("!!! 액세스 토큰 만료됨, 리프레시 시작");
      
      try {        
        const res = await api.post("/api/login/refresh", {

        });
        
        store.commit("setAccessToken", res.data.accessToken); // 새 토큰 저장                
        error.config.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
        console.log("🔄 토큰 교체 완료");
        return axios(error.config); // 원래 요청 다시 시도

      } catch (err) {
        alert("❌ 리프레시 실패, 재로그인 필요");
        if(err.response?.status === 401){ 
          console.log('test');
        }
        
        store.commit("logout");
        router.push({ path: "/login" });
        return Promise.reject(err);
      }

      
    }

    console.log('이 코드까지 오면 안되는데? (axios.js)');
    return Promise.reject(error);
    

    // if (error.response.status === 403) {
    //   console.log("🔄 액세스 토큰 만료됨, 리프레시 시작");      
       
    //   await axios.post("/api/auth/refresh", {}, { withCredentials: true })
    //       .then(res => {
    //         store.commit("setAccessToken", res.data.accessToken); // 새 토큰 저장
    //         error.config.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
    //         console.log('토큰 refresh 성공 !! ');
    //         return axios(error.config); // 원래 요청 다시 시도
    //       })
    //       .catch(error =>{
    //         alert("❌ 리프레시 실패, 재로그인 필요");
    //         store.commit("logout");
    //         return Promise.reject(error);
    //       });
    // }
    
  }
);

export default api;