import { Container, Paper, Text, Group, Anchor } from '@mantine/core';

interface AuthCardProps {
  children: React.ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <Container size="xs" style={{ width: '100%', maxWidth: '400px' }}>
      <Paper
        shadow="xl"
        radius="lg"
        p="xl"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        {children}
      </Paper>

      {/* Footer */}
      <Text size="xs" c="rgba(255, 255, 255, 0.8)" ta="center" mt="xl">
        By signing, you accept our{' '}
        <Anchor
          size="xs"
          c="rgba(255, 255, 255, 0.9)"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            // TODO: Open terms modal or navigate to terms page
            console.log('Open terms and conditions');
          }}
        >
          Terms and Conditions
        </Anchor>
      </Text>

      {/* Copyright */}
      <Group justify="center" mt="xl" gap="xs">
        <Text size="xs" c="rgba(255, 255, 255, 0.7)">
          © 2023-2024
        </Text>
        <Anchor
          size="xs"
          c="rgba(255, 255, 255, 0.9)"
          href="#"
          fw={500}
          onClick={(e) => {
            e.preventDefault();
            // TODO: Navigate to main site
            console.log('Navigate to Socialcap');
          }}
        >
          Socialcap
        </Anchor>
        <Text size="xs" c="rgba(255, 255, 255, 0.7)">
          All rights reserved.
        </Text>
      </Group>

      {/* Footer links */}
      <Group justify="center" mt="sm" gap="md">
        <Anchor
          size="xs"
          c="rgba(255, 255, 255, 0.8)"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            console.log('Open support');
          }}
        >
          Support
        </Anchor>
        <Anchor
          size="xs"
          c="rgba(255, 255, 255, 0.8)"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            console.log('Open privacy policy');
          }}
        >
          Privacy Policies
        </Anchor>
        <Anchor
          size="xs"
          c="rgba(255, 255, 255, 0.8)"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            console.log('Open terms and conditions');
          }}
        >
          Terms and Conditions
        </Anchor>
      </Group>
    </Container>
  );
}
