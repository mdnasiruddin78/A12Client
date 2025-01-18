import LeftNavbar from "../Components/LeftNavbar";
import RightNavbar from "../Components/RightNavbar";
import Searchbox from "../Components/Searchbox";


const Home = () => {
    return (
        <div className="bg-base-300">
            <section>
                <Searchbox></Searchbox>
            </section>
            <main className='w-11/12 mx-auto grid lg:grid-cols-12 md:grid-cols-12 grid-cols-1 gap-4'>
                <aside className='left lg:col-span-3 md:col-span-3'>
                    <LeftNavbar></LeftNavbar>
                </aside>
                <section className='lg:col-span-6 md:col-span-6'>
                    center section
                </section>
                <aside className='right lg:col-span-3 md:col-span-3'>
                    <RightNavbar></RightNavbar>
                </aside>
            </main>
        </div>
    );
};

export default Home;