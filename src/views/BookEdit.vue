<template>
    <div v-if="book">
        <div class="book-info">
            <div v-if="book.imageUrl && book.imageUrl !== 'null'" class="book-cover">
                <img :src="book.imageUrl" alt="Book Cover Image">
            </div>
            <div v-else>
                <img src="https://via.placeholder.com/200x300" alt="Book Cover Image">
            </div>
            <div class="book-details">
                <h1>{{ book.title }}</h1>
                <h3 v-if="book.subtitle && book.subtitle !== 'null'">{{ book.subtitle }}</h3>
                <div class="book-rating">
                    <template v-if="book.rating === 'FIVE'">
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                    </template>
                    <template v-else-if="book.rating === 'FOUR'">
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star-zero">★</span>
                    </template>
                    <template v-else-if="book.rating === 'THREE'">
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star-zero">★</span>
                        <span class="star-zero">★</span>
                    </template>
                    <template v-else-if="book.rating === 'TWO'">
                        <span class="star">★</span>
                        <span class="star">★</span>
                        <span class="star-zero">★</span>
                        <span class="star-zero">★</span>
                        <span class="star-zero">★</span>
                    </template>
                    <template v-else-if="book.rating === 'ONE'">
                        <span class="star">★</span>
                        <span class="star-zero">★</span>
                        <span class="star-zero">★</span>
                        <span class="star-zero">★</span>
                        <span class="star-zero">★</span>
                    </template>
                    <template v-else-if="book.rating === 'ZERO'">
                        <span class="star-zero">★</span>
                        <span class="star-zero">★</span>
                        <span class="star-zero">★</span>
                        <span class="star-zero">★</span>
                        <span class="star-zero">★</span>
                    </template>
                </div>
                <span @click.prevent="handleFavorite(book.id)" class="material-icons"
                    :class="{ red: isFavorite === 'true' }">favorite</span>
                <div v-if="bookError" class="error">{{ bookError }}</div>
            </div>
        </div>
        <div class="book">
            <!-- <div class="book-attribute">
                <div class="label">{{ "ID" }}</div>
                <div class="value">{{ book.id }}</div>
            </div> -->

            <div class="book-attribute">
                <div class="label">{{ "Options" }}</div>
                <div>
                    <div class="option-pill">
                        <a :href="book.selfLink" target="_blank" class="optionButton-pill"><i class="fa fa-code" aria-hidden="true"></i> JSON</a>
                    </div>
                    <div class="option-pill">
                        <a :href="book.infoLink" target="_blank" class="optionButton-pill"><i class="fa fa-info" aria-hidden="true"></i> Info</a>
                    </div>
                </div>
            </div>

            <div class="book-separator"></div>

            <div class="book-attribute">
                <div class="label">{{ "Tags" }}</div>
                <input type="text" v-model="tempBookTag" @keyup.enter="addBookTag" placeholder="Add Tag and press Enter...">
                <div v-if="bookTags.length">
                    <div v-for="bookTag in bookTags" :key="bookTag.id" class="pill">
                        <router-link :to="{ name: 'TagDetails', params: { id: bookTag.id } }">
                            <span class="bookTag-pill">{{ bookTag.name }}</span>
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="book-separator"></div>

            <div class="book-attribute">
                <div class="label">{{ "ISBN-10" }}</div>
                <div class="value">{{ book.isbn10 }}</div>
            </div>

            <div class="book-separator"></div>

            <div class="book-attribute">
                <div class="label">{{ "ISBN-13" }}</div>
                <div class="value">{{ book.isbn13 }}</div>
            </div>

            <div class="book-separator"></div>

            <div class="book-attribute">
                <div class="label">{{ "Author" }}</div>
                <div class="value">{{ book.author }}</div>
            </div>

            <div class="book-separator"></div>

            <div class="book-attribute">
                <div class="label">{{ "Publisher" }}</div>
                <div class="value">
                    <input v-model="book.publisher" type="text">
                </div>
            </div>

            <div class="book-separator"></div>

            <div class="book-attribute">
                <div class="label">{{ "Pages" }}</div>
                <div class="value">
                    <input v-model="book.pages" type="number">
                </div>
            </div>

            <div class="book-separator"></div>

            <!-- <div class="book-attribute">
                <div class="label">{{ "Self Link" }}</div>
                <div class="value">{{ book.selfLink }}</div>
            </div> -->

            <div class="book-separator"></div>

            <div class="book-attribute">
                <div class="label">{{ "Published Date" }}</div>
                <div class="value">{{ publishedDate_formatted }}</div>
            </div>

            <div class="book-separator"></div>

            <div class="book-attribute">
                <div class="label">{{ "Description" }}</div>
                <div class="value">{{ book.description }}</div>
            </div>

            <div class="book-separator"></div>

            <div class="book-attribute">
                <div class="label">{{ "Print Type" }}</div>
                <select v-model="book.printType">
                    <option disabled value="">Please select one</option>
                    <option>BOOK</option>
                    <option>EBOOK</option>
                    <option>MAGAZINE</option>
                </select>
            </div>

            <div class="book-separator"></div>

            <div class="book-attribute">
                <div class="label">{{ "Category" }}</div>
                <div class="value">{{ book.category }}</div>
            </div>

            <div class="book-separator"></div>

            <div class="book-attribute">
                <div class="label">{{ "Maturity Rating" }}</div>
                <div class="value">{{ book.maturityRating }}</div>
            </div>

            <div class="book-separator"></div>

            <div class="book-attribute">
                <div class="label">{{ "Language" }}</div>
                <div class="value"> <!-- {{ book.language }} -->
                    <img :src="'https://flagsapi.com/' + book.language.toUpperCase() + '/flat/16.png'" width="20"
                        height="20">
                </div>
            </div>

            <div class="book-separator"></div>

            <!-- <div class="book-attribute">
                <div class="label">{{ "Info Link" }}</div>
                <div class="value">{{ book.infoLink }}</div>
            </div> -->

            <div class="book-separator"></div>

            <div class="book-attribute">
                <div class="label">{{ "Read Status" }}</div>
                <select v-model="book.readStatus">
                    <option disabled value="">Please select one</option>
                    <option>UNREAD</option>
                    <option>READING</option>
                    <option>READ</option>
                    <option>UNFINISHED</option>
                </select>
            </div>

            <div class="book-separator"></div>

            <div class="book-attribute">
                <div class="label">{{ "Added On" }}</div>
                <div class="value">{{ addedOnDate_formatted }}</div>
            </div>

            <div class="book-separator"></div>

            <div class="book-attribute">
                <div class="label">{{ "Personal Rating" }}</div>
                <select v-model="book.rating">
                    <option disabled value="">Please select one</option>
                    <option>ZERO</option>
                    <option>ONE</option>
                    <option>TWO</option>
                    <option>THREE</option>
                    <option>FOUR</option>
                    <option>THREE</option>
                </select>
            </div>

        </div>

        <form class="form" @submit.prevent="updateBook">
            <!-- Form inputs -->
            <button class="btn btn-primary" type="submit">Update Book</button>
        </form>

    </div>
    <div v-else>
        <p>Loading book details ...</p>
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
            book: null,
            isFavorite: null,
            bookError: null,
            bookTags: [],
            tempBookTag: ''
        }
    },
    mounted() {
        const headers = new Headers();
        if (sessionStorage.getItem('credentials')) {
            headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
            headers.append('Accept', 'application/json');
        }
        fetch(this.apiUrl + '/books/' + this.id, {
            headers: headers
        })
            .then(res => res.json())
            .then(data => this.book = data)
            .catch(err => console.log(err.message)),
            this.fetchFavorite();
        this.fetchBookTags();

    },
    computed: {
        publishedDate_formatted() {
            if (this.book) {
                const date = new Date(this.book.publishedDate);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                return `${day}.${month}.${year}`;
            }
        },
        addedOnDate_formatted() {
            if (this.book) {
                const date = new Date(this.book.addedOnDate);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');
                return `${day}.${month}.${year} ${hours}:${minutes}`;
            }
        },
    },
    methods: {
        async handleFavorite(id) {
            const headers = new Headers();
            if (sessionStorage.getItem('credentials')) {
                headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
                headers.append('Content-Type', 'application/json');
            }
            fetch(this.apiUrl + '/favorites', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    userId: 1,
                    bookId: id
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Book is already a favorite.')
                    }
                    this.fetchFavorite()
                    toast.success("Book is now a favorite!", {
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
                    return response.json();
                })
                .catch((error) => {
                    console.error('There was a problem with the API request:', error);
                    this.bookError = error.message;
                });
        },

        async fetchFavorite() {
            try {
                const headers = new Headers();
                if (sessionStorage.getItem('credentials')) {
                    headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
                    headers.append('Accept', '*/*');
                }
                const response = await fetch(this.apiUrl + '/favorites/1/' + this.id, {
                    headers: headers
                });
                const data = await response.text();
                this.isFavorite = data;
            } catch (error) {
                console.log(error.message);
            }
        },
        async fetchBookTags() {
            const headers = new Headers();
            if (sessionStorage.getItem('credentials')) {
                headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
                headers.append('Accept', 'application/json');
            }
            try {
                const uri = this.apiUrl + "/books/" + this.id + "/tags";
                const response = await fetch(uri, {
                    headers: headers
                });
                const data = await response.json();
                this.bookTags = data;
            } catch (error) {
                console.log(error.message);
            }
        },

        async updateBook() {

            const book = {
                id: this.id,
                isbn10: this.book.isbn10,
                isbn13: this.book.isbn13,
                title: this.book.title,
                subtitle: this.book.subtitle,
                author: this.book.author,
                publisher: this.book.publisher,
                pages: this.book.pages,
                imageUrl: this.book.imageUrl,
                selfLink: this.book.selfLink,
                publishedDate: this.book.publishedDate,
                description: this.book.description,
                printType: this.book.printType,
                category: this.book.category,
                maturityRating: this.book.maturityRating,
                language: this.book.language,
                infoLink: this.book.infoLink,
                rating: this.book.rating,
                comment: this.book.comment,
                readStatus: this.book.readStatus,
                addedOnDate: this.book.addedOnDate
            };
            const headers = new Headers();
            if (sessionStorage.getItem('credentials')) {
                headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
                headers.append('Content-Type', 'application/json');
            }
            fetch(this.apiUrl + '/books/edit/' + this.id, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(book)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Book updated successfully:', data);
                    this.book = data;

                    this.$forceUpdate();
                    router.push({ path: '/books/' + book.id })
                })
                .catch(error => {
                    console.error('Error updating book:', error);
                });
        },

        async addBookTag(e) {
            if (this.tempBookTag) {
                if (!this.bookTags.includes(this.tempBookTag)) {
                    const headers = new Headers();
                    if (sessionStorage.getItem('credentials')) {
                        headers.append('Authorization', 'Basic ' + sessionStorage.getItem('credentials'));
                        headers.append('Content-Type', 'text/plain');
                    }
                    const response = await fetch(this.apiUrl + '/books/' + this.id + '/tags/add', {
                        method: 'POST',
                        headers: headers,
                        body: this.tempBookTag
                    });
                    if (response.ok) {
                        this.tempBookTag = '';
                        // Call the fetchBookTags method to update the bookTags array
                        this.fetchBookTags();
                    } else {
                        console.error('Failed to add book tag');
                    }

                }

            }
        }
    }
}
</script>
  
