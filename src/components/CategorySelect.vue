<template>
    <select id="categoryField" ref="select" class="form form-select" v-model="categoryName" @change="selectCategory">
        <option value="0">{{ placeholder }}</option>
        <option v-for="category, index in categories" :value="index">{{ category.name }}</option>
    </select>

    <category-select v-if="hasSubCategories" :category="currentCategory" :categories="currentCategory.categories">
    </category-select>
</template>

<script>
import store from "$/store.js";
import CategorySelect from "./CategorySelect.vue";

export default {
    props: ['category', 'categories'],

    data() {
        return {
            categoryName: "0"
        }
    },

    computed: {
        placeholder() {
            return !this.category ? "Choose a Category" : "Choose a Sub-Category";
        },

        hasSubCategories() {
            return this.currentCategory && this.currentCategory.categories ? Object.keys(this.currentCategory.categories).length > 0 : false;
        },

        currentCategory() {
            return this.categories[this.categoryName];
        }
    },

    mounted() {
        if (!store.game.category)
            this.selectCategory();

        $(this.$refs.select).trigger("focus");
    },

    methods: {
        selectCategory() {
            const category = this.currentCategory;
            
            if (category && category.cards) {
                switch (store.game.cardSorting) {
                    case "alpha":
                        category.cards = sortByKey(category.cards, "name", "asc");
                        break;

                    case "shuffle":
                        category.cards = shuffleArray(category.cards);
                        break;
                }
            }

            store.game.category = category;
        }
    }
}
</script>

<style scoped>
select {
    max-width: 200px;
    margin: auto;
    margin-bottom: 15px;
}
</style>