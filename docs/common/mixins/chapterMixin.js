import { mapActions } from 'vuex'

export default {
  props: {
    section_name: {
      required: true,
    },
  },
  methods: {
    ...mapActions([
      'addChapter'
    ]),
  },
  mounted() {
    this.addChapter([ this.section_name, this.$options.name ])
  },
}
