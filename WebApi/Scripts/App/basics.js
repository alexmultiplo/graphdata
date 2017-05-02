function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


jQuery(function () {
    $('.datepicker-input ').datepicker({
        format: "yyyy-mm-dd",
        //format: "dd-mm-yyyy",
        maxViewMode: 2,
        todayBtn: true
    });
});