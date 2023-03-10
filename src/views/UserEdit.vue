<template>
    <div v-if="user">
    <h1>User</h1>
    <form @submit.prevent="updateUser">
        <label>Fullname: </label>
        <input type="text" required v-model="user.fullName">

        <label>Email: </label>
        <input type="email" required v-model="user.email">

        <div class="submit">
            <button>Save</button>
        </div>
    </form>
</div>
</template>

<script>
import router from '@/router';
export default {
    props: ['id'],
    data() {
        return {
            user: null
        }
    },
    mounted() {
        const headers = new Headers();
        if (sessionStorage.getItem('credentials')) {
            headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
            headers.append('Accept', 'application/json');
        }
        fetch(this.apiUrl + '/users/' + this.id, {
            headers: headers
        })
            .then(res => res.json())
            .then(data => this.user = data)
            .catch(err => console.log(err.message))
    },
    methods: {
        async updateUser() {

            const user = {
                fullName: this.user.fullName,
                email: this.user.email,
            };
            const headers = new Headers();
            if (sessionStorage.getItem('credentials')) {
                headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
                headers.append('Content-Type', 'application/json');
            }
            fetch(this.apiUrl + '/users/edit/' + this.id, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(user)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('User updated successfully:', data);
                    this.user = data;

                    this.$forceUpdate();
                    router.push({ path: '/user/' + this.user.username })
                })
                .catch(error => {
                    console.error('Error updating user:', error);
                });
        },
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