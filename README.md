# Element
Element Modeling Studio. An idea to attempt making a web based modeling program in my spare time. Why? Because I keep getting grumpy at the existing options, this will either teach me to be quiet or make something better. It's a bit early to offer help, so maybe check back later.

Element's core design points are five fold
* One element at a time. Editing for single models/model sets to be used & rendered elsewhere.
* Free to use. There's a lot of people who want to make things, having good tools is essential.
* Real-time content. This is the subset of 3D modeling that matters to me; not film, printing, etc.
* Universal. Browsers are universal (and these days pretty fast) easiest lift for sharing and working.
* No lies. I will be honest with you about what I'm making, and Element won't lie about what it's doing.

We're going to be making the tool I want to have, I'll just trust that I'm not too much of an edge case.

# As a modeler (making things)
So this is the tool for you if you want to make models to import into ThreeJS, Unreal4, Substance, or other applications. It's free to use for any and all work with no retained rights on any content created with Element. I.E. Free that actually means free, even to commercial projects. But if you're making millions, donate to the cause perhaps? or maybe you could commission updates & bugfixes?

Element intends to provide a suite of tools to give you precise control and full information about what's going on. There may be a little bit of a learning wall due to this. I won't be hiding what's actually going on and it may be intimidating or confusing, but you'll catch on quick. It's not that hard, it's just that none of the other tools explain it :)

Element has no intention of becoming a rendering, painting, or printing tool. But please fell free to use Element models in those capacities, I intend to use a lot of Substance Painter with the models I make.

### Running the program:
* Anywhere
    * NONE (Come back later, or contact me to offer hosting)
* Local
    * Pretend you're a developer and follow the setup instructions! (sorry)

We're working on adding the tech for downloadable builds in the future.

### Import / Export formats
* Working
   * NONE (early days, like I said)
* Desired
   * Element \[.elm] (our new work files!)
   * ThreeJS
   * JPEG \ PNG
   * GLTF
   * FBX
   * OBJ
   * \+ More

### If you don't intend to make any changes to the code the rest of this repo is not for you! Go to \<TBA\> for help and support, and go to \<TBA\> for usage tutorials and guides.

# As a developer (local custom builds, plugins)
Derivative works, and plugins are fine so long as they are not for sale/subscription. I.E. Creating an internal clone with company specific modifications, 100% okay (but maybe pull request any improvements). Selling subscriptions to a hosted build/release builds, 0% okay. Selling a plugin for Element, 40% okay (there better be a good reason you're charging).

### First time setup
* Install nodejs 8.4.0 or better
* Clone the repo
* Open a console in the folder containing the repo
* `npm install`

### Running
* Open a console in the folder containing the repo
* `node build dev`
* Navigate to the url listed in the console

### Release
* Not working. Will output to `/build`

### Internals
Tech stack: I believe in keeping this controlled and lite.
* Technologies
   * ES6
   * WebGL 2.0
   * ~~Web ASM~~ unimplemented
* Libs
   * fx-extra: Build process file system util
   * uglify-es: Build process minification
   * evee: ES6 class event model
   * gl-matrix: Fast 3D vector and matrix library
   * PreloadJS: Data loading

Other than above this is a from scratch build. I need to work and control the lower levels so many libraries would hinder more than help. Compatibility and content previews for ThreeJS and other major web libraries are top tier requirements though so there will be some additions later, but I will avoid adding them to the repo and simply link out to their CDNs.

# As a contributor (pull requesting a change)
* Master is stable, don't PR master. Use the nightly branch.
* Don't touch the build process, I'm probably not going to like your change :)
* Don't submit builds in PRs, just source.
* Always use braces and semicolons, always.
* Tabs to indent code blocks, spaces to align content across lines
* Use single line code blocks for simple actions and/or logical grouping (i.e. `x = 4;    y = 3;    z = 2;` and `if(isBad) { return; }` is preferred)
* Spaces around operators, but Complex equations are allowed to condense for clarity, operation order, or term grouping (i.e. `x = 2 / 3` and `x = 10*4 + 3/2`)
* Comment on why, never what. What should be self documented in variable/class/function names. So, tell me why, because that I might not know.
* Check and follow class comments for intended roles and responsibilities of classes, if the functionality you want to add doesn't sound like it belongs anywhere, open a dialog with me.
* Members/functions preceded with _ are complex internal functions and probably would be protected or private if JavaScript let me, so call them carefully and mark yours the same.

# Legal
I'm not assigning a specific copyright yet (but I do reserve my rights) due to the fact I have a few exceptions I want to clarify (and lots of content to write). But you can ballpark the source code as somewhere between CC0-ShareAlike for public builds and MIT-NoDerivatives for private builds. And of course, all work created with the tool is yours and yours alone.

I take no responsibility for anything the application does to your computer, use at your own risk.

I upload no data to any servers without explicit opt-in, which will cover the details then. I will save local information to the browser's storage for things like backups and preferences.
