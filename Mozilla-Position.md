# Title: Imperative Shadow DOM Distribution API 

## Request for Mozilla Position on an Emerging Web Specification
* Specific Title: Imperative Shadow DOM Distribution API.
* Specification or proposal URL:
  * [Explainer](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Imperative-Shadow-DOM-Distribution-API.md)
  * Spec PRs for [HTML](https://github.com/whatwg/html/pull/5483) and [DOM](https://github.com/whatwg/dom/pull/860)
  * [WhatWG DOM issue discussion](https://github.com/whatwg/html/issues/3534).  [TPAC F2F Summary](https://github.com/whatwg/html/issues/3534#issuecomment-537802687).
  * [TAG Review](https://github.com/w3ctag/design-reviews/issues/486).
  
### Other Information

The imperative Shadow DOM distribution API allows developers to explicitly set the assigned nodes for a slot element. With this API, web developers can create web components without needing to add specific markup, slot="" attribute, to children of host component. In addition, it enables conditional slotting based on either environmental state or an attribute passed in. 

More details, including more motivating uses cases, can be found in the [explainer](https://github.com/w3c/webcomponents/blob/gh-pages/proposals/Imperative-Shadow-DOM-Distribution-API.md).

The behavior of this API has been discussed in the last (TPAC F2F)[https://github.com/whatwg/html/issues/3534#issuecomment-537802687] back in Sept, 2019. The proposal has been implemented in Chrome and we would like to get an official stance from Mozzila.  

Example syntax:

```html
<custom-tab show-tab="2">
   <tab-panel></tab-panel>
   <tab-panel></tab-panel>
   <tab-panel></tab-panel>
</custom-tab>
 ```

```js
class CustomTab extends HTMLElement {
    static get observedAttributes() {
      return ['show-tab'];
    }
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open', slotAssignment: 'manual'});
        shadowRoot.innerHTML = `
            <div class="custom-tab">
                <slot></slot>
            </div>`;
    }
    attributeChangedCallback(name, oldValue, newValue) {
        UpdateDisplayTab(this, newValue);
    }
    connectedCallback() {
        if (!this._observed) {
           const target = this;
           const showTab = this.getAttribute('show-tab');
           const observer = new MutationObserver(function(mutations) {
                UpdateDisplayTab(target, showTab);
            });
            observer.observe(this, {childList: true});
            this._observed = true;
        }
    }
}

function  UpdateDisplayTab(elem, tabIdx) {
    const shadow = elem.shadowRoot;
    const slot = shadow.querySelector("slot");
    const panels = elem.querySelectorAll('tab-panel');
    if (panels.length && tabIdx && tabIdx <= panels.length ) {
      slot.assign([panels[tabIdx-1]]);
    } else {
      slot.assign([]);
    }
}
```
