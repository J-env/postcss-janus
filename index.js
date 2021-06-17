const postcss = require('postcss');
const cssjanus = require('cssjanus');

const commentRules = {
  noflip: '@noflip',
  transformDirInUrl: '@transformDirInUrl',
  transformEdgeInUrl: '@transformEdgeInUrl'
};

// const regLeftRight = /(left|right)/;
const regJanusComments = new RegExp(`(${Object.values(commentRules).join('|')})`);

const checkPreviousComment = (node, comment) => {
  const prev = node ? node.prev() : null;
  return prev && prev.type === 'comment' && prev.toString().includes(comment) && prev.remove();
};

const getDeclarationsObject = (rule) => {
  const obj = {};
  rule.walkDecls(decl => obj[decl.prop] = { value: decl.value, important: decl.important} );
  return obj;
};

const cleanCssJanusComments = (rule) => {
  rule.walkComments(comment => {
    if (regJanusComments.test(comment.toString())) {
      comment.remove();
    }
  });
};

module.exports = postcss.plugin('postcss-cssjanus', (options = {}) => async (css) => {
  const { 
    transformDirInUrl = false, 
    transformEdgeInUrl = false 
  } = options;
  
  await css.walkRules(async rule => {
    if ( !checkPreviousComment(rule, commentRules.noflip) ) {
      const ruleStr = rule.toString();
      const ruleStrRtl = await cssjanus.transform(ruleStr, transformDirInUrl, transformEdgeInUrl);
      
      const noRtlChanges = ruleStr === ruleStrRtl;
      const hasTransformDirInUrl = ruleStr.includes(commentRules.transformDirInUrl);
      const hasTransformEdgeInUrl = ruleStr.includes(commentRules.transformEdgeInUrl);

      if ( !noRtlChanges || hasTransformDirInUrl || hasTransformEdgeInUrl ) {
        const root = postcss.parse(ruleStrRtl);
        const ruleRtl = root.first;

        const declLtrObject = getDeclarationsObject(rule);

        await ruleRtl.walkDecls((decl) => {
          if (declLtrObject[decl.prop] && declLtrObject[decl.prop].value === decl.value) {
            if (hasTransformDirInUrl || hasTransformEdgeInUrl) {
              let urlInverted = '';

              if (checkPreviousComment(decl, commentRules.transformDirInUrl)) {
                urlInverted = cssjanus.transform(decl.value, true);

              } else if (checkPreviousComment(decl, commentRules.transformEdgeInUrl)) {
                urlInverted = cssjanus.transform(decl.value, false, true);
              }

              if (urlInverted) {
                if (urlInverted !== decl.value) {
                  decl.value = urlInverted;
                }
              }
            }
          }
        });
        
        cleanCssJanusComments(rule);
        cleanCssJanusComments(ruleRtl);

        rule.after(ruleRtl);
        rule.remove();
      }
    }
  });

});
