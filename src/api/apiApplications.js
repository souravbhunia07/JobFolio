import superbaseClient, { supabaseUrl } from "@/utils/superbase";

export async function applyToJob(token, _, jobData) {
    const superbase = await superbaseClient(token);

    const random = Math.floor(Math.random() * 1000000);
    const fileName = `resume-${random}-${jobData.candidate_id}`;

    const {error:storageError} = await superbase.storage.from('resumes').upload(fileName, jobData.resume);

    if (storageError) {
        console.error('Error uploading resume', storageError);
        return null;
    }

    const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

    const {data, error} = await superbase.from('applications').insert([{
        ...jobData,
        resume,
    }]).select();

    if (error) {
        console.error('Error submitting applications', error);
        return null;
    }

    return data;
}

export async function updateApplications(token, {job_id}, status) {
    const superbase = await superbaseClient(token);

    const {data, error} = await superbase.from('applications').update({status}).eq('job_id', job_id).select();

    if (error || data.length === 0) {
        console.error('Error updating application status', error);
        return null;
    }

    return data;
}