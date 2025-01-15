import LeftNavbar from "../Components/LeftNavbar";
import RightNavbar from "../Components/RightNavbar";
import Searchbox from "../Components/Searchbox";


const Home = () => {
    return (
        <div>
            <section>
                <Searchbox></Searchbox>
            </section>
            <main className='w-11/12 mx-auto grid md:grid-cols-12 gap-3'>
                <aside className='left col-span-3'>
                    <LeftNavbar></LeftNavbar>
                </aside>
                <section className='col-span-6'>
                    center section
                </section>
                <aside className='right col-span-3'>
                    <RightNavbar></RightNavbar>
                </aside>
            </main>
        </div>
    );
};

export default Home;