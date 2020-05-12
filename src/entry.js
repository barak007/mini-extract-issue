
/* 
    style.css should have a dependency for dep1.css and dep2.css 
    because of that the order of the output css should changed to

    dep1.css
    dep2.css
    style.css

    and not the order that defined in this js file

*/
require('./style.css'); 
require('./dep1.css');
require('./dep2.css');
