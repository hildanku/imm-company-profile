import type { Career } from '@/types'
import supabase from '@/lib/supabase'
import type {
    AsyncBaseRepository,
    CreateArgs,
    DeleteArgs,
    FindByIdArgs,
    ListArgs,
    // UpdateArgs
} from '@/lib/repository/base-repository'

export type findByUUIDArgs = {
    uuid: string
}

export type UpdateByUUIDArgs<T> = {
	id: string
	item: Partial<Omit<T, 'id'>>
}

export class CareerRepository implements Omit<AsyncBaseRepository<Career>, 'findByUUID' | 'update'> {
    private tableName = 'careers'

    async findByUUID(args: findByUUIDArgs): Promise<Career | null> {
        const { data, error } = await supabase
            .from(this.tableName)
            .select('*')
            .eq('id', args.uuid)
            .single()

        if (error || !data) {
            console.error('Error fetching career:', error)
            return null
        }

        return data
    }

    async create(args: CreateArgs<Career>): Promise<Career[]> {
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

    async findById(args: FindByIdArgs): Promise<Career[] | null> {
        const { data, error } = await supabase
            .from(this.tableName)
            .select('*')
            .eq('id', args.id)
            .single()

        if (error || !data) {
            console.error('Error fetching career:', error)
            return null
        }

        return [data]
    }

    async list(args: Partial<ListArgs> = {}): Promise<{ items: Career[]; meta: { totalItems: number } }> {
        const {
            sort = 'created_at',
            order = 'DESC',
            q = '',
            limit = 10,
            page = 1,
            ...filters
        } = args

        // Calculate pagination
        const from = (page - 1) * limit
        const to = from + limit - 1

        // Start building the query
        let query = supabase
            .from(this.tableName)
            .select('*', { count: 'exact' })

        // Apply search if provided
        if (q) {
            query = query.or(`job_title.ilike.%${q}%,job_description.ilike.%${q}%`)
        }

        // Apply additional filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                query = query.eq(key, value)
            }
        })

        // Apply sorting and pagination
        const { data, error, count } = await query
            .order(sort, { ascending: order === 'ASC' })
            .range(from, to)

        if (error) {
            console.error('Error fetching careers:', error)
            return { items: [], meta: { totalItems: 0 } }
        }

        return {
            items: data || [],
            meta: {
                totalItems: count || 0
            }
        }
    }

    async update(args: UpdateByUUIDArgs<Career>): Promise<Career[] | null> {
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

// Export a singleton instance for easy use
export const careerRepository = new CareerRepository()

// Export legacy functions for backward compatibility
export async function getAllCareer(): Promise<Career[]> {
    const result = await careerRepository.list({})
    return result.items
}

export async function getCareerById(id: number): Promise<Career | null> {
    const result = await careerRepository.findById({ id })
    return result ? result[0] : null
}
