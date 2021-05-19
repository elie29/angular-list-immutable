# AngularListImmutable

## Mutable Change

- const data = ["a", "b", "c"];
- data[0] = "new Value" => data keeps its reference:

  - with ChangeDetectionStrategy.OnPush: changes won't be detected
  - data content would impact all components that use "data"

## Primitive vs Objects

Javascript has:

- 5 data types: Boolean, null, undefined, String, and Number. These types are called **primitive types**.

- 3 data types: Array, Function, and Object. These types are called **Objects**

With primitive types, data is passed by value (copy), eg.:

```JS
let a = 10;
let b = a;
a = 12;
console.log(a, b); // 12, 10
```

With Objects, data is passed by reference, eg.:

```JS
let x = [1, 2, 3];
let y = x;
y[0] = 4;
console.log(x, y); // [4, 2, 3], [4, 2, 3]
```

Changing the content of the array would not impact its reference. This is what mutable change is.

## Shallow vs Deep Copy

For Objects, we need to clone data in order to make an immutable change. Eg.:

```JS
let x = [1, 2, 3];
let y = [...x]; // or x.concat();
y[0] = 4;
console.log(x, y); // [1, 2, 3], [4, 2, 3]
```

[Spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) will create a new array and copy its content.

If the content is primitive, all the content is copied. But, if the content is Objects (array of arrays), only the references are copied. This is what shallow copy is. Only the first level is impacted.

```JS
let x = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
let y = [...x]; // or x.concat();
y[0][0] = 4;
console.log(x, y); // [[4, 2, 3], [1, 2, 3], [1, 2, 3]], [[4, 2, 3], [1, 2, 3], [1, 2, 3]]
```

So in order to copy the entire array when it contains Objects, we need to deep copy the array.

Several techniques exist:

1. Manually Deep copy the content
1. Stringify/Parse Technique
1. Use lodash deep copy function
1. Nothing else, especially a copy paste from stack overflow !!!

### Manual Deep Copy

```JS
let x = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
let y = x.map(item => [...item]);
y[0][0] = 4;
console.log(x, y); // [[1, 2, 3], [1, 2, 3], [1, 2, 3]], [[4, 2, 3], [1, 2, 3], [1, 2, 3]]
```

We can use the shallow copy first, and only make an immutable change on the index we need to modify:

```JS
let x = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
let y = [...x];
const tmp = [...y[0]]; // We want to modify the first element of the first array
tmp[0] = 4;
y[0] = tmp;
console.log(x, y); // [[1, 2, 3], [1, 2, 3], [1, 2, 3]], [[4, 2, 3], [1, 2, 3], [1, 2, 3]]
```

N.B.: Making a manual deep copy requires to loop over all the levels whenever we have an Object type

### Stringify/Parse Technique

```JS
let x = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
let y = JSON.parse(JSON.stringify(x));
y[0][0] = 4;
console.log(x, y); // [[1, 2, 3], [1, 2, 3], [1, 2, 3]], [[4, 2, 3], [1, 2, 3], [1, 2, 3]]
```

N.B.: [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) converts a JavaScript object or value to a JSON string but not functions.

### Lodash Deep Copy

[Clone Deep](https://lodash.com/docs/4.17.15#cloneDeep) supports cloning arrays, array buffers, booleans, date objects, maps, numbers, Object objects, regexes, sets, strings, symbols, and typed arrays. It recursively clones all values.

```JS
let x = [[1, 2, 3], [1, 2, 3], [1, 2, 3]];
let y = _.cloneDeep(x);
y[0][0] = 4;
console.log(x, y); // [[1, 2, 3], [1, 2, 3], [1, 2, 3]], [[4, 2, 3], [1, 2, 3], [1, 2, 3]]
```
