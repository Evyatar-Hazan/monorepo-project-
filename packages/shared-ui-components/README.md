# @monorepo/shared-ui-components

Shared React UI components library for all frontend applications in the monorepo.

## Components

### Button
Flexible button component with multiple variants and sizes.

```tsx
import { Button } from '@monorepo/shared-ui-components';

export function MyComponent() {
  return (
    <Button variant="primary" size="medium">
      Click me
    </Button>
  );
}
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'danger' | 'success' (default: 'primary')
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- `loading`: boolean (default: false)
- `fullWidth`: boolean (default: false)

### Input
Text input component with label, error states, and helper text.

```tsx
import { Input } from '@monorepo/shared-ui-components';

export function MyComponent() {
  return (
    <Input
      label="Email"
      type="email"
      placeholder="Enter email"
      error={error}
      helperText="We'll never share your email"
    />
  );
}
```

**Props:**
- `label`: string
- `error`: string
- `helperText`: string
- `fullWidth`: boolean (default: false)

### Card
Container component for grouping content with shadow and padding options.

```tsx
import { Card } from '@monorepo/shared-ui-components';

export function MyComponent() {
  return (
    <Card title="My Card" subtitle="With content">
      <p>Card content goes here</p>
    </Card>
  );
}
```

**Props:**
- `title`: string
- `subtitle`: string
- `shadow`: 'sm' | 'md' | 'lg' (default: 'md')
- `padding`: 'sm' | 'md' | 'lg' (default: 'md')

### Alert
Alert/notification component for displaying messages.

```tsx
import { Alert } from '@monorepo/shared-ui-components';

export function MyComponent() {
  return (
    <Alert type="success" title="Success!" closable onClose={handleClose}>
      Operation completed successfully
    </Alert>
  );
}
```

**Props:**
- `type`: 'success' | 'error' | 'warning' | 'info' (default: 'info')
- `title`: string
- `closable`: boolean (default: false)
- `onClose`: () => void

### Loader
Loading spinner component with customizable size and color.

```tsx
import { Loader } from '@monorepo/shared-ui-components';

export function MyComponent() {
  return <Loader size="medium" color="blue" text="Loading..." />;
}
```

**Props:**
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- `color`: 'blue' | 'gray' | 'green' | 'red' (default: 'blue')
- `text`: string

### Modal
Modal dialog component for displaying overlay content.

```tsx
import { Modal, Button } from '@monorepo/shared-ui-components';

export function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={open}
        title="Confirm Action"
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => { /* action */ setOpen(false); }}>
              Confirm
            </Button>
          </>
        }
      >
        <p>Are you sure?</p>
      </Modal>
    </>
  );
}
```

**Props:**
- `isOpen`: boolean
- `title`: string
- `onClose`: () => void
- `footer`: React.ReactNode
- `size`: 'small' | 'medium' | 'large' (default: 'medium')

## Installation

The components use Tailwind CSS for styling. Make sure your application has Tailwind CSS configured.

## Usage in Frontend Applications

All components are built with React and styled with Tailwind CSS. They support TypeScript and are fully typed.

### Building
```bash
pnpm build
```

### Development
```bash
pnpm dev
```

### Type Checking
```bash
pnpm type-check
```

## Styling

All components use Tailwind CSS classes for styling. The default color scheme includes:
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#16A34A)
- **Danger**: Red (#DC2626)
- **Warning**: Yellow (#FBBF24)

## Contributing

When adding new components:
1. Create component in `src/components/ComponentName/ComponentName.tsx`
2. Export from `src/index.ts`
3. Add documentation to this README
4. Ensure TypeScript types are exported
