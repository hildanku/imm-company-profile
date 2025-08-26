import type { CareerApplication } from '@/types'
import supabase from '@/lib/supabase'
import type {
    AsyncBaseRepository,
    CreateArgs,
    DeleteArgs,
    FindByIdArgs,
    ListArgs,
} from '@/lib/repository/base-repository'

export type findByUUIDArgs = {
    uuid: string
}

export type UpdateByUUIDArgs<T> = {
	id: string
	item: Partial<Omit<T, 'id'>>
}

export class CareerApplicationRepository implements Omit<AsyncBaseRepository<CareerApplication>, 'findByUUID' | 'update'> {
    private tableName = 'career_applications'

    async findByUUID(args: findByUUIDArgs): Promise<CareerApplication | null> {
        const { data, error } = await supabase
            .from(this.tableName)
            .select('*, career:careers(*)')
            .eq('id', args.uuid)
            .single()

        if (error || !data) {
            console.error('Error fetching career application:', error)
            return null
        }

        return data
    }

    async create(args: CreateArgs<CareerApplication>): Promise<CareerApplication[]> {
        const { data, error } = await supabase
            .from(this.tableName)
            .insert([args.item])
            .select()

        if (error) {
            console.error('Error creating career:', error)
            return []
        }

        return data || []
    }

    async findById(args: FindByIdArgs): Promise<CareerApplication[] | null> {
        const { data, error } = await supabase
            .from(this.tableName)
            .select('*, career:careers(*)')
            .eq('id', args.id)
            .single()

        if (error || !data) {
            console.error('Error fetching career application:', error)
            return null
        }

        return [data]
    }

    async list(args: Partial<ListArgs> = {}): Promise<{ items: CareerApplication[]; meta: { totalItems: number } }> {
        const {
            sort = 'created_at',
            order = 'DESC',
            q = '',
            limit = 10,
            page = 1,
            ...filters
        } = args

        const from = (page - 1) * limit
        const to = from + limit - 1

        let query = supabase
            .from(this.tableName)
            .select('*, career:careers(*)', { count: 'exact' })

        if (q) {
            query = query.or(`full_name.ilike.%${q}%,email.ilike.%${q}%,phone.ilike.%${q}%,status.ilike.%${q}%`)
        }

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                query = query.eq(key, value as any)
            }
        })

        const { data, error, count } = await query
            .order(sort, { ascending: order === 'ASC' })
            .range(from, to)

        if (error) {
            console.error('Error fetching career applications:', error)
            return { items: [], meta: { totalItems: 0 } }
        }

        return {
            items: data || [],
            meta: {
                totalItems: count || 0
            }
        }
    }

    async update(args: UpdateByUUIDArgs<CareerApplication>): Promise<CareerApplication[] | null> {
        const { data, error } = await supabase
            .from(this.tableName)
            .update(args.item)
            .eq('id', args.id)
            .select()

        if (error) {
            console.error('Error updating career:', error)
            return null
        }

        return data || null
    }

    async delete(args: DeleteArgs): Promise<boolean> {
        const { error } = await supabase
            .from(this.tableName)
            .delete()
            .eq('id', args.id)

        if (error) {
            console.error('Error deleting career:', error)
            return false
        }

        return true
    }
}

export const careerApplicationRepository = new CareerApplicationRepository()