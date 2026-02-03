// 1. Khai báo Constructor (Cập nhật thêm isDeleted)
function Product(id, name, price, quantity, category, isAvailable) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isAvailable = isAvailable;
    this.isDeleted = false; // Mặc định khi tạo mới chưa bị xóa
}

// 2. Khởi tạo dữ liệu mẫu
let listSP = [
    new Product(1, "Laptop Dell", 20000000, 10, "Laptop", true),
    new Product(2, "Iphone 15", 35000000, 5, "Phone", true),
    new Product(3, "Chuột Gaming", 500000, 0, "Accessories", true),
    new Product(4, "Bàn phím cơ", 1000000, 20, "Accessories", true),
];

// --- CÁC HÀM XỬ LÝ CHÍNH ---

// Hàm Render: Hiển thị danh sách ra HTML
function render() {
    let html = `
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Tên SP</th>
                <th>Giá</th>
                <th>Danh mục</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
            </tr>
        </thead>
        <tbody>`;

    for (let item of listSP) {
        // Nếu isDeleted = true thì thêm class 'deleted-row' để gạch ngang
        let rowClass = item.isDeleted ? "deleted-row" : "";
        let statusText = item.isDeleted ? "Đã xóa" : (item.quantity > 0 ? "Còn hàng" : "Hết hàng");

        html += `
            <tr class="${rowClass}">
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.price.toLocaleString()} đ</td>
                <td>${item.category}</td>
                <td>${statusText}</td>
                <td>
                    ${!item.isDeleted ? `<button class="btn-delete" onclick="softDelete(${item.id})">Xóa</button>` : ""}
                </td>
            </tr>`;
    }

    html += `</tbody></table>`;
    document.getElementById("app").innerHTML = html;
}

// Hàm Thêm mới: ID tự tăng = Max ID + 1
function addProduct() {
    // Lấy dữ liệu từ ô input
    let name = document.getElementById("name").value;
    let price = Number(document.getElementById("price").value);
    let category = document.getElementById("category").value;

    if (!name || !price) {
        alert("Vui lòng nhập tên và giá!");
        return;
    }

    // --- LOGIC TỰ TĂNG ID ---
    // B1: Tìm ID lớn nhất hiện có trong mảng
    let maxId = 0;
    if (listSP.length > 0) {
        // Dùng reduce để tìm maxId
        maxId = listSP.reduce((max, item) => Math.max(max, item.id), 0);
    }
    // B2: ID mới = Max ID + 1
    let newId = maxId + 1;

    // Tạo đối tượng mới (mặc định quantity=10, isAvailable=true cho nhanh)
    let newProduct = new Product(newId, name, price, 10, category, true);

    // Thêm vào mảng
    listSP.push(newProduct);

    // Reset ô input và vẽ lại bảng
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    render();
}

// Hàm Xóa mềm: Chuyển isDeleted thành true
function softDelete(id) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
        // Tìm sản phẩm cần xóa trong mảng
        let product = listSP.find(item => item.id === id);

        if (product) {
            product.isDeleted = true; // Đánh dấu là đã xóa (Soft Delete)
            render(); // Vẽ lại giao diện
        }
    }
}

// Chạy hàm render lần đầu khi tải trang
render();