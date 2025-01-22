// components/Header.tsx
import Link from 'next/link';

export const Header = () => {
    return (
        <header>
            <div className="header-logo">
                <Link href="/">
                    <h1>Next-Kind</h1>
                </Link>
            </div>
            <div className="header-btn">
                <Link href="/docs">
                    <button>Docs</button>
                </Link>
            </div>
        </header>
    );
};
