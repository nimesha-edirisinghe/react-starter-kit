import type { PostI } from '~/types/post';

export const mockPosts: PostI[] = [
  { id: 1, title: 'First Post', body: 'This is the first post.' },
  { id: 2, title: 'Second Post', body: 'Another post content.' },
  { id: 3, title: 'Mocked News', body: 'MSW is now mocking posts!' },
  { id: 4, title: 'Tech Trends 2025', body: 'Explore the upcoming tech trends for 2025.' },
  { id: 5, title: 'Understanding Zustand', body: 'A simple intro to Zustand state management.' },
  {
    id: 6,
    title: 'React Router vs TanStack Router',
    body: 'A quick comparison of routing libraries.'
  },
  { id: 7, title: 'Deploying to Vercel', body: 'Steps to deploy your app to Vercel seamlessly.' },
  { id: 8, title: 'Dark Mode in Tailwind', body: 'Learn how to enable dark mode using Tailwind.' },
  {
    id: 9,
    title: 'Building with MSW',
    body: 'Mock Service Worker is a great tool for API mocking.'
  },
  { id: 10, title: 'Optimizing React Apps', body: 'Tips and tricks to improve React performance.' }
];
