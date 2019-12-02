//<![CDATA[
//{% - assign portalUserId = page.adx_partialurl | replace: "/" -%}
//{% - assign currentLocation = page.adx_partialurl | replace: "/" -%}
//{% - assign currentPage = page.adx_partialurl | replace: "/" -%}
//{% - assign homePage = page.adx_partialurl | replace: "/" -%}
//{% - assign currentQuery = page.adx_partialurl | replace: "/" -%}
var portalUserId = '{{ user.id }}';
var currentLocation = '{{ page.url | path }}';
var currentPage = '{{ page.adx_partialurl | replace: "/" }}';
var homePage = '{{ website.adx_partialurl }}';
var currentQuery = '{{ request.query }}';
var lastClaimId = '';
//{% - if currentPage == 'claim-detail' -%}
//lastClaimId = '{{ request.params["id"] }}'
//{% - endif -%}

debugger;
console.log("portalUserId:" + portalUserId);

/* Having a compatible browser does not mean sessionStorage is available. May not work if using Private Browsing. 
Taken from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API */
var Btsss = Btsss || {};
Btsss.Portal = function (window) {
    _currentLocation = '{{ page.url | path }}';
    _previousLocation = '';
    _currentQuery = '{{ request.query }}';
    _currentPage = '{{ page.adx_partialurl }}';
    _currentUserId = '{{ user.id }}';
    _claimId = '{{ claimId }}';
    _apptId = '{{ apptId }}';
    return {
        sessionStorage: window.sessionStorage,

        currentUserId: this._currentUserId,

        addLocationHistory: function (newLocationEntry) {
            this._previousLocation = Btsss.Portal.sessionStorage.getItem('currentLocation');

            console.log(' SRD - setPreviousLocation: ' + Btsss.Portal.sessionStorage.getItem('currentLocation'));

            this._currentLocation = newLocationEntry;

            console.log(' SRD - NewLocation: ' + newLocationEntry);

            this.sessionStorage.setItem('previousLocation', this._previousLocation);
            this.sessionStorage.setItem('currentLocation', this._currentLocation);
            Btsss.Portal.savePageParams();
        },

        onLocationChanged: function (eventInvoker) {
            Btsss.Portal.sessionStorage.setItem('previousLocation', _previousLocation);
            Btsss.Portal.sessionStorage.setItem('currentLocation', _previousLocation);
            Btsss.Portal.savePageParams();
        },

        setPreviousLocation: function () {
            if (this._previousLocation == '') {
                console.log('Btsss.Portal.setPreviousLocation: this._previousLocation = <BLANK>');
            }
            Btsss.Portal.sessionStorage.setItem('previousLocation', _previousLocation);
        },

        getCurrentLocation: function () {
            var tempCurrentLocation = Btsss.Portal.sessionStorage.getItem('currentLocation');
            console.log('Btsss.Portal.getCurrentLocation: this._currentLocation = ' + tempCurrentLocation);
            return tempCurrentLocation;
        },

        setCurrentLocation: function () {
            if (this._currentLocation == '') {
                console.log('Btsss.Portal.setCurrentLocation: this._currentLocation = <BLANK>');
            }
            Btsss.Portal.sessionStorage.setItem('currentLocation', _currentLocation);
        },

        savePageParams: function () {
            this.sessionStorage.setItem(_currentPage, _currentQuery);
        },

        getPageParams: function (pageName) {
            return this.sessionStorage.getItem(pageName);
        },

        getTermsValid: function () {
            var bTermsValid = false;
            var dta = null;
            bTermsValid = Btsss.Portal.sessionStorage.getItem('terms') && Btsss.Portal.sessionStorage.getItem('date_terms_accepted');
            console.log("Btsss.Portal.getTermsValid: Session terms Value = " + Btsss.Portal.sessionStorage.getItem('terms'));
            console.log("Btsss.Portal.getTermsValid: Session terms date Value = " + Btsss.Portal.sessionStorage.getItem('date_terms_accepted'));

            if (bTermsValid) {
                if (Btsss.Portal.sessionStorage.getItem('terms')) {
                    dta = Btsss.Portal.sessionStorage.getItem('date_terms_accepted');
                    var dta_dt = new Date(dta);
                    var curr_dt = new Date();
                    bTermsValid = (dta_dt.getDate() == curr_dt.getDate()) && (dta_dt.getMonth() == curr_dt.getMonth()) && (dta_dt.getYear() == curr_dt.getYear());
                }
            }
            console.log("Btsss.Portal.getTermsValid: Terms validated. Value = " + bTermsValid);
            return bTermsValid;
        },

        getProfileReviewed: function () {
            var profileReviewed = Btsss.Portal.sessionStorage.getItem('profile_reviewed');
            console.log("Btsss.Portal.getTermsValid: Getting profile_reviewed session Value = " + profileReviewed);
            return profileReviewed;
        },

        storageAvailable: function (window, type) {
            try {
                var storage = window[type],
                    x = '__storage_test__';
                storage.setItem(x, x);
                storage.removeItem(x);
                return true;
            } catch (e) {
                return false;
            }
        },

        createSessionVar: function (key, value) {
            // check for compatability
            if (Btsss.Portal.storageAvailable(window, 'sessionStorage')) {
                // sessionStorage has a 5mb size limit which if exceeded would result in failure to store variable. Very unlikely to occur but checked all the same. 
                try {
                    Btsss.Portal.sessionStorage.setItem(key, value);
                } catch (e) {
                    if (e.name === 'QUOTA_EXCEEDED_ERR' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || e.name === 'QuotaExceededError' || e.name === 'W3CException_DOM_QUOTA_EXCEEDED_ERR') {
                        Btsss.Portal.createAlert("alert-danger", "Session storage exceeded");
                    } else {
                        Btsss.Portal.createAlert("alert-danger", e.name + " occurred.");
                    }
                    return false;
                }
                return true;
            } else {
                Btsss.Portal.createAlert("alert-danger", "Unsupported Browser Detected or using Private Browsing, please update your browser");
                return false;
            }
        },

        initSession: function () {
            console.log("Btsss.Portal.initSession: Intitalizing session variables.");
            Btsss.Portal.sessionStorage.createSessionVar('terms', '');
            Btsss.Portal.sessionStorage.createSessionVar('date_terms_accepted', '');
            Btsss.Portal.sessionStorage.createSessionVar('profile_reviewed', '');
            Btsss.Portal.sessionStorage.createSessionVar('veteran_id', '');

            return true;
        },

        destroySession: function () {
            console.log("Btsss.Portal.destroySession: destroying session variables.");
            Btsss.Portal.sessionStorage.removeItem('terms');
            Btsss.Portal.sessionStorage.removeItem('date_terms_accepted');
            Btsss.Portal.sessionStorage.removeItem('profile_reviewed');
            Btsss.Portal.sessionStorage.removeItem('veteran_id');

            return true;
        },

        checkSession: function () {
            /* S E S S I O N   V A R I A B L E   C H E C K
            this code checks that the user has agreed to the terms and conditions before coming to this page
            if they have not, they will be returned to the Terms and Conditions page (Welcome page) */
            console.log('Btsss.Portal.checkSession: Current portal user id = ' + portalUserId);
            console.log('Btsss.Portal.checkSession: Current window location = ' + currentLocation);
            console.log('Btsss.Portal.checkSession: Current page = {{ page.url | path }}');
            // TODO: Clean this up after testing and demo 
            var _serverPagePath = '{{ page.url | path }}';
            var _clientPagePath = window.location.href;
            var isRegister = window.location.href.contains('Account');
            if (isRegister) { console.log('isRegister = true'); }
            else { console.log('isRegister = false') }
            if (isRegister === true) {
                return true;
            }
            // End TODO: Clean this up after testing and demo 

            var ssoeSessionActive = window.sessionStorage.getItem('ssoe_session_active');

            // SRD
            console.log('SRD - BTSSS Portal JS Library - ssoeSessionActive: ' + ssoeSessionActive);
            // if (ssoeSessionActive == 'true' ) {
            //     Btsss.Portal.redirect("logout");
            // }
            /*
            
            if(portalUserId === '') {
                Btsss.Portal.destroySession(); 
                if (ssoeSessionActive == 'false')
                {
                  Btsss.Portal.redirect("signin");
                }
                else
                {
                  Btsss.Portal.redirect("logout");
                }
            } 
            else
            */

            if (!Btsss.Portal.getTermsValid()) {


                console.log("Btsss.Portal.checkSession: Terms not valid. Clearing session.");
                Btsss.Portal.destroySession();
                console.log("Session destroyed.");

                if (ssoeSessionActive == 'false') {
                    //console.log('SRD - BTSSS Portal JS Library - Btsss.Portal.getTermsValid is false and ssoeSessionActive is false');
                    //console.log('SRD - BTSSS Portal JS Library - Btsss.Portal.getTermsValid is false and ssoeSessionActive could be true or false');
                    Btsss.Portal.redirect("home");
                }

                console.log("Checked session vars");
            } else if (Btsss.Portal.getProfileReviewed() !== "yes") {
                // check that session variable exists that indicates that profile has been reviewed 
                //Btsss.Portal.profileReviewed = "no";
                //Btsss.Portal.profileReviewed = Btsss.Portal.sessionStorage.getItem('profile_reviewed');
                console.log("Btsss.Portal.checkSession: Profile not reviewed. Clearing session profile_reviewed variable.");
                if (ssoeSessionActive == 'false') {
                    console.log('SRD - BTSSS Portal JS Library - Btsss.Portal.getProfileReviewed is false and ssoeSessionActive is false');
                    Btsss.Portal.redirect("review-profile");
                }

            }
        },

        createAlert: function (type, message) {
            var alertHtml = '';
            alertHtml += '<div class="alert ' + type + ' alert-dismissible" role = "alert">';
            alertHtml += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
            alertHtml += '<span aria-hidden="true">&times;</span>';
            alertHtml += '</button>';
            alertHtml += '<strong>Error: </strong>' + message;
            alertHtml += '</div>';
            $('#alert-placeholder').html(alertHtml);
            // scroll to top of the page
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
        },

        redirect: function (pageName, clearSession) {
            var nextLocation = "";
            switch (pageName) {
                case "review-profile":
                    nextLocation = "/review-profile";
                    break;
                case "my-dashboard":
                    nextLocation = "/review-profile/my-dashboard";
                    break;
                case "logout":
                    nextLocation = "/logout";
                    break;
                case "home":
                    nextLocation = "/";
                    break;
                case "signin":
                    nextLocation = "/SignIn?returnUrl=/";
                    break;
                default:
                    nextLocation = "/";
                //do nothing editing this to force and update
            }
            // Make sure we never loop a redirect
            if (nextLocation.replace(/\//g, '') !== currentLocation.replace(/\//g, '')) {
                console.log('Btsss.Portal.redirect: redirecting to ' + nextLocation);
                window.location.replace(nextLocation);
            }
        }
    };
}(window);

Btsss.Utils = function (window) {
    return {
        fixBreadcrumbs: function () {
            $("ul.breadcrumb > li > a").each(function () {
                // parse and filter out empty results
                var paths = this.pathname.split("/").filter(function (e) { return e.trim() != ''; });
                var urlRoot = "" + $(this).attr('href').split('?')[0];
                if (paths.length > 0) {
                    var pageName = paths[paths.length - 1];
                    var lastQuery = "" + Btsss.Portal.sessionStorage.getItem(pageName);
                    console.log('lastQuery:' + lastQuery);
                    $(this).attr('href', urlRoot + lastQuery);
                }
            });
        }
    };
}(window);

document.addEventListener("DOMContentLoaded", function (event) {
    console.log("BTSSS Portal JS Library: DOMContentLoaded event fired.");
    Btsss.Portal.addLocationHistory(currentLocation);
    Btsss.Portal.checkSession();
    Btsss.Utils.fixBreadcrumbs();
});
//]]>