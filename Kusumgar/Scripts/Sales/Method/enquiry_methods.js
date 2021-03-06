﻿// Start : Enquiry 
function Save_Enquiry()
{
    var eViewModel = Set_Enquiry();


    if ($("#hdnEnquiry_Id").val() == 0) {
        CallAjax("/sales/insert-enquiry/", "json", JSON.stringify(eViewModel), "POST", "application/json", false, Enquiry_CallBack, "", null);
    }
    else {
        CallAjax("/sales/update-enquiry/", "json", JSON.stringify(eViewModel), "POST", "application/json", false, Enquiry_CallBack, "", null);
    }
}

function Enquiry_CallBack(data) {
    $("#tabStaggered").show();
    if (data.Enquiry.Quality_Id == 0) {
        $("#tabCustomer_Quality").show();
    }
    else
    {
        $("#tabCustomer_Quality").hide();
    }
    $("#tabQuality_Supporting").show();
    $("#tabFuncational_Visual").show();
    $("#hdnEnquiry_Id").val(data.Enquiry.Enquiry_Id);
    $("#hdnEnquiry_No").val(data.Enquiry.Enquiry_No);

    Friendly_Message(data);
}

function Get_Quality_Details(Quality_Id)
{
    $.ajax({
        url: '/sales/get-quality-by-id',
        data: { quality_Id: $("#hdnQuality_Id").val() },
        method: 'GET',
        async: false,
        success: function (data) {

            Bind_Quality_Details(data);
        }
    });
}

function Bind_Quality_Details(data)
{
    $("#tblQuality_Details").html("");

    var htmlText = "";
    htmlText += "<tr>";
    htmlText += "<th>Quality Attributes</th>";
    htmlText += "<th>Values</th>";
    htmlText += "</tr>";
    htmlText += "<tr>";
    htmlText += "<td>Yarn Type</td>";
    htmlText += "<td>" + data.quality.Yarn_Type_Name + "</td>";
    htmlText += "</tr>";
    htmlText += "<tr>";
    htmlText += "<td>";
    htmlText += "Reed";
    htmlText += "</td>";
    htmlText += "<td>"+data.quality.Reed+"</td>";
    htmlText += "</tr>";
    htmlText += "<tr>";
    htmlText += "<td>";
    htmlText += "Pick";
    htmlText += "</td>";
    htmlText += "<td>"+data.quality.Pick+"</td>";
    htmlText += "</tr>";
    htmlText += "<tr>";
    htmlText += "<td>";
    htmlText += "Weave";
    htmlText += "</td>";
    htmlText += "<td>" + data.quality.Weave_Name + "</td>";
    htmlText += "</tr>";
    htmlText += "<tr>";
    htmlText += "<td>";
    htmlText += "Minimum Order Size";
    htmlText += "</td>";
    htmlText += "<td>" + data.quality.Minimum_Order_Size + "</td>";
    htmlText += "</tr>";
    htmlText += "<tr>";
    htmlText += "<td>";
    htmlText += "Ideal Roll Length";
    htmlText += "</td>";
    htmlText += "<td>"+data.quality.Ideal_Roll_Length+"</td>";
    htmlText += "</tr>";
    htmlText += "<tr>";
    htmlText += "<td>";
    htmlText += "Our Sample No";
    htmlText += "</td>";
    htmlText += "<td>" + data.quality.Our_Sample_No + "</td>";
    htmlText += "</tr>";

    $("#tblQuality_Details").html(htmlText);

    alert(Quality_Id);
}

function Get_Nation_Details(Customer_Id)
{
    $.ajax({
        url: '/sales/get-nation-by-customer-id',
        data: { customer_Id: $("#hdnCustomer_Id").val() },
        method: 'GET',
        async: false,
        success: function (data) {

            Bind_Nation_Details(data);
        }
    });
}

