/* Change INJECT_CSS_IMPORTS to false to see the buggy output instead of an error */ 
const INJECT_CSS_IMPORTS = true;

module.exports = function (css) {
    const code = transpile(css);

    /* DEBUG LOG */ 
    console.log('*'.repeat(this.resourcePath.length));
    console.log(this.resourcePath);
    console.log(code);
    console.log('*'.repeat(this.resourcePath.length));

    return code;
};

const findRequireComments = /\/\*\s*(require\(.*?\);?)\s*\*\//g;

/* 
simple transformation that tries to include dependencies to other css files
so the extract process can see the whole dependency tree and order the output correctly 

currently this breaks mini-css-extract-plugin
*/   
function transpile(css) {
    const m = css.match(findRequireComments) || [];
    const cssImports = m.map((requireComment) => requireComment.slice(2, -2).trim());

    return [
        INJECT_CSS_IMPORTS ? cssImports.join('\n') : '',
        `module.exports = [[module.id, ${JSON.stringify(css.replace(findRequireComments, ''))}, '']];`,
    ].join('\n');
}
