import { getFunctions, httpsCallable } from "firebase/functions";
import { getFirebaseApp } from "./firebase";

export interface ContactRequestPayload {
  name: string;
  email: string;
  message: string;
  requestType?: string;
}

export interface ContactRequestResponse {
  success: boolean;
}

export const submitContactRequest = async (
  payload: ContactRequestPayload
): Promise<ContactRequestResponse> => {
  const app = getFirebaseApp();
  const functions = getFunctions(app);
  const submit = httpsCallable<ContactRequestPayload, ContactRequestResponse>(
    functions,
    "submitContactRequest"
  );

  const result = await submit(payload);
  return result.data;
};
