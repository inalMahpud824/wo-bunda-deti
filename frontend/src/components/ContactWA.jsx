import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareWhatsapp } from "@fortawesome/free-brands-svg-icons";

const ContactWA = () => {
  return(
    <a
      href="https://api.whatsapp.com/send?phone=088901348151"
      target="_blank"
    >
      <FontAwesomeIcon
        icon={faSquareWhatsapp}
        className="bottom-0 text-green-500 text-6xl right-0 pr-5 fixed"
      />
    </a>
  )
}
export default ContactWA