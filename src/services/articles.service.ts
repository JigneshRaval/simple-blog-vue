// articles.service.ts

// Service for CRUD operations
// Create, Read, Update and Delete articles
export class ArticleService {
    articles: any;

    constructor() { }

    getArticlesData() {
        // this.articles = this.getAllArticles().then(data => data);
        return this.articles;
    }


    setArticlesData(articles: any) {
        this.articles = articles;
    }

    /**
     * getAllArticles: Get all the articles from database
     */
    public getAllArticles() {
        // Render all Todo items on component render
        return fetch('/api/articles')
            .then((response) => {
                // If error then exit
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                // Examine the text in the response
                this.articles = response.json();
                return this.articles;
            });
    }


    /**
     * getArticleById: Get single articles by Id
     */
    public getArticleById(articleId: string) {
        console.log('getArticleById :', articleId);

        return fetch(`/api/articles/${articleId}`)
            .then((response) => {
                // If error then exit
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                // Examine the text in the response
                this.articles = response.json();
                return this.articles;
            });
    }


    /**
     * createArticle: Create new article
     */
    public createArticle(formData: any) {
        console.log('getAllArticles :');
        // Post form data to server
        return fetch('/api/articles/add', {
            method: 'POST',
            body: JSON.stringify(formData),
            mode: 'cors',
            // redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json'
                //"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            })
        })
            .then((response) => {
                // If error then exit
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                // Examine the text in the response
                this.articles = response.json();
                return this.articles;
            });
    }

    public editArticle(articleId: string, formData: any) {
        console.log('editArticle :', articleId);
        return fetch(`/api/articles/edit/${articleId}`, {
            method: 'POST',
            body: JSON.stringify(formData),
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json'
                //"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            })
        })
            .then((response) => response.json());
    }

    public deleteArticle(articleId: string) {
        console.log(`deleteArticle - ${articleId}:`);
        return fetch(`/api/articles/delete/${articleId}`, {
            method: 'DELETE',
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json'
                //"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            })
        })
            .then((response) => response.json());
    }

    public deleteAllArticles() {
        console.log('deleteAllArticles :');
    }

    public markAsFavorite(articleId: string, isFavorite: boolean) {
        let formData = { favorite: !isFavorite };

        return fetch(`/api/articles/favorite/${articleId}`, {
            method: 'PUT',
            body: JSON.stringify(formData),
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json'
                //"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            })
        })
            .then((response) => response.json());
    }
}
