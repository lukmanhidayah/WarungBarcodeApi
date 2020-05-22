const connection = require('../../config/db')

exports.get_all_produk = (req, res, next) => {
    connection.query('SELECT * FROM produk', function (error, rows, fields) {
        if (error) {
            res.status(500).json({ error: error })
        } else {

            const response = {
                status: true,
                message: "Data Produk Ditemukan",
                total: rows.length,
                data: rows.map(row => {
                    return {
                        id: row.id,
                        barcode: row.barcode,
                        nama: row.nama,
                        harga: row.harga
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
};