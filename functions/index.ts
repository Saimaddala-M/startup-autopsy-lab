
import * as functions from "firebase-functions";
import { appPromise } from "../server";

export const api = functions.https.onRequest(async (req, res) => {
    const app = await appPromise;
    return app(req, res);
});
