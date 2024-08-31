import superbaseClient, { supabaseUrl } from "@/utils/superbase";

export async function getCompanies(token) {
    const superbase = await superbaseClient(token);

    const {data, error} = await superbase.from('companies').select('*');

    if (error) {
        console.error('Error fetching companies', error);
        return null;
    }

    console.log('Companies', data);

    return data;
}

// Add Company
export async function addNewCompany(token, _, companyData) {
    const supabase = await superbaseClient(token);

    console.log('Company Data', companyData);
  
    const random = Math.floor(Math.random() * 90000);
    const fileName = `logo-${random}-${companyData.name}`;
  
    const { error: storageError } = await supabase.storage
      .from("company-logo")
      .upload(fileName, companyData.logo);
  
    if (storageError) throw new Error("Error uploading Company Logo");
  
    const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;
  
    const { data, error } = await supabase
      .from("companies")
      .insert([
        {
          name: companyData.name,
          logo_url: logo_url,
        },
      ])
      .select();
  
    if (error) {
      console.error(error);
      throw new Error("Error submitting Companys");
    }
  
    return data;
  }