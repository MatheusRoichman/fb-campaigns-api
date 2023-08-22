import mongoose from "mongoose";

interface DemoGraphicsAttrs {
  ageRange: {
    min: number;
    max: number;
  };
  gender: string;
  location: {
    country: string;
    state: string;
    city: string;
  };
}

interface TargetAudienceAttrs {
  name: string;
  description: string;
  demographics: DemoGraphicsAttrs;
}

interface TargetAudienceDoc extends mongoose.Document, TargetAudienceAttrs {}

interface TargetAudienceModel extends mongoose.Model<TargetAudienceDoc> {
  build(attrs: TargetAudienceAttrs): TargetAudienceDoc;
}

const targetAudienceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  demographics: {
    ageRange: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      }
    },
    gender: {
      type: String,
      required: true,
      enum: ["M", "F", "ALL"],
    },
    location: {
      country: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      }
    }
  }
});

targetAudienceSchema.statics.build = (attrs: TargetAudienceAttrs) => {
  return new TargetAudience(attrs);
}

const TargetAudience = mongoose.model<TargetAudienceDoc, TargetAudienceModel>("TargetAudience", targetAudienceSchema);

export { TargetAudience };
