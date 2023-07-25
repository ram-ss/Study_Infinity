import React ,{useState,useEffect}from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import {NavBarLinks} from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { categories } from '../../services/apis'
import { apiConnector } from '../../services/apiconnector'
import {BsChevronDown} from "react-icons/bs"

function Navbar() {
  console.log("Printing base url: ",process.env.REACT_APP_BASE_URL);
  const {token} = useSelector( (state) => state.auth );
  const {user} = useSelector( (state) => state.profile );
  const {totalItems} = useSelector( (state) => state.cart )
  const location=useLocation();

  const [ssubLinks, setSsubLinks]  = useState([]);

    const fetchSublinks = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSsubLinks(result.data.allCategories);
        }
        catch(error) {
            console.log("Could not fetch the category list");
        }
    }


    useEffect( () => {
        fetchSublinks();
    },[] )

  const matchRoute=(route)=>{
    return matchPath({path:route},location.pathname);
  }
  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700`}>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
          {/* logo */}
            <Link to="/">
                <img src={logo} width={160} height={42} loading='lazy'/>
            </Link>
            {/* nav links */}
            <nav>
              <ul className='flex gap-x-6 text-richblack-5'>
                 {
                  NavBarLinks.map((link,index)=>(
                    <li key={index}>
                      {
                        link.title==="Catalog"?(<div className='relative flex items-center gap-2 group'>
                          <p>{link.title}</p>
                                <BsChevronDown/>

                                <div className='invisible absolute left-[50%]
                                    translate-x-[-50%] translate-y-[2em]
                                 top-[50%]
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px] z-20'>

                                <div className='absolute left-[50%] top-0 z-20
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                </div>

                                {
                                    ssubLinks.length ? (
                                            ssubLinks.map( (ssubLink, index) => (
                                                <Link to={`${"/catalog/"+ssubLink.name.toLowerCase().replace(" ","-")}`} key={index}
                                                className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'
                                                >
                                                    <p>{ssubLink.name}</p>
                                                </Link>
                                            ) )
                                    ) : (<div></div>)
                                }

                                </div>
                        </div>):(
                          <Link to={link?.path}>
                             <p className={`${matchRoute(link?.path)?"text-yellow-25":"text-richblack-25"}` 
                                
                                }>{link.title}</p>
                          </Link>
                        )
                      }
                    </li>
                  ))
                 }
              </ul>
            </nav>
            {/* login signup dashboard */}
            <div className='flex gap-x-4 items-center'>
                 {
                 token && user && user?.accountType != "Instructor" && (
                    <Link to="/dashboard/cart" className='relative'>
                        <AiOutlineShoppingCart className="text-2xl text-richblack-100"/>
                        {
                            totalItems > 0 && (
                                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                    {totalItems}
                                </span>
                            )
                        }
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/login">
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Log in
                        </button>
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/signup">
                        <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Sign Up
                        </button>
                    </Link>
                )
            }
            {
                token !== null && <ProfileDropDown />
            }
            </div>
        </div>
    </div>
  )
}

export default Navbar