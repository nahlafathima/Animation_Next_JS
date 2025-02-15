import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], weight: ['100'] });
export default function Header2() {
    return (
      <div className="header-2">
        <h3 >Where innovation meets precision.</h3>
        <p className={inter.className}>
        Symphonia unites visionary thinkers, creative architects, and analytical
        experts, collaborating seamlessly to transform challenges into
        oppurtunities. Together, we deliver tailored solutions that drive impact
        and inspire growth.
        </p>
      </div>
    );
  }