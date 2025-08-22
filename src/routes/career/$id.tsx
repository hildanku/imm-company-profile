import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/career/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()
  return <h1>Hello "/career/$id" {id} !</h1>
}
