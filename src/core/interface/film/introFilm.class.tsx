export class IntroMovie {
    _id: number; // maPhim
    name: string; // tenPhim
    penName: string; // biDanh
    trailerLink: string; //trailer
    image: string; // hinhAnh
    description: string; // moTa
    dateRelease: string; // Ngay khoi chieu
    rate: number; // danhGia
    groupID: string; //maNhom
    //bonus
    index: number; // viTri
    types: string[]; // the loai
    timeTickets: string[]; // Gio khoi chieu

    constructor(
        maPhim: number,
        tenPhim: string,
        biDanh: string,
        trailer: string,
        hinhAnh: string,
        moTa: string,
        ngayKhoiChieu: string,
        danhGia: number,
        maNhom: string,
        //bonus
        index: number,
        // types: ["Fantasy", "Adventure", "Thriller"],
        // timeTickets: ["12:30", "13:30", "14:30", "15:30"],
        ) {

        this._id = maPhim;
        this.name = tenPhim;
        this.penName = biDanh;
        this.trailerLink = trailer;
        this.image = hinhAnh;
        this.description = moTa;
        this.dateRelease = ngayKhoiChieu;
        this.rate = danhGia;
        this.groupID = maNhom;
        //bonus
        this.index = index;
        this.types = ["Fantasy", "Adventure", "Thriller"];
        this.timeTickets = ["12:30", "13:30", "14:30", "15:30"];
    }
}
