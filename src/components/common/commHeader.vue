<template>
    <header>
		<div class="logo">
			<a href="/" ><img alt="Vue logo" src="../../assets/logo.png"></a>
			<span class="title">윤환이의 놀이터</span>
		</div>
		<nav v-if="user">
			{{ user.name }} 님 , <a @click="logout">로그아웃</a>
		</nav>
		<nav v-else>
			<router-link to="/login" >로그인</router-link>
		</nav>
	</header>
	
</template>

<script scoped>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default{
    name:'commHeader',
    data() {
		return{
			
		}
    },
	computed:{
		...mapGetters(['user'])
	},
    methods: {

		...mapActions(["logout"]),
        
    },
    created() {
        
    },
}

</script>

<style scoped>
	header{
		width:100%; 
		border-bottom:1px solid #35495e;
		padding: 20px;		
			
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	header a{
		padding-bottom: 0px;
		margin-bottom: 0px;
		
	}	

	header .logo{
		display: flex;
		/* flex-direction: row; */
		padding-Left:20px;
		align-items: center;
		
	}	

	header .logo img{
		width: auto;
		height: 32px;
	}	
	header .logo .title{
		margin-left:10px;
		margin-bottom: 0px;
		font-size: 30px;
		font-weight: bold;				
		
	}	
	
</style>


