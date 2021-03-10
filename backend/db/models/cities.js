const mongoose = require("mongoose");
const { Schema } = mongoose;

const townSchema=new Schema(
    {
        name:String,
        cityId:Schema.Types.ObjectId,
        cityCode:Number,
        townCode:Number,
    }
)

const citySchema = new Schema(
    {
        code:Number,
        name:String
    }
  );

citySchema.statics.getCities = function() {
    return this.find({},"name code -_id").sort('code').lean();
};

townSchema.statics.getTown = function(townCode) {
    return this.findOne({townCode:townCode},"name townCode -_id").sort('townCode').lean();
};

townSchema.statics.getTowns = function(cityCode) {
    return this.find({cityCode:cityCode},"name townCode -_id").sort('townCode').lean();
};

townSchema.statics.getAllTowns = function() {
    return this.find({},"name cityCode townCode -_id").sort('townCode').lean();
};

const citiesModel = mongoose.model("sys_cities", citySchema);
const townsModel = mongoose.model("sys_towns", townSchema);
module.exports={
    citiesModel,
    townsModel
}