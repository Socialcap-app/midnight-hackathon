'use client';

import { AdminLayout } from '../../../components/AdminLayout';
import { useRouter } from 'next/navigation';
import {
  Container,
  Title,
  Text,
  Paper,
  Group,
  Badge,
  Stack,
  Button
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { ProposalCard } from '../../../components/ProposalCard';
import { mockProposals } from '../../../utils/mockData';

export default function AdminProposalsPage() {
  const router = useRouter();
  const pendingCount = mockProposals.filter(p => {
    const now = new Date();
    return now >= p.startDate && now <= p.endDate;
  }).length;

  const handleCreateProposal = () => {
    router.push('/admin/proposals/new');
  };

  return (
    <AdminLayout activeTab="proposals" username="Admin">
      <Container size="lg">
        <Group mb="lg" justify="space-between">
          <Title order={1} size="h2">
            Proposals Management
          </Title>
          <Group gap="md">
            {/* <Badge size="lg" variant="filled" color="var(--mantine-color-green-9)">
              {pendingCount} in progress
            </Badge> */}
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={handleCreateProposal}
              variant="filled"
              color="blue"
            >
              Create Proposal
            </Button>
          </Group>
        </Group>

        <Stack gap="md">
          {mockProposals.map((proposal) => (
            <ProposalCard proposal={proposal} key={proposal.id} isAdmin={true} />
          ))}
        </Stack>

        {mockProposals.length === 0 && (
          <Paper p="xl" shadow="sm" radius="md">
            <Text c="dimmed" ta="center" size="lg">
              No proposals submitted yet. Proposals will appear here for review.
            </Text>
          </Paper>
        )}
      </Container>
    </AdminLayout>
  );
}
