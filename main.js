var dsnv = new DanhSachNhanVien();
var valid = new Validation();
getLocalStorage();

function getEle(id) {
    return document.getElementById(id);
}

function layThongTinNV(isAdd) {
    var _tkNV = getEle("tknv").value;
    var _hotenNV = getEle("name").value;
    var _emailNV = getEle("email").value;
    var _mkNV = getEle("password").value;
    var _ngayLam = getEle("datepicker").value;
    var _luongCB = getEle("luongCB").value;
    var _chucVu = getEle("chucvu").value;
    var _gioLam = getEle("gioLam").value;

    // Validation
    var isValid = true;

    if (isAdd) {
        // tkNV
        isValid &= valid.kiemTraRong(_tkNV, "tbTKNV", "(*) Vui lòng nhập tài khoản nhân viên") &&
            valid.kiemTraDoDai(_tkNV, "tbTKNV", "(*) Độ dài từ 4 - 6 ký tự", 4, 6) &&
            valid.kiemTraTkNVTonTai(_tkNV, "tbTKNV", "(*) Tài khoản đã tồn tại", dsnv.arr)
    }

    // tenNV
    isValid &=
        valid.kiemTraRong(_hotenNV, "tbTen", "(*) Vui lòng nhập tên nhân viên") &&
        valid.kiemTraChuoiKiTu(_hotenNV, "tbTen", "(*) Vui lòng nhập chuỗi ký tự");

    // emailNV
    isValid &=
        valid.kiemTraRong(_emailNV, "tbEmail", "(*) Vui lòng nhập email nhân viên") &&
        valid.kiemTraEmail(_emailNV, "tbEmail", "(*) Vui lòng nhập đúng định dạng email");

    // mat khau 
    isValid &=
        valid.kiemTraRong(_mkNV, "tbMatKhau", "(*) Vui lòng nhập mật khẩu nhân viên") &&
        valid.kiemTraDoDai(_mkNV, "tbMatKhau", "(*) Độ dài từ 6 - 10 ký tự", 6, 10) &&
        valid.kiemTraMatKhau(_mkNV, "tbMatKhau", "(*) Mật khẩu phải có 1 ký tự số, 1 ký tự hoa, 1 ký tự đặc biệt");

    // ngay hop le
    isValid &=
        valid.kiemTraRong(_ngayLam, "tbNgay", "(*) Vui lòng nhập ngày làm") &&
        valid.kiemTraNgayHopLe(_ngayLam, "tbNgay", "(*) Vui lòng nhập đúng định dạng mm/dd/yyyy");

    // luong hop le
    isValid &=
        valid.kiemTraRong(_luongCB, "tbLuongCB", "(*) Vui lòng nhập lương") &&
        valid.kiemTraMinMax(_luongCB, "tbLuongCB", "(*) Vui lòng nhập lương từ 1 triệu đến 20 triệu", 1e6, 2e7);

    // chuc vu hop le
    isValid &= valid.kiemTraChucVu("chucvu", "tbChucVu", "(*) Vui lòng chọn chức vụ");

    // gio Lam hop le
    isValid &=
        valid.kiemTraRong(_gioLam, "tbGiolam", "(*) Vui lòng nhập giờ làm") &&
        valid.kiemTraMinMax(_gioLam, "tbGiolam", "(*) Vui lòng nhập giờ làm từ 80 đến 200 giờ ", 80, 200);

    //check isValid
    if (!isValid) return;

    //Tao doi tuong 
    var nhanVien = new NhanVien(
        _tkNV,
        _hotenNV,
        _emailNV,
        _mkNV,
        _ngayLam,
        _luongCB,
        _chucVu,
        _gioLam
    );

    //tinh luong & xep loai NV
    nhanVien.tinhTongLuong();
    nhanVien.xepLoai();

    return nhanVien;
}

// Them nhan vien
getEle("btnThemNV").onclick = function () {
    var nhanVien = layThongTinNV(true);
    if (nhanVien) {
        dsnv.themNV(nhanVien)
        taoBang(dsnv.arr);
        setLocalStorage();
        resetValue();
    }
};

function taoBang(data) {
    var content = "";
    data.forEach(function (item) {
        content += `
          <tr>
              <td>${item.tkNV}</td>
              <td>${item.hotenNV}</td>
              <td>${item.emailNV}</td>
              <td>${item.ngayLam}</td>
              <td>${item.chucVu}</td>
              <td>${item.tongLuong}</td>
              <td>${item.xepLoai}</td>
              <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNV('${item.tkNV}')">Sửa</button>
                    <button class="btn btn-danger" onclick="xoaNV('${item.tkNV}')">Xóa</button>
              </td>   
          </tr>
      `;
    });
    getEle("tableDanhSach").innerHTML = content;
    setLocalStorage();
}

function setLocalStorage() {
    //Convert from JSON to String
    var dataString = JSON.stringify(dsnv.arr);
    //luu xuong localStorage
    localStorage.setItem("DSNV", dataString);
}

function getLocalStorage() {
    if (localStorage.getItem("DSNV")) {
        var dataString = localStorage.getItem("DSNV");
        //Convert from String to JSON
        var dataJson = JSON.parse(dataString);
        dsnv.arr = dataJson;
        taoBang(dsnv.arr);
    }
}

function xoaNV(id) {
    dsnv.xoaNV(id);
    taoBang(dsnv.arr);
    setLocalStorage();
}

function suaNV(id) {
    var nv = dsnv.suaNV(id);
    if (nv) {
        getEle("tknv").value = nv.tkNV;
        getEle("name").value = nv.hotenNV;
        getEle("email").value = nv.emailNV;
        getEle("password").value = nv.mkNV;
        getEle("datepicker").value = nv.ngayLam;
        getEle("luongCB").value = nv.luongCB;
        getEle("chucvu").value = nv.chucVu;
        getEle("gioLam").value = nv.gioLam;
    };
    getEle("tknv").disabled = true;
    getEle("btnThemNV").disabled = true;
    getEle("btnCapNhat").disabled = false;
}

getEle("btnCapNhat").onclick = function () {
    var nhanVien = layThongTinNV(false);
    dsnv.capNhat(nhanVien);
    taoBang(dsnv.arr);
    setLocalStorage();
}

getEle("btnThem").onclick = function () {
    getEle("btnThemNV").disabled = false;
    getEle("btnCapNhat").disabled = true;
}

getEle("btnTimNV").onclick = function () {
    var keyword = getEle("searchName").value;
    var mangTimKiem = dsnv.timkiemNV(keyword);
    taoBang(mangTimKiem);
}

function resetValue() {
    getEle("tknv").value = "";
    getEle("name").value = "";
    getEle("email").value = "";
    getEle("password").value = "";
    getEle("datepicker").value = "";
    getEle("luongCB").value = "";
    getEle("chucvu").value = "";
    getEle("gioLam").value = "";
}