function  Bind_Nation_Details(data)
{
    var Nation_Id = "";

    var Text = "";

   

    if (data[0].NationName.trim(" ").toLowerCase() == "india") {

            $("#dvIs_Dosmistic").html("<h4><span class='label label-default'> <span class='flag-icon " + data[0].Nation_Flag + "'> </span> Domistic  <i class='fa " + data[0].Currency_Symbol + "'></i></span></h4>");
        }
        else {

            $("#dvIs_Dosmistic").html("<h4><span class='label label-default'> <span class='flag-icon " + data[0].Nation_Flag + "'> </span> International  <i class='fa " + data[0].Currency_Symbol + "'></i></span></h4>");
        }
    
}


// End : Enquiry 


// Start : Staggered Order 
function Save_Staggered_Order()
{
    var eViewModel = Set_Enquiry();

    if($("#hdnStaggered_Order_Id").val() ==0)
    {
        CallAjax("/sales/insert-staggered-order/", "json", JSON.stringify(eViewModel), "POST", "application/json", false, Staggered_CallBack, "", null);
    }
    else
    {
        CallAjax("/sales/update-staggered-order/", "json", JSON.stringify(eViewModel), "POST", "application/json", false, Staggered_CallBack, "", null);
    }
}

function Get_Staggered_Order()
{
    var eViewModel = Set_Enquiry();

    if ($("#hdnEnquiry_Id").val() != 0) {

        CallAjax("/sales/get-staggered-orders/", "json", JSON.stringify(eViewModel), "POST", "application/json", false, Bind_Staggered_Order_Grid, "", null);
    }
}

function Staggered_CallBack(data)
{
    Friendly_Message(data);
    Get_Staggered_Order();

}

function Bind_Staggered_Order_Grid(data)
{
    var htmlText = "";

    

    if (data.Enquiry.Staggered_Orders.length > 0) {

        for (var i = 0; i < data.Enquiry.Staggered_Orders.length ; i++) {

            htmlText += "<tr>";

            htmlText += "<td>";

            htmlText += data.Enquiry.Staggered_Orders[i].Quantity;

            htmlText += "</td>";

            htmlText += "<td>";

            htmlText += ToJavaScriptDate(data.Enquiry.Staggered_Orders[i].Delivery_Date);

            htmlText += "</td>";

            htmlText += "<td>";

            htmlText += " <button type='button' id='btnRemove' class='btn btn-danger btn-xs' onclick='Remove_Staggered_Order(" + data.Enquiry.Staggered_Orders[i].Staggered_Order_Id + ")'><i class='fa fa-remove'></i></button>";

            htmlText += "</td>";

            htmlText += "</tr>";
        }

        $("#tblStaggered_Order").find("tr:gt(0)").remove();

        $('#tblStaggered_Order tr:first').after(htmlText);

        $("#hdnOrder_No").val("");

        $("#hdnOrder_Status").val("");

        $("#txtQuantity").val("");

        $("#DtDelivery_Date").val("");

    }
    else
    {
        $("#tblStaggered_Order").find("tr:gt(0)").remove();
    }

}

function Remove_Staggered_Order(id)
{
    $.ajax({
        url: '/sales/delete-staggered-order-by-id',
        data: { staggered_Order_Id: id },
        method: 'GET',
        async: false,
        success: function (data) {
            Get_Staggered_Order();
            Friendly_Message(data);
        }
    });
}
 
// End : Staggered Order

// Start : Supporting Details

function Save_Supporting_Details()
{
    var eViewModel = Set_Enquiry();

    if($("#hdnSupporting_Details_Id").val() == 0)
    {
        CallAjax("/sales/insert-supporting-details/", "json", JSON.stringify(eViewModel), "POST", "application/json", false, Supporting_Details_CallBack, "", null);
    }
    else
    {
        CallAjax("/sales/update-supporting-details/", "json", JSON.stringify(eViewModel), "POST", "application/json", false, Supporting_Details_CallBack, "", null);
    }
}

