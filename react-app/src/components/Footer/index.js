
import styles from './Footer.module.css'
import { AiFillLinkedin } from 'react-icons/ai'
import { FiTwitter } from 'react-icons/fi'
import { FaGithubAlt, FaAngellist } from 'react-icons/fa'

function Footer(){


    return (
        <div className={styles.footer}>
            <div className={styles.footer__content}>
                {/* <header>Rich Supe</header>
                <p>Welcome to Cellars! Contact me here:</p> */}
                <ul className={styles.footer__socials}>
                    <li className={styles.liLink}>
                        <a className={styles.aLink} href="https://linkedin.com/in/richard-supe">
                            <AiFillLinkedin className={styles.linkedIcon}/>
                        </a>
                    </li>
                    <li className={styles.liGit}>
                        <a className={styles.aGit} href="https://github.com/Rich-Supe">
                            <FaGithubAlt className={styles.gitIcon}/>
                        </a>
                    </li>
                    <li className={styles.liTwit}>
                        <a className={styles.aTwit} href="https://twitter.com/supe_richard">
                            <FiTwitter className={styles.twitIcon}/>
                        </a>
                    </li>
                    <li className={styles.liPort}>
                        <a className={styles.aAngel} href="https://angel.co/u/rich-supe">
                            <FaAngellist className={styles.angelIcon}/>
                        </a>
                    </li>
                </ul>
            </div>
            <div className={styles.footer__bottom}>
                <p>Website created and maintained by <span>Rich Supe</span></p>
            </div>
        </div>
    )
}

export default Footer;