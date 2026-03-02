/**
 * Model Layer – Product Prediction App
 *
 * Defines all domain types used across the application.
 * No `any` types are used; every field is strongly typed.
 */

// ─── Enums / Literal Unions ────────────────────────────────────────────────

/** Allowed material categories for a product. */
export type Material = 'Glass' | 'Plastic' | 'Electronics' | 'Metal';

/** Market demand levels. */
export type MarketDemand = 'High' | 'Medium' | 'Low';

// ─── Request Models ────────────────────────────────────────────────────────

/** A single product object sent to the prediction API. */
export interface ProductInput {
  /** Material category of the product. */
  Material: Material;

  /** Age of the product in months (integer ≥ 0). */
  Age_months: number;

  /** Condition score from 1 to 10. */
  Condition_Score: number;

  /** Estimated repair cost (decimal ≥ 0). */
  Repair_Cost: number;

  /** Estimated recycle cost (decimal ≥ 0). */
  Recycle_Cost: number;

  /** Current market demand level. */
  Market_Demand: MarketDemand;
}

// ─── Response Models ───────────────────────────────────────────────────────

/** A single recommendation returned by the API. */
export interface Recommendation {
  /** 1‑based product index matching the request order. */
  Product: number;

  /** The recommended lifecycle action. */
  Recommended_Action: string;

  /** Name of the assigned processing centre. */
  Assigned_Center: string;

  /** Human‑readable estimated cost string (e.g. "$5"). */
  Estimated_Cost: string;

  /** Waste reduction gain percentage string (e.g. "+20%"). */
  Waste_Reduction_Gain: string;
}

/** Top‑level prediction API response envelope. */
export interface PredictionResponse {
  Recommendations: Recommendation[];
}

// ─── Form State Models ─────────────────────────────────────────────────────

/** Local form‑state for a single product form card.
 *  All values are stored as strings so they can be bound to TextInputs
 *  and converted to numbers only on submission.
 */
export interface ProductFormState {
  /** Unique local identifier (UUID or incrementing). */
  id: string;

  Material: Material;
  Age_months: string;
  Condition_Score: string;
  Repair_Cost: string;
  Recycle_Cost: string;
  Market_Demand: MarketDemand;
}

/** Validation errors keyed by field name. */
export interface ProductValidationErrors {
  Age_months?: string;
  Condition_Score?: string;
  Repair_Cost?: string;
  Recycle_Cost?: string;
}

// ─── Navigation ────────────────────────────────────────────────────────────

/** Typed parameter list for the app's navigation stack. */
export type RootStackParamList = {
  Prediction: undefined;
  Results: { recommendations: Recommendation[] };
};
