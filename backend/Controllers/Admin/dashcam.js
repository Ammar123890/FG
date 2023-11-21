const dashcamModel = require('../../Models/Admin/stock');

//schema validation
const { stock } = require('../../Schemas/dashcam');

/** 
 * @description To add a dashcam
 * @route POST /api/dashcam/add
 * @access Admin
*/

module.exports.addDashcamModel = async (req, res) => {
    const { error } = stock(req.body);
    if (error) {
        return res.status(400).json({ errors: error });
    }

    try {
        const newDashcam = new dashcamModel(req.body);
        await newDashcam.save();
        return res.status(200).json({
            msg: "Dashcam added",
            status: true,
        });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
}

/**
 * @description To get all dashcams
 * @route GET /api/admin/dashcam/getModels
 * @access Admin
 */

module.exports.getDashcamModels = async (req, res) => {
    try {
        const dashcams = await dashcamModel.find();
        return res.status(200).json({
            dashcams,
            status: true,
        });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
}

/**
 * @description To edit a dashcam
 * @route PUT /api/dashcam/edit/:id
 * @access Admin
 */

module.exports.editDashcam = async (req, res) => {
    const { error } = stock(req.body);
    if (error) {
        return res.status(400).json({ errors: error });
    }

    try {
        const dashcam = await dashcamModel.findById(req.params.id);
        if (!dashcam) {
            return res.status(400).json({
                errors: { msg: "Dashcam not found", status: false },
            });
        }

        await dashcamModel.updateOne({ _id: req.params.id }, req.body);
        return res.status(200).json({
            msg: "Dashcam updated",
            status: true,
        });
    } catch (error) {
        return res.status(500).json({ errors: error });
    }

}

