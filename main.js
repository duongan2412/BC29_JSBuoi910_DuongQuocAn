var dsnv = new DanhSachNhanVien();

getLocalStorage();

function getEle(id) {
    return document.getElementById(id);
}

function layThongTinNV() {
    var _tkNV = getEle("tknv").value;
    var _hotenNV = getEle("name").value;
    var _emailNV = getEle("email").value;
    var _mkNV = getEle("password").value;
    var _ngayLam = getEle("datepicker").value;
    var _luongCB = getEle("luongCB").value;
    var _chucVu = getEle("chucvu").value;
    var _gioLam = getEle("gioLam").value;

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
    var nhanVien = layThongTinNV();
    dsnv.themNV(nhanVien)
    taoBang(dsnv.arr);
    setLocalStorage();
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
        getEle("password").value = nv._mkNV;
        getEle("datepicker").value = nv.ngayLam;
        getEle("luongCB").value = nv.luongCB;
        getEle("chucvu").value = nv.chucVu;
        getEle("gioLam").value = nv.gioLam;
    };
    getEle("tknv").disabled = true;
    getEle("btnThemNV").disabled = true;
}

getEle("btnCapNhat").onclick = function () {
    var nhanVien = layThongTinNV();
    dsnv.capNhat(nhanVien);
    taoBang(dsnv.arr);
    setLocalStorage();
}

