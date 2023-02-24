<template>
    <nav class="main-nav">
        <router-link to="/">Home</router-link> |
        <router-link :to="{ name: 'About' }">About</router-link> |
        <router-link :to="{ name: 'Books' }">Books</router-link> |
        <router-link :to="{ name: 'Favorites' }">Favorites</router-link> |
        <router-link :to="{ name: 'Tags' }">Tags</router-link> |
        <router-link :to="{ name: 'Search' }">Search</router-link> |
        <!-- <router-link :to="{ name: 'Login' }">Login</router-link> | -->
        <router-link :to="{ name: 'User', params: { username: username } }">
            <div style="display: inline-block; vertical-align: bottom;">
                <span class="material-icons" style="vertical-align: bottom;">person</span>
                <span style="vertical-align: bottom;">{{ username }}</span>
            </div>
        </router-link> |
        <router-link :to="{ name: 'Logout' }">
            <div style="display: inline-block; vertical-align: bottom;">
                <span class="material-icons" style="vertical-align: bottom;">logout</span>
                <span style="vertical-align: bottom;"></span>
            </div>
        </router-link>
    </nav>
</template>
  
<script>
export default {
    data() {
        return {
            username: ''
        }
    },
    mounted() {
        this.username = sessionStorage.getItem('username');
    },
    computed: {

    }

}
</script>
  
<style scoped>
.main-nav {
    text-align: center;
    margin: 40px auto;
}

.main-nav a {
    display: inline-block;
    text-decoration: none;
    margin: 0 10px;
    color: black;
    font-size: 18px;
}

a.router-link-active {
    border-bottom: 2px solid teal;
    padding-bottom: 4px;
}

.material-icons {
    font-size: 25px;
    color: #bbb;
    cursor: pointer;
    margin-left: -5px;
}

.material-icons:hover {
    color: teal;
}
</style>