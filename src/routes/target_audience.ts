import { Request, Response, Router } from 'express';
import { MongooseError } from 'mongoose';
import { TargetAudience } from '../models/target_audience';

const router = Router();

router.get('/target_audiences', async (req: Request, res: Response) => {
  const targetAudiences = await TargetAudience.find();

  return res.status(200).json({
    targetAudiences,
  });
});

router.post('/target_audiences', async (req: Request, res: Response) => {
  const { name, description, demographics } = req.body;

  try {
    const targetAudience = TargetAudience.build({
      name,
      description,
      demographics,
    });

    await targetAudience.save({ validateBeforeSave: true });

    res.status(201).send(targetAudience);
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

router.get('/target_audiences/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const targetAudience = await TargetAudience.findById(id);

    if (!targetAudience) {
      return res.status(404).json({
        error: 'TARGET_AUDIENCE_NOT_FOUND',
      });
    }

    return res.status(200).json(targetAudience);
  } catch (err) {
    const parsedError: MongooseError = err as MongooseError;

    if (parsedError.name === 'CastError') {
      return res.status(400).json({
        error: 'INVALID_TARGET_AUDIENCE_ID',
      });
    }

    return res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
    });
  }
});

router.put('/target_audiences/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, demographics } = req.body;

  try {
    const updatedTargetAudience = await TargetAudience.findByIdAndUpdate(
      id,
      {
        name,
        description,
        demographics,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedTargetAudience) {
      return res.status(404).json({
        error: 'TARGET_AUDIENCE_NOT_FOUND',
      });
    }

    return res.status(200).json(updatedTargetAudience);
  } catch (err) {
    const parsedError: MongooseError = err as MongooseError;

    if (parsedError.name === 'CastError') {
      return res.status(400).json({
        error: 'INVALID_TARGET_AUDIENCE_ID',
      });
    }

    return res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
    });
  }
});

router.delete('/target_audiences/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedTargetAudience = await TargetAudience.findByIdAndDelete(id);

    if (!deletedTargetAudience) {
      return res.status(404).json({
        error: 'TARGET_AUDIENCE_NOT_FOUND',
      });
    }

    return res.status(204).send();
  } catch (err) {
    const parsedError: MongooseError = err as MongooseError;

    if (parsedError.name === 'CastError') {
      return res.status(400).json({
        error: 'INVALID_TARGET_AUDIENCE_ID',
      });
    }

    return res.status(500).json({
      error: 'INTERNAL_SERVER_ERROR',
    });
  }
});

export default router;