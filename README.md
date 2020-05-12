
# The story

I have a css framework that wants to provide css loading via webpack

I also want to specify css dependencies (not @import) in the css files.

This can ensure that my javascript imports of components and css does not mass up the order of css output

## The issue

Currently it's not possible for mini-css-extract-plugin to do it from reasons that I don't understand.

The error that I am getting is `Error: Didn't get a result from child compiler` 

This repo has a minimal reproduction of an error in `mini-css-extract-plugin` when trying to use css imports in a css loader implementation. 

### How to see the issue

Clone repo and install dependencies via `npm` or `yarn` then run the build script `yarn build` or `npm run build` or open vscode and press `F5` for debug

This should run webpack build and fail with the error

## Example story

compA.js

```js
import "compA.css";
export function CompA(){...}
```

compA.css

```css
.compA {
  ...;
}
```

compB.js

```js
import { CompA } from "./compA.js";
import "compB.css";
export function CompB() {
  return CompA();
}
```

compB.css

```css
.compB {
  ...;
}
.compA {
  ...;
} /* overriding compA styles */
```

There is a hidden dependency between compB.css and compA.css since compB.css wants to customize compA.css it should extracted after compA.css the only way I can order the css now in webpack is via ensuring that the javascript is importing in the correct order:

1. import compA (this will import the compA.css)
2. import compB.css

If I could specify in some way that compB.css is depended on compA.css I could not care about the import order of javascript and css modules.

The example loader tries to achieve this behavior via embedded comments of require calls `/* require("./file.css") */` in the css code. then it transpile the comments into real require calls (which should add a dependency to the CSSModule).

This is not a real/best solution but it demonstrate the goal.

After doing so I expect the extract process to know more about the dependency tree from the css files and order the css correctly even if the import order in the javascript is the opposite

compB.js

```js
import "compB.css"; // has compA.css as a dependency
import { CompA } from "./compA.js";
```

## The Finale 

The required feature is not to actually require/include the css file inside the css module, but hint the module graph when ordering the css about the dependency.