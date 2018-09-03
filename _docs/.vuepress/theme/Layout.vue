<template>
    <div class="site-wrapper">
        <header id="hero" class="d-flex flex-column align-items-center justify-content-center pb-5">
            <img v-if="data.heroImage" :src="$withBase(data.heroImage)" alt="hero" class="mb-2">
            <h1 class="mb-2">{{ $siteTitle }}</h1>
            <h2 class="mb-5" v-html="$description"></h2>
            <div class="hero-actions">
                <a :href="repoLink" class="btn btn-primary mr-2"><i class="fa fa-github mr-2"></i>View on Github</a>
                <a href="" class="btn btn-success">Getting started & examples</a>
            </div>
        </header>
        <div class="page-wrapper m-auto row pt-3 pb-3">
            <div class="col col-nav bg-light"></div>
            <div class="col bg-success">
                <template v-for="nav in navs">
                    {{ getContentKey(nav.link).key }}<br>
                    <CustomContent :custom="false" :page-key="getContentKey(nav.link).key"/>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import CustomContent from './CustomContent'

    export default {
        name: 'Layout',
        components: { CustomContent },
        computed: {
            data() {
                return this.$page.frontmatter
            },
            pages() {
                return this.$site.pages
            },
            navs() {
                return this.$themeLocaleConfig.nav
            },
            repoLink() {
                const { repo } = this.$site.themeConfig
                if (repo) {
                    return /^https?:/.test(repo)
                        ? repo
                        : `https://github.com/${repo}`
                }
            },
        },
        methods: {
            getContentKey(link) {
                return this.pages.find(p => p.path === link)
            },
        },
    }
</script>

<style src="./styles/main.scss" lang="scss"></style>
