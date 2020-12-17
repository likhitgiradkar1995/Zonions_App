

module.exports = {
    async create(req, res) {
        try {
            let param = req.allParams();
            console.log(param);
            if (!param.name)
                return res.badRequest({ err: "name is required field!" });
            else if (!param.address)
                return res.badRequest({ err: "address is required field!" });
            else if (!param.phone)
                return res.badRequest({ err: "phone is required fields!" });

            const results = await Restaurant.create({
                name: param.name,
                address: param.address,
                phone: param.phone,
                openTime: param.openTime,
                closeTime: param.closeTime,
                menuImage: param.menuImage,
                isActive: param.isActive
            });
            return res.ok(results);
        }
        catch (err) {
            return res.serverError(err);
        }
    },

    async find(req, res) {
        try {
            const restaurant = await Restaurant.find();
            return res.ok(restaurant);
        }
        catch (err) {
            return res.serverError(err);
        }
    },

    async findOne(req, res) {
        try {
            const restaurant = await Restaurant.findOne({
                id: req.params.id
            });
            return res.ok(restaurant);
        }
        catch (err) {
            return res.serverError(err);
        }
    },

    async update(req, res) {
        try {
            let param = req.allParams();
            console.log(param);
            let attribute = {};
            if (param.name)
                attribute.name = param.name;
            if (param.address)
                attribute.address = param.address;
            if (param.phone)
                attribute.phone = param.phone;
            if (param.openTime)
                attribute.openTime = param.openTime;
            if (param.closeTime)
                attribute.closeTime = param.closeTime;
            if (param.lastUpdateTime)
                attribute.lastUpdateTime = param.lastUpdateTime;
            if (param.menuImage)
                attribute.menuImage = param.menuImage;
            if (param.isActive)
                attribute.isActive = param.isActive;
                else
                attribute.isActive = param.isActive;

            const result = await Restaurant.update({
                id: req.params.id
            }, attribute);
            return res.ok(result)
        }
        catch (err) {
            res.serverError(err);
        }
    },

    async delete(req, res) {
        try {
            const results = await Restaurant.destroy({ id: req.params.id })
            res.ok(results);
        }
        catch (err) {
            res.serverError(err)
        }
    }
}