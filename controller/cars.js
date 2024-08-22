const Cars = require('../model/carSchema');

// ---------searching------
const searchCar = async (req, res) => {
    const { query } = req.query;

    try {
        const cars = await Cars.find({
            $or: [{
                name:
                    { $regex: query, $options: 'i' }
            },
            {
                model:
                    { $regex: query, $options: 'i' }
            }]
        });
        res.json({
            seccess: true,
            message: "Searching successfull!",
            innerData: cars
        })
    } catch (error) {
        res.json({ seccess: true, message: error })
    }
}

// ---------Get Car----
const getCars = async (req, res) => {
    try {
        let allCars = await Cars.find();
        if (!allCars) {
            return res.json({
                seccess: false,
                message: "Cars is not found!",
                innerData: allCars
            })
        }
        res.json({
            seccess: true,
            message: "Cars is found!",
            innerData: allCars
        })
    } catch (error) {
        res.json({ seccess: true, message: error })
    }
}


// ------create car------------
const createCars = async (req, res) => {
    try {
        const addData = req.body;
        console.log(addData);
        const createData = new Cars(addData);
        console.log(createData);
        await createData.save();

    } catch (error) {
        res.json({ seccess: true, message: error })
    }
}

//------delete car-----
const deleteCars = async (req, res) => {
    try {
        // ID ni tekshiramiz
        if (!req.params._id) {
            return res.status(400).json({
                success: false,
                message: "Avtomobil ID si topilmadi!"
            });
        }

        // Ma'lumotni o'chirish urinishi
        let deleted = await Cars.findByIdAndDelete({ _id: req.params._id });

        // Agar ma'lumot o'chirilsa
        if (deleted) {
            return res.json({
                success: true,
                message: "Avtomobil topildi va o'chirildi!",
                innerData: deleted
            });
        }

        // Agar ma'lumot topilmagan bo'lsa
        res.json({
            success: false,
            message: "Avtomobil topilmadi!",
            innerData: deleted
        });
    } catch (error) {
        // Xatolik bo'lsa
        res.json({ success: false, message: error });
    }
};

//------update car-----
const updateCars = async (req, res) => {
    try {
        let { _id } = req.params;
        let body = req.body;
        let updated = await Cars.updateMany({ _id: _id }, body);
        if (!updated) {
            return res.json({
                seccess: false,
                message: "Cars is not updated!",
                innerData: updated
            })
        }
        res.json({
            seccess: true,
            message: "Cars is updated!",
            innerData: updated
        })

    } catch (error) {
        res.json({ seccess: true, message: error })
    }
}

module.exports = {
    updateCars,
    getCars,
    createCars,
    deleteCars,
    searchCar
}