function veBang(data, idHienThi) {
    let container = document.getElementById(idHienThi);
    if (data.length === 0) {
        container.innerHTML = "Không có dữ liệu";
        return;
    }
    let cols = Object.keys(data[0]);

    let html = '<table border="1" cellpadding="5" cellspacing="0" style="width:100%"><thead><tr>';
    for (let col of cols) {
        html += `<th>${col.toUpperCase()}</th>`;
    }
    html += '</tr></thead><tbody>';

    for (let item of data) {
        html += '<tr>';
        for (let col of cols) {
            html += `<td>${item[col]}</td>`;
        }
        html += '</tr>';
    }
    html += '</tbody></table>';
    container.innerHTML = html;
}

function inKetQua(text, idHienThi) {
    document.getElementById(idHienThi).innerText = text;
}


// Câu 1
function Product(id, name, price, quantity, category, isAvailable) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isAvailable = isAvailable;
}

// Câu 2
const listSP = [
    new Product(1, "Laptop Dell", 20000000, 10, "Laptop", true),
    new Product(2, "Iphone 15", 35000000, 5, "Phone", true),
    new Product(3, "Chuột Gaming", 500000, 0, "Accessories", true), // Hết hàng
    new Product(4, "Bàn phím cơ", 1000000, 20, "Accessories", true),
    new Product(5, "Tai nghe Sony", 2500000, 15, "Accessories", false), // Ngừng bán
    new Product(6, "Samsung S24", 25000000, 2, "Phone", true)
];
veBang(listSP, 'result-q2');


// Câu 3
let listNamePrice = listSP.map(item => {
    return { name: item.name, price: item.price };
});
veBang(listNamePrice, 'result-q3');


// Câu 4
let spConHang = listSP.filter(item => item.quantity > 0);
veBang(spConHang, 'result-q4');


// Câu 5
let coSpDatTien = listSP.some(item => item.price > 30000000);
inKetQua(coSpDatTien ? "CÓ sản phẩm trên 30 triệu" : "KHÔNG CÓ", 'result-q5');


// Câu 6
let listAccessory = listSP.filter(item => item.category === "Accessories");
let checkAccessory = listAccessory.every(item => item.isAvailable === true);
inKetQua(checkAccessory ? "Tất cả đều đang bán" : "KHÔNG phải tất cả đều đang bán", 'result-q6');


// Câu 7
let tongKho = listSP.reduce((total, item) => {
    return total + (item.price * item.quantity);
}, 0);
inKetQua(tongKho + " VNĐ", 'result-q7');


// Câu 8
let ketQua8 = "";
for (let item of listSP) {
    let trangThai = item.isAvailable ? "Đang bán" : "Ngừng bán";
    ketQua8 += `${item.name} - ${item.category} - ${trangThai}\n`;
}
inKetQua(ketQua8, 'result-q8');


// Câu 9
let ketQua9 = "";
let spDauTien = listSP[0]; // Lấy sp đầu tiên làm mẫu
for (let key in spDauTien) {
    ketQua9 += `Thuộc tính: ${key} | Giá trị: ${spDauTien[key]}\n`;
}
inKetQua(ketQua9, 'result-q9');


// Câu 10
let dsTenSp = listSP
    .filter(item => item.isAvailable === true && item.quantity > 0)
    .map(item => `<li>${item.name}</li>`)
    .join(""); // Nối lại thành chuỗi

// Hiển thị câu 10
document.getElementById('result-q10').innerHTML = dsTenSp;