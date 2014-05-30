spacing-classes
===============

Bootstrap inspired margin and padding css classes.

For times when you don't want a custom class but want to nudge something a little.

When you need to add 3px here, or negative 3px there, you might not want to create a custom class.

This provides a `.js` file that generates some css.

By default, the class structure looks like 

    @media (min-width: 992px) {
      .pad-md-top-3 {
        padding-top: 3px;
      }
      
      // AND MANY MORE
    
    }

you can do `pad` or `marg`

####css types
* `margin` ( default namespace: `marg` )
* `padding` ( default namespace: `pad` )

####screen sizes
* `xs` ( no minimum )
* `sm` ( min-width 768 )
* `md` ( min-width 992 )
* `lg` ( min-width 1200 )

#### directions
* \[none\] (`pad-xs-7` does `padding: 7px`)
* `top`
* `left`
* `right`
* `bottom`

####sizes

* 3
* 7
* 15
* 22
* 30

#### inverse (optional)
add `-inv` to the end of a margin class to get negative amounts
you can do `marg-xs-top-3-inv` to do `-3px` and bump something up
