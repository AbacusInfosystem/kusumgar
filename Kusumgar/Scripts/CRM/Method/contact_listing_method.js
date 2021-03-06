﻿
function SearchContact() {
    var cViewModel =
        {
            Filter:
                {
                    Customer_Id: $("#hdnCustomer_Id").val(),
                    Customer_Name: $(".text").text()
                },

            Pager: {
                CurrentPage: $('#hdfCurrentPage').val(),
            },
        }

    $("#divSearchGridOverlay").show();

    CallAjax("/crm/contact-search", "json", JSON.stringify(cViewModel), "POST", "application/json", false, Bind_Contact_Grid, "", null);
}


function Bind_Contact_Grid(data) {

   // $("#txtCustomer_Name").val(data.Filter_Val.Customer_Name);
    $('#tblcontact tr.subhead').html("");

    var htmlText = "";

    if (data.Contacts.length > 0) {

        for (i = 0; i < data.Contacts.length; i++) {

            htmlText += "<tr>";

            htmlText += "<td>";

            htmlText += "<input type='radio' name='r1' id='r1_" + data.Contacts[i].Contact_Id + "' class='iradio-list'/>";

            htmlText += "<input type='hidden'  id='hdnCust_" + data.Contacts[i].Contact_Id + "' value='" + data.Contacts[i].Customer_Id + "' />";

            htmlText += "</td>";

            htmlText += "<td>";

            htmlText += data.Contacts[i].Customer_Name == null ? "" : data.Contacts[i].Customer_Name;

            htmlText += "</td>";

            htmlText += "<td>";

            htmlText += data.Contacts[i].Contact_Name == null ? "" : data.Contacts[i].Contact_Name;

            htmlText += "</td>";

            htmlText += "<td>";

            htmlText += data.Contacts[i].Official_Email == null ? "" : data.Contacts[i].Official_Email;

            htmlText += "</td>";

            htmlText += "<td>";

            htmlText += data.Contacts[i].Office_Landline1 == null ? "" : data.Contacts[i].Office_Landline1;

            htmlText += "</td>";

            htmlText += "<td>";

            htmlText += data.Contacts[i].Office_Landline2 == null ? "" : data.Contacts[i].Office_Landline2;

            htmlText += "</td>";

            htmlText += "<td>";

            htmlText += data.Contacts[i].Mobile1 == null ? "" : data.Contacts[i].Mobile1;

            htmlText += "</td>";

            htmlText += "<td>";

            htmlText += data.Contacts[i].Mobile2 == null ? "" : data.Contacts[i].Mobile2;

            htmlText += "</td>";

            htmlText += "<td>";

            htmlText += data.Contacts[i].DMU_Status_Role_Str == null ? "" : data.Contacts[i].DMU_Status_Role_Str;

            htmlText += "</td>";

            htmlText += "</tr>";
        }
    }
    else {

        htmlText += "<tr>";

        htmlText += "<td colspan='5'> No Record found.";

        htmlText += "</td>";

        htmlText += "</tr>";
    }
    $("#tblcontact").find("tr:gt(0)").remove();

    $('#tblcontact tr:first').after(htmlText);


    $('.iradio-list').iCheck({
        radioClass: 'iradio_square-green',
        increaseArea: '20%' // optional
    });


    if (data.Contacts.length > 0) {
        $('#hdfCurrentPage').val(data.Pager.CurrentPage);

        if (data.Pager.PageHtmlString != null || data.Pager.PageHtmlString != "") {

            $('.pagination').html(data.Pager.PageHtmlString);
        }
    }
    else {
        $('.pagination').html("");
    }

    Friendly_Message(data);

    $("#divSearchGridOverlay").hide();

    //$('[id^="r1_"]').on('ifChanged', function (event) {
    $('[name="r1"]').on('ifChanged', function (event) {
        if ($(this).prop('checked')) {
            $("#hdfContact_Id").val(this.id.replace("r1_", ""));
            $("#btnEdit").show();
            $("#btnViewCompany").show();
            $("#btnSellProduct").show();
            $("#btnView").show();
            $("#hdCustomer_Id").val($("#hdnCust_"+ $("#hdfContact_Id").val()).val());
        }
    });

    $("#btnEdit").hide();
    $("#btnViewCompany").hide();
    $("#btnSellProduct").hide();
    $("#btnView").hide();

}

function PageMore(Id) {

    $("#btnEdit").hide();
    $("#btnViewCompany").hide();
    $("#btnSellProduct").hide();
    $("#btnView").hide();
    $('#hdfCurrentPage').val((parseInt(Id) - 1));

    $(".selectAll").prop("checked", false);

    SearchContact();
}

//var autoCustomerCallback = function (paramObj) {

//    BindCustomerTags(paramObj.item.label, paramObj.item.value);
//}

//function BindCustomerTags(label, value) {
//    $('#hdnCustomer_Id').val(value);

//    $('#txtCustomer_Name').val(label);
//}