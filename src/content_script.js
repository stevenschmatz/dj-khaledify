walk(window.document.body);

function walk(node)
{
	var child, next;

	switch ( node.nodeType )
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child )
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode)
{
    var h = textNode.parentNode.innerHTML;
    if (h.match(/<script>|<style>/) !== null) return;
    
    // wrap the key in a span, because emojis with font-weight >= 600 don't display on Chrome :'(
    h = h.replace(/\bkey\b(?!([^<]+)?>)/gi, "<span style='font-weight: 200;'>🔑</span>");
    h = h.replace(/\bkeys\b(?!([^<]+)?>)/gi, "<span style='font-weight: 200;'>🔑s</span>");
    
    textNode.parentNode.innerHTML = h;
}
