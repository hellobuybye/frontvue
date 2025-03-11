import { createStore } from 'vuex';
import axios from "./axios"; 


const store = createStore({
  state() { // 애플리케이션의 상태를 정의
    return {
      count: 0,
      user: null,
      accessToken: null,

      overlay : false,


    };
  },
  mutations: { // 상태는 mutations에서만 직접 변경할 수 있습니다.
    overlayOn(state){
      state.overlay = true;
    },
    overlayOff(state){
      state.overlay = false;
    },    
    setUser(state, user) {
      state.user = user;
    },
    setAccessToken(state, token) {
      state.accessToken = token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    logout(state){
      state.user = null;
      state.accessToken = null;
      delete axios.defaults.headers.common["Authorization"];
    },
  },
  actions: { // 비동기 작업을 처리, 작업이 끝나면 commit을 사용하여 mutations를 호출

    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    },

    async login({ commit }, {inputId, inputPw}) {
    
      try{
        const res = await axios.post("/api/login/proc", 
          {
              userId: inputId,
              password: inputPw,                     
          }
        )

        if(res.status && res.status === 200){
          console.log('reqLogin success : ');
          console.log(res);

          commit('setUser', res.data.user);
          commit('setAccessToken', res.data.accessToken);         

          return true;
        }        

      }catch(err){
        alert('로그인에 실패했습니다');
        console.log('Login Error !!');
        console.log(err);

        // if(err.response?.status === 401){          
          
        // }
        return false;
      }
      
    },
    async logout({commit}){
      commit("logout");
    },
  },
  getters: { // 상태를 기반으로 계산된 값을 반환 (computed와 비슷하게 동작)
    count(state) {
      return state.count;
    },
    user(state) {
      return state.user;
    },
  }
});

export default store;