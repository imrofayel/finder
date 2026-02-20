class ProductDropdown extends HTMLElement {
  connectedCallback() {
    const label = this.getAttribute("label");
    const id = crypto.randomUUID();

    this.innerHTML = `
      <ot-dropdown>
        <div class="flex items-start gap-x-2">
          <button popovertarget="${id}" class="button-white w-full flex items-center justify-between" style="anchor-name: --btn-${id}">
            ${label}
            <svg width="24.5" height="24.5" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.7">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          <button class="simple" title="Select the capacity of the device. A Capacity class combines similar capacities, e.g., 256 GB, 240 GB, 200 GB"><svg xmlns="http://www.w3.org/2000/svg" width="32.5" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linejoin="round"><circle cx="12" cy="12" r="9" stroke-linecap="round" stroke-width="1.5"/><path stroke-width="2.25" d="M12 8h.01v.01H12z"/><path stroke-linecap="round" stroke-width="1.5" d="M12 12v4"/></g></svg></button>
        </div>

        <menu popover id="${id}" style="position-anchor: --btn-${id}; width: anchor-size(width)">
          <div class="card bg-gray-100 flex flex-col gap-3 text-[18px] dropdown-content" >
          </div>
        </menu>
      </ot-dropdown>
    `;

    this._content = this.querySelector(".dropdown-content");
  }

  populate(values, type = "checkbox", unit = "") {
    if (!this._content) return;

    if (type === "checkbox") {
      this._content.innerHTML = values.map(v => `
        <div class="flex gap-2 items-center">
          <input type="checkbox" value="${v}" />
          <span>${v}</span>
        </div>`).join("");

    } else if (type === "endurance") {
      this._content.innerHTML = values.map(v => `
        <div class="flex gap-2 items-center">
          <input type="checkbox" value="${v}" />
          <span>${"● ".repeat(+v)}</span>
        </div>`).join("");

    } else if (type === "range") {
      const nums = values.map(Number);
      const min = Math.min(...nums);
      const max = Math.max(...nums);
      this._content.innerHTML = `
        <div class="flex flex-col gap-3">
          <span>${min}–${max} ${unit}</span>
          <input type="range" min="${min}" max="${max}" value="${min}" />
          <span class="range-value">${min} ${unit}</span>
        </div>
        `;

    } else if (type === "text") {
      this._content.innerHTML = `
        <span>Your Swissbit Partner Number</span>
        <div class="flex gap-2 items-center">
          <input type="text" class="border border-gray-300 bg-white rounded px-2 py-1 w-full" />
        </div>`;
    }
  }
}

customElements.define("product-dropdown", ProductDropdown);
