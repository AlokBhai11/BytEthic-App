// Default content, served when the services/projects collections are empty.
// To manage content from MongoDB instead, add documents to those collections:
//   services: { title, text, icon, order, published }
//   projects: { title, text, tag, stack: [], order, published }
export const defaults = {
  services: [
    { id: 's1', icon: 'globe-outline', title: 'Web development', text: 'Responsive, fast websites and web apps built with modern frameworks.' },
    { id: 's2', icon: 'phone-portrait-outline', title: 'Mobile apps', text: 'Android and iOS apps from a single React Native codebase.' },
    { id: 's3', icon: 'layers-outline', title: 'Custom software', text: 'Dashboards, SaaS platforms and internal tools shaped around your workflow.' },
    { id: 's4', icon: 'color-palette-outline', title: 'UI/UX design', text: 'Clean interfaces and design systems your users find easy to use.' },
    { id: 's5', icon: 'cloud-outline', title: 'Cloud and APIs', text: 'Secure backends, integrations and deployment you can scale.' },
    { id: 's6', icon: 'setting-ouline', title: 'SEO', text: 'SEO , integrations and deployment you can apppers on search Engine top.' },
  ],
  projects: [
    { id: 'p1', title: 'School management platform', tag: 'SaaS', stack: ['React', 'Supabase'], text: 'Multi-tenant platform for attendance, fees and results.' },
    { id: 'p2', title: 'Local business storefront', tag: 'Web', stack: ['Next.js', 'Tailwind'], text: 'Fast catalogue site with WhatsApp ordering.' },
    { id: 'p3', title: 'Field team tracker', tag: 'Mobile', stack: ['React Native', 'Node'], text: 'Task and location updates for on-ground teams.' },
  ],
};
