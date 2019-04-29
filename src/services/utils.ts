// utils.ts
// ==============================

// Utility functions

declare var $: any;
declare var hljs: any;
declare var UIkit: any;

class Utils {
    scrollDuration: number = 250;
    lastScrollTop: number = 0;
    delta = 5;

    constructor() {
        this.init();
    }

    public init() {
        // show header if mouse reaches near to top browser border
        document.addEventListener("mousemove", function (e) {
            if (e.clientY < 10) {
                document.body.classList.remove('shrinkHeader');
            }
        });
    }

    public scrollToTop(element: any) {
        let scrollStep = -window.scrollY / (this.scrollDuration / 15);

        let scrollInterval = setInterval(function () {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 5);
    }


    /**
     * @function : Scroll to top with smooth animation using javascript only
     * @param event
     */
    public getScrollPosition(scrollElement: any) {
        let scrollTop = window.pageYOffset;

        if (scrollTop > 300) {
            scrollElement.classList.add('isVisible');
        } else {
            scrollElement.classList.remove('isVisible');
        }

        // Ref: https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c
        // Make sure they scroll more than delta ( delta = 5 )
        if (Math.abs(this.lastScrollTop - scrollTop) <= this.delta) {
            return;
        }

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        // header height = 96px
        if (scrollTop > this.lastScrollTop && scrollTop > 96) {
            // Scroll Down
            document.body.classList.add('shrinkHeader');
        } else {
            // Scroll Up
            if (scrollTop + window.innerHeight < document.body.offsetHeight) {
                document.body.classList.remove('shrinkHeader');
            }
        }

        console.log('scrollTop =', scrollTop, ' this.lastScrollTop =', this.lastScrollTop)
        this.lastScrollTop = scrollTop;
    }


    /**
     * @function : Toggle Sidebar Navigation
     * @param event
     */
    public toggleSidebarPanel(event: any) {
        const bodyElem = document.querySelector('body');
        if (bodyElem) {
            if (bodyElem.classList.contains('isIndexNavOpened')) {
                // Left sidebar navigation closed
                bodyElem.classList.remove('isIndexNavOpened');
                this.updateLocalStorage('isIndexNavOpened', 'false');
            } else {
                bodyElem.classList.add('isIndexNavOpened');
                this.updateLocalStorage('isIndexNavOpened', 'true');
            }
        }
    }


    public generatePagination() {
        $(".pagination-holder").jPages({
            containerID: "postList",
            perPage: 8,
            startPage: 1,
            startRange: 1,
            midRange: 5,
            endRange: 1,
            minHeight: false,
        });
    }

    public updateLocalStorage(key: any, value: any) {
        if ('localStorage' in (<any>window) && (<any>window)['localStorage'] !== null) {
            localStorage.setItem(key, value);
        }
    }

    /**
     * @function : Toggle settings dropdown in styleguide header section
     * @param event
     */
    public toggleDropdown(event: any) {
        let node = event.currentTarget.nextElementSibling;

        if (event.target.classList.contains('isActive')) {
            event.target.classList.remove('isActive');
            node.classList.remove('styleguide-dropdown-active');
        } else {
            event.target.classList.add('isActive');
            node.classList.add('styleguide-dropdown-active');
        }
    }


    public toggleGrid() {
        let body = document.querySelector('body');
        if (!body.classList.contains('showVerticalGrid')) {
            body.classList.add('showVerticalGrid');
        } else {
            body.classList.remove('showVerticalGrid');
        }
    }


    /**
     * Function to filter Articles by search value and filterBy type
     * @param searchTerm : string - Provide search value
     * @param filterBy : string - provide filterBy value like filterBy tags, category, all, search
     * @param articles : Array - List of all Articles to be filtered.
     */
    public filterArticlesBy(searchTerm: string, filterBy: string, articles: any) {
        switch (filterBy) {
            // Method 1: filter articles either by tags, category or by title which is matching with search term
            case 'search':
                let articleBySearch = articles.filter(({ tags, category, title }: any) => {
                    return category.toLowerCase().includes(searchTerm.toLowerCase()) || title.toLowerCase().includes(searchTerm.toLowerCase()) || tags.some((tag: any) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
                }).map((article: any) => article);

                return [...articleBySearch];
                break;

            // Method 2: filter articles by tags matching with search term
            case 'tag':
                let articleByTags = articles.filter(({ tags }: any) => {
                    return tags.some((tag: any) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
                });

                return [...articleByTags];
                break;

            // Method 3: filter articles by tags matching with search term
            case 'category':
                let articlesByCategory = articles.filter(({ category }: any) => {
                    return category.toLowerCase().includes(searchTerm.toLowerCase())
                });

                return [...articlesByCategory];
                break;

            // Method 4: reset all the filters and display all the articles.
            case 'all':
                return [...articles];
                break;

            // TODO : Remove or update if required
            default:
                return articles.map((article: any) => {
                    if (article[filterBy].indexOf(searchTerm) > -1) {
                        // filteredList.push(article);
                    }
                });
        }
    }

    public formatDate(dateFormat: any, separator: string, date: any) {
        let formattedDate,
            locale = "en-us";
        let dt = new Date(date);
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let day = dt.getDate();
        let month = dt.toLocaleString(locale, { month: "long" });
        let year = dt.getFullYear();

        switch (dateFormat) {
            case "dd/mm/yyyy":
                formattedDate = `${day}${separator}${month}${separator}${year}`;
            default:
                formattedDate = `${month} ${day}, ${year}`;
        }
        return formattedDate;
    }

    public getUniqueCategories = (articles: any) => {
        let uniqueCategories = articles.reduce((uniqcats: any, article: any) => {
            if (uniqcats.indexOf(article.category) === -1) {
                uniqcats.push(article.category);
            }
            return uniqcats;
        }, []);

        // OUTPUT : ["JavaScript", "React", ...]
        return uniqueCategories;
    }

}

export default Utils;
