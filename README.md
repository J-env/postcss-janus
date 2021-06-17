# PostCSS cssjanus

[PostCSS] plugin to create RTL rules using [CSSJanus]. (Only RTL styles are generated).

[PostCSS]: https://github.com/postcss/postcss
[CSSJanus]: https://github.com/cssjanus/cssjanus

The code fork for [postcss-janus](https://github.com/elchininet/postcss-janus)，just modify little.

Install
---

#### npm

```bash
npm install cssjanus postcss-cssjanus -D
```

Basic usage
---

#### Using postcss-loader in Webpack

```js
// postcss.config.js

const plugins = {
  'tailwindcss': {},
  'autoprefixer': {},
  'postcss-flexbugs-fixes': {},
  'postcss-preset-env': {
    autoprefixer: {
      flexbox: true,
      // grid: 'autoplace'
    },
    stage: 3,
    features: {
      'custom-properties': false,
    },
  },
}

if (process.env.rtl === '1') {
  plugins['postcss-cssjanus'] = {
    'prefixes': '',
    'swapLtrRtlInUrl': false,
    'swapLeftRightInUrl': false
  }
}

module.exports = {
  plugins,
}
```

Options
---

| Option             | Default  | Type                | Description                                                  |
| ------------------ | -------- | ------------------- | ------------------------------------------------------------ |
| transformDirInUrl    | `false`  | `boolean`           | Swap `ltr` and `rtl` strings in URLs                         |
| transformEdgeInUrl | `false`  | `boolean`           | Swap `left` and `right` strings in URLs                      |

Directives
---

Directives should be added as comments before a CSS rule block or a property, e.g:

```css
/* @ruleDirective */
.example {
    /* @propertyDirective */
    color: white;
}
```

| Directive           | Description                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| @noflip             | Avoid flipping certain CSS property or an entire rule block                                              |
| @transformDirInUrl    | Swap `ltr` and `rtl` strings in a certain property (it will ignore the global `transformDirInUrl` option       |
| @transformEdgeInUrl | Swap `left` and `right` strings in a certain property (it will ignore the global `transformEdgeInUrl` option |


If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

[official docs]: https://github.com/postcss/postcss#usage
