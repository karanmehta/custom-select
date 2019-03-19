# Custom Dropdown

Javascript based Custom Dropdown plugin to style the HTML Select tag.

  View the Custom Dropdown live [here](https://karanmehta.github.io/custom-select/).

  ![Custom Dropdown Demo](demo.gif)

### How to use this plugin
* Step 1) Add js & css files (custom select)
* Step 2) Wrap select tag with div.custom-select
```
<div class="custom-select">
  <select>
    <option>Option 1</option>
    <option>Option 2</option>
    <option>Option 1</option>
  </select>
</div>
```

### How to change/reset the option dynamically
* Step 1) Pass the number (startong from 0) on "selectedIndex" (i.e. ELEMENT.selectedIndex = 2; //it will change selected option to 3rd option)
* Step 2) And dispatch the event (i.e. ELEMENT.dispatchEvent(event))

```
var select = document.getElementsByTagName("select")[0]
select.selectedIndex = 0;
select.dispatchEvent(event)
```

  
### What I learned

* How to dispatch custom JS Events cross-browser

### Todos

 - Cross Browser Testing (Done)
 - Optimizing JS (In progress)
 - Enhancing UI
 - Option to enable/disable on mobile and tablet

License
----

Mozilla Public License 2.0