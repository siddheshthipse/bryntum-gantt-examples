import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dataApi = createApi({
    reducerPath : 'dataApi',
    baseQuery   : fetchBaseQuery({ baseUrl : './data' }),
    endpoints   : builder => ({
        getDataByName : builder.query({
            query             : name => `${name}.json`,
            transformResponse : response => {
                const { resources, assignments, calendars, dependencies, project, tasks, timeRanges } = response;
                return {
                    resources    : resources.rows,
                    tasks        : tasks.rows,
                    timeRanges   : timeRanges.rows,
                    assignments  : assignments.rows,
                    calendars    : calendars.rows,
                    dependencies : dependencies.rows,
                    project
                };
            }
        })
    })
});

export const { useGetDataByNameQuery } = dataApi;
