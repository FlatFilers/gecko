### `<Collect>`

Collect all [`<Part>`](./Part.md)s matching a tag.

Example:

_earlier..._

```
<Part tag="readme">
 <Text>This is part of the readme</Text>
</Part>
```

_later..._

```
<File name="readme.md">
 <Text># My Project</Text>
 <Text />
 <Collect tag="readme" />
</File>
```

Produces the following `readme.md` file:

```
# My Project

This is part of the readme
```
