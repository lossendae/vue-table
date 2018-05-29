---
pageClass: content-960
---

# Credits

The table component is loosely based on [vuetable-2](https://github.com/ratiw/vuetable-2) but with a lot less assumptions on how the component should work and no magic call the parent for 
data formatting etc.
Using slots is also a lot easier in this component as it doesn't require any special declaration to work.

On the other hand, [vuetable-2](https://github.com/ratiw/vuetable-2) supports more special fields by default like row count and checkbox. 
Definitively worth checking out.

The table pagination plugin in basically a copy of [vuejs-uib-pagination](https://github.com/sant123/vuejs-uib-pagination). 
As i don't use Typescript and don't have time to setup the dev environment, i adapted 
the code from the original repository to suite my needs and eventually extends the functionalities.

It turns out, i didn't see what i could bring more to the code. 
The adaptation being done, it would have be a waste to not provide it here for those who eventually needs it.

As a bonus, the component pagination is unit tested. So there is that.
