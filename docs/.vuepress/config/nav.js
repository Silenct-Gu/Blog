//导航栏
module.exports = [
    { text: '首页', link: '/index.html', icon: 'reco-home' },
    {
        text: '后端',
        icon: 'reco-document',
        items: [
            {
                text: 'c#',
                link: '/backend/c_sharp/',
            },
        ],
    },
    {
        text: '前端',
        icon: 'reco-document',
        items: [
            {
                text: 'javascript',
                link: '/frontend/javascript/',
            },
        ],
    },
    // {
    //     text: '知识整理',
    //     icon: 'reco-document',
    //     items: [
    //         {
    //             text: 'Projects🎈',
    //             items: [
    //                 {
    //                     text: 'java',
    //                     link: '/frontend/javascript/',
    //                 },
    //                 {
    //                     text: 'C_sharp1.0',
    //                     link: '/backend/c_sharp1.0/',
    //                 },
    //             ],
    //         },
    //     ],
    // },
];
