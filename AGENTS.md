# Agent Guidelines for Roadwise

## Build/Lint/Test Commands

- `bun run dev` - Start development server with Turbo (runs on port 3000)
- `bun run lint` - Run Biome checks
- **NEVER build the app** - Always use dev server for debugging/testing
- No test suite currently configured

## Code Style & Conventions

- **Imports**: Use `@/` alias for src imports, external libs first, then relative
- **Types**: Use TypeScript strictly, export interfaces, prefer `type` for unions
- **Components**: React.forwardRef pattern, destructure props with ...props spread
- **Naming**: camelCase variables/functions, PascalCase components, kebab-case files
- **Server Actions**: Use "use server" directive, handle auth with Clerk, return redirects
- **Database**: Use Drizzle ORM with proper schema imports from `@/db/schema`
- **Styling**: Tailwind CSS with `cn()` utility, minimalistic design using shadcn components
- **Forms**: React Hook Form with Zod validation, Radix UI components
- **Error Handling**: Return string messages from server actions, redirect on auth failure
- **File Structure**: Group by feature in `/components`, actions in `/actions`, shared UI in `/components/ui`

## Biome Configuration

- Handles both linting and formatting
- UI components in `/components/ui/` are generally ignored or have less strict rules depending on config

