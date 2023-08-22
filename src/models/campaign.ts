import mongoose from "mongoose";

interface CampaignAttrs {
  name: string;
  description: string;
  budget: number;
  targetAudience: string;
  startDate: Date;
  endDate: Date;
  status: string;
}

interface CampaignDoc extends mongoose.Document, CampaignAttrs {}

interface CampaignModel extends mongoose.Model<CampaignDoc> {
  build(attrs: CampaignAttrs): CampaignDoc;
}

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  budget: {
    type: Number,
    required: true,
  },
  targetAudience: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TargetAudience",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ["RUNNING", "PAUSED", "ENDED"],
  }
});

campaignSchema.statics.build = (attrs: CampaignAttrs) => {
  return new Campaign(attrs);
}

const Campaign = mongoose.model<CampaignDoc, CampaignModel>("Campaign", campaignSchema);

export { Campaign };
