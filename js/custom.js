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
  let text      = document.getElementById("textbox").value;
  var html      = converter.makeHtml(text);
  return html;
}

function apply_styles(html_to_push) {
  $('#parced-data').append(html_to_push);
}

function mdparse() {
  from_scratch();
  apply_styles(parser());
}
