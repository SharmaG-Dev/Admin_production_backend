const mongoose = require("mongoose")

const schema = mongoose.Schema({
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: String,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: String,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
})

const AdminSchema = mongoose.model("adminschema", schema)

module.exports = AdminSchema;