function Supporting_Details_CallBack(data)
{
    $("#hdnSupporting_Details_Id").val(data.Enquiry.Supporting_Details.Supporting_Details_Id);

    Friendly_Message(data);
}

// End : Supporting Details

// Start : Temp Customer Quality Details

function Save_Temp_Customer_Quality_Details()
{
    var eViewModel = Set_Enquiry();

    CallAjax("/sales/insert-temp-customer-quality-details/", "json", JSON.stringify(eViewModel), "POST", "application/json", false, Temp_Customer_Quality_Details_CallBack, "", null);
}

function Temp_Customer_Quality_Details_CallBack(data)
{
    Friendly_Message(data);
}

// End : temp Customer Qulaity Details

// Start : Attachments

function Callback(data) {

    Friendly_Message(data);

    // Multiple_Autocomplete($("#Enquiry_Attach_Emails"), data.Attachments, Delete_Attachment);

    Bind_Attachments();
}

function Delete_Attachment(id) {

    $.ajax({
        url: '/ajax/delete-attachments',
        data: { attachment_Id: id },
        method: 'GET',
        async: false,
        success: function (data) {
            Friendly_Message(data);
        }
    });
}

function Bind_Attachments()
{
    $.ajax({
        url: '/ajax/get-attachments-by-ref-type-id',
        data: { ref_Type: $('#hdnRefType').val(), ref_Id: $('#hdnEnquiry_Id').val() },
        method: 'GET',
        async: false,
        success: function (data) {
            Multiple_Autocomplete($("#Enquiry_Attach_Emails_Files"), data.Attachments, Delete_Attachment);
        }
    });
}

// End : Attachments


// start : Temp Functional Visual Parameters 

function Save_Temp_Functional_Parameters()
{
    var eViewModel = Set_Enquiry();

    CallAjax("/sales/insert-temp-functional-parameters/", "json", JSON.stringify(eViewModel), "POST", "application/json", false, Temp_Functional_Parameters_CallBack, "", null);
}

function Temp_Functional_Parameters_CallBack(data)
{
    $("#txtFunctional_Parameters").val("");

    $("#hdnFunctional_Parameters").val("");

    Bind_Temp_Functional_Parameters();

    Friendly_Message(data);
}

function Delete_Temp_Functional_Parameters(id)
{
    $.ajax({
        url: '/sales/delete_temp_functional_parameters_by_id',
        data: { temp_Functional_Parameters_Id: id },
        method: 'GET',
        async: false,
        success: function (data) {
            Friendly_Message(data);
        }
    });
}

function Bind_Temp_Functional_Parameters()
{
    $.ajax({
        url: '/sales/get-temp-functional-parameters-by-enquiry-id',
        data: { enquiry_Id: $("#hdnEnquiry_Id").val() },
        method: 'GET',
        async: false,
        success: function (data) {

            Multiple_Autocomplete($("#txtFunctional_Parameters"), data.temp_Functional_Parameters, Delete_Temp_Functional_Parameters);

            Friendly_Message(data);
        }
    });
}

function Save_Temp_Visual_Parameters() {

    var eViewModel = Set_Enquiry();

    CallAjax("/sales/insert-temp-visual-parameters/", "json", JSON.stringify(eViewModel), "POST", "application/json", false, Temp_Visual_CallBack, "", null);

}

function Temp_Visual_CallBack(data)
{
    $("#txtVisual_Parameters").val("");

    $("#hdnVisual_Parameters").val("");

    Bind_Temp_Visual_Parameters();

    Friendly_Message(data);
}

function Delete_Temp_Visual_Parameters(id) {

    $.ajax({
        url: '/sales/delete_temp_visual_parameters_by_id',
        data: { temp_Visual_Parameters_Id: id },
        method: 'GET',
        async: false,
        success: function (data) {
            Friendly_Message(data);
        }
    });
}

