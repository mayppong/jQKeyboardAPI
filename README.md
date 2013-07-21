jQKeyStroke
===========

After working on a fix for a JavaScript function uses to trap users' keyboard input through jQuery's keydown event at work, I noticed the function was getting messy and had several extended if-else statements. So I had this bright idea of cleaning it up. well, it turns out it isn't that simple. 


The problem
-----------

- the keydown event's' keycodes don't translate to string characters very well through String.fromCharcode(), unlike keypress. 
- the keypress event doesn't always get triggered (ALT+keys, CTRL+keys, and function keys to name a few). 
- in general, the keyboard events are a mess.

Anyway, I thought after pouring a ton of work trying to understand the issue, I might as well try to fix it at a deeper level than just cleaning up. And so, I created this KeyboardAPI project. I named it pretty broadly because I have a feeling I will be working on extending this in many different ways. The likely next will probably be key mapping. I've been hearing that word pass back and forth.


What it does
------------

The idea here is to simplified all the different events into one custom event, "keystroke",  for you to attach your scripts to, like an API of sort. Imagine that! 

The event would get trigger once either during keydown, or keypress, and pass the commonly used data about the key to your function. This means you only need to attach your script to this custom "keystroke" event.

The object passed to the keystroke event looks like this:
```
var keyData = {
	eventType	: event.type,
	keyCode		: event.which,
	altKey		: event.altKey || false,
	ctrlKey		: event.ctrlKey || false,
	shiftKey	: event.shiftKey || false,
	character	: "",
	keyType		: null
};
```

I've already identified it as either 
```
"CHARACTER_KEY" : String.fromCharCode()
"COMMAND_KEY" 	: Ctrl+key or Alt+key and the likes
"FUNCTION_KEY" 	: F1 to F12 keys
```

After some light testing, it seems like this technique works with the key being held down. The event should be triggered correctly. However, you wouldn't be able to detect when the key is let go since I'm not checking for keyup event.

Note: I debated for a while whether to add the properties I want to the event object or to create a new object. Since our use case is pretty limited, I thought creating a new object would be cleaner. But if anyone has a good suggestion, I'm all ear.
