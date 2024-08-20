'use client';

import { ThemeProvider as TP } from 'next-themes';

type ThemeProvider = {
    children?: React.ReactNode;
};

export default function ThemeProvider({ children }: ThemeProvider) {
    return (
        <TP attribute={'class'} defaultTheme={'system'} enableSystem={false} disableTransitionOnChange>
            {children}
        </TP>
    );
}
