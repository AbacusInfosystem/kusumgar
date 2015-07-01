﻿

function Authorize(access_Ids)
{
    var access_Function = new  Array();

    for (var i = 0; i < access_Ids.length ; i++) {
        access_Function.push($(access_Ids[i]).prop("name") + "@" + $(access_Ids[i]).prop("id"));
    }


    $.ajax({
        url: '/ajax/get-web-element-authorize',
        data: { access_Functions: access_Function },
        method: 'GET',
        traditional: true,
        async: false,
        success: function (data) {
            if (data != null) {

                if (data.webElements.length > 0) {

                    var j = 0;

                    for (var i = 0; i < data.webElements.length; i++) {

                        if (data.webElements[i].Is_Authorize == true) {

                            $("#" + data.webElements[i].Web_Element_Id).show();


                            if ($("#" + data.webElements[i].Web_Element_Id).parents("ul").prop("class").contains('nav-tabs')) {

                                if(j ==0)
                                {
                                    $("#" + data.webElements[i].Web_Element_Id).trigger("click");

                                    j = 1;
                                }
                            }
                        }
                        else {
                            $("#" + data.webElements[i].Web_Element_Id).hide();

                            if ($("#" + data.webElements[i].Web_Element_Id).parents("ul").prop("class").contains('nav-tabs')) {

                                $("#" + $("#" + data.webElements[i].Web_Element_Id).prop("href").split("#")[1]).removeClass("active");
                            }
                        }

                    }
                }
            }
        }
    });
}