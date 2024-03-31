import { useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import { REGISTER_URL } from "../constant/Constant";
import { ToastContainer, toast } from "react-toastify";
import { Audio } from 'react-loader-spinner'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = () => {
    const navigate = useNavigate()
    const [name, setname] = useState("")
    const [password, setpassword] = useState("")
    const [email, setemail] = useState("")
    const [address, setaddress] = useState("")
    const [dob, setdob] = useState("")
    const [username, setUserName] = useState("")
    const [cpassword, setcpassword] = useState("")
    const [wait, setWait] = useState(false);
    const [warn, setWarn] = useState(false)
    const [checked, setChecked] = useState(true)
    const [visible, setVisible] = useState(false)

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    function validatepassword(str) {
        // Check for lowercase, uppercase, and digit
        const hasLowercase = /[a-z]/.test(str);
        const hasUppercase = /[A-Z]/.test(str);
        const hasDigit = /\d/.test(str);

        // Check for special characters using a regular expression
        const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(str);

        // Check the length (minimum 8 characters)
        const isLengthValid = str.length >= 7;

        // Check if all conditions are met
        return hasLowercase && hasUppercase && hasDigit && hasSpecialChars && isLengthValid;
    }
    const handlesubmit = () => {
        console.log(name,email,password,cpassword,address,warn)
        if (name && email && password && address) {
            const data = { "name": name, "email": email, "password": password, "address": address , "role":"user" };
            console.log(data,'data')
            if (!checked) {
                toast('Please Read Terms and Condition and Checked it')
                setWait(false);
                return;
            }
            else if (!validateEmail(email)) {
                toast('Please Enter Correct Email');
                setWait(false)
                return;
            } else if (password != cpassword) {
                toast('Please Enter Both Password must be equal');
                setWait(false)
                return;
            }
            else {
                const config = { method: 'post', url: REGISTER_URL, headers: { 'Content-Type': 'application/json'},data: data };
                axios.request(config)
                    .then((response) => {
                        // setname(""); setemail(""); setdob(""); setpassword(""); setaddress(""); setWait(false); navigate('/login');
                    navigate('/login');
                    })
                    .catch((error) => {
                        toast(error.response.data.message); setWait(false);
                        return;
                    });
            }
        } else {
            toast("please fill all data");
            setWait(false);
            return;
        }
    }
    useEffect(() => {
        validatepassword(password) ? setWarn(true) : setWarn(false);
    }, [password])
    useEffect(() => {
        console.log(wait);
        if (wait === true) {
            handlesubmit();
        }
    }, [wait])
    return (
        <>
            <ToastContainer />
            <div className="flex text-center justify-center mt-5">
                <div className="flex flex-col p-1 m-3 bg-white rounded-lg shadow text-left border-blue-600 border-b-4 border-t-4">
                    <div className="text-[#313c40] text-3xl font-bold ml-5">
                        <img src="" alt="logo" className="h-24 w-24" ></img>
                    </div>
                    <div className="text-[#000000] text-3xl mt-2 ml-4" style={{ fontWeight: "700" }}>
                        <h1>Create Account</h1>
                    </div>
                    <div className="ml-4 mb-3 font-semibold">
                        Hello! Let&apos;s get started...
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div className="flex flex-col">
                            <label className="ml-5 text-[#494949] pl-1">Full Name*</label>
                            <div className="text-center justify-center">
                                <input type="text" required placeholder="Enter Your Name"
                                    className="mt-1 outline-0 h-10   border border-[#1565D8] pl-4 ml-4 rounded-lg w-11/12" value={name} onChange={(e) => {
                                        setname(e.target.value);
                                    }} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="ml-5 text-[#494949] pl-1 sm:mt-0">Email Address*
                            </label>
                            <div className="text-center justify-center">
                                <input type="email" required placeholder="Enter Email"
                                    className="mt-1 outline-0 h-10   border border-[#1565D8] pl-4 ml-4 rounded-lg w-11/12" value={email} onChange={(e) => {
                                        setemail(e.target.value);
                                    }} />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="ml-5 text-[#494949] pl-1">Password*</label>
                            {visible && <div className="flex flex-row border border-[#1565D8] ml-4 rounded-lg h-10" >
                                <input type="text" placeholder="Enter Your Password"
                                    className="mr-5 outline-0  pl-4 w-full rounded-lg border-[#1565D8]" value={password}
                                    onChange={(e) => { setpassword(e.target.value); }} />
                                <VisibilityIcon sx={{ cursor: "pointer", marginLeft: "20px", marginRight: "10px", marginTop: "6px" }} onClick={() => { setVisible(false) }} />
                            </div>
                            }

                            {!visible && <div className="flex flex-row border border-[#1565D8] rounded-lg ml-4 h-10">
                                <input type="password" placeholder="Enter Your Password" className="mr-5 outline-0   pl-4 w-full rounded-lg border-[#1565D8]"
                                    value={password} onChange={(e) => { setpassword(e.target.value); }} />
                                <VisibilityOffIcon sx={{ cursor: "pointer", marginLeft: "20px", marginRight: "10px", marginTop: "6px" }} onClick={() => { setVisible(true) }} />
                            </div>}

                            <div className="text-xs italic ml-5" style={{ color: warn === true ? "black" : "red" }}>Password: Min 7 chars, 1 lowercase, 1 uppercase, 1 digit, 1 special required</div>
                        </div>

                        <div className="flex flex-col">
                            <label className="ml-5 text-[#494949] pl-1">Confirm Password*</label>
                            {visible && <div className="flex flex-row border border-[#1565D8] ml-4 rounded-lg h-10" >
                                <input type="text" placeholder="Enter Your Password" className="mr-5 outline-0  pl-4 w-full rounded-lg border-[#1565D8]"
                                    value={cpassword} onChange={(e) => { setcpassword(e.target.value); }} />
                                <VisibilityIcon sx={{ cursor: "pointer", marginLeft: "20px", marginRight: "10px", marginTop: "6px" }} onClick={() => { setVisible(false) }} />
                            </div>
                            }

                            {!visible && <div className="flex flex-row border border-[#1565D8] rounded-lg ml-4 h-10">
                                <input type="password" placeholder="Enter Your Password" className="mr-5 outline-0   pl-4 w-full rounded-lg border-[#1565D8]"
                                    value={cpassword} onChange={(e) => { setcpassword(e.target.value); }} />
                                <VisibilityOffIcon sx={{ cursor: "pointer", marginLeft: "20px", marginRight: "10px", marginTop: "6px" }} onClick={() => { setVisible(true) }} />
                            </div>}
                        </div>
                        <div className="flex flex-col">
                            <label className="ml-5 text-[#494949] pl-1">Address*</label>
                            <div className="text-center justify-center">
                                <input type="text" required placeholder="Enter Your Address"
                                    className="mt-1 outline-0 h-10  border border-[#1565D8] pl-4 ml-4 rounded-lg w-11/12" value={address}
                                    onChange={(e) => { setaddress(e.target.value); }} />
                            </div>
                        </div>
                    </div>
                    <div className="text-xs ml-5 mr-5 flex flex-row">
                        <input type="checkbox" checked={checked} onChange={(e) => { setChecked(e.target.checked) }} />
                        <p>By Create an account, you agree to the <span className="italic text-blue-400">term of use </span> and <span className="italic text-blue-400">privacy policy</span></p>
                    </div>

                    {!wait && <button className="text-[white] bg-[#2C73EB] h-10  text rounded-md mt-2 ml-4 font-bold cursor-pointer  mr-5" onClick={() => { setWait(true); }}>
                        Create account</button>}

                    {wait && <div className="flex text-center justify-center"><Audio height="40" width="120" color='lightblue' ariaLabel='three-dots-loading' /></div>}

                    <div className="grid grid-cols-1">
                        <div className="flex flex-row mt-2 ml-4">
                            <div className="text-[#3F4547]">Already Registered!!?</div>
                            <Link to='/'><div className="text-[#0369a8] pl-1 ml-5 underline cursor-pointer flex-grow">Sign In</div></Link>
                        </div>
                        <div className="flex flex-row mt-2 ml-4">
                            <div className="text-[#3F4547]">Forgot Password!!?</div>
                            <Link to='/forget_password' className="text-[#0369a8] pl-1 ml-5 underline cursor-pointer flex-grow">Forgot Password</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Register;