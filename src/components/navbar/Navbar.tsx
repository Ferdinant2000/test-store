'use client';

import { Sidebar } from './Sidebar';
import { MobileNavbar } from './MobileNavbar';

export function Navbar() {
    return (
        <>
            <Sidebar />
            <MobileNavbar />
        </>
    );
}
