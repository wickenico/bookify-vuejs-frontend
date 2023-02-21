<template>
    <nav class="main-nav">
        <router-link to="/">Home</router-link> |
        <router-link :to="{ name: 'About' }">About</router-link> |
        <router-link :to="{ name: 'Books' }">Books</router-link> |
        <router-link :to="{ name: 'Favorites' }">Favorites</router-link> |
        <router-link :to="{ name: 'Tags' }">Tags</router-link> |
        <router-link :to="{ name: 'Search' }">Search</router-link> |
        <router-link :to="{ name: 'Login' }">Login</router-link>
    </nav>
</template>
  
<script>
export default {

}
</script>
  
<style>
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
</style>