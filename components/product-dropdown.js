class ProductDropdown extends HTMLElement {
  connectedCallback() {
    const label = this.getAttribute("label");
    const id = crypto.randomUUID();

    const content = this.innerHTML;

    this.innerHTML = `
      <ot-dropdown>
        <div class="flex items-start gap-x-2">
          <button popovertarget="${id}" class="button-white w-full flex items-center justify-between">
            ${label}
            <svg width="24.5" height="24.5" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.7">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <button class="simple" title="Select the capacity of the device. A Capacity class combines similar capacities, e.g., 256 GB, 240 GB, 200 GB"><svg xmlns="http://www.w3.org/2000/svg" width="32.5" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linejoin="round"><circle cx="12" cy="12" r="9" stroke-linecap="round" stroke-width="1.5"/><path stroke-width="2.25" d="M12 8h.01v.01H12z"/><path stroke-linecap="round" stroke-width="1.5" d="M12 12v4"/></g></svg></button>
        
        </div>

        <menu popover id="${id}">
          ${content}
        </menu>
      </ot-dropdown>
    `;
  }
}

customElements.define("product-dropdown", ProductDropdown);
