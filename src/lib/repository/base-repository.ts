export type OrderQuery = 'ASC' | 'DESC'

export type ListArgs = {
	sort: string
	order: OrderQuery
	q: string
	limit: number
	page: number
	[key: string]: any
}

export type CreateArgs<T> = {
	item: Omit<T, 'id' | 'created_at' | 'updated_at'>
}

export type FindByIdArgs = {
	id: number | string
}

export type UpdateArgs<T> = {
	id: number | string
	item: Partial<Omit<T, 'id'>>
}

export type DeleteArgs = {
	id: number | string
}

export interface AsyncBaseRepository<T> {
	create(args: CreateArgs<T | Record<string, any>>): Promise<T[]>
	findById(args: FindByIdArgs): Promise<T[] | null>
	list(args: Partial<ListArgs>): Promise<{ items: T[]; meta: { totalItems: number } }>
	update(args: UpdateArgs<T | Record<string, any>>): Promise<T[] | null>
	delete(args: DeleteArgs): Promise<boolean>
}

export interface BaseRepository<T> {
	create(args: CreateArgs<T | Record<string, any>>): T[]
	findById(args: FindByIdArgs): T[] | null
	list(args: Partial<ListArgs>): { items: T[]; meta: { totalItems: number } }
	update(args: UpdateArgs<T | Record<string, any>>): T[] | null
	delete(args: DeleteArgs): boolean
}