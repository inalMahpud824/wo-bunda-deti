import { Link } from "react-router-dom";
import { truncateText } from "../utils/truncateText";

const Card = ({title,description, img, id}) => {
  return(
    <Link to={`/service/${id}`} className=" hover:shadow-xl  card bg-white w-80 md:min-h-[27rem] md:max-h-[27rem] shadow-sm">
      <figure className="md:min-h-52 md:max-h-52 min-h-32 max-h-32">
        <img
          src={`${img}`}
          alt="Shoes" 
          className="w-full object-cover"
          />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="md:text-base text-md lato-light md:max-h-[6rem] md:min-h-[6rem]">{truncateText(description)}</p>
      </div>
    </Link>
  )
}

export default Card