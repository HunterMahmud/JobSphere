'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import Select from "react-select";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import NoInformation from '@/components/shared/NoInformation';
import useSeekerInfo from '@/components/Hooks/useSeekerInfo';
import useRole from '@/components/Hooks/useRole';

const countryOptions = [
    { value: "Afghanistan", label: "Afghanistan" },
    { value: "Albania", label: "Albania" },
    { value: "Algeria", label: "Algeria" },
    { value: "Andorra", label: "Andorra" },
    { value: "Angola", label: "Angola" },
    { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
    { value: "Argentina", label: "Argentina" },
    { value: "Armenia", label: "Armenia" },
    { value: "Australia", label: "Australia" },
    { value: "Austria", label: "Austria" },
    { value: "Azerbaijan", label: "Azerbaijan" },
    { value: "Bahamas", label: "Bahamas" },
    { value: "Bahrain", label: "Bahrain" },
    { value: "Bangladesh", label: "Bangladesh" },
    { value: "Barbados", label: "Barbados" },
    { value: "Belarus", label: "Belarus" },
    { value: "Belgium", label: "Belgium" },
    { value: "Belize", label: "Belize" },
    { value: "Benin", label: "Benin" },
    { value: "Bhutan", label: "Bhutan" },
    { value: "Bolivia", label: "Bolivia" },
    { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
    { value: "Botswana", label: "Botswana" },
    { value: "Brazil", label: "Brazil" },
    { value: "Brunei", label: "Brunei" },
    { value: "Bulgaria", label: "Bulgaria" },
    { value: "Burkina Faso", label: "Burkina Faso" },
    { value: "Burundi", label: "Burundi" },
    { value: "Cabo Verde", label: "Cabo Verde" },
    { value: "Cambodia", label: "Cambodia" },
    { value: "Cameroon", label: "Cameroon" },
    { value: "Canada", label: "Canada" },
    { value: "Central African Republic", label: "Central African Republic" },
    { value: "Chad", label: "Chad" },
    { value: "Chile", label: "Chile" },
    { value: "China", label: "China" },
    { value: "Colombia", label: "Colombia" },
    { value: "Comoros", label: "Comoros" },
    { value: "Congo", label: "Congo" },
    { value: "Costa Rica", label: "Costa Rica" },
    { value: "Croatia", label: "Croatia" },
    { value: "Cuba", label: "Cuba" },
    { value: "Cyprus", label: "Cyprus" },
    { value: "Czech Republic", label: "Czech Republic" },
    { value: "Denmark", label: "Denmark" },
    { value: "Djibouti", label: "Djibouti" },
    { value: "Dominica", label: "Dominica" },
    { value: "Dominican Republic", label: "Dominican Republic" },
    { value: "Ecuador", label: "Ecuador" },
    { value: "Egypt", label: "Egypt" },
    { value: "El Salvador", label: "El Salvador" },
    { value: "Equatorial Guinea", label: "Equatorial Guinea" },
    { value: "Eritrea", label: "Eritrea" },
    { value: "Estonia", label: "Estonia" },
    { value: "Eswatini", label: "Eswatini" },
    { value: "Ethiopia", label: "Ethiopia" },
    { value: "Fiji", label: "Fiji" },
    { value: "Finland", label: "Finland" },
    { value: "France", label: "France" },
    { value: "Gabon", label: "Gabon" },
    { value: "Gambia", label: "Gambia" },
    { value: "Georgia", label: "Georgia" },
    { value: "Germany", label: "Germany" },
    { value: "Ghana", label: "Ghana" },
    { value: "Greece", label: "Greece" },
    { value: "Grenada", label: "Grenada" },
    { value: "Guatemala", label: "Guatemala" },
    { value: "Guinea", label: "Guinea" },
    { value: "Guinea-Bissau", label: "Guinea-Bissau" },
    { value: "Guyana", label: "Guyana" },
    { value: "Haiti", label: "Haiti" },
    { value: "Honduras", label: "Honduras" },
    { value: "Hungary", label: "Hungary" },
    { value: "Iceland", label: "Iceland" },
    { value: "India", label: "India" },
    { value: "Indonesia", label: "Indonesia" },
    { value: "Iran", label: "Iran" },
    { value: "Iraq", label: "Iraq" },
    { value: "Ireland", label: "Ireland" },
    { value: "Israel", label: "Israel" },
    { value: "Italy", label: "Italy" },
    { value: "Jamaica", label: "Jamaica" },
    { value: "Japan", label: "Japan" },
    { value: "Jordan", label: "Jordan" },
    { value: "Kazakhstan", label: "Kazakhstan" },
    { value: "Kenya", label: "Kenya" },
    { value: "Kiribati", label: "Kiribati" },
    { value: "Korea, North", label: "Korea, North" },
    { value: "Korea, South", label: "Korea, South" },
    { value: "Kuwait", label: "Kuwait" },
    { value: "Kyrgyzstan", label: "Kyrgyzstan" },
    { value: "Laos", label: "Laos" },
    { value: "Latvia", label: "Latvia" },
    { value: "Lebanon", label: "Lebanon" },
    { value: "Lesotho", label: "Lesotho" },
    { value: "Liberia", label: "Liberia" },
    { value: "Libya", label: "Libya" },
    { value: "Liechtenstein", label: "Liechtenstein" },
    { value: "Lithuania", label: "Lithuania" },
    { value: "Luxembourg", label: "Luxembourg" },
    { value: "Madagascar", label: "Madagascar" },
    { value: "Malawi", label: "Malawi" },
    { value: "Malaysia", label: "Malaysia" },
    { value: "Maldives", label: "Maldives" },
    { value: "Mali", label: "Mali" },
    { value: "Malta", label: "Malta" },
    { value: "Marshall Islands", label: "Marshall Islands" },
    { value: "Mauritania", label: "Mauritania" },
    { value: "Mauritius", label: "Mauritius" },
    { value: "Mexico", label: "Mexico" },
    { value: "Micronesia", label: "Micronesia" },
    { value: "Moldova", label: "Moldova" },
    { value: "Monaco", label: "Monaco" },
    { value: "Mongolia", label: "Mongolia" },
    { value: "Montenegro", label: "Montenegro" },
    { value: "Morocco", label: "Morocco" },
    { value: "Mozambique", label: "Mozambique" },
    { value: "Myanmar", label: "Myanmar" },
    { value: "Namibia", label: "Namibia" },
    { value: "Nauru", label: "Nauru" },
    { value: "Nepal", label: "Nepal" },
    { value: "Netherlands", label: "Netherlands" },
    { value: "New Zealand", label: "New Zealand" },
    { value: "Nicaragua", label: "Nicaragua" },
    { value: "Niger", label: "Niger" },
    { value: "Nigeria", label: "Nigeria" },
    { value: "North Macedonia", label: "North Macedonia" },
    { value: "Norway", label: "Norway" },
    { value: "Oman", label: "Oman" },
    { value: "Pakistan", label: "Pakistan" },
    { value: "Palau", label: "Palau" },
    { value: "Panama", label: "Panama" },
    { value: "Papua New Guinea", label: "Papua New Guinea" },
    { value: "Paraguay", label: "Paraguay" },
    { value: "Peru", label: "Peru" },
    { value: "Philippines", label: "Philippines" },
    { value: "Poland", label: "Poland" },
    { value: "Portugal", label: "Portugal" },
    { value: "Qatar", label: "Qatar" },
    { value: "Romania", label: "Romania" },
    { value: "Russia", label: "Russia" },
    { value: "Rwanda", label: "Rwanda" },
    { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" },
    { value: "Saint Lucia", label: "Saint Lucia" },
    {
        value: "Saint Vincent and the Grenadines",
        label: "Saint Vincent and the Grenadines",
    },
    { value: "Samoa", label: "Samoa" },
    { value: "San Marino", label: "San Marino" },
    { value: "Sao Tome and Principe", label: "Sao Tome and Principe" },
    { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "Senegal", label: "Senegal" },
    { value: "Serbia", label: "Serbia" },
    { value: "Seychelles", label: "Seychelles" },
    { value: "Sierra Leone", label: "Sierra Leone" },
    { value: "Singapore", label: "Singapore" },
    { value: "Slovakia", label: "Slovakia" },
    { value: "Slovenia", label: "Slovenia" },
    { value: "Solomon Islands", label: "Solomon Islands" },
    { value: "Somalia", label: "Somalia" },
    { value: "South Africa", label: "South Africa" },
    { value: "South Sudan", label: "South Sudan" },
    { value: "Spain", label: "Spain" },
    { value: "Sri Lanka", label: "Sri Lanka" },
    { value: "Sudan", label: "Sudan" },
    { value: "Suriname", label: "Suriname" },
    { value: "Sweden", label: "Sweden" },
    { value: "Switzerland", label: "Switzerland" },
    { value: "Syria", label: "Syria" },
    { value: "Taiwan", label: "Taiwan" },
    { value: "Tajikistan", label: "Tajikistan" },
    { value: "Tanzania", label: "Tanzania" },
    { value: "Thailand", label: "Thailand" },
    { value: "Timor-Leste", label: "Timor-Leste" },
    { value: "Togo", label: "Togo" },
    { value: "Tonga", label: "Tonga" },
    { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
    { value: "Tunisia", label: "Tunisia" },
    { value: "Turkey", label: "Turkey" },
    { value: "Turkmenistan", label: "Turkmenistan" },
    { value: "Tuvalu", label: "Tuvalu" },
    { value: "Uganda", label: "Uganda" },
    { value: "Ukraine", label: "Ukraine" },
    { value: "United Arab Emirates", label: "United Arab Emirates" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "United States", label: "United States" },
    { value: "Uruguay", label: "Uruguay" },
    { value: "Uzbekistan", label: "Uzbekistan" },
    { value: "Vanuatu", label: "Vanuatu" },
    { value: "Vatican City", label: "Vatican City" },
    { value: "Venezuela", label: "Venezuela" },
    { value: "Vietnam", label: "Vietnam" },
    { value: "Yemen", label: "Yemen" },
    { value: "Zambia", label: "Zambia" },
    { value: "Zimbabwe", label: "Zimbabwe" },
];

const ProfileOverview = () => {
    const { data: session } = useSession();
    const [edit, setEdit] = useState(false);
    const { seekerInfo } = useSeekerInfo();
    const [country, setCountry] = useState('');
    const [profileOverview, setProfileOverview] = useState(seekerInfo?.profileOverview);
    const { loggedInUser } = useRole();

    useEffect(() => {
        if (seekerInfo?.profileOverview) {
            setProfileOverview(seekerInfo?.profileOverview)
        }
    }, [seekerInfo])

    const handleSave = async (e) => {
        e.preventDefault();
        const form = e.target;
        const fullName = form.fullName.value;
        const profilePicture = form.image.files[0];
        const address = form.address.value;
        const city = form.city.value;
        const wantJob = form.wantJob.value;
        const preferredJobPosition = form.preferredJobPosition.value;
        const preferredJobType = form.preferredJobType.value;
        const formData = new FormData();
        formData.append('image', profilePicture)

        try {
            const { data } = profilePicture ? await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
                formData
            ) : '';
            const profileOverview = {
                fullName,
                profilePicture: profilePicture ? data?.data?.display_url : loggedInUser?.userIMG, // seekerInfo?.profileOverview?.profilePicture
                address,
                country: country ? country : seekerInfo?.profileOverview?.country,
                city,
                wantJob,
                preferredJobPosition,
                preferredJobType
            }
            const { data: update } = await axios.put(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/profile/api/${session.user.email}`, { profileOverview });
            console.log('Update', update)
            if (update?.modifiedCount > 0) {
                toast.success("Updated Successful");
                setProfileOverview(profileOverview)
                await axios.put(`${process.env.NEXT_PUBLIC_SITE_ADDRESS}/register/${session.user.email}`, { userIMG: data?.data?.display_url });
                setEdit(false);
            }
        } catch (err) {
            console.log(err?.message);
        }
    }


    return (
        <div className='relative'>
            <button onClick={() => setEdit(!edit)} className="cursor-pointer absolute right-3 top-0 text-2xl">
                {edit ? <><IoCloseSharp /></> : <><FaRegEdit className={`${!profileOverview && 'hidden'} cursor-pointer absolute right-3 top-0 text-2xl`} /></>}
            </button>
            <div>
                <h2 className='text-center text-xl font-semibold mb-5'>Profile Overview</h2>
                {
                    edit ?
                        <form onSubmit={handleSave} className="mt-10 grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-5">
                            {/* Name */}
                            <div div >
                                <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                    Full Name
                                </label>
                                <input
                                    name='fullName'
                                    defaultValue={profileOverview?.fullName}
                                    type="text"
                                    placeholder="Enter Your Name"
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            {/* phoneNumber */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                    Professional Title
                                </label>
                                <input
                                    name='preferredJobPosition'
                                    defaultValue={profileOverview?.preferredJobPosition}
                                    type="text"
                                    placeholder="Enter Your Professional Title"
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            {/* Country Name */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                    Country Name
                                </label>
                                <Select
                                    defaultInputValue={country ? country : profileOverview?.country}
                                    onChange={(countryOptions) => setCountry(countryOptions.value)}
                                    options={countryOptions}
                                    className="w-full"
                                />
                            </div>
                            {/* City Name */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                    City Name
                                </label>
                                <input
                                    name='city'
                                    defaultValue={profileOverview?.city}
                                    type="text"
                                    placeholder="Enter City Name"
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            {/* Address */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                    Address
                                </label>
                                <input
                                    name='address'
                                    defaultValue={profileOverview?.address}
                                    type="text"
                                    placeholder="Enter Your Address"
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            {/* profilePicture */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                    Profile Picture
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                            {/* Preferred Job Type */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                    Preferred Job Type
                                </label>
                                <select name='preferredJobType' defaultValue={profileOverview?.preferredJobType} className="select px-4 py-2 rounded-lg w-full">
                                    <option>Full-Time</option>
                                    <option>On Site</option>
                                    <option>Remote</option>
                                    <option>Part-Time</option>
                                    <option>Hybrid</option>
                                </select>
                            </div>
                            {/* Looking for a Job? */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-600 ">
                                    Looking for a Job
                                </label>
                                <select name='wantJob' defaultValue={profileOverview?.wantJob} className="select px-4 py-2 rounded-lg w-full">
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>

                            <div className='md:col-span-2'>
                                <div className='flex justify-end items-end'>
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-hoverColor px-5 rounded-md py-3 text-white"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                        :
                        <div className='flex flex-col justify-center items-center w-full max-w-2xl mx-auto border bg-white p-4'>
                            {
                                profileOverview ? <><div className='border rounded-full'>
                                    <Image
                                        className='h-[200px] w-[200px] object-cover rounded-full'
                                        src={profileOverview?.profilePicture || loggedInUser?.userIMG || 'https://i.ibb.co/3BY9Fks/profile.png'}
                                        alt="ProfileImg"
                                        width={200}
                                        height={200}
                                    />
                                </div>
                                    <div className='space-y-1 mt-5'>
                                        <p><strong>Full Name:</strong> {profileOverview?.fullName}</p>
                                        {profileOverview?.address && <p><strong>Address:</strong> {profileOverview?.address}, {profileOverview?.city}, {ProfileOverview?.country}</p>}
                                        {profileOverview?.wantJob && <p><strong>Looking for a Job?</strong> {profileOverview?.wantJob}</p>}
                                        {profileOverview?.preferredJobPosition && <p><strong>Preferred Job Position:</strong> {profileOverview?.preferredJobPosition}</p>}
                                        {profileOverview?.preferredJobType && <p><strong>Preferred Job Type:</strong> {profileOverview?.preferredJobType}</p>}
                                    </div>
                                </> : <NoInformation setEdit={setEdit} edit={edit} />
                            }

                        </div>
                }
            </div >
        </div >
    );
};

export default ProfileOverview;