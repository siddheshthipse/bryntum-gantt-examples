import Head from 'next/head.js';
import dynamic from 'next/dynamic.js';
// import Gantt component with Server Side Rendering disabled
const Gantt = dynamic(() => import('../components/Gantt.tsx'), { ssr : false });

const Home = () => {
    return (
        <>
            <Head>
                <title>Bryntum Gantt - Basic setup with TypeScript (NEXT.js Pages Router)</title>
                <meta name="description" content="This demo contains the NEXT.js Gantt chart wrapper and the demo is written in TypeScript" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="favicon.png" type="image/png" />
            </Head>
            <Gantt />
        </>
    );
};

export default Home;