<style scoped>
.book {
    padding: 5px;
    background-color: #f8f8f8;
    border: 1px solid #ccc;
}

.book-attribute {
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    border-top: 1px solid #ccc;
    /* add top border to all book-attribute divs */
}

.book-attribute:first-child {
    border-top: none;
    /* remove top border from the first book-attribute div */
}

.label {
    margin-top: 10px;
    font-weight: bold;
    display: table-cell;
    vertical-align: middle;
}

.value {
    margin-top: 10px;
    display: table-cell;
    vertical-align: middle;
}

.separator {
    border-top: 1px solid #ccc;
    margin: 10px 0;
}

.book-info {
    display: flex;
    align-items: center;
    background: #ccc;
    margin-top: 10px;
}

.book-cover {
    margin-right: 20px;
}

.book-cover img {
    width: 200px;
    height: 300px;
    border: 1px solid black;
}

.book-details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin: 0 auto;
}

.book-rating {
    margin-top: 10px;
}

.star {
    font-size: 20px;
    color: gold;
}

.star-zero {
    font-size: 20px;
    color: grey;
}

.material-icons {
    font-size: 20px;
    margin-left: 10px;
    color: #bbb;
    cursor: pointer;
}

.red {
    color: red
}

.error {
    color: #ff0062;
    margin-top: 10px;
    font-size: 0.8em;
    font-weight: bold;
}

.pill {
    display: inline-block;
    margin: 20px 10px 0 0;
    padding: 6px 12px;
    background: #eee;
    border-radius: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: bold;
    color: #777;
    cursor: pointer;
}

.pill:hover {
    background: teal;
}

.bookTag-pill {
    color: black;
    text-decoration: none;
}

.bookTag-pill:hover {
    color: white;

}

input {
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    background: white;
    border-bottom: 1px solid teal;
}

.btn {
    max-width: 420px;
    width: 100%;
    margin-bottom: 30px;
}

.form {
    background: #f2f2f2;
}

.option-pill {
    display: inline-block;
    margin: 20px 10px 0 0;
    padding: 6px 12px;
    background: teal;
    border-radius: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: bold;
    color: teal;
    cursor: pointer;
}

.option-pill:hover {
    background: teal;
}

.optionButton-pill {
    color: black;
    text-decoration: none;
}

.optionButton-pill:hover {
    color: white;
}
</style>
  