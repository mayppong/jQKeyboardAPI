
function createKeyEvent ( eventType, keyData ) {
    var keyEvent = jQuery.Event( eventType );
    return jQuery.extend( keyEvent, keyData );
}

var KEYDATA;
jQuery(document)
    .on("keydown", jQKeyStroke )
    .on("keypress", jQKeyStroke )
    .on("keystroke", function(event) {
        KEYDATA = event;
    });

module( "Character Keys" );
test( "Hit Letter a once", function() {
    var testKeys = {
        a_down: createKeyEvent( "keydown", { which: 65} ),
        a_press: createKeyEvent( "keypress", {which: 97} ),
        A_down: createKeyEvent( "keydown", {which: 65, shiftKey: true} ),
    }
    // Trigger event
    jQuery("body").trigger(testKeys.a_down).trigger(testKeys.a_press);
    
    equal( KEYDATA.keyType, "CHARACTER_KEY", "Correct key type assigned" );
    equal( KEYDATA.char, "a", "Corrent character code converted" );
});

test( "Hit CTRL+V", function() {
    var testKeys = {
        v_down: null,
        ctrl_down: null,
        ctrl_v_down: createKeyEvent( "keydown", {which: 86, ctrlKey: true} ),
        ctrl_v_press: createKeyEvent( "keypress", {which: 118, ctrlKey: true} )
    };
    jQuery("body").trigger(testKeys.ctrl_v_down).trigger(testKeys.ctrl_v_press);

    equal( KEYDATA.keyType, "CHARACTER_KEY", "Correct key type assigned" );
    equal( KEYDATA.ctrlKey, true, "CTRL key was pressed" );
});


module( "Function Keys");
test( "Hit F01 once", function() {
    var testKeys = {
        F1_down: createKeyEvent( "keydown", {which: 112} ),
        F13_down: createKeyEvent( "keydown", {which: 112, shiftKey: true} ),
        F1_CTRL_down: createKeyEvent( "keydown", {which: 112, ctrlKey: true} ),
    };
    // Trigger event
    jQuery("body").trigger(testKeys.F1_down);
    
    equal( KEYDATA.keyType, "FUNCTION_KEY", "Correct key type assigned" );
    equal( KEYDATA.char, null, "Corrent character code converted" );
});


