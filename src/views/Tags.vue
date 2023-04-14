<template>
    <div>
        <h1>Tags</h1>
        <div class="search-container form-group has-search">
            <span class="fa fa-search form-control-feedback"></span>
            <!-- <label>Suche </label> -->
            <input type="text" class="form-control" id="search-input" placeholder="Suchbegriff eingeben..."
                v-model="searchQuery" />
        </div>
        <div v-if="loading">
            <p>Loading tags...</p>
        </div>
        <div v-else-if="tagsLoaded && filteredTags.length">
            <div v-for="tag in filteredTags" :key="tag.id">
                <router-link :to="{ name: 'TagDetails', params: { id: tag.id } }">
                    <div class="project">
                        <div class="actions">
                            <div>
                                <h2>{{ tag.name }} ({{ tag.count }})</h2>
                            </div>
                            <div class="icons">
                                <span v-if="tag.count === '0'" @click.prevent="deleteTag(tag)" class="material-icons">
                                    delete
                                </span>
                            </div>
                        </div>
                    </div>
                </router-link>

            </div>
        </div>
        <div v-else-if="tagsLoaded">
            <p>Nothing found.</p>
        </div>
    </div>
</template>
  
<script>
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
    data() {
        return {
            tags: [],
            searchQuery: "",
            loading: false,
            tagsLoaded: false,
        };
    },
    computed: {
        filteredTags() {
            const query = this.searchQuery.toLowerCase();
            return this.tags.filter((tag) =>
                tag.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
    },
    mounted() {
        this.loading = true;
        const headers = new Headers();
        if (sessionStorage.getItem("credentials")) {
            headers.append(
                "Authorization",
                "Basic " + sessionStorage.getItem("credentials")
            );
            headers.append("Accept", "application/json");
        }
        fetch(this.apiUrl + "/tags", {
            headers: headers,
        })
            .then((res) => res.json())
            .then((data) => {
                const promises = data.map((tag) => {
                    return fetch(this.apiUrl + "/tags/" + tag.id + "/count", {
                        headers: headers,
                    })
                        .then((res) => res.text())
                        .then((count) => {
                            tag.count = count;
                            return tag;
                        });
                });
                Promise.all(promises).then((tags) => {
                    this.tags = tags;
                    this.tagsLoaded = true;
                });
            })
            .catch((err) => console.log(err.message))
            .finally(() => (this.loading = false));
    },
    methods: {
        async deleteTag(tag) {
            if (this.confirm("Are you sure you want to delete this tag?")) {
                const index = this.tags.indexOf(tag);
                if (index > -1) {
                    this.tags.splice(index, 1);
                }
                try {
                    const headers = new Headers();
                    if (sessionStorage.getItem('credentials')) {
                        headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
                        headers.append('Accept', 'application/json');
                    }
                    const response = await fetch(this.apiUrl + '/tags/' + tag.id,
                        {
                            method: 'DELETE',
                            headers: headers
                        })
                    if (response.ok) {
                        toast.success('Tag ' + tag.name + ' successfully deleted!', {
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
                        router.push({ path: '/tags' })
                    }
                } catch (error) {
                    console.log(error.message)
                }
            }
        },
        confirm(message) {
            return window.confirm(message);
        },
    }
};
</script>
  
<style scoped>
.search-container {
    max-width: 420px;
    margin: 10px auto;
    background: #f2f2f2;
    text-align: left;
    padding: 20px;
    border-radius: 10px;

}

input {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    background: #f2f2f2;
    border-bottom: 1px solid teal;
}

input:focus {
    border-color: teal;
    border-bottom: 1px solid teal;
}

.has-search .form-control {
    padding-left: 2.375rem;
}

.has-search .form-control-feedback {
    position: absolute;
    z-index: 2;
    display: block;
    width: 2.375rem;
    height: 2.375rem;
    line-height: 2.375rem;
    text-align: center;
    pointer-events: none;
    color: teal;
}

.form-control {
    color: teal;
    border-color: teal;
}

.form-control:focus {
    color: teal;
    border-color: teal;
    box-shadow: 0 0 0 0.1rem teal;
}

.project {
    margin: 20px auto;
    background: white;
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
    color: #444;
    max-width: 700px;
}

.project:hover {
    color: white;
    background: teal;
}

.actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.material-icons {
    font-size: 30px;
    margin-left: 10px;
    color: #bbb;
    cursor: pointer;
}

.material-icons:hover {
    color: black;
}

.icons {
    margin-left: auto;
}
</style>