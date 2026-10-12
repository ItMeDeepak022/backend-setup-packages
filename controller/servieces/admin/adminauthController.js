
let createAdmin  = async (req, res) => {
    try {
        let obj = req.body;

        res.send({
            status: true,
            message: "Admin profile created successfully",
            data:obj
        })


    } catch (err) {
        return res.send({
            status: false,
            message:err.message

        })
    }
}


let adminLogin = async (req, res) => {
    try {
        let obj = req.body;

        res.send({
            status: true,
            message: "Admin loged in successfully",
            data:obj
        })


    } catch (err) {
        return res.send({
            status: false,
            message:err.message

        })
    }
}




module.exports={ createAdmin,adminLogin}