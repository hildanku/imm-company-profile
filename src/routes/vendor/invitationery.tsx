import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/vendor/invitationery')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/vendor/invitationery"!</div>
}
