The explainer for this feature is here: https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Imperative-Shadow-DOM-Distribution-API.md  
The issue discussion is here: [3534](https://github.com/whatwg/html/issues/3534)  
There is a corresponding Pull Request for the HTML spec that goes along with this PR.  

-[ ] At least two implementers are interested (and none opposed):
  * I'm working to get this implemented in Chromium, tracking bug [here](http://crbug.com/869308).
  * The implementation is based on what was agreed in the last [F2F Meeting](https://github.com/whatwg/html/issues/3534#issuecomment-537802687). 
  * Other implementers are interested on this feature and I'll be reaching out to them.
  
-[x] [Tests](https://github.com/web-platform-tests/wpt) are written and can be reviewed and commented upon at:
  * In WPT: https://wpt.fyi/results/shadow-dom/slots-imperative-slot-api.tentative.html?label=master&label=experimental&aligned&q=slots-imperative-slot-api.tentative.html
  * More tests are being implemented, but the basics are there.

-[x] [Implementation bugs](https://github.com/whatwg/meta/blob/master/MAINTAINERS.md#handling-pull-requests) are filed:
  * Chrome: https://crbug.com/869308
  * Firefox: None yet
  * Safari: None yet
