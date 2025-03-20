import * as functions from "firebase-functions/v1"; // Use v1 for compatibility
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// Function to assign a random Kamishibai card weekly
exports.assignWeeklyAudit = functions.pubsub
    .schedule("every monday 00:00")
    .timeZone("America/New_York") // Adjust as needed
    .onRun(async () => {
        const usersSnapshot = await db.collection("users").get();

        usersSnapshot.forEach(async (userDoc) => {
            const userId = userDoc.id;
            const cardsRef = db.collection("cards");
            const assignedCardsRef = db
                .collection("audits")
                .where("assignedTo", "==", userId);

            // Get past assigned cards
            const pastAssignments = await assignedCardsRef.orderBy("assignedAt", "desc").limit(2).get();
            const pastCardIds = pastAssignments.docs.map(doc => doc.data().cardId);

            // Get all available cards and filter out past assigned ones
            const availableCards = await cardsRef.get();
            const filteredCards = availableCards.docs.filter(doc => !pastCardIds.includes(doc.id));

            if (filteredCards.length === 0) return;

            // Select a random card
            const randomCard = filteredCards[Math.floor(Math.random() * filteredCards.length)];

            // Create new audit entry
            await db.collection("audits").add({
                assignedTo: userId,
                cardId: randomCard.id,
                assignedAt: admin.firestore.Timestamp.now(),
                status: "pending",
            });

            console.log(`Assigned card ${randomCard.id} to user ${userId}`);
        });
    });

// Function to acknowledge an audit
exports.acknowledgeAudit = functions.https.onCall(
    async (data: { auditId: string }, context: functions.https.CallableContext) => {
        if (!context.auth?.uid) {
            throw new functions.https.HttpsError("unauthenticated", "User must be authenticated");
        }

        if (!data.auditId) {
            throw new functions.https.HttpsError("invalid-argument", "Audit ID is required");
        }

        const auditRef = db.collection("audits").doc(data.auditId);
        await auditRef.update({
            status: "acknowledged",
            acknowledgedAt: admin.firestore.Timestamp.now(),
        });

        return { message: "Audit acknowledged successfully" };
    }
);

// Function to submit proof for an audit
exports.submitProof = functions.https.onCall(
    async (data: { auditId: string; proofUrl: string }, context: functions.https.CallableContext) => {
        if (!context.auth?.uid) {
            throw new functions.https.HttpsError("unauthenticated", "User must be authenticated");
        }

        if (!data.auditId || !data.proofUrl) {
            throw new functions.https.HttpsError("invalid-argument", "Audit ID and proof URL are required");
        }

        const auditRef = db.collection("audits").doc(data.auditId);
        await auditRef.update({
            status: "completed",
            proof: data.proofUrl,
            completedAt: admin.firestore.Timestamp.now(),
        });

        return { message: "Proof submitted successfully" };
    }
);
