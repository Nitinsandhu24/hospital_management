'use client'

import { axiosFetch } from "@/lib/axiosConfig"
import { error } from "console"
import { useState } from "react"

const ResetPassword = () => {
    const [email, setEmail] = useState("")
    const handleSubmit = async(e: any) => {
        try{
            console.log("in");
            e.preventDefault();

            axiosFetch.post("/doctor-auth/reset-password",{    
                email
            }).then(()=>{
                console.log("Sent");
                
                alert("Email has been sent")
            }).catch((error)=>{
                console.log(error)
            })
        }catch(err){
            console.log(err);
            
        }
    }
    return <>
        <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-3 py-2 border rounded-md"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600" >Sent Reset Password Email</button>
                </form>
            </div>
        </div>
    </>
}
export default ResetPassword