import * as types from './mutation-types'

export default {
  [types.ADD_SECTIONS](state, sections) {
    state.sections = sections
  },
  [types.ADD_CHAPTER](state, [ section, chapter ]) {
    if (!state.chapters.hasOwnProperty(section)) {
      state.chapters[section] = []
    }

    if (!state.chapters[section].includes[chapter]) {
      state.chapters[section].push(chapter)
    }
  },
  [types.ADD_SUB_SECTION](state, { key, value }) {
    state.sub_chapters[key].push(value)
  },
  [types.UPDATE_CONTENT_OFFSET_TOP](state, offset_top) {
    state.content.offsetTop = offset_top
  },
  [types.UPDATE_CONTENT_THRESHOLD](state, threshold) {
    state.content.threshold = threshold
  },
}
