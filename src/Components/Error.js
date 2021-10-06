import error from '../Images/error.gif';

const Error = () => {
    return (
        <div>
            <h1 className="pressStart">Error</h1>
            <img className="gifs" src={error} alt="error"/>
            <h4 className="pressStart thin">We couldn't find the page you were looking for...<br/>Maybe reload and try again?</h4>
            <p>404 Error - please tell me so I can fix it</p>
        </div>
    )
}

export default Error
