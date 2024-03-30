import Link from 'next/link';

export const Header = ({currentUser}) => {
    return <nav className="navbar navbar-light bg-light">
        <Link className='navbar-brand' href="/">GitTix</Link>

        <div className='d-flex justify-context-end'>
            <ul className='nav d-flex align-items-center'>
                {currentUser ? 'Sign out' : 'Sign in/up'}
            </ul>
        </div>
    </nav>

};