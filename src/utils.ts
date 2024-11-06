
export type TPlayer = {
    name: string,
    score: number,
    profilePicture?: Blob,
}

export default {
    setupDB : async () => {
        return new Promise((resolve, reject) => {
            const request = window.indexedDB.open('BrainBrawl', 1);
            request.onerror = (ev) => {
                console.error(`Database error: ${ev.target.errorCode}`);
                reject(ev);
            };

            request.onsuccess = (ev) => {
                console.info('db connected');
                resolve(ev.target.result);
            };

            request.onupgradeneeded = (ev) => {
                const db = ev.target.result;
                const userObjectStore = db.createObjectStore('users', {
                    keyPath: 'id',
                    autoIncrement: true,
                });
                userObjectStore.createIndex('name', 'name', { unique: false });

                const gameObjectStore = db.createObjectStore("games", {
                    keyPath: "id",
                    autoIncrement: true
                });
                gameObjectStore.createIndex("gameName", "gameName", { unique: false });

                const questionObjectStore = db.createObjectStore("questions", {
                    keyPath: "id",
                    autoIncrement: true
                });
                gameObjectStore.createIndex("questionName", "questionName", { unique: false });
            };
        });
    },

    getUsers : async (database) =>{
        return new Promise((resolve, reject) => {
            const userRequest = database
                .transaction('users')
                .objectStore('users')
                .getAll();

            userRequest.onerror = (ev) => {
                console.error(`Database error: ${ev.target.errorCode}`);
                reject(ev);
            };

            userRequest.onsuccess = (ev) => {
                resolve(ev.target.result);
            };
        });
    },

    getUser : async (database, userId) => {
        return new Promise((resolve, reject) => {
            const userRequest = database
                .transaction('users')
                .objectStore('users')
                .get(userId);

            userRequest.onerror = (ev) => {
                console.error(`Database error: ${ev.target.errorCode}`);
                reject(ev);
            };

            userRequest.onsuccess = (ev) => {
                resolve(ev.target.result);
            };
        });
    },

     addUser: async (database, user) => {
        return new Promise((resolve, reject) => {
            const request = database
                .transaction(['users'], 'readwrite')
                .objectStore('users')
                .add(user);

            request.onerror = (ev) => {
                console.error(ev.target.errorCode);
                reject(ev);
            };

            request.onsuccess = (ev) => {
                console.info('saved to db');
                resolve(ev);
            };
        });
    },

     removeUser: async (database, userId) => {
        return new Promise((resolve, reject) => {
            const request = database
                .transaction(['users'], 'readwrite')
                .objectStore('users')
                .delete(userId);

            request.onerror = (ev) => {
                console.error(ev.target.errorCode);
                reject(ev);
            };

            request.onsuccess = (ev) => {
                console.info('saved to db');
                resolve(ev);
            };
        });
    },

     updateUser: async (database, user) => {
        return new Promise((resolve, reject) => {
            const request = database
                .transaction(['users'], 'readwrite')
                .objectStore('users')
                .put(user);

            request.onerror = (ev) => {
                console.error(ev.target.errorCode);
                reject(ev);
            };

            request.onsuccess = (ev) => {
                console.info('saved to db');
                resolve(ev);
            };
        });
    },

    // game db
     getGames: async (database) =>{
        return new Promise((resolve, reject) => {
            const userRequest = database
                .transaction('games')
                .objectStore('games')
                .getAll();

            userRequest.onerror = (ev) => {
                console.error(`Database error: ${ev.target.errorCode}`);
                reject(ev);
            };

            userRequest.onsuccess = (ev) => {
                resolve(ev.target.result);
            };
        });
    },

     getGame: async (database, gameId) => {
        return new Promise((resolve, reject) => {
            const userRequest = database
                .transaction('games')
                .objectStore('games')
                .get(gameId);

            userRequest.onerror = (ev) => {
                console.error(`Database error: ${ev.target.errorCode}`);
                reject(ev);
            };

            userRequest.onsuccess = (ev) => {
                resolve(ev.target.result);
            };
        });
    },

     addGame: async (database, game) => {
        return new Promise((resolve, reject) => {
            const request = database
                .transaction(['games'], 'readwrite')
                .objectStore('games')
                .add(game);

            request.onerror = (ev) => {
                console.error(ev.target.errorCode);
                reject(ev);
            };

            request.onsuccess = (ev) => {
                console.info('saved to db');
                resolve(ev);
            };
        });
    },

     removeGame: async (database, gameId) => {
        return new Promise((resolve, reject) => {
            const request = database
                .transaction(['games'], 'readwrite')
                .objectStore('games')
                .delete(gameId);

            request.onerror = (ev) => {
                console.error(ev.target.errorCode);
                reject(ev);
            };

            request.onsuccess = (ev) => {
                console.info('saved to db');
                resolve(ev);
            };
        });
    },

     updateGame: async (database, game) => {
        return new Promise((resolve, reject) => {
            const request = database
                .transaction(['games'], 'readwrite')
                .objectStore('games')
                .put(game);

            request.onerror = (ev) => {
                console.error(ev.target.errorCode);
                reject(ev);
            };

            request.onsuccess = (ev) => {
                console.info('saved to db');
                resolve(ev);
            };
        });
    },
    // question db
     getQuestions: async (database) =>{
        return new Promise((resolve, reject) => {
            const userRequest = database
                .transaction('questions')
                .objectStore('questions')
                .getAll();

            userRequest.onerror = (ev) => {
                console.error(`Database error: ${ev.target.errorCode}`);
                reject(ev);
            };

            userRequest.onsuccess = (ev) => {
                resolve(ev.target.result);
            };
        });
    },

     getQuestion: async (database, questionId) => {
        return new Promise((resolve, reject) => {
            const userRequest = database
                .transaction('questions')
                .objectStore('questions')
                .get(questionId);

            userRequest.onerror = (ev) => {
                console.error(`Database error: ${ev.target.errorCode}`);
                reject(ev);
            };

            userRequest.onsuccess = (ev) => {
                resolve(ev.target.result);
            };
        });
    },

     addQuestion: async (database, question) => {
        return new Promise((resolve, reject) => {
            const request = database
                .transaction(['questions'], 'readwrite')
                .objectStore('questions')
                .add(question);

            request.onerror = (ev) => {
                console.error(ev.target.errorCode);
                reject(ev);
            };

            request.onsuccess = (ev) => {
                console.info('saved to db');
                resolve(ev);
            };
        });
    },

     removeQuestion: async (database, questionId) => {
        return new Promise((resolve, reject) => {
            const request = database
                .transaction(['questions'], 'readwrite')
                .objectStore('questions')
                .delete(questionId);

            request.onerror = (ev) => {
                console.error(ev.target.errorCode);
                reject(ev);
            };

            request.onsuccess = (ev) => {
                console.info('saved to db');
                resolve(ev);
            };
        });
    },

     updateQuestion: async (database, question) => {
        return new Promise((resolve, reject) => {
            const request = database
                .transaction(['questions'], 'readwrite')
                .objectStore('questions')
                .put(question);

            request.onerror = (ev) => {
                console.error(ev.target.errorCode);
                reject(ev);
            };

            request.onsuccess = (ev) => {
                console.info('saved to db');
                resolve(ev);
            };
        });
    },
}

