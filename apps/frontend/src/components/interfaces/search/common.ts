export interface TypeCategory {
	categories: string
	_count: {
		categories: number
	}
}

export interface TypeSearchParams {
	category?: string
	sort?: string
	page?: string
	name?: string
}
