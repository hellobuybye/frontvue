import { createStore } from 'vuex';

const store = createStore({
  state() { // 애플리케이션의 상태를 정의
    return {
      count: 0,
      user: {
        name: 'John Doe',
        age: 30
      },
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
    increment(state) {
        state.count++;
    },
    setUser(state, user) {
        state.user = user;
    }
  },
  actions: { // 비동기 작업을 처리, 작업이 끝나면 commit을 사용하여 mutations를 호출
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment');
      }, 1000);
    },
    updateUser({ commit }, user) {
      commit('setUser', user);
    }
  },
  getters: { // 상태를 기반으로 계산된 값을 반환 (computed와 비슷하게 동작)
    count(state) {
      return state.count;
    },
    user(state) {
      return state.user;
    }
  }
});

export default store;