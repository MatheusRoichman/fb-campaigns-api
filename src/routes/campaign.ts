import { Router } from 'express';
import { MongooseError } from 'mongoose';
import { Campaign } from '../models/campaign';

const router = Router();

router.get('/campaigns', async (req, res) => {
  const campaigns = await Campaign.find().populate('targetAudience');

  return res.status(200).json({
    campaigns,
  });
});

router.post('/campaigns', async (req, res) => {
  const { name, description, budget, targetAudience, startDate, endDate, status = 'RUNNING' } = req.body;

  try {
    const campaign = Campaign.build({
      name,
      description,
      budget,
      targetAudience,
      startDate,
      endDate,
      status,
    });

    await campaign.save({ validateBeforeSave: true });

    res.status(201).send(campaign);
  } catch (err) {
    const parsedError: MongooseError = err as MongooseError;

    if (parsedError.name === 'ValidationError') {
      return res.status(400).json({
        error: parsedError.message,
      });
    }

    return res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
    });
  }
});

router.get('/campaigns/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const campaign = await Campaign.findById(id).populate('targetAudience');

    if (!campaign) {
      return res.status(404).json({
        error: 'CAMPAIGN_NOT_FOUND',
      });
    }

    return res.status(200).json(campaign);
  } catch (err) {
    const parsedError: MongooseError = err as MongooseError;

    if (parsedError.name === 'CastError') {
      return res.status(400).json({
        error: 'INVALID_CAMPAIGN_ID',
      });
    }

    return res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
    });
  }
});

router.put('/campaigns/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, budget, targetAudience, startDate, endDate, status } = req.body;

  try {
    const campaign = await Campaign.findByIdAndUpdate(
      id,
      {
        name,
        description,
        budget,
        targetAudience,
        startDate,
        endDate,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!campaign) {
      return res.status(404).json({
        error: 'CAMPAIGN_NOT_FOUND',
      });
    }

    return res.status(200).json(campaign);
  } catch (err) {
    const parsedError: MongooseError = err as MongooseError;

    if (parsedError.name === 'CastError') {
      return res.status(400).json({
        error: 'INVALID_CAMPAIGN_ID',
      });
    }

    return res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
    });
  }
});

router.delete('/campaigns/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const campaign = await Campaign.findByIdAndDelete(id);

    if (!campaign) {
      return res.status(404).json({
        error: 'CAMPAIGN_NOT_FOUND',
      });
    }

    return res.status(204).send();
  } catch (err) {
    const parsedError: MongooseError = err as MongooseError;

    if (parsedError.name === 'CastError') {
      return res.status(400).json({
        error: 'INVALID_CAMPAIGN_ID',
      });
    }
  }
});

export default router;
