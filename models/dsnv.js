function DanhSachNhanVien() {
    this.arr = [];

    this.themNV = function (nv) {
        this.arr.push(nv);
    };

    this.timViTriNV = function (tkNV) {
        var index = -1;
        this.arr.forEach(function (item, i) {
            if (item.tkNV === tkNV) {
                index = i;
            }
        })
        return index;
    };

    this.xoaNV = function (tkNV) {
        var index = this.timViTriNV(tkNV);
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    };
    this.suaNV = function (tkNV) {
        var index = this.timViTriNV(tkNV);
        if (index !== -1) {
            return this.arr[index];
        }
        return null;
    };
    this.capNhat = function (sv) {
        var index = this.timViTriNV(sv.tkNV);
        if (index !== -1) {
            this.arr[index] = sv;
        }
    };
    this.timkiemNV = function (keyword) {
        var mangTimKiem = [];
        this.arr.forEach(function (item) {
            if (item.xepLoai.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
                mangTimKiem.push(item);
            }
        })
        return mangTimKiem;
    }
}

