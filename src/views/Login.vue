<template>
    <h1>Login</h1>
    <div v-if="!isLoggedIn">
        <form @submit.prevent="handleSubmit">
            <label>Username: </label>
            <input type="text" required v-model="username">

            <label>Password: </label>
            <input type="password" required v-model="password">
            <div v-if="passwordError" class="error">{{ passwordError }}</div>

            <div class="submit" @click="handleSubmit">
                <button>Log In</button>
            </div>
        </form>

        <p>Not a user yet? <router-link :to="{ name: 'Registration' }" class="signup">Sign up here </router-link></p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            passwordError: '',
            isLoggedIn: false,
        };
    },
    methods: {
        async handleSubmit() {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            try {
                const response = await fetch(this.apiUrl + '/auth/login', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    })
                });
                if (!response.ok) {
                    throw new Error('Login failed');
                }
                sessionStorage.setItem('credentials', btoa(this.username + ':' + this.password));
                const expiration = new Date().getTime() + 60 * 60 * 1000 // expiration time: 1 hour
                sessionStorage.setItem('expiration', expiration)
                sessionStorage.setItem('username', this.username)
                this.isLoggedIn = true;
                this.$emit("customlogin", this.username)
                this.$router.push({ name: 'home' });
            } catch (error) {
                this.passwordError = 'Invalid username or password';
                console.error(error);
            }
        }
    }
}
</script>

<style scoped>
form {
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}

label {
    color: teal;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}

input,
select {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid teal;
    color: teal;
}

button {
    background: teal;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
    cursor: pointer;
}

button:hover {
    border: 1px solid black;
    background: #003030;
}

.submit {
    text-align: center;
}

.error {
    color: #ff0062;
    margin-top: 10px;
    font-size: 0.8em;
    font-weight: bold;
}

.signup {
    cursor: pointer;
    color: teal;
}

.signup:hover {
    text-decoration: underline;
    color: #003030;
}
</style>