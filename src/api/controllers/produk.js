const connection = require('../../config/db')

exports.get_all_produk = (req, res, next) => {

    let search = req.query.search || "";

    if (req.query.page == undefined || req.query.page == "") {
        return res.status(200).json({
            status: false,
            message: "URL tidak lengkap",
        })
    } else {
        let halaman = 6;
        let page = (req.query.page > 1) ? (req.query.page * halaman) - halaman : 0;
        let nextPage = (page) + halaman

        connection.query("SELECT * FROM `produk` WHERE nama LIKE '%" + search + "%' ORDER BY nama ASC LIMIT " + page + ", " + halaman + "; SELECT * FROM `produk` WHERE nama LIKE '%" + search + "%' ORDER BY nama ASC LIMIT " + nextPage + ", " + 1, function (error, rows, fields) {
            if (error) {
                res.status(500).json({ error: error })
            } else {
                // let limit = 6;
                // let rangeLimit = limit+
                // console.log(rows)
                // console.log(page, nextPage)
                const response = {
                    status: true,
                    message: "Data Produk Ditemukan",
                    total: rows[0].length,
                    isHaveNext: rows[1].length ? true : false,
                    data: rows[0].map(row => {
                        return {
                            id: row.id,
                            barcode: row.barcode,
                            nama: row.nama,
                            harga: row.harga,
                            img: row.img
                        }
                    })
                }
                if (rows.length > 0) {
                    res.status(200).json(response)
                } else {
                    res.status(200).json({
                        status: false,
                        message: "Data Produk Tidak Ditemukan",
                        data: []
                    })
                }
            }

        });
    }


};