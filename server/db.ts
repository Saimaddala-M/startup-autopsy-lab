
import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
    startupName: String,
    input: Object,
    result: Object,
    timestamp: { type: Date, default: Date.now }
});

const spySchema = new mongoose.Schema({
    companyName: String,
    result: Object,
    timestamp: { type: Date, default: Date.now }
});

export const Analysis = mongoose.models.Analysis || mongoose.model('Analysis', analysisSchema);
export const SpyReport = mongoose.models.SpyReport || mongoose.model('SpyReport', spySchema);

export const connectDB = async () => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.warn("MONGODB_URI not found. Running without persistence.");
        return;
    }

    try {
        await mongoose.connect(uri);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
};
