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
        <div v-else-if="filteredTags.length">
            <div v-for="tag in filteredTags" :key="tag.id" class="tag">
                <router-link :to="{ name: 'TagDetails', params: { id: tag.id } }">
                    <h2>{{ tag.name }}</h2>
                </router-link>
            </div>
        </div>
        <div v-else>
            <p>Nothing found.</p>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            tags: [],
            searchQuery: "",
            loading: false,
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
            .then((data) => (this.tags = data))
            .catch((err) => console.log(err.message))
            .finally(() => (this.loading = false));
    },
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

.tag h2 {
    margin: 20px auto;
    background: white;
    padding: 10px 20px;
    border-radius: 4px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.05);
    max-width: 600px;
    cursor: pointer;
    color: #444;
}

.tag h2:hover {
    color: white;
    background: teal;
}

.tag a {
    text-decoration: none;
}
</style>