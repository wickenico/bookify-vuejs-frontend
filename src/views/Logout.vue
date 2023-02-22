<template>
    <h1>Logout</h1>
    <form @submit.prevent="handleSubmit">
        <h3>Do you really want to logout?</h3>
        <div class="submit" @click="handleSubmit">
            <button>Logout</button>
        </div>
    </form>
</template>

<script>
export default {

    methods: {
        async handleSubmit() {
            console.log("hier")
            sessionStorage.removeItem('expiration');
            sessionStorage.removeItem('credentials');
        }
}

}
</script>

<style scoped>
form {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: center;
    padding: 40px;
    border-radius: 10px;
}

button {
    background: teal;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    border: 1px solid teal;
}

button:hover {
    border: 1px solid black;
    background: red;
}
</style>