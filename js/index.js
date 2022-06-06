// Định nghĩa lớp đối tượng nhân viên
function Staff(
  id,
  name,
  email,
  password,
  datepicker,
  luongCoBan,
  chucVu,
  gioLam
) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.datepicker = datepicker;
  this.luongCoBan = luongCoBan;
  this.chucVu = chucVu;
  this.gioLam = gioLam;
}
// Viết Phương thức tính lương
Staff.prototype.calcTongLuong = function () {
  if (this.chucVu === "Trưởng phòng") {
    return this.luongCoBan * 2;
  } else if (this.chucVu === "Sếp") {
    return this.luongCoBan * 3;
  } else if (this.chucVu === "Nhân viên") {
    return this.luongCoBan;
  }
};
// Viết phương thức xếp loại
Staff.prototype.xepLoai = function () {
  if (this.gioLam >= 192) {
    return "Nhân viên xuất sắc";
  } else if (this.gioLam >= 176) {
    return "Nhân viên giỏi";
  } else if (this.gioLam >= 160) {
    return "Nhân viên khá";
  } else {
    return "Nhân viên trung bình";
  }
};
// Tạo mảng
staffs = [];
khoiChay();
// Viết hầm lấy data từ localStorage
function khoiChay() {
  // Tạo biến để tải data từ localStorage và gán giá trị cho mảng
  staffs = JSON.parse(localStorage.getItem("staffs")) || [];
  //  Tạo vòng lặp for
  for (var i = 0; i < staffs.length; i++) {
    var staff = staffs[i];
    staffs[i] = new Staff(
      staff.id,
      staff.name,
      staff.email,
      staff.password,
      staff.datepicker,
      staff.luongCoBan,
      staff.chucVu,
      staff.gioLam
    );
  }
}
//Gọi hàm display để hiện thị
display(staffs);
// Viết hàm thêm Nhân Viên
function addStaff() {
  // B1 DOM tới các ô input để lấy giá trị
  var id = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datepicker = document.getElementById("datepicker").value;
  var luongCoBan = +document.getElementById("luongCB").value;
  var chucVu = document.getElementById("chucvu").value;
  var gioLam = +document.getElementById("gioLam").value;

  // Tạo validation
  var isVali = validation();

  if (!isVali) {
    return;
  }

  // Khởi tạo đối tượng từ lớp đối tượng
  var staff = new Staff(
    id,
    name,
    email,
    password,
    datepicker,
    luongCoBan,
    chucVu,
    gioLam
  );
  // Hiện thị
  staffs.push(staff);
  // Lưu biến staff xuống localStorage
  localStorage.setItem("staffs", JSON.stringify(staffs));
  // Gọi hàm display để truyền mảng staffs nhằm hiển thị lên table
  display(staffs);
  reset();
  resetSpan()
}
function display(staffs) {
  // DOM tới tbody của table
  var tbodyEl = document.getElementById("tableDanhSach");
  // Tạo biến chứa nội dung được thêm vào
  var bienNoiDung = "";
  // Duyện mảng staffs
  for (var index = 0; index < staffs.length; index++) {
    var staff = staffs[index];
    bienNoiDung += `
        <tr>
            <td>${staff.id}</td>
            <td>${staff.name}</td>
            <td>${staff.email}</td>
            <td>${staff.datepicker}</td>
            <td>${staff.chucVu}</td>
            <td>${staff.calcTongLuong()}</td>
            <td>${staff.xepLoai()}</td>
            <td>
            <button class="btn btn-success" onclick="reLoadStaff('${
              staff.id
            }')" data-target="#myModal" data-toggle="modal">Cập nhật</button>
            <button class="btn btn-danger" onclick="deleteStaff('${
              staff.id
            }')">Xoá</button>
            </td>
        </tr>`;
  }
  //
  tbodyEl.innerHTML = bienNoiDung;
}
// hàm tiềm kiếm chỉ mục ID
function findStaff(staffID) {
  var index = -1;
  // Duyệt mảng để tìm vị trí theo ID
  for (var i = 0; i < staffs.length; i++) {
    if (staffs[i].id === staffID) {
      index = i;
      break;
    }
  }
  return index;
}
// Hàm xóa nhân viên
function deleteStaff(staffID) {
  // Dựa vào giá trị của hàm tìm kiểm chí mục, ta có ID
  var index = findStaff(staffID);
  if (index !== -1) {
    // Xóa nhân viên ở vị trí đó
    staffs.splice(index, 1);
    // lưu thông tin
    localStorage.setItem("staffs", JSON.stringify(staffs));
    // Gọi hàm để hiện thị
    display(staffs);
  }
}
// Viết hàm tìm kiếm theo loại nhân viên
function searchStaff() {
  // Tạo biết và lấy giá trị từ input
  var search = document.getElementById("searchName").value;
  // Chuyển giá trị về chữ thường
  search = search.toLowerCase();
  // Tạo mảng mới
  var newStaffs = [];
  // Duyệt mảng để tìm phần tử cho vào mảng mới
  for (var index = 0; index < staffs.length; index++) {
    var staff = staffs[index];
    var staffLoaiNhanVien = staff.xepLoai().toLowerCase();
    if (staffLoaiNhanVien.indexOf(search) !== -1) {
      newStaffs.push(staff);
    }
  }
  display(newStaffs);
}
// Viết hàm reset lại form
function reset() {
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = "";
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").value = "";
  document.getElementById("gioLam").value = "";
}
// Viết hàm reset thông báo 
function resetSpan() {
  document.getElementById("tbTKNV").innerHTML = "";
  document.getElementById("tbTen").innerHTML = "";
  document.getElementById("tbEmail").innerHTML = "";
  document.getElementById("tbMatKhau").innerHTML = "";
  document.getElementById("tbNgay").innerHTML = "";
  document.getElementById("tbLuongCB").innerHTML = "";
  document.getElementById("tbChucVu").innerHTML = "";
  document.getElementById("tbGiolam").innerHTML = "";
}
// Viết hàm để hiện thị lại thông tin nhằm cập nhật nhân viên
function reLoadStaff(staffID) {
  var index = findStaff(staffID);
  //  cập nhật
  var staff = staffs[index];
  // Hiển thị
  document.getElementById("tknv").value = staff.id;
  document.getElementById("name").value = staff.name;
  document.getElementById("email").value = staff.email;
  document.getElementById("password").value = staff.password;
  document.getElementById("datepicker").value = staff.datepicker;
  document.getElementById("luongCB").value = staff.luongCoBan;
  document.getElementById("chucvu").value = staff.chucVu;
  document.getElementById("gioLam").value = staff.gioLam;
  // Disabled button thêm người dùng và ID

  document.getElementById("tknv").disabled = true;
  document.getElementById("btnThemNV").disabled = true;
}
// Viết hàm cập nhật sinh viên
function upLoadstaff(staffID) {
  // Như add staff, ta DOM để lấy giá trị từ Input
  var id = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datepicker = document.getElementById("datepicker").value;
  var luongCoBan = +document.getElementById("luongCB").value;
  var chucVu = document.getElementById("chucvu").value;
  var gioLam = +document.getElementById("gioLam").value;
  // tạo validation
  var isVali = validation();

  if (!isVali) {
    return;
  }
  // B2 Khởi tạo đối tượng từ lớp đối tượng
  var staff = new Staff(
    id,
    name,
    email,
    password,
    datepicker,
    luongCoBan,
    chucVu,
    gioLam
  );
  // B3 cập nhật cho hiện lại button thêm người dùng và id
  document.getElementById("tknv").disabled = false;
  document.getElementById("btnThemNV").disabled = false;
  var index = findStaff(staff.id);
  staffs[index] = staff;
  // lưu thông tin
  localStorage.setItem("staffs", JSON.stringify(staffs));
  // B4 Hiện thị và reset form
  display(staffs);
  reset();
  resetSpan();
}
// Hàm kiểm khi thêm và cập nhật nhân viên
function validation() {
  // Dom tới các input và lấy giá trị
  var id = document.getElementById("tknv").value;
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var datepicker = document.getElementById("datepicker").value;
  var luongCoBan = +document.getElementById("luongCB").value;
  var chucVu = document.getElementById("chucvu").value;
  var gioLam = +document.getElementById("gioLam").value;
  // Tạo biến cờ hiệu
  var isValid = true;
  // Kiểm tra Id
  var idPattern = new RegExp("^[0-9]{4,6}$");
  if (!isRequired(id)) {
    // console.log(isValid);
    isValid = false;
    document.getElementById("tbTKNV").style.display = "block";
    document.getElementById("tbTKNV").innerHTML =
      "Tài khoản nhân viên không được để trống";
  } else if (!idPattern.test(id)) {
    console.log(isValid);
    isValid = false;
    document.getElementById("tbTKNV").style.display = "block";
    document.getElementById("tbTKNV").innerHTML =
      "Tài khoản nhân viên không đúng định dạng";
  }
  // Kiểm tra tên
  var namePattern = new RegExp("^[a-zA-Z]+$");
  if (!isRequired(name)) {
    // console.log(isValid);
    isValid = false;
    document.getElementById("tbTen").style.display = "block";
    document.getElementById("tbTen").innerHTML =
      "Tên nhân viên không được để trống";
  } else if (!namePattern.test(name)) {
    console.log(isValid);
    isValid = false;
    document.getElementById("tbTen").style.display = "block";
    document.getElementById("tbTen").innerHTML =
      "Tên nhân viên không đúng định dạng";
  }
  // kiểm tra email
  var emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  if (!isRequired(email)) {
    isValid = false;
    document.getElementById("tbEmail").style.display = "block";
    document.getElementById("tbEmail").innerHTML =
      "Email nhân viên không được để trống";
  } else if (!emailPattern.test(email)) {
    isValid = false;
    document.getElementById("tbEmail").style.display = "block";
    document.getElementById("tbEmail").innerHTML =
      "Email nhân viên không đúng định dạng";
  }

  // Kiểm tra password
  var passwordPattern = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z0-9@$!%*?&]{6,10}$"
  );
  if (!isRequired(password)) {
    isValid = false;
    document.getElementById("tbMatKhau").style.display = "block";
    document.getElementById("tbMatKhau").innerHTML =
      "Mật khẩu nhân viên không được để trống";
  } else if (!passwordPattern.test(password)) {
    isValid = false;
    console.log(isValid);
    document.getElementById("tbMatKhau").style.display = "block";
    document.getElementById("tbMatKhau").innerHTML =
      "Mật khẩu nhân viên không đúng định dạng";
  }
  // Kiểm tra ngày
  var datePattern = new RegExp("^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$");
  if (!isRequired(datepicker)) {
    isValid = false;
    document.getElementById("tbNgay").style.display = "block";
    document.getElementById("tbNgay").innerHTML =
      "Ngày làm không được để trống";
  } else if (!datePattern.test(datepicker)) {
    isValid = false;
    console.log(isValid);
    document.getElementById("tbNgay").style.display = "block";
    document.getElementById("tbNgay").innerHTML =
      "Ngày làm không đúng định dạng";
  }
  // Kiểm tra Lương
  var luongPattern = new RegExp("^((1[0-9]{6,7})|([1-9][0-9]{6})|20000000)$");
  if (!isRequired(luongCoBan)) {
    isValid = false;
    document.getElementById("tbLuongCB").style.display = "block";
    document.getElementById("tbLuongCB").innerHTML =
      "Lương cơ bản không được để trống";
  } else if (!luongPattern.test(luongCoBan)) {
    isValid = false;
    console.log(isValid);
    document.getElementById("tbLuongCB").style.display = "block";
    document.getElementById("tbLuongCB").innerHTML =
      "Lương cơ bản không đúng định dạng";
  }
  // Kiểm tra chức vụ
  if (!isRequired(chucVu)) {
    isValid = false;
    document.getElementById("tbChucVu").style.display = "block";
    document.getElementById("tbChucVu").innerHTML =
      "Chức vụ không được để trống";
  } else if (chucVu === "Chọn chức vụ") {
    isValid = false;
    console.log(isValid);
    document.getElementById("tbChucVu").style.display = "block";
    document.getElementById("tbChucVu").innerHTML = "Vui lòng chọn chức vụ";
  } else if (chucVu === "Sếp" || "Trưởng phòng" || "Nhân viên") {
    isValid = true;
    return isValid;
  }
  // Kiểm tra giờ làm
  if (!isRequired(gioLam)) {
    isValid = false;
    document.getElementById("tbGiolam").style.display = "block";
    document.getElementById("tbGiolam").innerHTML =
      "Giờ làm không được để trống";
  } else if (gioLam < 80) {
    isValid = false;
    document.getElementById("tbGiolam").style.display = "block";
    document.getElementById("tbGiolam").innerHTML =
      "Số giờ làm thấp hơn số giờ làm quy định (80H) ";
  } else if (gioLam > 200) {
    isValid = false;
    document.getElementById("tbGiolam").style.display = "block";
    document.getElementById("tbGiolam").innerHTML =
      "Số giờ làm vướt quá số giờ làm quy định (200H) ";
  }
  return isValid;
}
// Hàm kiểm tra rổng hay không
function isRequired(value) {
  if (!value) {
    return false;
  }

  return true;
}
