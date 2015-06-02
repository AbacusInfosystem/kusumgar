﻿$(document).ready(function () {
  
    $("#btnSaveOtherDetails").click(function () {
       
        if ($("#frmOtherDetails").valid()) {
            Save_Vendors_Other_Details();
        }
    });

    $('[name="Vendor.Vendor_Entity.Is_Active"]').on('ifChanged', function (event) {
        if ($(this).prop('checked')) {
            $("#hdnStatus").val(true);
        }
        else {
            $("#hdnStatus").val(false);
        }
    });

    $("#btnSaveCertificationDetails").click(function () {
      
        if ($("#frmCertificationDetails").valid()) {
            Save_Vendors_Other_Details();
        }
    });

    $("#btnCentralRegistrationDetails").click(function () {

        if ($("#frmCentralRegistrationDetails").valid()) {
            Save_Vendors_Other_Details();
        }
    });
    
    $('[name="Vendor.Vendor_Entity.Block_Payment"]').on('ifChanged', function (event) {
        if ($(this).prop('checked')) {
            $("#hdnBlockPayment").val(true);
        }
        else {
            $("#hdnBlockPayment").val(false);
        }
    });

    $('[name="Vendor.Vendor_Entity.Is_Approved_By_Director"]').on('ifChanged', function (event) {
        if ($(this).prop('checked')) {
            $("#hdnApprovedByDirector").val(true);
        }
        else {
            $("#hdnApprovedByDirector").val(false);
        }
    });
  
    $("#drpHeadOfficeNation").change(function () {

        $.ajax({
            url: '/master/get-state-by-nation-id',
            data: { nation_Id: $("#drpHeadOfficeNation").val() },
            method: 'GET',
            async: false,
            success: function (data) {
                if (data != null) {
                    Bind_States(data);
                }
            }
        });
    });
});