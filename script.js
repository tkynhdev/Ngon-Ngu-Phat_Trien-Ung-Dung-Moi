// Câu 1: Khai báo constructor
function Product(id, name, price, quantity, category, isAvailable) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isAvailable = isAvailable;
}

// Câu 2: Khởi tạo mảng ít nhất 6 sp
const listSP = [
    new Product(1, "Laptop Dell", 20000000, 10, "Laptop", true),
    new Product(2, "Iphone 15", 35000000, 5, "Phone", true),
    new Product(3, "Chuột Gaming", 500000, 0, "Accessories", true), // hết hàng
    new Product(4, "Bàn phím cơ", 1000000, 20, "Accessories", true),
    new Product(5, "Tai nghe", 200000, 15, "Accessories", false), // ngừng bán
    new Product(6, "Samsung S24", 25000000, 2, "Phone", true)
];
console.log("Câu 2:", listSP);

//Câu 3: Mảng mới chỉ lấy name và price
let listNamePrice = listSP.map(item => {
    return { name: item.name, price: item.price };
});
console.log("Câu 3:", listNamePrice);

// Câu 4:Lọc sp còn hàng
let spConHang = listSP.filter(item => item.quantity > 0);
console.log("Câu 4:", spConHang);

// Câu 5:Kiểm tra có sp giá > 30tr không
let checkGia = listSP.some(item => item.price > 30000000);
console.log("Câu 5:", checkGia);

// Câu 6:Kiểm tra tất cả Accessories có đang bán không
let listAccessory = listSP.filter(item => item.category === "Accessories");
let checkAccessory = listAccessory.every(item => item.isAvailable === true);
console.log("Câu 6:", checkAccessory);

// Câu 7:
let tongKho = listSP.reduce((total, item) => {
    return total + (item.price * item.quantity);
}, 0);
console.log("Câu 7:", tongKho);

//Câu 8:
console.log("--- Câu 8 ---");
for (let item of listSP) {
    console.log(item.name + " - " + item.category + " - " + item.isAvailable);
}

// Câu 9:
console.log("--- Câu 9 ---");
let spDauTien = listSP[0];
for (let key in spDauTien) {
    console.log(key + ": " + spDauTien[key]);
}

//Câu 10: Tên sp đang bán và còn hàng
let resultCau10 = listSP
    .filter(item => item.isAvailable && item.quantity > 0)
    .map(item => item.name);

console.log("Câu 10:", resultCau10);