import superbaseClient from "@/utils/superbase";

export async function getCompanies(token) {
    const superbase = await superbaseClient(token);

    const {data, error} = await superbase.from('companies').select('*');

    if (error) {
        console.error('Error fetching companies', error);
        return null;
    }

    return data;
}