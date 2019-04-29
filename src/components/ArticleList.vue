<template>
    <div class="post-list__wrapper">
        <div class="uk-flex uk-flex-column">
            <div :class="[
                        'uk-card uk-card-default' +
                            (activeTab === index ? ' active' : '')
                    ]" v-for="(article, index) in articles" v-bind:key="article._id">
                <div class="card" data-category="{article.category}">
                    <div class="card-controls uk-inline">
                        <button class="uk-button uk-button-link" type="button">
                                <i uk-icon="more-vertical"></i>
                            </button>
                        <div uk-dropdown="mode: click; pos: bottom-right" class="uk-dropdown-bottom-right">
                            <ul class="uk-nav uk-dropdown-nav">
                                <li class="uk-nav-header">Actions</li>
                                <li class="uk-active">
                                    <a href="javascript:void(0);"><span uk-icon="pencil"></span> Edit Article</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);"><span uk-icon="trash"></span> Delete Article</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);"><span uk-icon="star"></span> Mark as Favorite</a>
                                </li>
                                <li class="uk-nav-header">Tags</li>
                                <!-- <TagsInline article={article} onFilterArticles={this.props.onFilterArticles} /> -->
                                <li>
                                    <a href="javascript:void(0);">Clear filter</a
                                        >
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="card-header">
                            { article.favorite ?
                            <span class="isFavorite" aria-label="favorite"
                                ><i class="corner"></i
                                ><i class="icon ion-ios-star"></i
                            ></span>
                            : '' }
                            <div class="article-category">
                                <span
                                    class="small-dot"
                                    data-category="{article.category.toLowerCase()}"
                                ></span
                                >{{ article.category }}
                            </div>
                            <h2 class="uk-card-title">
                                <a href="javascript: void(0);">{{
                                    article.title
                                }}</a>
                                    </h2>
                        </div>
                        <div class="card-footer">
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: 'ArticleList',
        props: {
            articles: Array,
            activeTab: Number
        },
        data() {
            return {

            }
        },
        methods: {

        },
        created() {

        }
    }
</script>
