<template>
    <li class="nav-section-item"
        :class="{ active: item.id === active_id }"
    >
        <a :href="'#' + item.id">{{ element.innerHTML }}</a>
    </li>
</template>

<script>
  export default {
    name: 'SidebarItem',
    props: {
      item: {
        type: Object,
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
      active_id: {
        required: true,
        default: null,
      },
    },
    data() {
      return {
        element: document.getElementById(this.item.id),
      }
    },
    computed: {
      _threshold() {
        return {
          top: (this.element.offsetTop - this.element.offsetHeight),
          content: this.content_threshold,
        }
      },
      threshold() {
        return this._threshold.top
      },
    },
    methods: {
      notify() {
        this.$emit('threshold:change', {
          id: this.item.id,
          threshold: this.threshold,
        })
      },
    },
    mounted() {
      this.notify()
    },
    watch: {
      threshold() {
        this.notify()
      },
    },
  }
</script>
