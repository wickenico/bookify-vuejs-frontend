<template>
    <nav class="main-nav">
        <div>
            <div class="logo-container">
                <img src="../assets/dark_with_white_background.jpg" alt="Bookify Logo" class="logo" />
                <h1>Bookify</h1>
            </div>
            <p>Digitalize your Bookshelf.</p>
            <!-- Dark Mode Switch -->
            <Switch :isDarkMode="isDarkMode" @toggle-dark-mode="toggleDarkMode" />
            <div class="icons">
                <span class="material-icons" @click="back">arrow_back</span>
                <span class="material-icons" @click="forward">arrow_forward</span>
            </div>
        </div>
        <div v-for="(group, index) in navGroups" :key="index">
            <h5>{{ group.title }}</h5>
            <hr class="nav-separator" />
            <div class="nav-item" v-for="(link, linkIndex) in group.links" :key="linkIndex">
                <router-link :to="link.route">
                    <div class="nav-link">
                        <span class="material-icons">{{ link.icon }}</span>
                        <span>{{ link.label }}</span>
                    </div>
                </router-link>
                <hr v-if="linkIndex !== group.links.length - 1" class="nav-separator" />
            </div>
        </div>
        <footer class="sidenav-footer">
            <div class="footer-content">
                <div class="footer-row">
                    <router-link to="/imprint" class="footer-link">Imprint</router-link>
                    <router-link to="/contact" class="footer-link">Contact</router-link>
                    <router-link to="/faq" class="footer-link">FAQ</router-link>
                </div>
                <div class="footer-row">
                    <div class="footer-text">&copy; 2023 Bookify (Nico Wickersheim)</div>
                </div>
            </div>
        </footer>
    </nav>
</template>
  
<script>
import Switch from './Switch.vue'

export default {
    components: { Switch },
    props: {
        isDarkMode: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            username: '',
            navGroups: [
                {
                    title: 'General',
                    links: [
                        {
                            route: '/',
                            icon: 'cottage',
                            label: 'Home',
                        },
                    ],
                },
                {
                    title: 'Books',
                    links: [
                        {
                            route: { name: 'Books' },
                            icon: 'library_books',
                            label: 'Books',
                        },
                        {
                            route: { name: 'Favorites' },
                            icon: 'favorite',
                            label: 'Favorites',
                        },
                        {
                            route: { name: 'Tags' },
                            icon: 'sell',
                            label: 'Tags',
                        },
                        {
                            route: { name: 'Search' },
                            icon: 'search',
                            label: 'Search',
                        },
                    ],
                },
                {
                    title: 'User',
                    links: [
                        {
                            route: { name: 'User', params: { username: this.username } },
                            icon: 'person',
                            label: 'User',
                        },
                    ],
                },
                {
                    title: 'Settings',
                    links: [
                        {
                            route: { name: 'BugReport' },
                            icon: 'bug_report',
                            label: 'Bug Report',
                        },
                        {
                            route: { name: 'Settings' },
                            icon: 'settings',
                            label: 'Settings',
                        },
                        {
                            route: { name: 'Logout' },
                            icon: 'logout',
                            label: 'Logout',
                        },
                    ],
                },
            ],
        };
    },
    mounted() {
        this.username = sessionStorage.getItem('username');
    },
    methods: {
        toggleDarkMode(value) {
            this.$emit('toggle-dark-mode', value);
        },
        back() {
            this.$router.go(-1)
        },
        forward() {
            this.$router.go(1)
        },
    },
};
</script>
  
<style scoped>
.main-nav {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 200px;
    z-index: 1000;
    background-color: white;
    padding: 20px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
}

.main-nav h1 {
    margin-bottom: 20px;
}

.main-nav h5 {
    margin-top: 5px;
    margin-bottom: 5px;
}

.main-nav a {
    display: inline-block;
    text-decoration: none;
    margin: 0 5px;
    color: grey;
    font-size: 18px;
    border-bottom: 2px solid white;
    padding-bottom: 4px;
}

.main-nav a:hover {
    padding-bottom: 4px;
    color: teal;
}

a.router-link-active {
    padding-bottom: 4px;
    color: teal;
}

a.router-link-active .material-icons {
    color: teal;
}

.nav-item {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: left;
    margin-bottom: 10px;
}

.nav-link {
    display: flex;
    align-items: center;
}

.material-icons {
    font-size: 25px;
    color: #bbb;
    cursor: pointer;
    margin-right: 5px;
}

.material-icons:hover {
    color: teal;
}

.material-icons:active {
    color: black;
}

.nav-separator {
    width: 100%;
    margin-top: 5px;
    margin-bottom: 10px;
    border: none;
    border-top: 1px solid #ccc;
}

.sidenav-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    color: teal;
    font-size: 12px;
    padding: 10px;
}

.footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.footer-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.footer-text {
    margin-right: 10px;
}

.footer-link {
    color: black !important;
    font-size: 12px !important;
    /* Update the font size here */
    margin-right: 10px;
}

.footer-link:hover {
    color: teal !important;
}

.icons {
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo {
    height: 30px;
    /* Adjust the height as needed */
    margin-right: 5x;
    /* Add margin to create spacing between the logo and heading */
}
</style>
  