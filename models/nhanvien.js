function NhanVien(_tkNV, _hotenNV, _emailNV, _mkNV, _ngayLam, _luongCB, _chucVu, _gioLam) {
    this.tkNV = _tkNV;
    this.hotenNV = _hotenNV;
    this.emailNV = _emailNV;
    this.mkNV = _mkNV;
    this.ngayLam = _ngayLam;
    this.luongCB = _luongCB;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.xepLoai = "";

    this.tinhTongLuong = function () {
        switch (this.chucVu) {
            case "Sếp":
                this.tongLuong = this.luongCB * 3;
                break;
            case "Trưởng Phòng":
                this.tongLuong = this.luongCB * 2;
                break;
            default:
                this.tongLuong = this.luongCB;
                break;
        }
    }

    this.xepLoai = function () {
        if (this.gioLam < 160) {
            this.xepLoai = "Nhân viên trung bình";
        } else if (this.gioLam >= 160 && this.gioLam < 176) {
            this.xepLoai = "Nhân viên khá";
        } else if (this.gioLam >= 176 && this.gioLam < 192) {
            this.xepLoai = "Nhân viên giỏi";
        } else {
            this.xepLoai = "Nhân viên xuất sắc";
        }
    }
}