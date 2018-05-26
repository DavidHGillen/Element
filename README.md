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
So this is the tool for you if you want to make models to import into THREE, Unreal4, Substance, or others. It's free to use for any and all work with no retained rights on any content created with Element. I.E. Free that actually means free, even to commercial projects. But if you're making millions, donate perhaps? or maybe you could commission updates & bugfixes?

Element intends to provide a suite of tools to give you precise control and full information about what's going on. There may be a little bit of a learning wall due to this. I won't be hiding what's actually going on and it may be intimidating or confusing, but you'll catch on quick. It's not that hard :)

Element has no intention of becoming a rendering, painting, or printing tool. But please fell free to use Element models in those capacities, I intend to use a lot of Substance Painter with the models I make.

Until I make life complicated you can just download this repo and put it on a webhost to run it.~~If you don't intend to make any changes to the code the rest of this repo is not for you! Go to \<TBA\> for help and support, and go to \<TBA\> for usage tutorials and guides.~~

### Visit one of the hosted builds of Element to get started:
* NONE (Come back later, or contact me to offer hosting)

We're working on adding the tech for downloadable builds in the future.

### Import / Export formats
* Working
   * NONE (early days, like I said)
* Desired
   * Element \[.elm] (our new work files!)
   * THREE JS
   * JPEG \ PNG
   * GLTF
   * FBX
   * OBJ
   * \+ More

# As a developer (local custom builds, plugins)
Derivative works, and plugins are fine so long as they are not for sale/subscription. I.E. Creating an internal clone with company specific modifications, 100% okay (but maybe pull request any improvements). Selling subscriptions to a hosted build/release builds, 0% okay. Selling a plugin for Element, 0% okay (to the legal extent I can stop you).

Tech stack: Raw ES6, WebGL 2.0, PreloadJS, and Evee. Web assembly and desktop clients are eventual additions, but will likely be separate repos.

Other than above this is a raw build, I need to work and control the lower levels so many libraries would hinder more than help. Compatibility and content previews for THREE and other major libraries are top tier requirements though so there will be som inclusion.

### First time setup
Download the repo, there's nothing to build or projects to link... yet? Minification tools and a node based local host will probably be added.

### Running
You 100% need some form of local host to run the project due to WebGL.
Once you have that you're done.

# As a contributer (pull requesting a change)
* Don't touch the build process
* Don't submit builds in PRs, just source
* Always use braces and semicolons
* Tabs to indent, spaces to align
* Single line blocks or multiple statements for simple actions and/or logical grouping
* Private members/functions are preceded with an _
* Comment on why, never what. What should be self documented in variable/class/function names
* Check and follow class comments for intended roles and responsibilities of classes

# Legal
I'm not assigning a copyright yet due to the fact I have a few exceptions I want to clarify (and lots of content to write). But you can ballpark it as somewhere between CC0 for source code (and source code based off it) and MIT for things made with it.
