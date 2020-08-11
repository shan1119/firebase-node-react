let db = {
    users: [{
        bio: "This is user",
        createdAt: "2020-08-02T04:36:45.209Z",
        email: "user@email.com",
        handle: "user",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/shan0801-186f9.appspot.com/o/2190003953.jpeg?alt=media",
        location: "Japan Saitama",
        userId: "UZ0BQE3M9XXMALDxw7XKcPYLBl73",
        website: "https://user.com"
    }],
    screams: [{
        userHandle: "user",
        body: "this is the scream body",
        createdAt: "",
        likeCount: 0,
        commentCount: 0
    }],
    comments: [{
        userHandle: "user",
        screamId: 'BjiD8KmVp0IAq3IlZyQy',
        body: "this is the scream body",
        createdAt: "2020-08-02T04:36:45.209Z",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/shan0801-186f9.appspot.com/o/2190003953.jpeg?alt=media"
    }],
    likes: [{
        s
    }],
    notifications: [{
        recipient: 'user',
        sender: 'johe',
        read: 'true | false',
        screamId: 'asdfsidfsodfjaposdif',
        type: 'like | comment',
        createdAt: '2020-08-02T04:36:45.209Z'
    }]
}

const userDetails = {
    // Redux data
    credentials: {
        bio: "This is user",
        createdAt: "2020-08-02T04:36:45.209Z",
        email: "user@email.com",
        handle: "user",
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/shan0801-186f9.appspot.com/o/2190003953.jpeg?alt=media",
        location: "Japan Saitama",
        userId: "UZ0BQE3M9XXMALDxw7XKcPYLBl73",
        website: "https://user.com"

    },
    likes: [{
            userHandle: 'user',
            screamId: 'BjiD8KmVp0IAq3IlZyQy'
        },
        {
            userHandle: 'user',
            screamId: 'DjU7ZjEEQl1cKWj5WDon'
        }
    ],
    comments: [

    ]
}