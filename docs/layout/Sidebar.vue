<template>
    <aside class="pr-3 pl-3 flex-shrink-0">
        <nav>
            <ul class="list-unstyled">
                <template v-for="section in sections">
                    <li class="nav-section-heading">
                        {{ section.title }}
                    </li>
                    <sidebar-item
                            v-for="chapter in chapters[section.name]"
                            :item="chapter"
                            :key="chapter.name"
                    >
                    </sidebar-item>
                </template>
            </ul>
        </nav>
    </aside>
</template>

<script>
  import { mapState } from 'vuex'
  import SidebarItem  from './SidebarItem'

  export default {
    components: { SidebarItem },
    computed: {
      ...mapState([
        'sections',
        'chapters',
      ]),
    },
  }
</script>
