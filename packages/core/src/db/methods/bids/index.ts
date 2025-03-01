import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Collections, db } from "../..";
import { IBids } from "../../../types";

const createBid = async (bid: IBids) => {
  try {
    const ref = db.collection(Collections.Bids).doc(bid.id);
    ref.set({
      ...bid,
    });
    return true;
  } catch (error) {
    console.error("Error creating bid collection:", error);
    throw error;
  }
};

const updateBid = async (bid: Partial<IBids> & Pick<IBids, "id">) => {
  try {
    await updateDoc(doc(db, Collections.Bids, bid.id as string), bid);
    return true;
  } catch (error) {
    console.error("Error updating bid collection:", error);
    throw error;
  }
};

const getBidByRequestId = async (requestId: string): Promise<IBids[]> => {
  try {
    const snapshot = await getDocs(
      query(
        collection(db, Collections.Bids),
        where("requestId", "==", requestId),
        orderBy("createdAt", "desc")
      )
    );
    return snapshot.docs.map((doc) => doc.data() as IBids);
  } catch (error) {
    console.error("Error bid by req id:", error);
    throw error;
  }
};

export { createBid, updateBid, getBidByRequestId };
