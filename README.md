# Fastest slide

Find the fastest path to the bottom of the pyramid, moving is allowed only two the near two values.

The purpose is to find the path which will get the minimum summ of all passed values

Example:

```
      1
     / \
    2   3
   / \ / \
  4   5   6
 / \ / \ / \
7   8   9   10
```

In this example result will be `14`, as it goes `1, 2, 4, 7`.

Because moving is allowed just to two values downwards, it will be something like 2 -> [4, 5], 3 -> [5, 6], ...

### Requirements:

To start the program you should have `node-js` installed on your machine

### Start

``` bash
node index.js
```
or
``` bash
npm start
```