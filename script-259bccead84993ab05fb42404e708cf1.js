$(document).ready(function() {

  $('#query').attr('placeholder','Type your question or error here in English');
  // social share popups
  $(".share a").click(function(e) {
    e.preventDefault();
    window.open(this.href, "", "height = 500, width = 500");
  });  
  
//Automatic style by atumanov
$.extend($.expr[":"], { "startsWith": function(elem, i, match, array) { return (elem.textContent || elem.innerText || "").toLowerCase ().indexOf((match[3] || "").toLowerCase()) == 0; } });
  
    $("p:startsWith('# ')").addClass('bash');
    $("p:contains('C:\\>')").addClass('winshell');
    $("p:startsWith('PS ')").addClass('powershell');
    $("p:contains('PLESK_ERROR:')").addClass('pleskerr');
    $("p:contains('PLESK_WARN:')").addClass('pleskwarn');
    $("p:contains('PLESK_INFO:')").addClass('pleskinfo');
    $("p:contains('MYSQL_LIN:')").addClass('bash');
    $("p:contains('MYSQL_WIN:')").addClass('winshell');
    $("p:startsWith('Note: ')").addClass('note');
    $("p:contains('CONFIG_TEXT:')").addClass('configtext');
    $("p:startsWith('Warning:')").addClass('warning');
  
//Automatic cut of words and symbols
    $("p:contains('C:\\> ')")
        .each(function () {
            $(this).html($(this).html().replace(/C:\\&gt; /g, ''));
    })
    
//    $("p:startsWith('PS ')")
//        .each(function () {
//            $(this).html($(this).html().replace(/PS /g, ''));
//    })
    
    $("p:contains('PLESK_ERROR: ')")
        .each(function () {
            $(this).html($(this).html().replace(/PLESK_ERROR: /g, ''));
        })

    $("p:contains('PLESK_INFO: ')")
        .each(function () {
            $(this).html($(this).html().replace(/PLESK_INFO: /g, ''));
        })
    $("p:contains('PLESK_WARN: ')")
        .each(function () {
            $(this).html($(this).html().replace(/PLESK_WARN: /g, ''));
        })
    $("p:contains('MYSQL_LIN: ')")
        .each(function () {
            $(this).html($(this).html().replace(/MYSQL_LIN: /g, ''));
        })

    $("p:contains('MYSQL_WIN: ')")
        .each(function () {
            $(this).html($(this).html().replace(/MYSQL_WIN: /g, ''));
        })
    $("p:contains('CONFIG_TEXT: ')")
        .each(function () {
            $(this).html($(this).html().replace(/CONFIG_TEXT: /g, ''));
        })
    
// Redirect to the old RT by amaslov@
    if (window.location.href.indexOf("/Ticket/Display.html?id=") > -1) {
        var locating = window.location.href;
        locating = locating.replace("support.plesk.com", "support-old.plesk.com");
        document.location.href = locating;
    }
  
// Feedback messages  

// Add vote up message
$(".article-vote-up").on('click', function() {
$(".article-vote-up").wrap('<div class=feedback-info-style>Thank you!</div>');
});

// Add vote down message
$(".article-vote-down").on('click', function() {
$(".article-vote-down").wrap('<div class=feedback-info-style>Sorry to hear that. Could you please leave a comment what is wrong?</div>');
});

$(".article-vote-up, .article-vote-down").on('click', function() {
$(".article-vote-up, .article-vote-down, .article-votes-count, .article-votes-question").remove('');
});
  
    //Redirecting untranslated articles to an existing language
    var notDefaultLanguage = window.location.href.indexOf('/en-us/') == -1;
    var isArticle = window.location.href.indexOf('/articles/') > -1;
    var isErrorPage = $(".error-page").length > 0;
  
//fixed navbar script//  
  var navwin      = $(window);
      fxel     = $('#plesk-nav');
      eloffset = fxel.offset().top;

navwin.scroll(function() {
    if (eloffset < navwin.scrollTop()) {
        fxel.addClass("fixed");
    } else {
        fxel.removeClass("fixed");
    }
});
//fixed navbar script end//

  // show form controls when the textarea receives focus or backbutton is used and value exists
  var $commentContainerTextarea = $(".comment-container textarea"),
  $commentContainerFormControls = $(".comment-form-controls, .comment-ccs");

  $commentContainerTextarea.one("focus", function() {
    $commentContainerFormControls.show();
  });

  if ($commentContainerTextarea.val() !== "") {
    $commentContainerFormControls.show();
  }

  // Expand Request comment form when Add to conversation is clicked
  var $showRequestCommentContainerTrigger = $(".request-container .comment-container .comment-show-container"),
    $requestCommentFields = $(".request-container .comment-container .comment-fields"),
    $requestCommentSubmit = $(".request-container .comment-container .request-submit-comment");

  $showRequestCommentContainerTrigger.on("click", function() {
    $showRequestCommentContainerTrigger.hide();
    $requestCommentFields.show();
    $requestCommentSubmit.show();
    $commentContainerTextarea.focus();
  });

  // Mark as solved button
  var $requestMarkAsSolvedButton = $(".request-container .mark-as-solved:not([data-disabled])"),
    $requestMarkAsSolvedCheckbox = $(".request-container .comment-container input[type=checkbox]"),
    $requestCommentSubmitButton = $(".request-container .comment-container input[type=submit]");

  $requestMarkAsSolvedButton.on("click", function () {
    $requestMarkAsSolvedCheckbox.attr("checked", true);
    $requestCommentSubmitButton.prop("disabled", true);
    $(this).attr("data-disabled", true).closest("form").submit();
  });

  // Change Mark as solved text according to whether comment is filled
  var $requestCommentTextarea = $(".request-container .comment-container textarea");

  $requestCommentTextarea.on("keyup", function() {
    if ($requestCommentTextarea.val() !== "") {
      $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-and-submit-translation"));
      $requestCommentSubmitButton.prop("disabled", false);
    } else {
      $requestMarkAsSolvedButton.text($requestMarkAsSolvedButton.data("solve-translation"));
      $requestCommentSubmitButton.prop("disabled", true);
    }
  });

  // Disable submit button if textarea is empty
  if ($requestCommentTextarea.val() === "") {
    $requestCommentSubmitButton.prop("disabled", true);
  }

  // Submit requests filter form in the request list page
  $("#request-status-select, #request-organization-select")
    .on("change", function() {
      search();
    });

  // Submit requests filter form in the request list page
  $("#quick-search").on("keypress", function(e) {
    if (e.which === 13) {
      search();
    }
  });

  function search() {
    window.location.search = $.param({
      query: $("#quick-search").val(),
      status: $("#request-status-select").val(),
      organization_id: $("#request-organization-select").val()
    });
  }

  $(".header .icon-menu").on("click", function(e) {
    e.stopPropagation();
    var menu = document.getElementById("user-nav");
    var isExpanded = menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute("aria-expanded", !isExpanded);
  });

  $('body').addClass('helpcenter-enable');

  $('.recent-activity-controls > a').addClass('btn');

  if ($("#user-nav").children().length === 0) {
    $(".header .icon-menu").hide();
  }

  // Submit organization form in the request page
  $("#request-organization select").on("change", function() {
    this.form.submit();
  });

  // Toggles expanded aria to collapsible elements
  $(".collapsible-nav, .collapsible-sidebar").on("click", function(e) {
    e.stopPropagation();
    var isExpanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !isExpanded);
  });
  
  //Form system //
				var urlPath = window.location.pathname; 
  			if (urlPath.match(/requests\/new/g)) {
        var keyField = $('#request_custom_fields_28011689');
        var token = 'ktpvqckrujpzjizesqgrbudjozqxahar';
        var keyToTest = "";
        var checkingKey = false;
        var isPartner = false;
        var formDiv = $('.form')[0];
        var overlay = $("<div />", {
            "class": 'overlayLoadingForm'
        }).css({
            "display": 'none'
        }).appendTo($(".form").css("position", "relative"));
        var inputLc = $('#request_custom_fields_28011689');
        var statusLbl = $("<div />", {}).css({
            "display": 'none'
        }).appendTo($(inputLc).parent());
        var prtnCheckBox = $('#request_custom_fields_33793769');

        var ownerField = $('#request_custom_fields_114096789653');
        var licenseType = $('#request_custom_fields_114096789813');

        var loadingBox1 = $("<div />", {
            "class": 'cube1'
        }).appendTo($(".overlayLoadingForm"));
        var loadingBox2 = $("<div />", {
            "class": 'cube2'
        }).appendTo($(".overlayLoadingForm"));
        var sbtBtn = $("input[name='commit']")[0];
        var footer = $("footer")[0];
        $("input[name='commit']").remove();
        PartnerChecks();

        inputLc.bind('input paste change', function () {

            if (keyField.val().length >= 12 && !checkingKey) {


                if (keyField.val() !== keyToTest) {
                    overlay.css({
                        "display": "inline"
                    });
                    keyToTest = keyField.val();
                    checkingKey = true;
                    ExecuteRequest(keyToTest);

                }

            } else if (keyField.val().length < 12) {
                inputLc.css({
                    "background-color": "#fff"
                });
                statusLbl.css({
                    "display": "none"
                });
                inputLc.css({
                    "border-color": '#ddd'
                });
                keyToTest = "";
                $("input[name='commit']").remove();
            }
        });

        prtnCheckBox.bind('input change', function () {
            PartnerChecks();
        });
	}
        function PartnerChecks() {

            var prtnValue = prtnCheckBox.prop("checked");

            if (prtnValue == false) {
                inputLc.css({
                    "background-color": "#fff"
                });
                inputLc.val("");
                inputLc.prop("readonly", false);
                statusLbl.css({
                    "display": "none"
                });
                inputLc.css({
                    "border-color": '#ddd'
                });
                keyToTest = "";
                $("input[name='commit']").remove();
            } else {
                inputLc.css({
                    "background-color": "lightgrey"
                });
                inputLc.val("PLSK.PRTN");
                inputLc.prop("readonly", true);
                keyToTest = "";
                statusLbl.css({
                    "display": "none"
                });
                inputLc.css({
                    "border-color": '#ddd'
                });
                footer.appendChild(sbtBtn);

            }
        }

        function ExecuteRequest(licCode) {

            var license = (licCode + '').replace(/\s+/gi, '');

            $.ajax({
                url: "https://api.central.plesk.com/support/api/check_key/?		ka_key=" + license,
                type: "POST",
                headers: {
                    'X-Auth-Token': token

                },

                dataType: "json",
                success: function (response) {
                    console.log(response);
                    VerifyLicKey(response);

                    checkingKey = false;
                    overlay.css({
                        "display": "none"
                    });

                },
                error: function (xhr) {
                    console.error(xhr.status);
                    checkingKey = false;
                }
            })
        }

        function VerifyLicKey(response) {

            var licenseResponse = response.result;

            NewVerification(licenseResponse);

        }


        function NewVerification(licenseResponse) {

            if (licenseResponse['buy_support_url'] != null) {
                SetTextForVerification(licenseResponse);
            } else {

                if (licenseResponse['have_support'] == true) {

                    ownerField.val(licenseResponse['owner']);

                    if (licenseResponse['trial'] == true && licenseResponse['support_type'] == 141) {
                        licenseType.val("trial_support");
                        SupportAvailable();
                    } else if (licenseResponse['support_type'] == 143 && licenseResponse['trial'] == false) {
                        licenseType.val("support_subscription");
                        SupportAvailable();
                    } else if (licenseResponse['support_type'] == 141 && licenseResponse['trial'] == false) {
                        licenseType.val("retail_support");
                        SupportAvailable();
                    } else if (licenseResponse['support_type'] == 13 && licenseResponse['trial'] == false) {
                        licenseType.val("bundled_support");
                        SupportAvailable();
                    }

                } else {

                    if (licenseResponse['support_type'] == 2) {
                        SetTextForVerification(licenseResponse);
                    } else if (licenseResponse['support_type'] == 145) {
                        SetTextForVerification(licenseResponse);
                    } else if (licenseResponse['support_type'] == 142 && licenseResponse['trial'] == false && licenseResponse['buy_support_url'] != null) {
                        SupportNotAvailable();
                    } else if (licenseResponse['support_type'] == 142 && licenseResponse['trial'] == false) {

                        SetTextForVerification(licenseResponse);


                    } else {
                        SupportNotAvailable();
                    }


                }
            }
        }

  //  }

    function SetTextForVerification(licenseResponse) {

        if (licenseResponse['buy_support_url'] != null) {

            statusLbl.html("We identified that the Plesk license was purchased not directly from Plesk but through one of the Plesk Resellers. </br> In this case, you need to contact your license provider for support service. </br> Plesk Partners (Resellers) are fully trained by Plesk and deliver best-in-the-industry support for Plesk products running on their infrastructure." + "</br></br>" +
                "Alternatively you can use our free support resources such as <a href=\"https://support.plesk.com/hc/\">Knowledgebase</a>, <a href=\"https://docs.plesk.com\">Documentation</a>, <a href=\"https://talk.plesk.com\">Forum</a> and <a href=\"https://twitter.com/PleskHelps\">@PleskHelp</a> twitter or purchase monthly support subscription for your license key at our<a href=\"" + licenseResponse['buy_support_url'] + "\"> Plesk Online Store</a>").css({
                "color": "darkred"
            });

        } else {
            if (licenseResponse['support_type'] == 145) {
                statusLbl.html("We identified that you use free Plesk license. This type of license does not include support service. " + "</br>" +
                    "You are welcome to look for a solution on complementary Plesk support resources such as <a href=\"https://support.plesk.com/hc/\">Knowledgebase</a>, <a href=\"https://docs.plesk.com\">Documentation</a>, <a href=\"https://talk.plesk.com\">Forum</a> and <a href=\"https://twitter.com/PleskHelps\">@PleskHelp</a> twitter. </br>If you would like to get an assistance from Plesk Support Team, please purchase Plesk license.").css({
                    "color": "darkred"
                });

            } else if (licenseResponse['support_type'] == 2) {
                statusLbl.html("We identified that the Plesk license was purchased not directly from Plesk but through one of the Plesk Resellers. In this case, you need to contact your license provider for support service. Plesk Partners (Resellers) are fully trained by Plesk and deliver best-in-the-industry support for Plesk products running on their infrastructure." + "</br>" +
                    "You are welcome to look for a solution on complementary Plesk support resources such as <a href=\"https://support.plesk.com/hc/\">Knowledgebase</a>, <a href=\"https://docs.plesk.com\">Documentation</a>, <a href=\"https://talk.plesk.com\">Forum</a> and <a href=\"https://twitter.com/PleskHelps\">@PleskHelp</a> twitter. </br>").css({
                    "color": "darkred"
                });
app
            } else {

                statusLbl.html("We identified that the Plesk license was purchased not directly from Plesk but through one of the Plesk Resellers. </br> In this case, you need to contact your license provider for support service. </br> Plesk Partners (Resellers) are fully trained by Plesk and deliver best-in-the-industry support for Plesk products running on their infrastructure." + "</br></br>" +
                    "Alternatively you can use our free support resources such as <a href=\"https://support.plesk.com/hc/\">Knowledgebase</a>, <a href=\"https://docs.plesk.com\">Documentation</a>, <a href=\"https://talk.plesk.com\">Forum</a> and <a href=\"https://twitter.com/PleskHelps\">@PleskHelp</a> twitter.").css({
                    "color": "darkred"
                });
            }

        }
        statusLbl.css({
            "display": "inline"
        });
        statusLbl.removeClass("unverifiedKey");
    }

    function SupportNotAvailable() {


        statusLbl.html("<p>Cannot verify the key.</p>");
        statusLbl.css({
            "display": "inline"
        });
        statusLbl.removeClass("verifiedKey").addClass("unverifiedKey");
        inputLc.css({
            "border-color": 'red'
        });
        $("input[name='commit']").remove();

    }

    function SupportAvailable() {

        statusLbl.html("<p>Key verified.</p>");
        statusLbl.css({
            "display": "inline"
        });
        statusLbl.removeClass("unverifiedKey").addClass("verifiedKey");
        footer.appendChild(sbtBtn);
        inputLc.css({
            "border-color": 'green'
        });

    }
    //OS field
    $('.form-field.request_custom_fields_29949969').append('<a href="https://www.plesk.com/support/plesk-lifecycle/" target="_blank" class="cyclodevida">Plesk Lifecycle Policy</a>');
  
      // Agreeing with the server permission policy
    $('.request_custom_fields_29915925').ready(function () {
        var $PermissionPolicy = $('.form-field.request_custom_fields_29915925');
        var text = String($PermissionPolicy.html());
        if (text) {
            text = text.split('<p>');
            text[0] += '<p>';
            if (text[1]) {
                var next = text[1].split('Plesk Server Permission Policy');
                text[0] += next[0] + '<a href="https://cscontact.plesk.com/static/other/Plesk_Server_Permission_Policy.pdf" target="_blank">Plesk Server Permission Policy</a>' + next[1];
                $PermissionPolicy.html(text[0]);
            }
        };
    });
    //---------------------

});

