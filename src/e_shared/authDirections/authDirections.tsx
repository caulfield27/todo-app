const AuthDirections = ({ text, link,label }: { text:string,link:string,label:string}) => {
    return (
        <div style={{display:'flex', flexDirection:"row",}}>
            <p>{text}</p>
            <a href={link}>{label}</a>
        </div>
    );
}

export default AuthDirections;