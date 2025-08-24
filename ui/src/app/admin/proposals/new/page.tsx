'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Title,
  Text,
  Paper,
  Group,
  Button,
  TextInput,
  Textarea,
  NumberInput,
  Stack,
  Box,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { AdminLayout } from '../../../../components/AdminLayout';
import { IconArrowLeft, IconDeviceFloppy } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface ProposalFormValues {
  title: string;
  description: string;
  minVoters: number;
  quorum: number;
  startDate: Date | null;
  endDate: Date | null;
}

export default function NewProposalPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [proposalText, setProposalText] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '<p>Enter the detailed proposal text here. This will be converted to markdown when saved.</p>',
    immediatelyRender: false,
    onUpdate({ editor }) {
      setProposalText(editor.getHTML());
    },
  });

  const form = useForm<ProposalFormValues>({
    initialValues: {
      title: '',
      description: '',
      minVoters: 0,
      quorum: 0,
      startDate: null,
      endDate: null,
    },

    validate: {
      title: (value) => (value.trim().length < 3 ? 'Title must be at least 3 characters' : null),
      description: (value) => (value.trim().length < 10 ? 'Description must be at least 10 characters' : null),
      minVoters: (value) => (value < 1 ? 'Minimum voters must be at least 1' : null),
      quorum: (value) => (value < 1 ? 'Quorum must be at least 1' : null),
      startDate: (value) => (!value ? 'Start date is required' : null),
      endDate: (value, values) => {
        if (!value) return 'End date is required';
        if (values.startDate && value <= values.startDate) {
          return 'End date must be after start date';
        }
        return null;
      },
    },
  });

  const handleSubmit = async (values: ProposalFormValues) => {
    try {

      setIsLoading(true);

      // Convert rich text to markdown (simplified conversion)
      const markdownText = editor?.getText() || '';

      const proposalData = {
        ...values,
        proposalText: markdownText,
        richTextContent: proposalText,
      };

      const res = await fetch('/api/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proposalData),
      });
      const data = await res.json();

      if (!data.success) {
        console.log("Failed to create proposal:", data);
        notifications.show({
          title: 'Error',
          message: data.message || 'Failed to create proposal',
          color: 'red',
        });
        return
      }

      notifications.show({
        title: 'Success',
        message: 'Proposal created successfully',
        color: 'green',
      });
      router.push('/admin/proposals');
    } catch (error) {
      console.error(error)
      notifications.show({
        title: 'Error',
        message: `Client error ${error}`,
        color: 'red',
      });
    } finally {
      setIsLoading(false)
    }
  };

  const handleCancel = () => {
    router.push('/admin/proposals');
  };

  return (
    <AdminLayout activeTab="proposals" username="Admin">
      <Container size="lg">
        <Group mb="lg" justify="space-between">
          <Group gap="sm">
            <Button
              variant="subtle"
              leftSection={<IconArrowLeft size={16} />}
              onClick={handleCancel}
            >
              Back to Proposals
            </Button>
            <Title order={1} size="h2">
              Create New Proposal
            </Title>
          </Group>
        </Group>

        <Paper p="xl" shadow="sm" radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="lg">
              {/* Basic Information */}
              <Box>
                <Title order={3} size="h4" mb="md">
                  Basic Information
                </Title>

                <Stack gap="md">
                  <TextInput
                    label="Title"
                    placeholder="Enter proposal title"
                    required
                    {...form.getInputProps('title')}
                  />

                  <Textarea
                    label="Description"
                    placeholder="Brief description of the proposal"
                    minRows={3}
                    required
                    {...form.getInputProps('description')}
                  />
                </Stack>
              </Box>

              {/* Voting Configuration */}
              <Box>
                <Title order={3} size="h4" mb="md">
                  Voting Configuration
                </Title>

                <Group grow>
                  <NumberInput
                    label="Minimum Voters Needed"
                    placeholder="100"
                    min={1}
                    required
                    {...form.getInputProps('minVoters')}
                  />

                  <NumberInput
                    label="Quorum"
                    placeholder="50"
                    min={1}
                    max={100}
                    required
                    {...form.getInputProps('quorum')}
                  />
                </Group>
              </Box>

              {/* Schedule */}
              <Box>
                <Title order={3} size="h4" mb="md">
                  Schedule
                </Title>

                <Group grow>
                  <DateTimePicker
                    label="Start Date & Time"
                    placeholder="Select start date and time"
                    required
                    {...form.getInputProps('startDate')}
                  />

                  <DateTimePicker
                    label="End Date & Time"
                    placeholder="Select end date and time"
                    required
                    {...form.getInputProps('endDate')}
                  />
                </Group>
              </Box>

              {/* Proposal Text */}
              <Box>
                <Title order={3} size="h4" mb="md">
                  Detailed Proposal
                </Title>

                <Text size="sm" c="dimmed" mb="sm">
                  Use the rich text editor below to write the detailed proposal. This content will be converted to markdown.
                </Text>

                <RichTextEditor editor={editor}>
                  <RichTextEditor.Toolbar sticky stickyOffset={60}>
                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Bold />
                      <RichTextEditor.Italic />
                      <RichTextEditor.Underline />
                      <RichTextEditor.Strikethrough />
                      <RichTextEditor.ClearFormatting />
                      <RichTextEditor.Highlight />
                      <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.H1 />
                      <RichTextEditor.H2 />
                      <RichTextEditor.H3 />
                      <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Blockquote />
                      <RichTextEditor.Hr />
                      <RichTextEditor.BulletList />
                      <RichTextEditor.OrderedList />
                      <RichTextEditor.Subscript />
                      <RichTextEditor.Superscript />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Link />
                      <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.AlignLeft />
                      <RichTextEditor.AlignCenter />
                      <RichTextEditor.AlignJustify />
                      <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>
                  </RichTextEditor.Toolbar>

                  <RichTextEditor.Content style={{ minHeight: '300px' }} />
                </RichTextEditor>
              </Box>

              {/* Action Buttons */}
              <Group justify="flex-end" gap="md" pt="lg">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  leftSection={<IconDeviceFloppy size={16} />}
                  loading={isLoading}
                  variant="filled"
                  color="blue"
                >
                  Create Proposal
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </Container>
    </AdminLayout>
  );
}
