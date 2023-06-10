import prisma from "../prisma/client/client.js";

// deleteUser will delete the user by ID
const deleteUser= async (req,res)=>{
    try{
        const user=await prisma.user.delete({
            where:{
                id:Number(req.params.id)
            }
        })
    
        res.status(202).send("User deleted"+user)
    } catch{
        res.status(500).send("Unable to delete user")
    }
}

// getUser will get the user by ID
const getUser= async (req,res)=>{
    try{
        console.log(req.params.id)
        const user=await prisma.user.findUnique({
            where:{
                id:Number(req.params.id)
            }
        })
    
        res.status(202).json({
            user: user
        })
    } catch{
        res.status(500).send("Unable to get user")
    }
}

// updateUser will update the user by ID
const updateUser= async (req,res)=>{
    const firstName= req.body.firstName
    const lastName=req.body.lastName
    const contact=req.body.contact;
    const isEmailVerified= req.body.isEmailVerified

    try{
        const user=await prisma.user.update({
            where:{
                id:Number(req.params.id)
            },
            data:{
                contact:contact,
                firstName:firstName,
                lastName:lastName,
                isEmailVerified:isEmailVerified,

            }
        })
    
        res.status(202).json({
            user: user
        })
    } catch{
        res.status(500).send("Unable to update user")
    }
}

export {deleteUser,getUser,updateUser}