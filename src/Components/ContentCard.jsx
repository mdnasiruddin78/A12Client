

const ContentCard = ({content}) => {
    const {name,image,title,description} = content;
    return (
        <div className="font-semibold px-3">
            <div>
                <img className="w-40 rounded-xl" src={image} alt="" />
            </div>
            <h3>Name: {name}</h3>
            <p>Title: {title}</p>
            <p>Description: {description}</p>
            <div className="divider"></div>
        </div>
    );
};

export default ContentCard;