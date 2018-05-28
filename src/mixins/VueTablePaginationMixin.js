export default {
    props: {
        showRefreshButton: {
            type: Boolean,
            default: true,
        },
        useFirstLastLinks: {
            type: Boolean,
            default: true,
        },
        useBoundariesNumbersLinks: {
            type: Boolean,
            default: false,
        },
        useNextPrevLinks: {
            type: Boolean,
            default: false,
        },
        firstText: {
            type: String,
            default: "«",
        },
        lastText: {
            type: String,
            default: "»",
        },
        nextText: {
            type: String,
            default: "<",
        },
        previousText: {
            type: String,
            default: ">",
        },
        useEllipses: {
            type: Boolean,
            default: true,
        },
        changeOnClick: {
            type: Boolean,
            default: false,
        },
        rotate: {
            type: Boolean,
            default: true,
        },
        maxPageItems: {
            type: Number,
            default: 5,
        },
        itemsPerPage: {
            type: Number,
            default: 15,
        },
        totalItems: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true,
        },
    },
    computed: {
        is_last_page() {
            return this.currentPage === this.total_pages
        },
        is_first_page() {
            return this.currentPage === 1
        },
        total_pages() {
            let total_pages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage)
            return Math.max(total_pages || 0, 1)
        },
        from() {
            return this.is_first_page
                ? 1
                : (this.itemsPerPage * (this.currentPage - 1)) + 1
        },
        to() {
            return this.is_last_page
                ? this.totalItems
                : this.itemsPerPage * this.currentPage
        },
        pages() {
            let pages = []

            if (this.currentPage <= 0 || this.currentPage > this.total_pages) {
                return pages
            }

            // Default page limits
            let start_page = 1
            let end_page = this.total_pages
            let limit_page_items = this.isDefined(this.maxPageItems) && this.maxPageItems < this.total_pages

            // recompute if maxPageItems
            if (limit_page_items) {
                if (this.rotate) {
                    // Current page is displayed in the middle of the visible ones
                    start_page = Math.max(this.currentPage - Math.floor(this.maxPageItems / 2), 1)
                    end_page = start_page + this.maxPageItems - 1

                    // Adjust if limit is exceeded
                    if (end_page > this.total_pages) {
                        end_page = this.total_pages
                        start_page = end_page - this.maxPageItems + 1
                    }
                } else {
                    // Visible pages are paginated with maxPageItems
                    start_page = (Math.ceil(this.currentPage / this.maxPageItems) - 1) * this.maxPageItems + 1

                    // Adjust last page if limit is exceeded
                    end_page = Math.min(start_page + this.maxPageItems - 1, this.total_pages)
                }
            }

            // Add page number links
            for (let number = start_page; number <= end_page; number++) {
                let page = this.makePage(number, number, number === this.currentPage)
                pages.push(page)
            }

            // Add links to move between page sets
            if (limit_page_items && this.maxPageItems > 0 && (!this.rotate || this.useEllipses || this.useBoundariesNumbersLinks)) {
                if (start_page > 1) {
                    if (!this.useBoundariesNumbersLinks || start_page > 3) {
                        //need ellipsis for all options unless range is too close to beginning
                        let previous_ellipsis_page_item = this.makePage(start_page - 1, '...', false)
                        pages.unshift(previous_ellipsis_page_item)
                    }

                    if (this.useBoundariesNumbersLinks) {
                        if (start_page === 3) {
                            //need to replace ellipsis when the buttons would be sequential
                            let second_page_item = this.makePage(2, '2', false)
                            pages.unshift(second_page_item)
                        }

                        //add the first page
                        let first_page_item = this.makePage(1, '1', false)
                        pages.unshift(first_page_item)
                    }
                }

                if (end_page < this.total_pages) {
                    if (!this.useBoundariesNumbersLinks || end_page < this.total_pages - 2) {
                        //need ellipsis for all options unless range is too close to end
                        let next_ellipsis_page_item = this.makePage(end_page + 1, '...', false)
                        pages.push(next_ellipsis_page_item)
                    }
                    if (this.useBoundariesNumbersLinks) {
                        if (end_page === this.total_pages - 2) {
                            //need to replace ellipsis when the buttons would be sequential
                            let second_to_last_page_item = this.makePage(this.total_pages - 1, this.total_pages - 1, false)
                            pages.push(second_to_last_page_item)
                        }

                        //add the last page
                        let last_page_item = this.makePage(this.total_pages, this.total_pages, false)
                        pages.push(last_page_item)
                    }
                }
            }

            return pages
        },
    },
    methods: {
        selectPage(page) {
            this.$emit('pagination:change', page)
        },
        isDefined(value) {
            return typeof value !== "undefined"
        },
        makePage(number, label, active) {
            return { number, label, active }
        },
    },
}
