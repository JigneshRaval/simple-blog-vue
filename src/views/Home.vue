<template>
    <section class="uk-flex uk-flex-row full-height">
        <div class="vb-sidebar">
            <ArticleList v-bind:articles="articles"></ArticleList>
        </div>
        <div class="vb-content">
            <button v-on:click="toggleSideBar">Reverse Message</button>

            <Article v-bind:article="article" :utils="utils" />
        </div>
    </section>
</template>

<script>
import Article from '../components/Article.vue';
import ArticleList from '../components/ArticleList.vue';
import Utils from '@/services/utils';



export default {
    //scoped variables in this component
    data() {
        return {
            activeTab: 0,
            articles: [],
            article: {},
            utils: new Utils()
        }
    },

    // observed variables (by function)
    computed: {
    },

    // functions firing by template
    methods: {
        getArticles() {
            return fetch('/api/articles')
                .then((response) => {
                    // If error then exit
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code : ' + response.status);
                        return;
                    }
                    // Examine the text in the response
                    // this.articles = response.json();
                    // return this.articles;
                    return response.json();
                }).catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });
        },

        toggleSideBar() {
            const sideBar = document.querySelector('.vb-sidebar');
            if (sideBar) {
                if (sideBar.classList.contains('is-closed')) {
                    sideBar.classList.remove('is-closed');
                } else {
                    sideBar.classList.add('is-closed');
                }
            }
        }
    },

    // child components this component calls
    components: {
        Article,
        ArticleList
    },

    // variables passed from parent template
    props: {

    },

    // Lifecycle hooks
    created() {
        // this.utils = new Utils();
        this.getArticles().then((data) => {
            console.log('data : ', data);
            this.articles = data.docs;
            this.article = data.docs[0];
        });
    },
    mounted() {

    },
    updated() { },
    destroyed() { }
}
</script>

<!--
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Article from '../components/Article.vue';
import ArticleList from '../components/ArticleList.vue';

@Component({
    components: {
        Article,
        ArticleList,
    },
    props: {

    },
})
export default class Home extends Vue {
    public articles = [];

    constructor() {
        super();
    }

    created() {
        this.getArticles().then((data) => {
            console.log('data : ', data);
            this.articles = data.docs;
        });

        console.log('this.articles', this.articles)
    }

    getArticles() {
        return fetch('/api/articles')
            .then((response) => {
                // If error then exit
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code : ' + response.status);
                    return;
                }
                // Examine the text in the response
                // this.articles = response.json();
                // return this.articles;
                return response.json();
            }).catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    toggleSideBar() {
        const sideBar = document.querySelector('.vb-sidebar');
        if (sideBar) {
            if (sideBar.classList.contains('is-closed')) {
                sideBar.classList.remove('is-closed');
            } else {
                sideBar.classList.add('is-closed');
            }
        }
    }
}
</script>
-->

<style lang="scss">
.vb-sidebar {
    flex: 0 0 auto;
    width: 300px;
    background-color: #ccc;
    transition: all 0.2s ease-in-out;

    &.is-closed {
        margin-left: -300px;
        opacity: 0;
    }
}
.vb-content {
    flex: 1 1 auto;
}
</style>
