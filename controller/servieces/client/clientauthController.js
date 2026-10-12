const clientProfileModel = require("../../../model/servieces/client/clientProfile.model")
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
const fs = require('fs');
const path = require('path');
let saltRounds = 10;

let createClient = async (req, res) => {
    try {
        let { email, password } = req.body

        if (!email || !password) {
            return res.send({
                status: false,
                message: "All fields are required"
            })
        }

        const normalizedEmail = email.trim().toLowerCase();

        let Isvalid = await clientProfileModel.findOne({
            email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') }
        })

        if (Isvalid) {
            return res.send({
                status: false,
                message: "Email already exists"
            })
        }

        const hashpassword = bcrypt.hashSync(String(password), saltRounds);

        let obj = {
            ...req.body,
            email: normalizedEmail,
            password: hashpassword
        }

        let newClient = await clientProfileModel.create(obj)

        return res.send({
            status: true,
            message: "Account created successfully",
            data: {
                _id: newClient._id,
                email: newClient.email
            }
        })

    } catch (err) {
        return res.send({
            status: false,
            message: err.message
        })
    }
}

let clientLogin = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (!email || !password) {
            return res.send({
                status: false,
                message: "Email and password are required"
            })
        }

        let Isvalid = await clientProfileModel.findOne({
            email
        })

        if (!Isvalid) {
            return res.send({
                status: false,
                message: "Email not found"
            })
        }

        let checkPassword = bcrypt.compareSync(password, Isvalid.password)

        if (!checkPassword) {
            return res.send({
                status: false,
                message: "Invalid password"
            })
        }

        const secretKey = process.env.JWT_SECRET;
        let token = jwt.sign(
            { id: Isvalid._id }, secretKey, { expiresIn: "10m" }
        )



        return res.send({
            status: true,
            message: "Client logged in successfully",
            token,

        })

    } catch (err) {
        return res.send({
            status: false,
            message: err.message
        })
    }
}

let getprofile = async (req, res) => {
    try {
        let id = req.params.id
        let profile;

        if (id) {
            profile = await clientProfileModel.findById(id).select("-password");
            if (!profile) {
                return res.send({
                    status: false,
                    message: "Client not found"
                });
            }
        } else {
            profile = await clientProfileModel.find().select("-password");
        }

        return res.send({
            status: true,
            data: profile
        });
    } catch (err) {
        return res.send({
            status: false,
            message: err.message
        });
    }
}

let editProfile = async (req, res) => {
    try {
        let id = req.params.id;
        let obj = req.body;

        //if new img uploaded 
        if (req.file) {
            obj.profileImg = req.file.filename;

            //old image find and delete
            let oldData = await clientProfileModel.findById(id);
            if (oldData && oldData.profileImg) {
                let oldImagePath = path.join(process.cwd(), "uploads", "profiles", oldData.profileImg);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
        }

        // Direct normal update
        let updatedClient = await clientProfileModel.findByIdAndUpdate(
            id,
            obj,
            { new: true }
        ).select("-password");

        if (!updatedClient) {
            return res.send({
                status: false,
                message: "Client not found"
            });
        }

        return res.send({
            status: true,
            message: "Profile updated successfully",
            data: updatedClient
        });

    } catch (error) {
        return res.send({
            status: false,
            message: error.message
        });
    }
};

let deleteProfile = async (req, res) => {
    try {
        let id = req.params.id;

        if (!id) {
            return res.send({
                status: false,
                message: "Client ID is required"
            });
        }

        let deletedClient = await clientProfileModel.findByIdAndDelete(id);

        if (!deletedClient) {
            return res.send({
                status: false,
                message: "Client not found"
            });
        }

        // Profile delete hone par folder se image bhi delete kar do
        if (deletedClient.profileImg) {
            let imagePath = path.join(process.cwd(), "uploads", "profiles", deletedClient.profileImg);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        return res.send({
            status: true,
            message: "Profile deleted successfully",
            
        });

    } catch (error) {
        return res.send({
            status: false,
            message: error.message
        });
    }
};

module.exports = { createClient, clientLogin, getprofile, editProfile, deleteProfile }