jQuery(document).ready(function($){
  //if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
  var MQL = 1170;

  //primary navigation slide-in effect
  if($(window).width() > MQL) {
    var headerHeight = $('.cd-header').height();
    $(window).on('scroll',
    {
          previousTop: 0
      }, 
      function () {
        var currentTop = $(window).scrollTop();
        //check if user is scrolling up
        if (currentTop < this.previousTop ) {
          //if scrolling up...
          if (currentTop > 0 && $('.cd-header').hasClass('is-fixed')) {
            $('.cd-header').addClass('is-visible');
          } else {
            $('.cd-header').removeClass('is-visible is-fixed');
          }
        } else {
          //if scrolling down...
          $('.cd-header').removeClass('is-visible');
          if( currentTop > headerHeight && !$('.cd-header').hasClass('is-fixed')) $('.cd-header').addClass('is-fixed');
        }
        this.previousTop = currentTop;
    });
  }

      $("art_tags").ready(function () {
        $("div.taken_list").html($("div.applies_to").html());

        //$("li:contains('MG:')").css("display","none");  
        //$("li:contains('MT:')").css("display","none");

    });
  
  //open/close primary navigation
  $('.cd-primary-nav-trigger').on('click', function(){
    $('.cd-menu-icon').toggleClass('is-clicked'); 
    $('.cd-header').toggleClass('menu-is-open');
    
    //in firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
    if( $('.cd-primary-nav').hasClass('is-visible') ) {
      $('.cd-primary-nav').removeClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
        $('body').removeClass('overflow-hidden');
      });
    } else {
      $('.cd-primary-nav').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
        $('body').addClass('overflow-hidden');
      }); 
    }
  });

    $('.open-close').click(function (e) {

        toggleArticlePanel();

    });

    function toggleArticlePanel() {

        if ($('.open-close').attr("title") === "Close panel") {
            //  $('.article-data').animate({"margin-right": '-=200'});
            $('#article-block').animate({
                "margin-right": '-=19%'
            });
            $('.open-close').attr('src', 'https://p14.zdassets.com/hc/theme_assets/2003618/115000053593/arrow-open.png');
            $('.open-close').attr('title', 'Open panel');

        } else {
            $('#article-block').animate({
                "margin-right": '+=19%'
            });
            $('.open-close').attr('src', 'https://p14.zdassets.com/hc/theme_assets/2003618/115000053593/arrow-close.png');
            $('.open-close').attr('title', 'Close panel');
            //$('#pollSlider-button').animate({"margin-right": '+=200'});
        }

    }
  
  // Function of set year
  var x = new Date();
  var y = x.getFullYear();
  $('#year').html(y);

});