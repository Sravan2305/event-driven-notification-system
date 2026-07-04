import axios from "axios";

export class WebhookClient {
  async deliver(webhookUrl: string, payload: unknown) {
    try {
      const response = await axios.post(webhookUrl, payload, {
        timeout: 5000,
      });

      return {
        success: true,
        statusCode: response.status,
        responseBody: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        statusCode: error.response?.status ?? 500,
        responseBody: error.response?.data ?? error.message,
      };
    }
  }
}