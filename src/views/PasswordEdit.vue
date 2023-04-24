<template>
    <div v-if="user">
        <h1>Change Password</h1>
        <form @submit.prevent="updatePassword">
            <label>Old Password: </label>
            <input type="password" required v-model="oldPassword">

            <label>New Password: </label>
            <input type="password" required v-model="newPassword">

            <label>Repeat new Password: </label>
            <input type="password" required v-model="newPasswordRepeat">

            <div v-if="error" class="error">{{ error }}</div>

            <div class="submit">
                <button>Save</button>
            </div>
        </form>
    </div>
</template>

<script>
import router from '@/router';
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
    props: ['id'],
    data() {
        return {
            user: null,
            oldPassword: '',
            newPassword: '',
            newPasswordRepeat: '',
            error: null
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
        async updatePassword() {

            // Check if new passwords match
            if (this.newPassword !== this.newPasswordRepeat) {
                console.error('New passwords do not match!');
                this.error = 'New passwords do not match!';
                return;
            }

            const passwordChange = {
                oldPassword: this.oldPassword,
                newPassword: this.newPassword,
            };
            const headers = new Headers();
            if (sessionStorage.getItem('credentials')) {
                headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
                headers.append('Content-Type', 'application/json');
            }
            fetch(this.apiUrl + '/users/edit/' + this.id + '/password', {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(passwordChange)
            })
                .then(response => response.text())
                .then(data => {
                    console.log('Password updated successfully:', data);
                    this.$forceUpdate();
                    router.push({ path: '/login' })

                    toast.success("Password changed - Please log in again.!", {
                        position: "bottom-right",
                        timeout: 2000,
                        closeOnClick: true,
                        pauseOnFocusLoss: true,
                        pauseOnHover: true,
                        draggable: true,
                        draggablePercent: 0.6,
                        showCloseButtonOnHover: false,
                        closeButton: "button",
                        icon: true,
                        rtl: false
                    });
                })
                .catch(error => {
                    console.error('Error updating password:', error);
                    this.error = 'Error updating password.'
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