# jQKeyStroke

After working on a fix for a JavaScript function uses to trap users' keyboard input through jQuery's keydown event at work, I noticed the function was getting messy and had several extended if-else statements. So I had this bright idea of cleaning it up. well, it turns out it isn't that simple. 


## The problem

- the keydown event's keycodes don't translate to string characters very well through String.fromCharcode(), unlike keypress. 
- the keypress event doesn't always get triggered (ALT+keys, CTRL+keys, and function keys to name a few). 
- in general, the keyboard events are a mess.

Anyway, I thought after pouring a ton of work trying to understand the issue, I might as well try to fix it at a deeper level than just cleaning up. And so, I created this KeyboardAPI project. I named it pretty broadly because I have a feeling I will be working on extending this in many different ways. The likely next will probably be key mapping. I've been hearing that word pass back and forth.


## Features

The idea here is to simplified all the different events into one custom event, "keystroke",  for you to attach your scripts to, like an API of sort. Imagine that! 

To start using the keystroke event, just attach the jQKeyStroke to your keydown and keypress:
`jQuery(document).on("keydown", jQKeyStroke ).on("keypress", jQKeyStroke )`

The event would get trigger once either during keydown, or keypress, and pass the commonly used data about the key to your function. This means you only need to attach your script to this custom "keystroke" event.

The object passed to the keystroke event looks like this:
```javascript
var keyData = { 
    origin    : event,
    which     : event.which,
    altKey    : event.altKey || false,
    ctrlKey   : event.ctrlKey || false,
    shiftKey  : event.shiftKey || false,
    char      : null,
    category  : null
};
```

I've already identified it as either 
```
"CHARACTER_KEY" : String.fromCharCode()
"COMMAND_KEY" 	: Ctrl, Alt, Tab and the likes (any keys with keydown's keycode less than 47
"FUNCTION_KEY" 	: F1 to F12 keys
"SHORTCUT_KEY"  : Alt + or Ctrl + character key (with or without Shift)
```

After some light testing, it seems like this technique works with the key being held down. The event should be triggered correctly. However, you wouldn't be able to detect when the key is let go since I'm not checking for keyup event.

Note: The original event object can be access through the "origin" property of this object.
