import { z } from 'zod';

export const STATUSES = ['new', 'contacted', 'won', 'closed'];

export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Enter your name.').max(100, 'Name is too long.'),
  email: z.string().trim().toLowerCase().email('Enter a valid email address.').max(254),
  services: z.array(z.string().trim().max(60)).max(10).default([]),
  budget: z.string().trim().max(60, 'Budget is too long.').nullish().transform((v) => v || null),
  message: z.string().trim().min(10, 'Tell us a bit more (10+ characters).').max(3000, 'Message is too long.'),
});
