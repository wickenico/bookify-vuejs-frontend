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
            try {
                const response = await fetch('http://192.168.178.58:8090/api/v1/auth/login', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBdXRoZW50aWNhdGlvbiIsImlzcyI6ImNvbS5tYWF4Z3IiLCJ1c2VyTmFtZSI6Im5pY28iLCJ1c2VySWQiOjAsImVtYWlsIjoibmljby53aWNrZXJzaGVpbTNAeWFob28uZGUifQ.Sr_NwrkZZ3bprSCsTATeeQL1OTIZhpBUhth46DTOMSFfk_BzwMXKL4qtns2zQyCeIMG4bPSxX_VSj6WaqZj7MA',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    })
                });
                if (!response.ok) {
                    throw new Error('Login failed');
                }
                this.isLoggedIn = true;
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