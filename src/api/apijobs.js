import superbaseClient from "@/utils/superbase"

export async function getJobs(token, { location, company_id, searchQuery }) {
    const superbase = await superbaseClient(token);

    let query = await superbase.from('jobs').select('*, company:companies(name, logo_url), saved:saved_jobs(id)');

    if (location) {
        query = query.eq('location', location); // filter by location, eq is equal to
    }

    if (company_id) {
        query = query.eq('company_id', company_id); // ilike is case insensitive like
    }

    if (searchQuery) {
        query = query.ilike(`title`, `%${searchQuery}%`);
    }

    const {data, error} = await query;

    if (error) {
        console.error('Error fetching jobs', error);
        return null;
    }

    return data;
}

export async function savedJobs(token, { alreadySaved }, saveData) {
    const superbase = await superbaseClient(token);

    if(alreadySaved) {
        const {data, error:deleteError} = await superbase
        .from('saved_jobs')
        .delete()
        .eq('job_id', saveData.job_id);

        if (deleteError) {
            console.error('Error deleting saved job', deleteError);
            return null;
        }

        return data;
    } else {
        const {data, error:insertError} = await superbase
        .from('saved_jobs')
        .insert([saveData])
        .select();

        if (insertError) {
            console.error('Error fetching jobs', insertError);
            return null;
        }

        return data;
    }
}