function Bind_Temp_Visual_Parameters() {
    $.ajax({
        url: '/sales/get-temp-visual-parameters-by-enquiry-id',
        data: { enquiry_Id: $("#hdnEnquiry_Id").val() },
        method: 'GET',
        async: false,
        success: function (data) {

            Multiple_Autocomplete($("#txtVisual_Parameters"), data.temp_Visual_Parameters, Delete_Temp_Visual_Parameters);

            Friendly_Message(data);
        }
    });
}

// End : Temp Functional Visual parameters

function Set_Enquiry()
{
    var eViewModel =
    {
        Enquiry:
            {
                Enquiry_Id: $("#hdnEnquiry_Id").val(),

                Enquiry_No: $("#hdnEnquiry_No").val(),

                Enquiry_Type_Id: $("#hdnEnquiry_Type_Id").val(),

                Enquiry_Status_Id: $("#hdnEnquiry_Status_Id").val(),

                Customer_Id: $("#hdnCustomer_Id").val(),

                Quality_Id: $("#hdnQuality_Id").val(),

                PPC_Article_Type_Id: 0,

                Quality_Set_Id: 0,

                Is_Active: $("#hdnStatus").val(),

                Staggered_Order:
                    {
                        Enquiry_Id: $("#hdnEnquiry_Id").val(),

                        Order_No: $("#hdnOrder_No").val(),

                        Order_Status: $("#hdnOrder_Status").val(),

                        Quantity: $("#txtQuantity").val(),

                        Delivery_Date: $("#DtDelivery_Date").val(),

                        Is_Active: $("#hdnStatus").val()
                    },

                Supporting_Details:
                    {
                        Supporting_Details_Id: $("#hdnSupporting_Details_Id").val(),

                        Enquiry_Id: $("#hdnEnquiry_Id").val(),

                        Rate: $("#txtRate").val(),

                        Customer_Roll_Length: $("#txtCustomer_Roll_Length").val(),

                        Packing: $("#drpPacking").val(),

                        Dispatch: $("#drpDispatch").val(),

                        Additional_Customer_Prop: $("#txtAdditional_Customer_Property").val(),

                        Source_Of_Enquiry: $("#txtSource_of_Inquiry").val(),

                        Is_Active: $("#hdnStatus").val(),

                        Piece_Length_Max: $("#txtPiece_Length_Max").val(),

                        Piece_Length_Min: $("#txtPiece_Length_Min").val(),

                        Two_Part: $("#txtTwo_Part").val()
                    },

                Temp_Customer_Quality_Details:
                    {
                        Enquiry_Id: $("#hdnEnquiry_Id").val(),

                        Width_Of_Fabric: $("#txtWidth_of_fabric").val(),

                        Coating: $("#txtCoating").val(),

                        Applications: $("#txtApplication").val(),

                        Physical_Appearance: $("#txtPhysical_Appearance").val(),

                        Shades: $("#drpShade").val(),

                        Finish: $("#txtFinish").val(),

                        Prints: $("#txtPrint").val(),

                        Customer_Approved_Sample: $("#hdnCustomer_Approved_Sample").val(),

                        Market_Segment: $("#txtMarket_Segment").val(),

                        Lable_Tagging: $("#txtLabel_Tagging").val(),

                        Wrap_Count: $("#txtWrap_Count").val(),

                        Weft_Count: $("#txtWeft_Count").val(),

                        Ends_Per_Inch: $("#txtEnds_Per_Inch").val(),

                        Pick_Per_Inch: $("#txtPick_Per_Inch").val()
                    },

                Temp_Functional_Parameters:
                {
                    Enquiry_Id: $("#hdnEnquiry_Id").val(),

                    Test_Id: $("#hdnFunctional_Parameters").val()
                },

                Temp_Visual_Parameters:
                    {
                        Enquiry_Id: $("#hdnEnquiry_Id").val(),

                        Defect_Id: $("#hdnVisual_Parameters").val()
                    }

            }
    }

    return eViewModel;
}

