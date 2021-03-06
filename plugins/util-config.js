module.exports = {
    loaderType: 'cmd', //加载器类型
    tmplFolder: 'tmpl', //模板文件夹，该文件夹下的js无法直接运行
    srcFolder: 'src', //经该工具编译到的源码文件夹，该文件夹下的js可以直接运行
    cssnano: { //css压缩选项
        safe: true,
        autoprefixer: false
    },
    less: {}, //less编译选项
    sass: {}, //sass编译选项
    autoprefixer: {},
    cssSourceMap: false,
    cssSelectorPrefix: null, //css选择器前缀，通常可以是项目的简写，多个项目同时运行在magix中时有用
    htmlminifier: { //html压缩器选项 https://www.npmjs.com/package/html-minifier
        removeComments: true, //注释
        collapseWhitespace: true, //空白
        quoteCharacter: '"', //属性引号
        removeEmptyAttributes: true, //移除空的属性
        collapseInlineTagWhitespace: true, //移除标签间的空白
        caseSensitive: true, //保持大小写
        //collapseBooleanAttributes: true,//boolean属性
        removeRedundantAttributes: true //移除默认的属性，如input当type="text"时 type可被移除
    },
    log: true, //日志及进度条
    debug: false, //
    thisAlias: '', //this别名
    jsLoopDepth: 3,
    revisableStringPrefix: '',//set default value at util-init.js
    checker: {
        css: true, //样式
        cssUrl: true, //样式中的url
        jsLoop: true, //js循环
        jsService: true, //js接口服务
        jsThis: true, //js this别名
        tmplCmdSyntax: true,//命令语法检查
        tmplAttrImg: true, //模板img属性
        tmplDisallowedTag: true, //不允许的标签
        tmplAttrDangerous: true, //危险的属性
        tmplAttrAnchor: true, //检测anchor类标签
        tmplAttrIframe: true, //检测iframe相关
        tmplAttrMxEvent: true, //mx事件
        tmplAttrMxView: true, //mx view
        tmplDuplicateAttr: true, //重复的属性
        tmplCmdFnOrForOf: true, //模板中函数或for of检测
        tmplTagsMatch: true //标签配对
    },
    tmplFileExtNames: ['html', 'haml', 'pug', 'jade', 'tpl'], //模板后缀
    tmplConstVars: {}, //模板中不会变的变量，减少子模板的分析
    tmplGlobalVars: {}, //模板中全局变量
    //tmplUncheckTags: {}, //不检测的标签
    //tmplAddEventPrefix: true, //mx事件增加前缀
    tmplAddViewsToDependencies: false, //是否把模板中的view做为依赖提前加载
    tmplOutputWithEvents: false, //输出事件
    tmplCompressVariable: true, //是否压缩模板中的变量
    tmplMultiBindEvents: false, //是否支持多个绑定
    tmplMESafeguard: false,//对象表达式保护
    tmplBindEvents: ['change'], //绑定表达式<%:expr%>绑定的事件
    tmplBindName: '@{sync.value.from.ui}', //绑定表达式<%:expr%>绑定的处理名称
    disableMagixUpdater: false,
    globalCss: [], //全局样式
    scopedCss: [], //全局但做为scoped使用的样式
    uncheckGlobalCss: [], //对某些全局样式不做检查
    useAtPathConverter: true, //是否使用@转换路径的功能
    jsFileExtNames: ['js', 'mx', 'ts'], //选择编译时的后缀名
    mxGalleriesRoot: 'app/gallery/',//组件根目录
    mxGalleriesMap: {
        'calendar-datepicker': {
            path: 'mx-calendar/datepicker',
            tag: 'input'
        },
        'calendar-rangepicker': {
            path: 'mx-calendar/rangepicker',
            tag: 'input'
        },
        'color-picker': {
            path: 'mx-color/picker',
            tag: 'input'
        },
        'suggest-index': {
            path: 'mx-suggest/index',
            tag: 'input'
        },
        'suggest': {
            path: 'mx-suggest/index',
            tag: 'input'
        },
        'time-picker': {
            path: 'mx-time/picker',
            tag: 'input'
        },
        'calendar.datepicker': {
            path: 'mx-calendar/datepicker',
            tag: 'input'
        },
        'calendar.rangepicker': {
            path: 'mx-calendar/rangepicker',
            tag: 'input'
        },
        'color.picker': {
            path: 'mx-color/picker',
            tag: 'input'
        },
        'suggest.index': {
            path: 'mx-suggest/index',
            tag: 'input'
        },
        'time.picker': {
            path: 'mx-time/picker',
            tag: 'input'
        },
        'loading': {
            processor() {
                return `<div class="loading">
                            <span class="loading-anim"></span>
                        </div>`;
            }
        }
    },
    tmplPadCallArguments(name) { //模板中某些函数的调用，我们可以动态添加一些参数。
        return '';
    },
    writeFileStart(e) {
        return e;
    },
    compileJSStart(content, from) { //开始编译某个js文件之前的处理器，可以加入一些处理，比如typescript的预处理
        return content;
    },
    compileJSEnd(e) { //结束编译
        return e;
    },
    compileCSSStart(css) {
        return css;
    },
    compileCSSEnd(css) {
        return css;
    },
    mxTagProcessor(tmpl, e) { //mx-tag的处理器
        return '';
    },
    tmplTagProcessor(tag) { //为了tmpl-naked准备的，遇到模板标签如何处理
        return tag;
    },
    cssNamesProcessor(tmpl, cssNamesMap) { //模板中class名称的处理器
        return tmpl;
    },
    compileTmplCommand(tmpl) {
        return tmpl;
    },
    compileTmplStart(tmpl) {
        return tmpl;
    },
    compileTmplEnd(tmpl) {
        return tmpl;
    },
    cssUrlMatched(url) { //样式中匹配到url时的处理器
        return url;
    },
    tmplImgSrcMatched(url) { //模板中匹配到img标签时的处理器
        return url;
    },
    resolveModuleId(id) { //处理模块id时的处理器
        return id;
    },
    resolveRequire(reqInfo, context) { //处理rqeuire时的处理器
        return reqInfo;
    }
};