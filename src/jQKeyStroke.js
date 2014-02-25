
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
    if( event.type === "keydown" )
    {
        // Logic
        var isCharKey     = 
                ( 48 <= keyData.which && keyData.which <=  90) ||
                ( 96 <= keyData.which && keyData.which <= 111) ||
                (186 <= keyData.which && keyData.which <= 222),
            isModifierKey = jQuery.inArray( keyData.which, [ 16, 17, 18 ] ) !== -1,
            isCommandKey  = keyData.which <= 46;
            isFunctionKey = 112 <= keyData.which && keyData.which <= 123;
        
        if( isCharKey ) { 
            return; 
        }
        
        switch( true ) { 
            case isModifierKey:
                keyData.keyType = "MODIFIER_KEY"; 
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
