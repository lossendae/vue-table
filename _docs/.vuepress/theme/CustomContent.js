export default {
    functional: true,

    props: {
        custom: {
            type: Boolean,
            default: true,
        },
        pageKey: {
            type: String,
        },
    },

    render(h, { parent, props, data }) {
        return h(props.pageKey, {
            class: [props.custom ? 'custom' : '', data.class, data.staticClass],
            style: data.style,
        })
    },
}
