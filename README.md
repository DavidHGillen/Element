# Element
Element Modeling Studio. A bad idea to attempt to make a web based modeling program in my spare time. Because I keep getting grumpy at the existing options. It's a bit early to offer help, so maybe check back later.

# As a modeler
Free to use for any and all work with no retained rights on any content created with the tool. But if you're making millions, donate perhaps?
Visit one of the hosted/down-loadable builds of the tool to get started:
* TBA

# As a developer
Derivatives and clones are fine so long as they are not for sale/subscription.
Gulp, ES6, and SASS. Nothing else fancy in terms of language or build process.
This is a raw WebGL build. Not because I have anything against THREE or Babylon, but they'd just get in the way. Compatibility with both libraries and content viewers are top tier requirements for the tool.

## First time setup
`npm i gulp-cli -g`
`npm i`

## Running
Single build action
`gulp build`

Watched and hosted version
`gulp dev`

# As a contributer
* Don't touch the build process
* Don't submit builds in PRs, just source
* Always use braces and semicolons
* Single lines are allowed for logical grouping or simple actions
* Private members/functions are preceded with an _
* Comment on why, never what. What should be self documented in variable/class/function names
* Check class comments for intended roles and responsibilities of classes
* Follow my lead otherwise