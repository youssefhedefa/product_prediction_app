import { useState, useCallback } from 'react';
import {
  Material,
  MarketDemand,
  ProductFormState,
  ProductInput,
  ProductValidationErrors,
  Recommendation,
} from '../model';
import { fetchPredictions } from '../services';

// ─── Helpers ───────────────────────────────────────────────────────────────

let nextId = 1;

/** Create a blank product form state with sensible defaults. */
function createEmptyProduct(): ProductFormState {
  return {
    id: String(nextId++),
    Material: 'Glass',
    Age_months: '',
    Condition_Score: '',
    Repair_Cost: '',
    Recycle_Cost: '',
    Market_Demand: 'High',
  };
}

/** Validate a single product form and return field‑level errors.
 *  Returns `null` when valid.
 */
function validateProduct(form: ProductFormState): ProductValidationErrors | null {
  const errors: ProductValidationErrors = {};

  // Age_months – required positive integer
  const age = Number(form.Age_months);
  if (form.Age_months.trim() === '' || isNaN(age) || age < 0 || !Number.isInteger(age)) {
    errors.Age_months = 'Enter a valid non‑negative integer.';
  }

  // Condition_Score – 1..10
  const score = Number(form.Condition_Score);
  if (
    form.Condition_Score.trim() === '' ||
    isNaN(score) ||
    score < 1 ||
    score > 10 ||
    !Number.isInteger(score)
  ) {
    errors.Condition_Score = 'Enter an integer between 1 and 10.';
  }

  // Repair_Cost – non‑negative decimal
  const repair = Number(form.Repair_Cost);
  if (form.Repair_Cost.trim() === '' || isNaN(repair) || repair < 0) {
    errors.Repair_Cost = 'Enter a valid non‑negative number.';
  }

  // Recycle_Cost – non‑negative decimal
  const recycle = Number(form.Recycle_Cost);
  if (form.Recycle_Cost.trim() === '' || isNaN(recycle) || recycle < 0) {
    errors.Recycle_Cost = 'Enter a valid non‑negative number.';
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

/** Convert validated form state to the API payload shape. */
function formToInput(form: ProductFormState): ProductInput {
  return {
    Material: form.Material,
    Age_months: Number(form.Age_months),
    Condition_Score: Number(form.Condition_Score),
    Repair_Cost: Number(form.Repair_Cost),
    Recycle_Cost: Number(form.Recycle_Cost),
    Market_Demand: form.Market_Demand,
  };
}

// ─── ViewModel Hook ────────────────────────────────────────────────────────

export interface PredictionViewModel {
  /** Current list of product forms. */
  products: ProductFormState[];

  /** Per‑product validation errors keyed by product id. */
  validationErrors: Record<string, ProductValidationErrors>;

  /** Whether an API request is in flight. */
  isLoading: boolean;

  /** Global error message (network / server). */
  errorMessage: string | null;

  /** Prediction results from the last successful call. */
  recommendations: Recommendation[] | null;

  /** Add a new blank product form. */
  addProduct: () => void;

  /** Remove a product by its local id. */
  removeProduct: (id: string) => void;

  /** Update a specific field on a product form. */
  updateField: <K extends keyof ProductFormState>(
    id: string,
    field: K,
    value: ProductFormState[K],
  ) => void;

  /** Validate all products, call the API, and return recommendations. */
  submit: () => Promise<Recommendation[] | null>;

  /** Reset a single product form to defaults (keeping its id). */
  resetProduct: (id: string) => void;

  /** Reset the form to initial state. */
  reset: () => void;
}

export function usePredictionViewModel(): PredictionViewModel {
  const [products, setProducts] = useState<ProductFormState[]>([createEmptyProduct()]);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, ProductValidationErrors>
  >({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);

  // ── Product list management ─────────────────────────────────────────────

  const addProduct = useCallback(() => {
    setProducts(prev => [...prev, createEmptyProduct()]);
  }, []);

  const removeProduct = useCallback((id: string) => {
    setProducts(prev => {
      if (prev.length <= 1) {
        return prev; // always keep at least one
      }
      return prev.filter(p => p.id !== id);
    });
    setValidationErrors(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const updateField = useCallback(
    <K extends keyof ProductFormState>(id: string, field: K, value: ProductFormState[K]) => {
      setProducts(prev =>
        prev.map(p => (p.id === id ? { ...p, [field]: value } : p)),
      );
      // Clear field‑level error on edit
      setValidationErrors(prev => {
        const productErrors = prev[id];
        if (!productErrors) {
          return prev;
        }
        const updated = { ...productErrors };
        delete (updated as Record<string, string | undefined>)[field as string];
        if (Object.keys(updated).length === 0) {
          const next = { ...prev };
          delete next[id];
          return next;
        }
        return { ...prev, [id]: updated };
      });
    },
    [],
  );

  // ── Submission ──────────────────────────────────────────────────────────

  const submit = useCallback(async (): Promise<Recommendation[] | null> => {
    setErrorMessage(null);
    setRecommendations(null);

    // Validate every product
    const allErrors: Record<string, ProductValidationErrors> = {};
    let hasErrors = false;

    for (const product of products) {
      const errs = validateProduct(product);
      if (errs) {
        allErrors[product.id] = errs;
        hasErrors = true;
      }
    }

    setValidationErrors(allErrors);

    if (hasErrors) {
      setErrorMessage('Please fix the validation errors before submitting.');
      return null;
    }

    // Build payload
    const payload: ProductInput[] = products.map(formToInput);

    setIsLoading(true);

    try {
      const response = await fetchPredictions(payload);
      const recs = response.Recommendations;
      setRecommendations(recs);
      return recs;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'An unknown error occurred.';
      setErrorMessage(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [products]);

  // ── Reset single product ────────────────────────────────────────────────

  const resetProduct = useCallback((id: string) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id
          ? { ...createEmptyProduct(), id } // keep same id, reset fields
          : p,
      ),
    );
    setValidationErrors(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  // ── Reset all ──────────────────────────────────────────────────────────

  const reset = useCallback(() => {
    setProducts([createEmptyProduct()]);
    setValidationErrors({});
    setErrorMessage(null);
    setRecommendations(null);
  }, []);

  return {
    products,
    validationErrors,
    isLoading,
    errorMessage,
    recommendations,
    addProduct,
    removeProduct,
    updateField,
    resetProduct,
    submit,
    reset,
  };
}
