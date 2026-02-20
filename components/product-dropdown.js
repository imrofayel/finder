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
          <span>${`<svg xmlns="http://www.w3.org/2000/svg" class="inline mr-0.5" width="27" viewBox="0 0 24 24"><path fill="currentColor" d="M4 18q-1.25 0-2.125-.875T1 15V9q0-1.25.875-2.125T4 6h11.975q.5 0 .75.313t.25.687t-.25.688t-.75.312H4q-.425 0-.712.288T3 9v6q0 .425.288.713T4 16h10.625q.5 0 .75.313t.25.687t-.25.688t-.75.312zm-1-2V8zm15.375-3H16.05q-.325 0-.462-.275t.062-.525l4.2-5.275q.125-.15.313-.075t.137.275L19.625 11h2.325q.325 0 .463.275t-.063.525l-4.2 5.275q-.125.15-.312.075t-.138-.275z"/></svg>`.repeat(+v)}</span>
        </div>`).join("");

    } else if (type === "range") {
      const nums = values.map(Number);
      const min = Math.min(...nums);
      const max = Math.max(...nums);
      this._content.innerHTML = `
        <div class="range_container">
          <div class="sliders_control">
            <input type="range" class="from-slider" min="${min}" max="${max}" value="${min}" />
            <input type="range" class="to-slider" min="${min}" max="${max}" value="${max}" />
          </div>
          <div class="flex justify-between text-[18px] mt-1">
            <span class="from-value">${min} ${unit}</span>
            <span class="to-value">${max} ${unit}</span>
          </div>
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
