import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { savedJobs } from '@/api/apijobs';
import { Button } from './ui/button';

const JobCard = ({
    job,
    isMyjob=false,
    savedInit=false,
    onJobSaved=()=>{},
}) => {

    const {fn:fnSavedJobs, data:SavedJobs, loading:loadingSavedJobs} = useFetch(savedJobs, {
        alreadySaved: saved,
    });

    const {user} = useUser();

    const [saved, setSaved] = useState(savedInit);

    const handleSaveJob = async () => {
        await fnSavedJobs({
            user_id: user.id,
            job_id: job.id
        })

        onJobSaved();
    };

    useEffect(() => {
        if(savedJobs !== undefined) setSaved(savedJobs?.length > 0);
    }, [SavedJobs]);

  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex justify-between font-bold">
                {job.title}
                {
                    isMyjob && (
                        <Trash2Icon 
                            fill='red'
                            size={18}
                            className='text-red-300 cursor-pointer'
                        />
                    )
                }
            </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 flex-1">
            <div className='flex justify-between'>
                {job.company && <img src={job.company.logo_url} className='h-6' />}
                <div className='flex gap-2 items-center'>
                    <MapPinIcon size={15} /> {job.location}
                </div>
            </div>
            <hr />
            {job.description.subsring(0, job.description.indexOf('.'))}...
        </CardContent>
        <CardFooter className="flex gap-2">
            <Link to={`/job/${job.id}`} className='flex-1'>
                <Button variant="secondary" className="w-full">
                    More Details
                </Button>
            </Link>
            
            {!isMyjob && (
                <Button
                    variant="outline"
                    className="w-15"
                    onClick={handleSaveJob}
                    disabled={loadingSavedJobs}
                >
                    {saved ? <Heart size={20} stroke='red' fill='red' /> : <Heart size={20} />}
                </Button>
            )}
            
        </CardFooter>
    </Card>
  )
}

export default JobCard