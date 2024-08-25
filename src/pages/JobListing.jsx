import React, { useEffect, useState } from 'react'
import { getJobs } from '../api/apijobs'
import { useSession, useUser } from '@clerk/clerk-react'
import useFetch from '@/hooks/UseFetch'
import { BarLoader } from 'react-spinners'
import JobCard from '@/components/JobCard'
import { getCompanies } from '@/api/apiCompanies'

const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [company_id, setCompany_id] = useState('');
  const {isLoaded} = useUser();

  const {fn:fnJobs, data:jobs, loading:loadingJobs} = useFetch(getJobs, {location, company_id, searchQuery});

  const {fn:fnCompanies, data:companies} = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) {
      fnCompanies(); //hook to fetch companies
    }
  }, [isLoaded]);

  // console.log(jobs);
  useEffect(() => {
    if (isLoaded) {
      fnJobs(); //hook to fetch jobs
    }
  }, [isLoaded, location, company_id, searchQuery]);

  if(!isLoaded) {
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />;
  }

  return (
    <div>
      <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>Latest Jobs</h1>

      {/* Add filters here */}

      <form onSubmit={handleSearch}></form>

      {loadingJobs && <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />}

      {loadingJobs === false && (
        <div className='"mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {jobs?.length ? (
            jobs.map((job) => {
              return <JobCard key={job.id} job={job} savedInit={job?.saved?.length > 0} />;
          })
          ) : (
            <div>No jobs found 😥</div>
          )}
        </div>
      )}
    </div>
  )
}

export default JobListing