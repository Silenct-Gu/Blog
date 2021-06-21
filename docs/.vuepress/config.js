const nav = require('./config/nav.js');

module.exports = {
    // 初始路由
    base: '/',
    // 标签页标题
    title: 'gNote',
    // 主题配置
    theme: 'reco',
    themeConfig: {
        nav,
        blogConfig: {
            category: {
                location: 2, // 在导航栏菜单中所占的位置，默认2
                text: '分类', // 默认文案 “分类”
            },
            tag: {
                location: 3, // 在导航栏菜单中所占的位置，默认3
                text: '标签', // 默认文案 “标签”
            },
        },
        subSidebar: 'auto', //在所有页面中启用自动生成子侧边栏
        sidebar: 'auto', //所有页面自动生成侧边栏
        markdown: {
            lineNumbers: true, //代码显示行号
        },
    },
    plugins: {
        'vuepress-plugin-auto-sidebar': {},
    },
    extend: 'reco',
};
