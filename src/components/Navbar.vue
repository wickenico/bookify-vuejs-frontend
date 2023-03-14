<template>
    <nav class="main-nav">
        <router-link to="/">
            <div style="display: inline-block; vertical-align: bottom;">
                <span class="material-icons" style="vertical-align: bottom;">cottage</span>
                <span style="vertical-align: bottom;"> Home</span>
            </div>
        </router-link> |
        <router-link :to="{ name: 'About' }">
            <div style="display: inline-block; vertical-align: bottom;">
                <span class="material-icons" style="vertical-align: bottom;">psychology_alt</span>
                <span style="vertical-align: bottom;"> About</span>
            </div>
        </router-link> |
        <router-link :to="{ name: 'Books' }">
            <div style="display: inline-block; vertical-align: bottom;">
                <span class="material-icons" style="vertical-align: bottom;">library_books</span>
                <span style="vertical-align: bottom;"> Books</span>
            </div>
        </router-link> |
        <router-link :to="{ name: 'Favorites' }">
            <div style="display: inline-block; vertical-align: bottom;">
                <span class="material-icons" style="vertical-align: bottom;">favorite</span>
                <span style="vertical-align: bottom;"> Favorites</span>
            </div>
        </router-link> |
        <router-link :to="{ name: 'Tags' }">
            <div style="display: inline-block; vertical-align: bottom;">
                <span class="material-icons" style="vertical-align: bottom;">sell</span>
                <span style="vertical-align: bottom;"> Tags</span>
            </div>
        </router-link> |
        <router-link :to="{ name: 'Search' }">
            <div style="display: inline-block; vertical-align: bottom;">
                <span class="material-icons" style="vertical-align: bottom;">search</span>
                <span style="vertical-align: bottom;"> Search</span>
            </div>
        </router-link> |
        <!-- <router-link :to="{ name: 'Login' }">Login</router-link> | -->
        <!-- <router-link :to="{ name: 'User', params: { username: username } }"> -->
        <router-link :to="{ name: 'User', params: { username: username } }">

            <div style="display: inline-block; vertical-align: bottom;">
                <span class="material-icons" style="vertical-align: bottom;">person</span>
                <span style="vertical-align: bottom;"> User</span>
            </div>
        </router-link> |
        <router-link :to="{ name: 'Logout' }">
            <div style="display: inline-block; vertical-align: bottom;">
                <span class="material-icons" style="vertical-align: bottom;">logout</span>
                <span style="vertical-align: bottom;"> Logout</span>
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
/* .main-nav {
    text-align: center;
    margin: 40px auto;
} */

.main-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: white;
    text-align: center;
    padding: 20px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
}

.main-nav a {
    display: inline-block;
    text-decoration: none;
    margin: 0 10px;
    color: grey;
    font-size: 18px;
}

.main-nav a:hover {
    border-bottom: 2px solid teal;
    padding-bottom: 4px;
    color: black;
}

a.router-link-active {
    border-bottom: 2px solid teal;
    padding-bottom: 4px;
    color: black;
}

a.router-link-active .material-icons {
    color: black;
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

.material-icons:active {
    color: black;
}
</style>