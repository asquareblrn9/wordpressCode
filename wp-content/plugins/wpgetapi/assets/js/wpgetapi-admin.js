window.WpGetApi = window.WpGetApi || {};

(function (window, document, $, wpgetapi, undefined) {

    'use strict';

    /**
     * Start the JS.
     */
    wpgetapi.onReady = function () {

        var $page = wpgetapi.page();

        wpgetapi.functionsHelp();
        
        $page
            .on( 'click', '.functions .copy-this', wpgetapi.copyThis )
            .on( 'change keyup', '.field-id input', wpgetapi.functionsHelp )
            .on( 'cmb2_remove_row cmb2_add_row cmb2_shift_row', wpgetapi.functionsHelp );

    }

    /**
     * Copy the template tag or the shortcode
     */
    wpgetapi.copyThis = function ( e ) {

        const $this = $( this );
        const textToCopy = $this.prev( '.wpgetapi-copy' ).text();

        navigator.clipboard.writeText(textToCopy).then(
            function() {
                /* clipboard successfully set */
                $this.after( '<span class="copied">Copied</span>' );
                setTimeout(
                    function() {
                        $( '.copied' ).remove();
                    }, 3000 
                );

            }, 
            function() {
              /* clipboard write failed */
              $this.append('Oops! Your browser doesn\'t support this.')
            }
        )

    }


    /**
     * Adds the endpoint into the functions help section,
     * meaning the Template tag and the shortcode.
     */
    wpgetapi.functionsHelp = function ( e ) {
        
        // change, keyup, add_row etc 
        if( e && e.type.length > 0 ) {

            var $this = $( this );
            var $group = $this.parents( '.cmb-repeatable-grouping' );

            // if we are adding a group, clear it
            if( e.type == 'cmb2_add_row' ) {
                $group = $( '.cmb-repeatable-grouping' ).last();
                $group.find( '.functions .endpoint_id' ).html( '' );
            }

            if( $group.length > 0 )
                $group.find( '.functions .endpoint_id' ).html( $this.val() );

        } else {

            $('.cmb-repeatable-grouping').each(function( index, value ) {
                
                var $group = $( this );
                var endpoint_value = $group.find( '.field-id input' ).val();
                $group.find( '.functions .endpoint_id' ).html( endpoint_value );

            });

        }

    }

	/**
     * Gets jQuery object containing all . Caches the result.
     *
     * @since  1.0.0
     *
     * @return {Object} jQuery object containing all.
     */
    wpgetapi.page = function() {
        if ( wpgetapi.$page ) {
            return wpgetapi.$page;
        }
        wpgetapi.$page = $('.wpgetapi');
        return wpgetapi.$page;
    };

    $( wpgetapi.onReady );

}(window, document, jQuery, window.WpGetApi));