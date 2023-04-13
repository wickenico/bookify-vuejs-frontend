<template>
    <div class="container">
        <h1 class="text-center mb-4">Frequently Asked Questions</h1>

        <div class="accordion" id="faqAccordion">
            <div class="accordion-item" v-for="(faq, index) in faqs" :key="index">
                <h2 class="accordion-header" :id="'faqHeader' + index">
                    <button class="accordion-button" type="button" :data-bs-toggle="'#faqCollapse' + index"
                        :aria-expanded="index === 0 ? 'true' : 'false'" :aria-controls="'faqCollapse' + index">
                        {{ faq.question }}
                    </button>
                </h2>
                <div :id="'faqCollapse' + index" class="accordion-collapse collapse" :class="{ 'show': index === 0 }"
                    :aria-labelledby="'faqHeader' + index" data-bs-parent="#faqAccordion">
                    <div class="accordion-body">
                        {{ faq.answer }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            faqs: [
                {
                    question: "What is this app for?",
                    answer: "This app is for managing your book collection. You can add, edit, and delete books, and keep track of their information such as title, author, and genre."
                },
                {
                    question: "How do I add a new book?",
                    answer: "To add a new book, click on the 'Add Book' button on the home page. Fill in the required fields such as title, author, and genre, and click 'Save' to add the book to your collection."
                },
                {
                    question: "Can I edit or delete a book?",
                    answer: "Yes, you can edit or delete a book by clicking on the 'Edit' or 'Delete' button next to the book on the home page. Make sure to save your changes if you edit the book."
                },
                {
                    question: "What if I forget my password?",
                    answer: "If you forget your password, click on the 'Forgot Password' link on the login page. Follow the instructions to reset your password."
                }
            ]
        }
    }
}
</script>
  
<style scoped>
.accordion-button {
    background-color: #f8f9fa;
    border: 1px solid #f8f9fa;
    color: #212529;
}

.accordion-button:hover {
    background-color: #e2e6ea;
    border: 1px solid #212529;
}

.accordion-button:focus {
    box-shadow: none;
}

.accordion-button:not(.collapsed) {
    background-color: #e2e6ea;
}

.accordion-body {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-top: none;
}

.accordion-item:not(:last-child) .accordion-body {
    border-bottom: none;
}
</style>
  