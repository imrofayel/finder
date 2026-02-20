import "./components/product-dropdown.js";

const response = await fetch('/api/main.json')
const data = await response.json()

const products = Object.values(data.content.products)

document.getElementById('product-count').textContent = products.length
const tableBody = document.getElementById('table-body')

renderTable(products)

function uniqueValues(field, products) {
    return [...new Set(
        products.map(p => p[field]).filter(v => v != null && v !== '')
    )].sort()
}

function numericValues(field, products) {
    return [...new Set(
        products.map(p => p[field]).filter(v => v != null && v !== '' && !isNaN(v))
    )]
}

setupDropdowns(products)

function renderTable(products) {
    tableBody.innerHTML = ''
    products.forEach(product => {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td class="flex items-center gap-1">
            <input type="checkbox" />
            <img src="${product.image || ''}" width="100px" />
        </td>
        <td>${product.swissbit_part_number || ''}</td>
        <td>
            ${product.product_series || ''}<br/>
            ${product.density || ''}
        </td>
        <td>${product.product_interface || ''}<br/>${product.form_factor || ''}</td>
        <td>${product.temp_grade || ''}<br/>${product.flash_type || ''}</td>
        <td>${product.for_new_design || ''}<br/>${product.endurance_rnd ? '●'.repeat(product.endurance_rnd) : ''}</td>
        <td>${product.seq_read_performance_mb_s || ''} MB/s<br/>${product.seq_write_performance_mb_s || ''} MB/s</td>
        <td>${product.rnd_read_performance_iops || ''} IOPS<br/>${product.rnd_write_performance || ''} IOPS</td>
        <td>${product.status_pf || ''}<br/>n/a</td>
    `
        tableBody.appendChild(row)
    })
}

function setupDropdowns(products) {
    document.querySelectorAll('product-dropdown').forEach(el => {
        const field = el.getAttribute('data-field')
        const type = el.getAttribute('data-type')
        const unit = el.getAttribute('data-unit') || ''

        if (!field || !type) return

        if (type === 'text') {
            el.populate([], 'text')
        } else if (type === 'range') {
            const vals = numericValues(field, products)
            if (vals.length) el.populate(vals, 'range', unit)
        } else if (type === 'endurance') {
            const vals = uniqueValues(field, products)
            el.populate(vals, 'endurance')
        } else {
            const vals = uniqueValues(field, products)
            el.populate(vals, 'checkbox')
        }
    })
}

function applyFilters() {
    const textInput = document.querySelector('.dropdown-content input[type="text"]')
    const checked = Array.from(document.querySelectorAll('.dropdown-content input[type="checkbox"]:checked')).map(input => input.value)

    const rangeFilters = Array.from(document.querySelectorAll('product-dropdown[data-type="range"] input[type="range"]')).map(input => ({
        field: input.closest('product-dropdown').getAttribute('data-field'),
        value: parseFloat(input.value),
    }))

    const filteredProducts = products.filter(product => {
        for (const rf of rangeFilters) {
            const productVal = parseFloat(product[rf.field])
            if (isNaN(productVal) || productVal < rf.value) return false
        }

        if (textInput.value !== '' && !product.swissbit_part_number.includes(textInput.value)) {
            return false
        }

        return checked.every(value => {
            return Object.values(product).includes(value)
        })
    })

    document.getElementById('product-count').textContent = filteredProducts.length
    renderTable(filteredProducts)
}

document.querySelectorAll('.dropdown-content input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', () => applyFilters())
})

document.querySelectorAll('.dropdown-content input[type="text"]').forEach(input => {
    input.addEventListener('input', () => applyFilters())
})

document.querySelectorAll('.dropdown-content input[type="range"]').forEach(input => {
    input.addEventListener('input', () => {
        const display = input.closest('.dropdown-content').querySelector('.range-value')
        const unit = input.closest('product-dropdown').getAttribute('data-unit') || ''
        if (display) display.textContent = `${input.value} ${unit}`
        applyFilters()
    })
})