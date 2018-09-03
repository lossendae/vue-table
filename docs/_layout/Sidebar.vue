<template>
    <aside class="pr-3 pl-3 flex-shrink-0">
        <nav>
            <ul class="list-unstyled">
                <template v-for="section in sections">
                    <li class="nav-section-heading">
                        {{ section.name }}
                    </li>
                    <sidebar-item
                            v-for="section_title of getSectionTitles(section.key)"
                            :item="section_title"
                            :key="section_title.id"
                            :content_offset_top="content_offset_top"
                            :content_threshold="content_threshold"
                            :active_id="_active_title"
                            @threshold:change="onThresholdChange"
                    >
                    </sidebar-item>
                    <!--<li class="nav-section-item"-->
                    <!--v-for="section_title of getSectionTitles(section.key)"-->
                    <!--:class="{ active: section_title.id === active_section_title }"-->
                    <!--&gt;-->
                    <!--<a :href="'#' + section_title.id">{{ section_title.label }}</a>-->
                    <!--<template v-if="section_title.id === active_section_title && section_subtitles">-->
                    <!--<ul>-->
                    <!--<li class="nav-section-sub-item"-->
                    <!--v-for="subtitle in section_subtitles"-->
                    <!--:class="{ active: subtitle.id === active_section_subtitles }"-->
                    <!--&gt;-->
                    <!--<a :href="'#' + subtitle.id">{{ subtitle.label }}</a>-->
                    <!--</li>-->
                    <!--</ul>-->
                    <!--</template>-->
                    <!--</li>-->
                </template>
            </ul>
        </nav>
    </aside>
</template>

<script>
  import SidebarItem from './SidebarItem'

  export default {
    components: { SidebarItem },
    props: {
      sections: {
        type: Array,
        required: true,
      },
      section_titles: {
        type: Array,
        required: true,
      },
      content_offset_top: {
        type: Number,
        required: true,
      },
      content_threshold: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        items: {},
      }
    },
    computed: {
      _active_title() {
        const keys = Object.keys(this.items)

        if (keys.length === 0) {
          return null
        }

        const items = keys
          .map(k => {
            return { id: k, threshold: this.items[k] }
          })
          .sort((a, b) => a.threshold - b.threshold)

        let reached = items.filter(item => {
          return (this.content_offset_top + this.content_threshold) > item.threshold
        })

        return reached.length === 0
          ? items[0].id
          : reached.pop().id
      },
      // section_titles_reached() {
      //   return this.section_titles.filter(section => {
      //     return this.content_threshold > section.threshold
      //   })
      // },
      // active_section_title() {
      //   if (this.section_titles.length === 0) {
      //     return null
      //   }
      //
      //   return this.section_titles_reached.length > 0
      //     ? [...(this.section_titles_reached)].pop().id
      //     : this.section_titles[0].id
      // },
      // section_subtitles() {
      //   if (this.active_section_title === null) {
      //     return null
      //   }
      //
      //   const subtitles = document
      //     .getElementById(this.active_section_title)
      //     .closest('.chapter')
      //
      //   if (!subtitles) {
      //     return null
      //   }
      //
      //   let result = []
      //   for (let el of subtitles.querySelectorAll('h5')) {
      //     if (!el.id) {
      //       continue
      //     }
      //
      //     result.push({
      //       id: el.id,
      //       label: el.innerHTML,
      //       threshold: (el.offsetTop - el.offsetHeight) - this.content_offset_top,
      //     })
      //   }
      //
      //   return result
      // },
      // active_section_subtitles() {
      //   if (!this.section_subtitles) {
      //     return null
      //   }
      //
      //   const active = this.section_subtitles.filter(subtitle => {
      //     return this.content_threshold > subtitle.threshold
      //   })
      //
      //   return active.length > 0
      //     ? [...active].pop().id
      //     : null
      // },
    },
    methods: {
      getSectionTitles(section_name) {
        return this.section_titles.filter(st => st.section === section_name)
      },
      onThresholdChange(item) {
        this.$set(this.items, item.id, item.threshold)
      },
    },
    watch: {
      // content_threshold() {
      //   console.table(this.section_titles.map(s => {
      //     return {
      //       name: s.label,
      //       content: this.content_threshold,
      //       threshold: s.threshold,
      //       calc: this.content_threshold > s.threshold,
      //     }
      //   }))
      // },
    },
  }
</script>
