import { FaTwitter, FaRedditAlien, FaFacebookF, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="footer">
            <a id="link" href="https://twitter.com"><FaTwitter /></a>
            <a id="link" href="https://reddit.com"><FaRedditAlien /></a>
            <a id="link" href="https://facebook.com"><FaFacebookF /></a>
            <a id="link" href="https://github.com"><FaGithub /></a>
        </div>
    )
}

export default Footer
