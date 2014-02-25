
var jQKeyStroke = function(event) {

    var keyData = { 
        origin    : event,
        which     : event.which,
        altKey    : event.altKey || false,
        ctrlKey   : event.ctrlKey || false,
        shiftKey  : event.shiftKey || false,
        char      : null,
        category  : null
    };
    
    // Process keydown event.
    // Pressing CTRL+ or ALT+ combination will causes the key to fire only on keydown and NOT keypress
    // If it's a character key (with or without shift) skip over and move on to keypess.
    if( event.type === "keydown" )
    {
        // Logic
        var isCharKey     = 
                ( 48 <= keyData.which && keyData.which <=  90) ||
                ( 96 <= keyData.which && keyData.which <= 111) ||
                (186 <= keyData.which && keyData.which <= 222),
            isCommandKey  = keyData.which <= 46,
            isFunctionKey = 112 <= keyData.which && keyData.which <= 123,
            isShortcut    = isCharKey && (event.altKey || event.ctrlKey);
        
        switch( true ) { 
            case isCharKey:
                return;
                break;
            case isShortcut:
                keyData.keyType = "SHORTCUT_KEY"; 
                break;
            case isCommandKey:
                keyData.keyType = "COMMAND_KEY";
                break;
            case isFunctionKey:
                keyData.keyType = "FUNCTION_KEY";
                break;
        }
    }
    // Processs keypress event.
    else if( event.type === "keypress" ) {
        keyData.char    = String.fromCharCode( keyData.which ); 
        keyData.keyType = "CHARACTER_KEY";
    }

    var keystroke = jQuery.Event("keystroke", keyData );
    jQuery(event.target).trigger(keystroke);
}
