var dashboard2 = (function () {

    "use strict";



    function render() {

        var html =
            '<div id="chart1" class="chart chart2">' +
                '<div class="title">DashBoard Under Construction!!</div>' +               
                '</div>';

        $("#content").html(html);

    }

    return {
        render: render
    }

}());