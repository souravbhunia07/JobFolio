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