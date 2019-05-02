require('waypoints/lib/noframework.waypoints.js')

var aboutUs = new Waypoint({ 
    element: document.getElementById('about-us'),
    handler: function(direction) {
        
        document.dispatchEvent(new CustomEvent('waypoint', { bubbles: true, composed: true, detail: { point:'about-us' } }));
        console.log('sent-about-us');
        // console.log('scrolled to about us!', direction);
    },
    offset: 70
});

var theExperience = new Waypoint({ 
    element: document.getElementById('the-experience'),
    handler: function(direction) {
        document.dispatchEvent(new CustomEvent('waypoint', { bubbles: true, composed: true, detail: { point:'the-experience' } }));
    },
    offset: 70 
});

var ourMenu = new Waypoint({ 
    element: document.getElementById('our-menu'),
    handler: function(direction) {
        document.dispatchEvent(new CustomEvent('waypoint', { bubbles: true, composed: true, detail: { point:'our-menu' } }));
    },
    offset: 70 
});

var contactUs = new Waypoint({ 
    element: document.getElementById('contact-us'),
    handler: function(direction) {
        document.dispatchEvent(new CustomEvent('waypoint', { bubbles: true, composed: true, detail: { point:'contact-us' } }));

    },
    offset: 70 
});

