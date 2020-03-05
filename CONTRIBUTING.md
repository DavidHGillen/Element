# Master is stable, don't PR master.
Use the nightly branch. (When its setup)

# Don't touch the build process.
I'm probably not going to like structural changes, but feel free to fix bugs

# Don't submit builds in PRs
Buils are hanled, just provide source.

# Always use braces and semicolons, always.
I know arguments exist about why they're uneeded. Always use braces and semicolons.

# Tabs to indent code blocks, spaces to align content across lines
```
	var short =    "linedup1";
	var longlong = "linedup2";
```

# Use single line code blocks for simple actions and/or logical grouping
`x = 4;    y = 3;    z = 2;`

`if(isBad) { return; }`

# Spaces around operators, but Complex equations are allowed to condense for clarity, operation order, or term grouping
`x = 2 / 3`

`x = 10*4 + 3/2`

# Comment on why, never what.
What should be self documented in variable/class/function names. So, tell me why, because that I might not know.

# Check and follow class comments for intended roles and responsibilities
If the functionality you want to add doesn't sound like it belongs anywhere, open a dialog with me.

# Members/functions preceded with _ are complex internal functions
Javascript lacks some control like protected and private. Use the _ to represent anything that isn't an intentional API to your code/class.
