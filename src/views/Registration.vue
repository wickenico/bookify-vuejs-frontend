<template>
    <h1>Registration</h1>
    <form @submit.prevent="handleSubmit">

        <label>Fullname: </label>
        <input type="text" required v-model="fullname">

        <label>Email: </label>
        <input type="email" required v-model="email">

        <label>Username: </label>
        <input type="text" required v-model="username">

        <label>Password: </label>
        <input type="password" required v-model="password">
        <div v-if="passwordError" class="error">{{ passwordError }}</div>

        <div class="submit">
            <button>Register</button>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            fullname: '',
            email: '',
            username: '',
            password: '',
            passwordError: '',
        }
    },
    methods: {
        async handleSubmit() {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');

            try {
                const response = await fetch(this.apiUrl + '/auth/register', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        fullName: this.username,
                        email: this.email,
                        username: this.username,
                        password: this.password
                    })
                });
                if (response.status === 409) {
                    throw new Error('Username already taken.');
                } else if (!response.ok) {
                    throw new Error('Login failed');
                }
                this.$router.push({ name: 'Login' });
            } catch (error) {
                this.passwordError = error.message;
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
</style>