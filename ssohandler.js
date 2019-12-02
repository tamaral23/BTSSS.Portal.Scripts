$('#myModal').on('hidden.bs.modal', function (e) {
    window.location.href = "/logout";
});
debugger;
alert("Entering the sso handler.");

console.log("btsss_user_icn" + btsss_user_icn);
// SRD
//$('#btsss_name').val('val1');
//$('#btsss_saml_response').val('Test');
//console.log(' SRD - BTSSS Home - Before InsertButton click');
//$('#InsertButton').trigger('click');
//console.log(' SRD - BTSSS Home - After InsertButton click');

if ((!ssoe_record_loaded) && (saml_token.length > 0)) {

    // SRD - This code is not working and error is not helpful for troubelshooting - Commented below three lines for now
    console.log(' SRD - BTSSS Home - Before val1 value to btsss_name');
    $('#btsss_name').val('val1');
    //$('#btsss_saml_response').val('Test with saml_token > 0');
    console.log("SRD - saml_token: " + saml_token);
    console.log("SRD - saml_token b64utoutf8 value: " + b64utoutf8(saml_token));
    console.log("SRD - saml_token length: " + saml_token.length);
    console.log("SRD - saml_token b64utoutf8 length: " + b64utoutf8(saml_token).length);

    // SRD - Works
    $('#btsss_saml_response').val(saml_token.substring(0, saml_token.length - 1));
    //$('#btsss_saml_response').val(saml_token.substring(0,saml_token.length));
    // SRD - Does not work 
    //$('#btsss_saml_response').val(saml_token.substring(0, saml_token.length));
    //$('#btsss_saml_response').val(saml_token.substring(saml_token.length - 1, saml_token.length));
    console.log(' SRD - BTSSS Home - Before InsertButton click');
    $('#InsertButton').trigger('click');
    console.log(' SRD - BTSSS Home - After InsertButton click');
} else
    if (ssoe_record_loaded) {
        //
        //If we need to create a new contact then use the standard registration url. This is done via the web page idme-account-registration
        //
        if (btsss_contact_in_btsss == "false") {
            var uri;

            if ((!btsss_user_icn) || (!btsss_secid)) {
                //alert("No ICN was found in SSOE data.");
                $("#myModal").modal({
                    show: true,
                    backdrop: 'static'
                });
                uri = "/logout";
            } else {
                var params = "username=" + btsss_portal_user_name + "&email=" + btsss_email + "&firstname=" + btsss_firstname + "&lastname=" + btsss_lastname;
                uri = params;
                uri = "/ssoe-account-registration?" + encodeURIComponent(uri);
                window.location.href = uri;
            }

        } else {
            var params = "username=" + btsss_portal_user_name;
            var uri = params;
            uri = "/ssoe-sign-in?" + encodeURIComponent(uri);
            window.location.href = uri;
        }
    }
