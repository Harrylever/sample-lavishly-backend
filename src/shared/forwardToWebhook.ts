import axios from 'axios';

type WEBHOOK_TYPE = 'ERROR_TRACING' | 'SPEED_MONITOR';

const WEBHOOK_TYPE_URL_MAP: Record<WEBHOOK_TYPE, { url: string }> = {
  ERROR_TRACING: {
    url: 'https://ping.telex.im/v1/webhooks/0195177f-03b0-7f74-a837-0d43a5ac5756',
  },
  SPEED_MONITOR: {
    url: 'https://ping.telex.im/v1/webhooks/019518cf-054b-7fbf-b3fa-09978453f939',
  },
};

export async function forwardToWebhook(
  type: WEBHOOK_TYPE,
  {
    username = 'admin',
    ...props
  }: {
    event_name: string;
    message: string;
    status: 'success' | 'error';
    username?: string;
  },
) {
  const details = {
    ...props,
    username,
  };

  try {
    const webhookUrl = WEBHOOK_TYPE_URL_MAP[type].url;

    await axios.post(webhookUrl, details, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log('Error forwarded successfully');
  } catch (error) {
    console.log(
      'Failed to forward error:',
      (error as { message?: string }).message,
    );
  }
}
