const sdk = window.LivechatVisitorSDK.init({
	license:9616665,
	group:0
});
let msgId = 0;
sessionCommands = [];
userActions = [];
counter = 0;
document.addEventListener("click", logEvent);

function resetCommands() {
    sessionCommands = [];
    userActions = [];
    counter = 0;
}

function logEvent(event) {
  var actionTarget = event.target || event.srcElement || event.currentTarget;
  var actionTargetId = getXPath(actionTarget);
  var currentUrl = window.location.href;
  userActions.push(
    {
      "type": "click",
      "currentUrl": encodeURIComponent(currentUrl),
      "id": actionTargetId
    }
  );
  sessionCommands.push({"user_actions": userActions});

  counter += 1;
  if (counter === 5){
    sendToLiveChat();
    resetCommands();
  }
}

//this method should actually send created url to liveChat support
function sendToLiveChat() {
  var url = "";
  url = JSON.stringify(sessionCommands);
  url = "http://localhost:4200/sessiontracer/main/" + encodeURIComponent(url);
  console.log(url);
  sdk
  .sendMessage({
    text: url,
    customId: msgId.toString(),
  })
  .catch(error => {
    console.log(error)
  });
  msgId += 1;
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
    xpath += '%2F' + comp.name;
    if (comp.position != null) {
      xpath += '[' + comp.position + ']';
    }
  }
  return xpath;
}
