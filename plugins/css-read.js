/*
    读取样式文件内容，如果是sass,less等则进行编译后返回
 */
let fs = require('fs');
let path = require('path');

let less = require('less');
let sass = require('node-sass');
let chalk = require('chalk');

let utils = require('./util');
let slog = require('./util-log');
let configs = require('./util-config');
let fd = require('./util-fd');

let jsMx = require('./js-mx');

let compileContent = (file, content, ext, cssCompileConfigs, resolve, reject, shortFile) => {
    if (ext == '.scss') {
        configs.sassOptions.data = content;
        sass.render(cssCompileConfigs, (err, result) => {
            if (err) {
                slog.ever('scss error:', chalk.red(err + ''), 'at', chalk.grey(shortFile));
                return reject(err);
            }
            resolve({
                exists: true,
                file: file,
                content: result.css.toString()
            });
        });
    } else if (ext == '.less') {
        less.render(content, cssCompileConfigs, (err, result) => {
            if (err) {
                slog.ever('less error:', chalk.red(err + ''), 'at', chalk.grey(shortFile));
                return reject(err);
            }
            resolve({
                exists: true,
                file: file,
                content: result.css
            });
        });
    } else if (ext == '.css') {
        resolve({
            exists: true,
            file: file,
            content: content
        });
    } else if (ext == '.mx') {
        content = fd.read(file);
        let info = jsMx.process(content, file);
        compileContent(file, info.style, info.styleType, resolve, reject, shortFile);
    }
};
//css 文件读取模块，我们支持.css .less .scss文件，所以该模块负责根据文件扩展名编译读取文件内容，供后续的使用
module.exports = (file, name, e) => {
    return new Promise((done, reject) => {
        let info = e.contentInfo;
        let styleType = info && info.styleType || path.extname(file);
        let cssCompileConfigs = {};
        let resolve = info => {
            if (info.exists) {
                let r = configs.compileCSSEnd(info.content, info);
                if (!r || !r.then) {
                    r = Promise.resolve(r);
                }
                r.then(css => {
                    info.content = css;
                    done(info);
                }).catch(reject);
            } else {
                done(info);
            }
        };
        if (styleType == '.less') {
            utils.cloneAssign(cssCompileConfigs, configs.lessOptions);
            cssCompileConfigs.paths = [path.dirname(file)];
        } else if (styleType == '.scss') {
            utils.cloneAssign(cssCompileConfigs, configs.sassOptions);
            cssCompileConfigs.file = file;
        }
        if (info && name == 'style') {
            compileContent(file, info.style, styleType, cssCompileConfigs, resolve, reject, e, file);
        } else {
            let shortFile = file.replace(configs.moduleIdRemovedPath, '').slice(1);
            fs.access(file, (fs.constants ? fs.constants.R_OK : fs.R_OK), err => {
                if (err) {
                    resolve({
                        exists: false,
                        file: file,
                        content: ''
                    });
                } else {
                    let fileContent = fd.read(file);
                    compileContent(file, fileContent, styleType, cssCompileConfigs, resolve, reject, shortFile);
                }
            });
        }
    });
};