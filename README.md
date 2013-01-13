knockout-groupby
================

Extends Knockout JavaScript library with 'groupby:' binding

Usage
=====

Parameters
----------

<dl>
    <dt>group</dt>
    <dd>a flat array of items to be grouped</dd>
    
    <dt>by</dt>
    <dd>
        a function accepting a single argument that is applied 
        to each item of 'group'; must return the key that is used
        to bucket each item
    </dd>
    
    <dt>sort</dt>
    <dd>optional</dd>
    <dd>
        the ordering of items is preserved within a group,
        but the ordering of keys is not guaranteed unless you supply
        a value of 'ascending', 'descending' or a function that accepts
        two arguments, viz. 'Array.sort'
    </dd>
</dl>

Example
-------

Given a model: 

```javascript
Model = {
    Characters: [
        {
            'Name': "Finn",
            'Species': "Human"
        },
        {
            'Name': "Jake",
            'Species': "Dog (magic)"
        },
        {
            'Name': "Princess Bubblegum",
            'Species': "Candy"
        },
        {
            'Name': "Peppermint Butler",
            'Species': "Candy"
        }
    ]
};

ko.applyBindings(Model);
```

Present characters groups by species with the following template. 

```html
<div data-bind="
    groupby: { 
        group: Characters,
        by: function (character) { return character.Species; },
        sort: 'ascending'
    }">
    <div class="species"> 
        <!-- Special variable '$key' is added to the context,
             set to the result of the 'by' function. -->
        <h4 data-bind="text: $key"></h4>  

        <!-- Context variable '$data' is an array of the grouped objects. -->
        Count: <span class="character-count" data-bind="text: $data.length"></span>
        
        <div class="characters">
            <!-- Iterate through the group using foreach as normal. -->
            <ul data-bind="foreach: $data">
                <li data-bind="text: Name"></li>
            </ul>
        </div>
    </div>
</div>
```

Notes
-----

Dependency tracking works as expected: if the key is an observable, 
changing it rerenders; if the array is an observableArray, 
manipulating the array rerenders.

