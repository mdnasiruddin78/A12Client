

const ContentCard = ({content}) => {
    const {name,image,title,description} = content;
    return (
        <div className="lg:font-semibold p-3 rounded-xl bg-purple-200 shadow-lg">
            <div className="flex justify-center">
                <img className="w-40 rounded-xl" src={image} alt="" />
            </div>
            <h3>Name: {name}</h3>
            <p>Title: {title}</p>
            <p>Description: {description.substring(1,20)}...</p>
        </div>
    );
};

export default ContentCard;