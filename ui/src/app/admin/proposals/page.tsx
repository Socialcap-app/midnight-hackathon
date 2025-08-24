'use client';

// import { MockProposal } from '@/components/MockProposal';
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
import { ProposalCard } from '@/components/ProposalCard';

// TODO: Replace with real data from contract
const mockProposals = [
  {
    id: 1,
    title: 'Community Garden Initiative',
    author: 'Alice Johnson',
    status: 'pending',
    submittedAt: '2024-08-20',
    description: 'Proposal to establish a community garden in the downtown area to promote sustainable living and community engagement.',
  },
  {
    id: 2,
    title: 'Youth Coding Bootcamp',
    author: 'Bob Smith',
    status: 'pending',
    submittedAt: '2024-08-19',
    description: 'Free coding bootcamp for underprivileged youth aged 14-18 to provide them with valuable tech skills.',
  },
  {
    id: 3,
    title: 'Local Art Festival',
    author: 'Carol Davis',
    status: 'approved',
    submittedAt: '2024-08-15',
    description: 'Annual art festival showcasing local artists and promoting cultural activities in the community.',
  },
  {
    id: 4,
    title: 'Senior Citizens Support Program',
    author: 'David Wilson',
    status: 'pending',
    submittedAt: '2024-08-18',
    description: 'Support program providing assistance and social activities for senior citizens in the community.',
  },
];

export default function AdminProposalsPage() {
  const router = useRouter();
  const pendingCount = mockProposals.filter(p => p.status === 'pending').length;

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
            <Badge size="lg" variant="filled" color="orange">
              {pendingCount} pending review
            </Badge>
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
            <ProposalCard proposal={proposal} key={proposal.id} />
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
