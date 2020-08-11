const functions = require("firebase-functions");
const {
    db
} = require("./util/admin");
const {
    getAllScreams,
    postScream,
    getScream,
    commentScream,
    likeScream,
    unlikeScream,
    deleteScream,
} = require("./handlers/screams");
const {
    signup,
    login,
    uploadImage,
    addUserDetails,
    getAuthenticatedUser,
    getUserDetails,
    markNotificationsRead,
} = require("./handlers/users");
const FBAuth = require("./util/fbAuth");

const app = require("express")();

// scream routes
app.get("/scream", getAllScreams);
// post one scream
app.post("/scream", FBAuth, postScream);
app.delete("/scream/:screamId", FBAuth, deleteScream);
app.get("/scream/:screamId", getScream);
app.post("/scream/:screamId/comment", FBAuth, commentScream);
app.get("/scream/:screamId/like", FBAuth, likeScream);
app.get("/scream/:screamId/unlike", FBAuth, unlikeScream);

// TODO delete scream
// TODO like scream
// TODO unlike scream
// TODO ucomment scream

// user routes
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.post("/user", FBAuth, addUserDetails);
app.get("/user", FBAuth, getAuthenticatedUser);
app.get("/user/:handle", getUserDetails);
app.post("/notifications", FBAuth, markNotificationsRead);

exports.api = functions.region("asia-northeast1").https.onRequest(app);

exports.createNotificationOnLike = functions
    .region("asia-northeast1")
    .firestore.document("likes/{id}")
    .onCreate((snapshot) => {
        return db
            .doc(`/screams/${snapshot.data().screamId}`)
            .get()
            .then((doc) => {
                if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        read: false,
                        screamId: doc.id,
                        type: "like",
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                return;
            });
    });
exports.deleteNotificationOnUnLike = functions
    .region("asia-northeast1")
    .firestore.document("likes/{id}")
    .onDelete((snapshot) => {
        return db
            .doc(`/notifications/${snapshot.id}`)
            .delete()
            .catch((err) => {
                console.error(err);
                return;
            });
    });
exports.createNotificationOnComment = functions
    .region("asia-northeast1")
    .firestore.document("comments/{id}")
    .onCreate((snapshot) => {
        return db
            .doc(`/screams/${snapshot.data().screamId}`)
            .get()
            .then((doc) => {
                if (doc.exists && doc.data().userHandle !== snapshot.data().userHandle) {
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: doc.data().userHandle,
                        sender: snapshot.data().userHandle,
                        read: false,
                        screamId: doc.id,
                        type: "comment",
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                return;
            });
    });
exports.onUserImageChange = functions.region("asia-northeast1").firestore.document("users/{id}")
    .onUpdate((change) => {
        console.log(change.before.data());
        console.log(change.after.data());

        let batch = db.batch();
        if (change.before.data().imageUrl !== change.after.data().imageUrl) {
            return db.collection("screams").where("userHandle", "==", change.before.data().handle).get()
                .then(data => {
                    data.forEach(doc => {
                        const scream = db.doc(`/screams/${doc.id}`);
                        batch.update(scream, {
                            imageUrl: change.after.data().imageUrl
                        });
                    })
                    return batch.commit();
                });
        } else {
            return true;
        }
    })
exports.onScreamDelete = functions.region("asia-northeast1").firestore.document("screams/{id}")
    .onDelete((snapshot, context) => {
        const screamId = context.params.screamId;
        const batch = db.batch();
        return db.collection("comments").where("screamId", "==", screamId).get()
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/comments/${doc.id}`));
                })
                return db.collection("likes").where("screamId", "==", screamId).get();
            })
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/likes/${doc.id}`));
                })
                return db.collection("notifications").where("screamId", "==", screamId).get();
            })
            .then(data => {
                data.forEach(doc => {
                    batch.delete(db.doc(`/notifications/${doc.id}`));
                })
                return db.commit();
            })
            .catch(err => {
                console.log(err.code);
            })

    })