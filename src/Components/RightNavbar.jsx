import UseNotification from "../Hooks/UseNotification";
import ContentCard from "./ContentCard";


const RightNavbar = () => {

    const [notificaion] = UseNotification()
    return (
        <div className="bg-purple-300 rounded-md">
            <h3 className="text-center text-xl font-bold mb-2"><u>Announcement({notificaion.length})</u></h3>
            <div className="grid grid-cols-1">
                {
                    notificaion.map(content => <ContentCard key={content._id} content={content}></ContentCard>)
                }
            </div>
        </div>
    );
};

export default RightNavbar;