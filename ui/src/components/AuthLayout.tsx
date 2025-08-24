import { Box, Button, Image } from '@mantine/core';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <Box
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(/socialcap-bg-signin.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header with logo */}
      <Box
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10,
        }}
      >
        <Image src="/socialcap-logo.svg" alt="SocialCap Logo" />
      </Box>

      {/* Discover button */}
      <Box
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 10,
        }}
      >
        <Button
          variant="filled"
          color="#4263eb"
          size="sm"
          radius="md"
        >
          Discover
        </Button>
      </Box>

      {children}
    </Box>
  );
}
