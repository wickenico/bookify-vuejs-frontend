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

            const headers = new Headers();
            if (sessionStorage.getItem('credentials')) {
                headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
                headers.append('Accept', '*/*');
            }
            try {
                const response = await fetch('http://192.168.178.58:8090/api/v1/session/logout', {
                    method: 'GET',
                    headers: headers,
                });
                if (!response.ok) {
                    throw new Error('Logout failed');
                }
            } catch (error) {
                console.error(error);
            }

            sessionStorage.removeItem('expiration');
            sessionStorage.removeItem('credentials');
            sessionStorage.removeItem('username');
            this.$router.push({ name: 'Login' });
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