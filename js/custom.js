var html;

function t_export(type) {
  let tex = document.getElementById("t-export");
  switch (type) {
    case 0:
      tex.value = $('#parced-data').html();
      break;
    case 1:
      tex.value = html;
      break;
    default:
      break;
  }
  document.querySelector("#t-export").select();
  document.execCommand('copy');
  document.getElementById("t-export").value = "Copied to clipboard!";
}

function doSearch(engine) {
  query = encodeURI(document.getElementById("searchText").value);
  switch (engine) {
    case 0:
      var search_tab = window.open("https://support.plesk.com/hc/en-us/search?utf8=%E2%9C%93&query=" + query, '_blank');
      break;
    case 1:
      var search_tab = window.open("https://support.plesk.com/hc/en-us/#iaf-nav:action=search&q=" + query + "&maxresults=100&regxpag=25", '_blank');
      break;
    case 2:
      var search_tab = window.open("https://jira.plesk.ru/browse/PMT-3292?jql=text%20~%20%22" + query + "%22", '_blank');
      break;
    default:
      break;
  }
  search_tab.focus();
}

function from_scratch() {
  $('#parced-data').empty();
  document.getElementById("t-import").value = "<p>Put HTML you want to convert here</p>";
  document.getElementById("t-export").value = "Select full if you don't want to allow for Integrator to ruin all jQuery triggers with redundant spaces.";
}

function parser() {
  var converter = new showdown.Converter();
  converter.setOption('simpleLineBreaks', true);
  converter.setOption('noHeaderId', true);
  converter.setOption('literalMidWordUnderscores', true);
  converter.setOption('literalMidWordAsterisks', true);
  converter.setFlavor('github');
  let text      = document.getElementById("textbox").value;
  html          = converter.makeHtml(text);
}

function apply_styles() {
  $('#parced-data').append(html);

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
  let tbox = document.getElementById("textbox");
  let pdata = document.getElementById("parced-data");
  if (tbox.value.substr(0, tbox.selectionStart).split("\n").length >= tbox.value.split("\n").length - 5)
    pdata.scrollTop = pdata.scrollHeight;
}

function mdparse() {
  from_scratch();
  apply_styles(parser());
}

