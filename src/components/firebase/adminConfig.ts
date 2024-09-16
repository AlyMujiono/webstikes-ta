import { initializeApp, getApps, cert } from "firebase-admin/app";
import adminKey from "./adminKeys.json";
import { env } from "process";

const firebaseAdminConfig = {
  credential: cert({
    projectId: adminKey.project_id,
    clientEmail: adminKey.client_email,
    privateKey: adminKey.private_key,
  }),
};

let firebase_admin_app = initializeApp(firebaseAdminConfig);

export default firebase_admin_app;
