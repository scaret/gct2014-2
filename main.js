
$(function() {
            $( "body>[data-role='panel']" ).panel();
            $( "[data-role='header'], [data-role='footer']" ).toolbar();
            $( "[data-role='listview']").listview();
        });
$.mobile.page.prototype.options.domCache = false;
