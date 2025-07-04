import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSquareWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useEffect } from "react";
import { instance } from "../axios";
import { useContact } from "../store/contactStore";

const ContactWA = () => {
  const { 
    phoneNumber,
    setPhoneNumber,
    setBankName,
    setAccountNumber,
    setOwnerAccountName } = useContact()
  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await instance.get("/public/contact")
        const data = result.data[0]
        setAccountNumber(data.accountNumber)
        setOwnerAccountName(data.ownerNameAccount)
        setBankName(data.bankName)
        setPhoneNumber(data.phoneNumber)
      } catch (error) {
        console.error(error)
      }
    }
    fetch()
  }, [setAccountNumber, setOwnerAccountName, setBankName, setPhoneNumber])
  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
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