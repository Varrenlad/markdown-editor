	<script type="text/javascript">
  const defines = 
  '{"##":"bash",":>>":"cmd","```":"bold","!!!":"warning","!!":"note",":::":"mono","++":"link",".":"bullet","-->":"indent",".0":"number"}'

  var link = document.createElement("link");
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
      iframe_content = document.createElement("iframe");
      iframe_content.id = "ifr_data";
      iframe_content.src = 'data:text/html;charset=utf-8,<head><link rel=\"stylesheet\" href=\"css/bootstrap.min.css\"></head><div class=\'container-fluid\'>';
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
        document.getElementById("iframe_location").appendChild(iframe_content);
        frames.document.head.appendChild(link);
      }
      else {

      }
    }
    
/*    function parse(paragraph) {
      if ()
    }*/
	</script>