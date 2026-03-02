import { PredictionResponse, ProductInput } from '../model';

/** Full URL for the prediction API endpoint. */
const API_URL = 'https://circular-api-production.up.railway.app/predict/';

/** Timeout in milliseconds for the fetch request. */
const TIMEOUT_MS = 30_000;

/**
 * Sends an array of product inputs to the prediction endpoint
 * using the built‑in fetch API (no Node.js dependencies).
 *
 * @param products – validated product objects.
 * @returns The parsed prediction response.
 * @throws A human‑readable error message string on failure.
 */
export async function fetchPredictions(
  products: ProductInput[],
): Promise<PredictionResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(products),
      signal: controller.signal,
    });

    if (!response.ok) {
      let detail: string | undefined;
      try {
        const errorBody = (await response.json()) as { detail?: string };
        detail = errorBody.detail;
      } catch {
        // response body wasn't JSON – ignore
      }
      throw new Error(
        detail
          ? `Server error (${response.status}): ${detail}`
          : `Request failed with status ${response.status}.`,
      );
    }

    const data = (await response.json()) as PredictionResponse;
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
      throw error; // re-throw our own Error instances
    }
    throw new Error(
      'No response received from the server. Please check your network connection.',
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
