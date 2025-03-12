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

let refreshable = true; // 리프레시 중인지 체크하는 값

api.interceptors.response.use(
  response => response,
  async error => {
    console.log('!!! response.interceptors : Get Error')
    console.log(error)

    if (error.response.status === 401) {
      
      if(error.response.data ==='NO_TOKEN'){
        // 로그인 필요
        alert('로그인 필요');

        store.commit("logout");        
        router.push({ path: "/login" });
        return Promise.reject(error);
      }

      if(error.response.data ==='AUTH_FAIL'){ 
        // 로그인 실패 - 아이디 또는 비밀번호 틀림       
        alert('로그인 실패');
        return Promise.reject(error);
      }
      
      
      console.log("!!! 액세스 토큰 에러, 리프레시 시도");  
      
      if( refreshable ){
        refreshable = false;

        try {                 

          const res = await api.post("/api/login/refresh", {});
          
          store.commit("setAccessToken", res.data.accessToken); // 새 토큰 저장      
          store.commit('setUser', res.data.user);       
          console.log("🔄 토큰 교체 완료");
  
          error.config.headers["Authorization"] = `Bearer ${res.data.accessToken}`;
          return axios(error.config); // 원래 요청 다시 시도
  
        } catch (err) {
          
          if(err.response?.status === 401 && err.response?.data ==='INVALID_TOKEN'){           
            alert("재 로그인 필요");
            console.log("❌ 리프레시 실패,  토큰에 이상이 있습니다. ❌" );
            store.commit("logout");
            router.push({ path: "/login" });
            return Promise.reject(err);
          }        
          
        } finally{
          refreshable = true;
        }

      }
      

      
    }

    
    return Promise.reject(error);  
    
  }
);

export default api;