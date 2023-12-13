import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ImCross } from "react-icons/im";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "../Button";
import { RxCross1 } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import apolloClient from "../../../lib/apolloClient";
import { gql } from "@apollo/client";
import { db } from "../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { BsPersonFill } from 'react-icons/bs';


const NavBar = ({data}) => {

  const [nav, setNav] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectCity, setSelectCity] = useState(false);
  const [cityTab, setCityTab] = useState("Select city");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  let router = useRouter();

  useEffect(() => {
    // setNav(!nav);
    setNav(!nav);
  },[]);

 

  const handleNav = () => {
    setNav(!nav);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleButtonClick = () => {
    router.push("/login/signup");
  };

  async function addDataToFireStore(name, email, phone, address, pincode, date, time ){
    try{
      const docRef = await addDoc(collection(db, "RegisterToPanditJi"), {
        name: name,
        email: email,
        phone: phone,
        address: address,
        pincode: pincode,
        date: date,
        time: time,
      });
      console.log("first", docRef.id);
      return true;
    } catch (error) {
      console.error("error adding document", error)
      return false;
    }
  }

  
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    date: "",
    time: "",
  });

  let name, value;
  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUserData({ ...userData, [name]: value });
  };

  // connect with firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    const added = await addDataToFireStore(userData.name, userData.email, userData.phone, userData.address, 
      userData.pincode, userData.date, userData.time);
    if(added) {
       setUserData("");

       alert ("Data stored to database");
    }
  };


  return (
    <section>
      <header className="bg-gradient-to-r from-primary to-primaryDark h-20 w-full flex justify-between items-center px-10 ">
        <Link href="/">
          <Image
            src="/assets/images/homeassets/car-img-1.png"
            alt="callpanditji"
            width={70}
            height={70}
            className="cursor-pointer"
          />
        </Link>
        <nav className="hidden lg:block">
          <ul className="lg:flex gap-10  ">
            <Link href="/">
              <li className="btn-primary cursor-pointer">Home</li>
            </Link>
            <Link href="/category">
              <li className="btn-primary cursor-pointer">Our Services</li>
            </Link>
            <Link href="/contact">
              <li className="btn-primary cursor-pointer">Enquiry</li>
            </Link>
           <Link href="/download">
            <li className="btn-primary cursor-pointer">Aarti</li>
           </Link>
          </ul>
        </nav>
        <div className="flex">

        <button className="hidden md:flex px-4 py-3 bg-secondary  rounded-xl text-textSecondary"><Link href="/login/signup">Register as Pandit Jii</Link></button>

          {/* <Button
            hide="hidden"
            show="block"
            name={"Register as Pandit Jii"}
            handleFunction={() => setModalOpen(true)}
          /> */}
          {/* <Dialog open={modalOpen} onClose={handleClose} >
            <div className="flex px-5 justify-between items-center">
              <DialogTitle>
                Enter your details to register as Pandit jii
              </DialogTitle>
              <RxCross1
                size={25}
                onClick={() => setModalOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Full Name"
                type="text"
                fullWidth
                variant="outlined"
                name="name"
                value={userData.name}
                onChange={postUserData}
              />
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                name="email"
                value={userData.email}
                onChange={postUserData}
              />
              <TextField
                autoFocus
                margin="dense"
                id="phone"
                label="Contact Number"
                type="text"
                fullWidth
                variant="outlined"
                name="phone"
                value={userData.phone}
                onChange={postUserData}
              />
              <TextField
                autoFocus
                margin="dense"
                id="address"
                label=" Your Address"
                type="text"
                fullWidth
                variant="outlined"
                name="address"
                value={userData.address}
                onChange={postUserData}
              />
              <TextField
                autoFocus
                margin="dense"
                id="pincode"
                label="Pin Code"
                type="teq"
                fullWidth
                variant="outlined"
                name="pincode"
                value={userData.pincode}
                onChange={postUserData}
              />
              <div className="flex flex-row gap-5">
              <TextField
                autoFocus
                margin="dense"
                id="date"
                // label="Available "
                type="date"
                fullWidth
                variant="outlined"
                name="date"
                value={userData.date}
                onChange={postUserData}
              />
              <TextField
                autoFocus
                margin="dense"
                id="time"
                // label="Available Time"
                type="time"
                fullWidth
                variant="outlined"
                name="time"
                value={userData.time}
                onChange={postUserData}
              />
              </div>
             
     
            </DialogContent>
            <div className="flex justify-center items-center py-3">
              <button className="btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
          </Dialog> */}
        </div>
        <div className="block lg:hidden" onClick={handleNav}>
          {nav ? (
            <RxHamburgerMenu className="lg:hidden text-secondary text-4xl" />
          ) : (
            <RxCross1 className="lg:hidden text-secondary text-4xl" />
          )}
        </div>
      </header>
      {nav ? (
        ""
      ) : (
        <nav className="bg-primary lg:hidden flex justify-center items-center">
          <ul className="w-full">
            <Link href="/">
              <li className="navbtn-primary cursor-pointer">Home</li>
            </Link>
            <Link href="/category">
              <li className="navbtn-primary cursor-pointer">Our Services</li>
            </Link>
            <Link href="/download">
              <li className="navbtn-primary cursor-pointer">Aartis</li>
            </Link>

            <Link href="/contact"> 
               <li className="navbtn-primary cursor-pointer">Enquiry</li>
            </Link>

            <div className="text-center py-4">
              <Button
                name={"Register as Pandit Jii"}
                handleFunction={() => setModalOpen(true)}
              />
            </div>
          </ul>
        </nav>
      )}
    </section>
  );
};

export default NavBar;
