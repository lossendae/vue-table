<template>
    <div class="site-wrapper" ref="header">
        <header id="hero" class="d-flex flex-column align-items-center justify-content-center pb-5">
            <img src="/logo.png" alt="hero" class="mb-2">
            <h1 class="mb-2">Vue-table</h1>
            <h2 class="mb-5">
                A table component with pagination and more for <span class="text-success">Vue.js</span> 2.x
            </h2>
            <div class="hero-actions">
                <a href="" class="btn btn-primary mr-2"><i class="fa fa-github mr-2"></i>View on Github</a>
                <a href="" class="btn btn-success">Getting started & examples</a>
            </div>
        </header>

        <main class="page-wrapper d-flex m-auto pt-5 pb-3">
            <sidebar></sidebar>

            <div class="pl-3 pr-3" id="content" ref="content">
                <section v-for="section in sections" :key="section.name">
                    <h2 class="mb-4">{{ section.title }}</h2>
                    <hr class="mb-0 pb-0">

                    <component v-for="chapter in getChapters(section.name)" :is="chapter" :section_name="section.name" :key="chapter.name"></component>
                </section>

                <hr class="pb-5">

                <div class="bg-light p-3">
                    <small class="mr-2">MIT Licensed - Created by Stéphane Boulard</small>
                    <a class="mr-1" href="https://twitter.com/lossendae"><i class="fa fa-fw fa-twitter"></i></a>
                    <a href="https://github.com/lossendae"><i class="fa fa-fw fa-github"></i></a>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
  import { mapState }        from 'vuex'
  import Sidebar             from './layout/Sidebar'
  import * as GettingStarted from './section/getting-started'
  import * as Examples       from './section/examples'
  import * as Api            from './section/api'

  const sections = {
    GettingStarted,
    Examples,
    Api,
  }

  export default {
    name: 'App',
    components: { Sidebar },
    data() {
      return {}
    },
    computed: {
      ...mapState([
        'sections',
      ]),
    },
    methods: {
      getChapters(section_name) {
        return Object.keys(sections[section_name]).map(key => {
          return sections[section_name][key]
        })
      },
      updateContentThreshold(e) {
        if (e && e.type === 'resize') {
          this.$store.dispatch('updateContentOffsetTop', this.$refs.content.offsetTop)
        }

        this.$store.dispatch('updateContentThreshold', window.scrollY - (this.$refs.content.offsetTop))
      },
    },
    created() {
      this.$store.dispatch('addSections', Object.keys(sections))
    },
    mounted() {
      // wait until the component and all its children are rendered
      this.$nextTick(() => {
        this.$store.dispatch('updateContentOffsetTop', this.$refs.content.offsetTop)
        // Update initial content position
        this.updateContentThreshold()

        // Register events
        window.addEventListener('scroll', this.updateContentThreshold)
        window.addEventListener('resize', this.updateContentThreshold)
      })
    },
    // cleanup
    beforeDestroy() {
      window.removeEventListener('scroll', this.updateContentThreshold)
      window.removeEventListener('resize', this.updateContentThreshold)
    },
  }
</script>

<style src="./assets/scss/main.scss" lang="scss"></style>
