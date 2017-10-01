var html;

function t_export(type) {
  switch (type) {
    case 0:
      document.getElementById("t-export").value = html;
      break;
    case 1:
      document.getElementById("t-export").value = $('#parced-data').html();
      break;
    default:
      break;
  }
}

function doSearch(engine) {
  query = document.getElementById("searchText").value;
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
}

function parser() {
  var converter = new showdown.Converter();
  converter.setOption('simpleLineBreaks', true);
  converter.setOption('noHeaderId', true);
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
}

function mdparse() {
  from_scratch();
  apply_styles(parser());
}

function turndown() {
  document.getElementById("textbox").value = toMarkdown(document.getElementById("t-import").value);
  mdparse();
}