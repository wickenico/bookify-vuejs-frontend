<template>
    <h1>Settings</h1>
    <div class="settings">
        <div class="settings-navigation">
            <ul>
                <li :class="{ active: activeTab === 'profile' }" @click="activeTab = 'profile'">Profile</li>
                <li :class="{ active: activeTab === 'account' }" @click="activeTab = 'account'">Account</li>
                <li :class="{ active: activeTab === 'security' }" @click="activeTab = 'security'">Security</li>
                <li :class="{ active: activeTab === 'notifications' }" @click="activeTab = 'notifications'">Notifications
                </li>
                <li :class="{ active: activeTab === 'info' }" @click="activeTab = 'info'">Info</li>
            </ul>
        </div>
        <div class="settings-content">
            <div v-if="activeTab === 'profile'">
                <h2>Profile Settings</h2>
                <button @click="showToast">Click Me</button>
                <!-- profile settings form goes here -->
            </div>
            <div v-if="activeTab === 'account'">
                <h2>Account Settings</h2>
                <!-- account settings form goes here -->
            </div>
            <div v-if="activeTab === 'security'">
                <h2>Security Settings</h2>
                <!-- security settings form goes here -->
            </div>
            <div v-if="activeTab === 'notifications'">
                <h2>Notification Settings</h2>
                <!-- notification settings form goes here -->
            </div>
            <div v-if="activeTab === 'info'">
                <h2>Info Settings</h2>
                <!-- info settings form goes here -->
                <div class="version">
                    <p>Frontend version: {{ fe_version }}</p>
                    <p>Backend version: {{ be_version }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { useToast } from "vue-toastification";

const toast = useToast();

export default {
    data() {
        return {
            activeTab: 'profile',
            fe_version: '',
            be_version: '',
            apiUrl: 'https://api.github.com/repos/wickenico/bookify-vuejs-frontend/releases/latest',
        };
    },
    mounted() {
        fetch(this.apiUrl)
            .then(response => response.json())
            .then(data => {
                this.fe_version = data.tag_name;
            })
            .catch(error => console.log(error));
    },
    methods: {
        showToast() {
            toast.info("I'm a toast!", {
                position: "bottom-right",
                timeout: 5000,
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
        },
    },
}
</script>
  
<style scoped>
.settings {
    display: flex;
    height: 100vh;
}

.settings-navigation {
    background-color: #f6f8fa;
    width: 200px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.settings-navigation ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.settings-navigation li {
    padding: 10px 0;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
}

.settings-navigation li.active {
    color: #0366d6;
}

.settings-content {
    flex: 1;
    padding: 20px;
}

.version {
    color: #bbb;
}
</style>
  