
import uniqid from 'uniqid';

class TokenManager {
    
    private static generateToken() : string {
        return uniqid();
    }
    public static saveToken(token: string) {
        localStorage.setItem('token',token);
    }
    
    public static loadToken() : string {
        let token : string | null
        token = localStorage.getItem('token');
        if(!token) {
            token = this.generateToken();
            this.saveToken(token)
        }
        return token;
    }
}

export default TokenManager;