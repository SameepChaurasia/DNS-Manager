export const verify_token=(token)=>{
    try {
        let secretKey=process.env.SECRET_KEY
        const decoded = jwt.verify(token, secretKey);
        console.log('decoded',decoded)
        return true;
    } catch (error) {
        console.log(error,'error');
        return false;
    }
}