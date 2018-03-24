document.addEventListener("click", logEvent);

sessionCommands = [];
userActions = [];

function logEvent(event) {
  console.log("[USER ACTION] ");
  var actionTarget = event.target || event.srcElement || event.currentTarget;
  var actionTargetId = getXPath(actionTarget);
  console.log(actionTargetId);
  var currentUrl = window.location.href;
  console.log(currentUrl);
  userActions.push(
    {
      "type": "click",
      "currentUrl": currentUrl,
      "id": actionTargetId
    }
  );
  sessionCommands.push({"user_actions": userActions});

  sendPostRequest();
}


function sendPostRequest() {
  var http = new XMLHttpRequest();
  var url = "http://localhost:4201/main";
  var params = sessionCommands;
  http.open("POST", url, true);

  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function () {
    if (http.readyState === 4 && http.status === 200) {
      alert(http.responseText);
    }
  };
  http.send(params);
}




function getXPath(node) {
  var comp, comps = [];
  var xpath = '';
  var getPos = function(node) {
    var position = 1, curNode;
    if (node.nodeType === Node.ATTRIBUTE_NODE) {
      return null;
    }
    for (curNode = node.previousSibling; curNode; curNode = curNode.previousSibling) {
      if (curNode.nodeName === node.nodeName) {
        ++position;
      }
    }
    return position;
  };

  if (node instanceof Document) {
    return '/';
  }

  for (; node && !(node instanceof Document); node = node.nodeType === Node.ATTRIBUTE_NODE ? node.ownerElement : node.parentNode) {
    comp = comps[comps.length] = {};
    switch (node.nodeType) {
      case Node.TEXT_NODE:
        comp.name = 'text()';
        break;
      case Node.ATTRIBUTE_NODE:
        comp.name = '@' + node.nodeName;
        break;
      case Node.PROCESSING_INSTRUCTION_NODE:
        comp.name = 'processing-instruction()';
        break;
      case Node.COMMENT_NODE:
        comp.name = 'comment()';
        break;
      case Node.ELEMENT_NODE:
        comp.name = node.nodeName;
        break;
    }
    comp.position = getPos(node);
  }

  for (var i = comps.length - 1; i >= 0; i--) {
    comp = comps[i];
    xpath += '/' + comp.name;
    if (comp.position != null) {
      xpath += '[' + comp.position + ']';
    }
  }
  return xpath;
}
