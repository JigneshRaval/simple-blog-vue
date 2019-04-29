<template>
    <article class="uk-article article-view">
        <div class="article-wrapper">
            <header class="article__header">
                <div class="header__content">
                    <a href="#" class="article-category"
                        ><span class="category-color"></span>
                        {{ article.category }}</a
                    >
                    <h1 class="uk-article-title">
                        <a
                            class="uk-link-reset"
                            :href="article.sourceUrl"
                            :title="article.sourceUrl"
                            target="_blank"
                            >{{ article.title }}</a
                        >
                    </h1>

                    <p class="uk-article-meta">
                        Written by
                        <a href="javascript:;"
                            ><strong>{{ article.author }}</strong></a
                        >
                        on <strong></strong>.
                    </p>
                    <div class="article__tags-list">
                        <!-- Tagged as <TagsInline article={article} onFilterArticles={props.onFilterArticles} class={'uk-button'} /> -->
                    </div>
                </div>
            </header>

            <div class="article__content">
                <p class="uk-text-lead" v-if="article.excerpt">
                    {{article.excerpt}}
                </p>
                <article v-html="article.htmlCode"></article>
            </div>

            <footer class="article__footer">
                <a
                    href="javascript:void(0);"
                    id="scrollToTop"
                    class="scroll-top"
                    v-on:click="scrollToTop"
                >
                    <i class="ion ion-md-arrow-round-up"></i>
                    <span class="sr-only">Scroll To Top</span>
                </a>
            </footer>
        </div>
    </article>
</template>

<script>

export default {
    props: {
        article: Object,
        utils: Object
    },
    data() {
        return {

        }
    },
    methods: {
        scrollToTop() {
            let scrollParentElement = document.querySelector('.article-view');
        this.utils.scrollToTop(scrollParentElement);
        }
    },
    created() {
        console.log('Test:', this.article);
    }
};
</script>
