<<<<<<< HEAD
  var link = document.createElement("link");
  var link2 = document.createElement("link");
=======
	<script type="text/javascript">
  const defines = 
  '{"##":"bash",":>>":"cmd","```":"bold","!!!":"warning","!!":"note",":::":"mono","++":"link",".":"bullet","-->":"indent",".0":"number"}'

  var link = document.createElement("link");
>>>>>>> 9924bf09d9538657cefede69a0ebb80a475a145f
  var iframe_content = "";
  var iframe_queue = [];
  var paragraph_storage = [];

	  function fill(command) {
      document.getElementById("plaintext").value = "";
      switch (command) {
		  case 1:
		    document.getElementById("plaintext").value = "```Question" + '\n' + '\n' + "```Answer" + '\n'+ '\n';
		    break;
		  case 2:
		    document.getElementById("plaintext").value = "```Symptoms" + '\n' + '\n' + "```Cause" + '\n' + '\n' + "```Resolution" + '\n' + '\n';
		    break;
		  default:
		    break;
		  }
    }

    function prepare_iframe() {
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("type", "text/css");
      link.setAttribute("href", "css/bootstrap.min.css");
<<<<<<< HEAD
      link2.setAttribute("rel", "stylesheet");
      link2.setAttribute("type", "text/css");
      link2.setAttribute("href", "css/iframe.css");
      iframe_content = document.createElement("iframe");
      iframe_content.id = "ifr_data";
      iframe_content.src = 'data:text/html;charset=utf-8,<head><link rel=\"stylesheet\" href=\"css/bootstrap.min.css\"> \
      <link rel=\"stylesheet\" href=\"css/iframe.css\"></head><div class=\'container-fluid\' style=\"padding-right: 2.4rem;\";>\
      <div style=\"width:100%;height:150%;border:20px solid #000;\">!';
      iframe_content.src += encodeURI("</div>");
      document.getElementById("ifr").appendChild(iframe_content);
      frames.document.head.appendChild(link);
      frames.document.head.appendChild(link2);
=======
      iframe_content = document.createElement("iframe");
      iframe_content.id = "ifr_data";
      iframe_content.src = 'data:text/html;charset=utf-8,<head><link rel=\"stylesheet\" href=\"css/bootstrap.min.css\"></head><div class=\'container-fluid\'>';
>>>>>>> 9924bf09d9538657cefede69a0ebb80a475a145f
    }

    function update() {
      if (iframe_content == 0) {
        prepare_iframe();
      }
      if (iframe_queue.length == 0)
        store_paragraphs();
      reparse("all");
    }

    function store_paragraphs() {
      paragraph_storage = document.getElementById("plaintext").value.split('\n');
    }

    function reparse(paragraphs_to_reparse) {
      if (paragraphs_to_reparse == "all"){
        for (var i = 0; i < paragraph_storage.length; i++){ 
          iframe_content.src += encodeURI("<h1>" + paragraph_storage[i] + "<h1>");
        }
        iframe_content.src += encodeURI("</div>");
<<<<<<< HEAD
        document.getElementById("ifr").appendChild(iframe_content);
=======
        document.getElementById("iframe_location").appendChild(iframe_content);
>>>>>>> 9924bf09d9538657cefede69a0ebb80a475a145f
        frames.document.head.appendChild(link);
      }
      else {

      }
    }
    
/*    function parse(paragraph) {
      if ()
    }*/
<<<<<<< HEAD

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
=======
	</script>
>>>>>>> 9924bf09d9538657cefede69a0ebb80a475a145f
