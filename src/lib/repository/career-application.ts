import type { CareerApplication } from '@/types'
import supabase from '@/lib/supabase'
import type {
    AsyncBaseRepository,
    CreateArgs,
    DeleteArgs,
    FindByIdArgs,
    ListArgs,
    UpdateArgs
} from '@/lib/repository/base-repository'

export type findByUUIDArgs = {
    uuid: string
}

export class CareerApplicationRepository implements Omit<AsyncBaseRepository<CareerApplication>, 'findByUUID'> {
    private tableName = 'career_applications'

    async findByUUID(args: findByUUIDArgs): Promise<CareerApplication | null> {
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
            .select('*')
            .eq('id', args.id)
            .single()

        if (error || !data) {
            console.error('Error fetching career:', error)
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

    async update(args: UpdateArgs<CareerApplication>): Promise<CareerApplication[] | null> {
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