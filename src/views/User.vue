<template>
    <h1>User</h1>
    <form @submit.prevent="handleSubmit">
        <label>Fullname: </label>
        <input type="text" required v-model="user.fullName" readonly>

        <label>Email: </label>
        <input type="email" required v-model="user.email" readonly>

        <label>Username: </label>
        <input type="text" required v-model="user.username" readonly>

        <!-- <div v-if="passwordError" class="error">{{ passwordError }}</div> -->

        <div class="submit" @click="handleSubmit">
            <button>Edit</button>
        </div>
        <div class="submit" @click="handleSubmit">
            <button>Change Password</button>
        </div>
    </form>
</template>

<script>
export default {
    props: ['username'],
    data() {
        return {
            user: '',
            username2: ''
        }
    },
    mounted() {
        const headers = new Headers();
        if (sessionStorage.getItem('credentials')) {
            headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
            headers.append('Content-Type', 'application/json');
            this.username2 = sessionStorage.getItem('username');
        }
        fetch(this.apiUrl + '/users/details?username=' + this.username2, {
            headers: headers
        })
            .then(res => res.json())
            .then(data => this.user = data)
            .then(console.log(this.user))
            .catch(err => console.log(err.message))
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
    border: 1px solid teal;
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