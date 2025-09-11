import './globals.css';

export const metadata = {
  title: 'Checkin App',
  description: 'Kiosk + Admin',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
