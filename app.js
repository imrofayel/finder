import "./components/product-dropdown.js";

let productCount = 0

const response = await fetch('/api/main.json')
const data = await response.json()

productCount = Object.values(data.content.products).length

document.getElementById('product-count').textContent = productCount

const tableBody = document.getElementById('table-body')
const products = Object.values(data.content.products)

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