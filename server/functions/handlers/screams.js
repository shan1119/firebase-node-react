const {
    db,
    admin
} = require('../util/admin');

exports.getAllScreams = (req, res) => {
    db.collection("screams")
        .orderBy("createdAt", "desc")
        .get()
        .then((data) => {
            let screams = [];
            data.forEach((doc) => {
                screams.push({
                    screamId: doc.id,
                    body: doc.data().body,
                    userHandle: doc.data().userHandle,
                    createdAt: doc.data().createdAt,
                    userImage: doc.data().userImage,
                    commentCount: doc.data().commentCount,
                    likeCount: doc.data().likeCount,
                });
            });
            return res.json(screams);
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({
                error: "something went wrong",
            });
        });
}

exports.postScream = (req, res) => {
    if (req.body.body.trim() === '') {
        return res.status(400).json({ body: 'Body must not be empty' });
      }
    const newScream = {
        body: req.body.body,
        userHandle: req.user.handle,
        userImage: req.user.imageUrl,
        createdAt: new Date().toISOString(),
        likeCount: 0,
        commentCount: 0
    };
    db.collection("screams")
        .add(newScream)
        .then((doc) => {
            const resScream = newScream
            resScream.screamId = doc.id
            return res.json(resScream);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({
                error: "something went wrong",
            });
        });
}

// get scream -> comments
exports.getScream = (req, res) => {
    let screamData = {}
    db.doc(`/screams/${req.params.screamId}`).get()
        .then(doc => {
            if (!doc.exists) {
                return res.status(404).json({
                    error: 'Scream not found'
                })
            }
            screamData = doc.data();
            screamData.screamId = doc.id;
            return db.collection('comments').where("screamId", "==", req.params.screamId).orderBy("createdAt").get();
        })
        .then(data => {
            screamData.comments = []
            data.forEach(doc => {
                screamData.comments.push(doc.data())
            })
            res.json(screamData);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}

// commnet on a scream
exports.commentScream = (req, res) => {
    if (req.body.body.trim() === '') return res.status(400).json({
        error: 'Must not be empty'
    })

    const newComment = {
        body: req.body.body,
        createdAt: new Date().toISOString(),
        screamId: req.params.screamId,
        userHandle: req.user.handle,
        imageUrl: req.user.imageUrl
    }
    console.log(newComment)
    db.doc(`/screams/${req.params.screamId}`).get()
        .then(doc => {
            if (!doc.exists) return res.status(400).json({
                error: 'Scream is not found'
            })
            return doc.ref.update({
                commentCount: doc.data().commentCount + 1
            });
        })
        .then(() => {
            return db.collection('comments').add(newComment);
        })
        .then(() => {
            res.json(newComment);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: "something went wrong"
            });
        })
}

// add like to a scream
exports.likeScream = (req, res) => {
    const likeDocument = db.collection('likes').where('userHandle', '==', req.user.handle)
        .where('screamId', '==', req.params.screamId).limit(1);

    const screamDocument = db.doc(`/screams/${req.params.screamId}`);

    let screamData = {};
    screamDocument.get().then(doc => {
            if (doc.exists) {
                screamData = doc.data();
                screamData.screamId = doc.id;
                return likeDocument.get();
            } else {
                return res.status(404).json({
                    error: 'Scream not found'
                })
            }
        })
        .then(data => {
            if (data.empty) {
                return db.collection('likes').add({
                        screamId: req.params.screamId,
                        userHandle: req.user.handle
                    })
                    .then(() => {
                        screamData.likeCount++
                        return screamDocument.update({
                            likeCount: screamData.likeCount
                        })
                    })
                    .then(() => {
                        return res.json(screamData)
                    })
            } else {
                return res.status(400).json({
                    error: 'Scream already liked'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err.code
            });
        })
}

// remove like to a scream
exports.unlikeScream = (req, res) => {
    const likeDocument = db.collection('likes').where('userHandle', '==', req.user.handle)
        .where('screamId', '==', req.params.screamId).limit(1);

    const screamDocument = db.doc(`/screams/${req.params.screamId}`);

    let screamData = {};
    screamDocument.get().then(doc => {
            if (doc.exists) {
                screamData = doc.data();
                screamData.screamId = doc.id;
                return likeDocument.get();
            } else {
                return res.status(404).json({
                    error: 'Scream not found'
                })
            }
        })
        .then(data => {
            console.log(data.docs[0].id)
            console.log(data.docs[0].data())
            if (data.empty) {
                return res.status(400).json({
                    error: 'Scream not liked'
                })
            } else {
                db.doc(`/likes/${data.docs[0].id}`).delete()
                    .then(() => {
                        screamData.likeCount--
                        return screamDocument.update({
                            likeCount: screamData.likeCount
                        })
                    })
                    .then(() => {
                        return res.json(screamData)
                    })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err.code
            });
        })
}

// delete a scream
exports.deleteScream = (req, res) => {
    const document = db.doc(`/screams/${req.params.screamId}`);
    document.get().then(doc => {
            if (!doc.exists) return res.status(404).json({
                error: 'scream not found'
            })
            if (doc.data().userHandle !== req.user.handle) return status(403).json({
                error: 'Unauthorized'
            })
            return document.delete()
        })
        .then(() => {
            res.json({
                message: 'Scream deleted successfully'
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err.code
            })
        })
}