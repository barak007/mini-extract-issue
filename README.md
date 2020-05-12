# The issue

This repo has a minimal reproduction of an error in `mini-css-extract-plugin` when trying to use css imports in a css loader implementation. 
## The story

I have a css framework that wants to provide css loading

I also want to specify css dependencies (not @import) in the css files.

This can ensure that my javascript imports of components and css dose not mass up the order of css output

Currently it's not possible for mini-css-extract-plugin to do it from unknown reason

## Example Story

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

There is a hidden dependency between compB.css and compA.css the only way I can order the css now in webpack is via ensuring that the javascript is importing in the correct order:

1. import compA (this will import the compA.css)
2. import compB.css

If I could specify in some way that compB.css is depended on compA.css I could not care about the import order of javascript modules and css modules.

The example loader tries to achieve this behavior via embedded comments of require calls `/* require("./file.css") */` in the css code.
This is not a real/best solution but it demonstrate the goal.

After doing so I expect the extract process to know more about the dependency tree and order the css correctly
