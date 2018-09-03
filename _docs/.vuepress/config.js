module.exports = {
    title: 'VueTable',
    description: 'Simple table component for <span class="text-success">Vue.js</span> 2.x with pagination and sortable columns',
    base: '/vue-table/',
    head: [
        ['link', { rel: 'icon', href: `/logo.png` }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
    ],
    themeConfig: {
        repo: 'lossendae/vue-table',
        editLinks: false,
        docsDir: 'docs',
        locales: {
            '/': {
                label: 'English',
                selectText: 'Languages',
                editLinkText: 'Edit this page on GitHub',
                lastUpdated: 'Last Updated',
                nav: [
                    {
                        text: 'Getting started',
                        link: '/getting-started/',
                    },
                    {
                        text: 'Examples',
                        link: '/examples/',
                    },
                    {
                        text: 'API references',
                        link: '/api-references/',
                    },
                ],
                // sidebar: {
                //     '/getting-started/': [
                //         {
                //             title: 'Getting started',
                //             collapsable: false,
                //             children: [
                //                 '',
                //                 'credits',
                //             ],
                //         },
                //     ],
                //     '/examples/': [
                //         {
                //             title: 'Examples',
                //             collapsable: false,
                //             children: [
                //                 '',
                //                 'case-study',
                //             ],
                //         },
                //     ],
                // },
            },
        },
    },
}
