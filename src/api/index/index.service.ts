import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class IndexService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  getIntegrationJson() {
    const baseUrl = `${this.request.protocol}://${this.request.get('host')}`;

    return {
      data: {
        date: {
          created_at: '2025-02-18',
          updated_at: '2025-02-18',
        },
        descriptions: {
          app_name: 'EcomTrace APM',
          app_description:
            'Performance Monitoring (Speed), Real-time error tracing, Session replay, & Custom metrics (Most active store, active users)',
          app_logo: 'https://i.ibb.co/nqPvcDbk/Ecom-Trace.png',
          app_url: baseUrl,
          background_color: '#fff',
        },
        is_active: true,
        integration_type: 'output',
        integration_category: 'E-commerce & Retail',
        author: 'Onesi Ukanah',
        website: baseUrl,
        settings: [
          {
            label: 'forward-type',
            type: 'dropdown',
            options: ['error-tracing', 'speed-insights', 'session-replay'],
            default: 'error-tracing',
            required: true,
          },
        ],
        tick_target: `${baseUrl}/target_url`,
      },
    };
  }
}
