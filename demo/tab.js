class CustomTab extends HTMLElement {
    static get observedAttributes() {
      return ['show-tab'];
    }

    constructor() {
        super();
        
        const shadowRoot = this.attachShadow({mode: 'open', slotAssignment: 'manual'});
        shadowRoot.innerHTML = `
            <div class="custom-tab">
                <div id="tab-header"><slot id="header"></slot>
                <slot id="panel"></slot>
            </div>`;
    }

    set showTab(value) {
        UpdateTabHeader(this, value);
        UpdateDisplayTab(this, value);
        this.setAttribute('show-tab', value);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        UpdateDisplayTab(this, newValue);
    }

    connectedCallback() {
        if (!this._observed) {
           const target = this;
           const showTab = this.getAttribute('show-tab');
           
           this.addEventListener('click', this._onClick);

           const observer = new MutationObserver(function(mutations) {
                UpdateTabHeader(target, showTab);
                UpdateDisplayTab(target, showTab);
            });
            observer.observe(this, {childList: true});
            this._observed = true;
        }
    }

    disconnectedCallback() {
      this.removeEventListener('click', this._onClick);
    }


    _onClick(event) {
        if (event.target instanceof TabHeader)
           this.showTab = event.target.id;
    }
}

function UpdateTabHeader(elem, tabIdx) {
   const headers = elem.querySelectorAll('tab-header');
   
   headers.forEach((tab, idx) => {
      if (idx+1 == tabIdx) {
        headers[idx].selected = true;
      }
      else {
        headers[idx].selected = false;
      }
   });
   elem.shadowRoot.getElementById("header").assign(headers);
}

function  UpdateDisplayTab(elem, tabIdx) {
    const shadow = elem.shadowRoot;
    const slot = shadow.getElementById("panel");
    const panels = elem.querySelectorAll('tab-panel');
    if (panels.length && tabIdx && tabIdx <= panels.length ) {
      slot.assign([panels[tabIdx-1]]);
    } else {
      slot.assign([]);
    }
}


class TabPanel extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <style>:host { margin-top: 6px; padding: 100px 0px 0px 100px; border: 1px solid #111111; display: block; height: 20em; width: 30em;}</style>
            <slot></slot>
        `;
    }
}

class TabHeader extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `<slot></slot>`;
    }

    set selected(value) {
      if (value)
        this.setAttribute('selected', '');
      else
        this.removeAttribute('selected');
    }
}

customElements.define('custom-tab', CustomTab);
customElements.define('tab-panel', TabPanel);
customElements.define('tab-header', TabHeader);

