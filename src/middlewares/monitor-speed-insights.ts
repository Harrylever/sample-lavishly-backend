import { NextFunction, Request, Response } from 'express';
import { forwardToWebhook } from 'src/shared/forwardToWebhook';

export function monitorSpeedInsightsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, originalUrl } = req;
    const { statusCode } = res;

    const responseMessage = `[${method}] ${originalUrl} - Status: ${statusCode} - Duration: ${duration}ms; ${duration / 1000}s`;

    forwardToWebhook('SPEED_MONITOR', {
      event_name: 'Speed Monitoring',
      message: responseMessage,
      status: 'success',
    }).catch((error) => {
      console.log('Failed to forward data to webhook:', error);
    });
  });

  next();
}
