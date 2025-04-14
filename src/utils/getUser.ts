export function getUserAttribute(key: 'id' | 'email' | 'blocked' | 'confirmed' | 'createdAt' | 'documentId' | 'email' | 'username' | 'avatar') {
    const user = localStorage.getItem("user");
    if (user) {
        switch (key) {
            case "id":
                return JSON.parse(user).id;
            case "blocked":
                return JSON.parse(user).blocked;
            case "confirmed":
                return JSON.parse(user).confirmed;
            case "createdAt":
                return JSON.parse(user).createdAt;
            case "documentId":
                return JSON.parse(user).documentId;
            case "email":
                return JSON.parse(user).email;
            case "username":
                return JSON.parse(user).username;
            case "avatar":
                return JSON.parse(user).avatar;
            default:
                throw new Error('Такого атрибута пользователя не существует');
        }
    }
    return null;
}
