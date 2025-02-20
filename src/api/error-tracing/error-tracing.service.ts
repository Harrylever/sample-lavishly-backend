import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ErrorTracingService {
  async traceErrorRepeater({
    message,
    settings,
  }: {
    message: string;
    settings: { label?: string; default?: string }[];
  }) {
    const slug = settings?.filter(
      (setting) => setting?.label === 'forward-type',
    )?.[0]?.default;

    const webhookUrl = `https://ecomtrace.site/${slug}`;

    try {
      const response = await axios.post(
        webhookUrl,
        {
          message,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      return response;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
