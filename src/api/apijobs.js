import superbaseClient from "@/utils/superbase"

export async function getJobs(token, { location, company_id, searchQuery }) {
    const superbase = await superbaseClient(token);

    console.log("test");

    let query = superbase
    .from("jobs")
    .select("*, saved: saved_jobs(id), company: companies(name,logo_url)");
    
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

    console.log('Jobs', data);

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

export async function getSingleJob(token, {job_id}) {
    const superbase = await superbaseClient(token);

    const {data, error} = await superbase.from('jobs').select('*, company:companies(name, logo_url), applications: applications(*)').eq('id', job_id).single();

    if (error) {
        console.error('Error fetching job', error);
        return null;
    }

    return data;
}

export async function updateHiringStatus(token, {job_id}, isOpen) {
    const superbase = await superbaseClient(token);

    const {data, error} = await superbase.from('jobs').update({isOpen}).eq('id', job_id).select();

    if (error) {
        console.error('Error updating job', error);
        return null;
    }

    return data;
}

export async function addNewJob(token, _, jobData) {
    const superbase = await superbaseClient(token);

    console.log('Job Data', jobData);

    const {data, error} = await superbase.from('jobs').insert([jobData]).select();

    if (error) {
        console.error('Error adding job', error);
        return null;
    }

    return data;
}