function turndown() {
  document.getElementById("textbox").value = toMarkdown(document.getElementById("t-import").value.replace(/\<div(.|\n)*\/div\>\n/,'').replace(/ class=\"configtext\"\>/, '\>CONFIG_TEXT\: ').replace(/ class=\"pleskerr\"\>/, '\>PLESK_ERROR\: ').replace(/ class=\"pleskwarn\"\>/, '\>PLESK_WARN\: ').replace(/ class=\"pleskinfo\"\>/, '\>PLESK_INFO\: ').replace(/ class=\"bash\"\>#/, '\>\\#').replace(/ class=\"bash\"\>/, '\>MYSQL_LIN: ').replace(/ class=\"winshell\"\>/, '\>C:\\&gt; '));
  mdparse();
}

function template(type) {
  switch (type) {
    case 0:
      document.getElementById("textbox").value = "## Symptoms\n* Cannot open Plesk;\n* 8443 port is closed:\n\n \\# nmap -p 8443 127.0.0.1\nStarting Nmap 7.60 ( https://nmap.org ) at 2017-10-02 15:15 +07\nNmap scan report for localhost.localdomain (127.0.0.1)\nHost is up (0.000061s latency).\nPORT     STATE  SERVICE\n8443/tcp closed https-alt\nNmap done: 1 IP address (1 host up) scanned in 0.03 seconds\n \n* Never even heard of Plesk.\n\n **Note:** You are on Plesk KB by the way. \n\n## Cause\nPlesk is not installed on the server.\n\n**Warning:** Plesk should be installed on server \n\n## Resolution\n\nInstall Plesk:\n 1. Connect to the server via [SSH/RDP](https://support.plesk.com/hc/en-us/articles/115000172834);\n 2. Install Plesk:\n    * On Windows: \n \n     C:\> plesk-installer.exe --all-versions --console\n     \n     * On Linux:\n\n     \\# ./plesk-installer --all-versions\n";
      break;
    case 1:
      document.getElementById("textbox").value = "## Question\n\nHow to install GnuPG PHP extension for Plesk PHP from PECL?\n\n## Answer\n\nNote: Since GnuPG extension is not included in Plesk PHP packages, they could only be installed manually. [Create a thread on Plesk UserVoice](https://plesk.uservoice.com/) to vote for including GnuPG extension into Plesk PHP.\n\nManual extension installation:\n\n**Warning:** If `/tmp` is mounted with no-exec option, PECL will be unable to install modules. For more information refer to this article: [Error while using pecl install: shtool at /tmp does not exist or is not executable](https://support.plesk.com/hc/en-us/articles/115001406994) .\n\n1.  Connect to the server via [SSH](https://support.plesk.com/hc/en-us/articles/115000172834);\n2.  Install prerequisite build packages:\n    *   For rpm-based OS (CentOS, RHEL, CloudLinux):\n\n        \\# yum groupinstall \"Development Tools\"  \n        \\# yum install gpgme-devel\n\n    *   For deb-based OS (Debian, Ubuntu):\n\n        \\# apt-get install build-essential libgpgme11-dev\n\n3.  Install PHP development package:  \n    \n   **Note:** Following steps describe the installation of PHP developer package for PHP 7.1\. For PHP 7.0 the middle part would be `php70` , for PHP 5.6— `php56` .  \n\n    *   For rpm-based OS (CentOS, RHEL, CloudLinux):\n\n        \\# yum install plesk-php71-devel\n\n    *   For deb-based OS (Debian, Ubuntu):\n\n        \\# apt-get install plesk-php71-dev\n\n4.  Install the extension:\n\n    \\# /opt/plesk/php/7.1/bin/pecl install gnupg\n\n5.  Enable the extension:\n\n    \\# echo \"extension=gnupg.so\" > /opt/plesk/php/7.1/etc/php.d/gnupg.ini\n\n6.  Update PHP handlers information:\n\n    \\# plesk bin php_handler --reread";
      break;
    case 2:
      document.getElementById("textbox").value = "## Default header\n\nCONFIG_TEXT: Configs and logs\n\nPLESK_ERROR: Plesk errors\n\nPLESK_WARN: Plesk warnings\n\nPLESK_INFO: Plesk info\n\nMYSQL_LIN: mysql> SQL for Linux\n\nMYSQL_WIN: mysql> SQL for Windows\n\nC:\> cmd.exe/powershell.exe\n\n\\# Any .*sh\n\n**Note:** Some precautions\n\n**Warning:** Some very important precautions\n\nConnect via [SSH/RDP](https://support.plesk.com/hc/en-us/articles/115000172834);\n[Create a db backup](https://support.plesk.com/hc/en-us/articles/21390412);\n\n![A picture](assets/placeholder.png)\n\n* What about bugs and feature-requests in editor? How do I report them?\n    * You don't, my *shitcode **is ideal**!* Jk, there is [a Trello for this case](https://trello.com/b/tNPwXOd2/kcs-is-fun)";
      break;
    default:
      break;
    }
  mdparse();
}

function pushSnippet(el, snippet) {
  var start = el.selectionStart
  var end = el.selectionEnd
  var text = el.value
  var before = text.substring(0, start)
  var after  = text.substring(end, text.length)
  el.value = (before + snippet + after)
  el.selectionStart = el.selectionEnd = start + snippet.length
  el.focus()
}

function snippet(type) {
  tb = document.getElementById("textbox");
  switch (type) {
    case 0:
      pushSnippet(tb, "Connect to the server via [SSH/RDP](https://support.plesk.com/hc/en-us/articles/115000172834)");
      break;
    case 1:
      pushSnippet(tb, "[Text in link](http://example.com)");
      break;
    case 2:
      pushSnippet(tb, "This feature is not yet implemented in Plesk UI, but a feature request could be filled on the [Plesk UserVoice](https://plesk.uservoice.com/)");
      break;
    case 3:
      pushSnippet(tb, "![Alt text](assets/placeholder.png)");
      break;
    case 4:
      pushSnippet(tb, "203.0.113.2");
      break;
    case 5:
      pushSnippet(tb, "192.0.2.2");
      break;
    case 6:
      pushSnippet(tb, "[Enable Plesk debug logging](https://support.plesk.com/hc/en-us/articles/213408889)");
      break;
    case 7:
      pushSnippet(tb, "[Create a db backup](https://support.plesk.com/hc/en-us/articles/21390412)");
      break;
    default:
      break;
  }
  mdparse();
}