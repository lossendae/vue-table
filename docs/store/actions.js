import * as types from './mutation-types'
import startCase  from 'lodash.startcase'

export default {
  addSections({ commit }, sections) {
    const formatted = sections.map(section => {
      return {
        name: section,
        title: startCase(section),
      }
    })
    commit(types.ADD_SECTIONS, formatted)
  },
  addChapter({ state, commit }, [section, chapter]) {
    const formatted = {
      name: chapter,
      title: startCase(chapter),
    }
    commit(types.ADD_CHAPTER, [section, formatted])
  },
  updateContentOffsetTop({ commit }, offset_top) {
    commit(types.UPDATE_CONTENT_OFFSET_TOP, offset_top)
  },
  updateContentThreshold({ commit }, threshold) {
    commit(types.UPDATE_CONTENT_THRESHOLD, threshold)
  }
}
