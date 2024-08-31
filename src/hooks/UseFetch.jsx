import { useSession } from '@clerk/clerk-react'
import { useState } from 'react';

const useFetch = (cb, options= {}) => {

    const [data, setData] = useState(undefined);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const {session} = useSession();

    const fn = async (...args) => {
        setLoading(true);
        setError(null);

        try {
            const superbaseAccessToken = await session.getToken({
                template: 'superbase',
            });

            const data = await cb(superbaseAccessToken, options, ...args);
            setData(data);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return {data, error, loading, fn};
}

export default useFetch;