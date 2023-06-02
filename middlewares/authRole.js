import prisma from "../prisma/client/client.js";

function authenticateRole(role) {
    return async (req, res, next) => {
        const email= req.user.email

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (user.role !== role) {
            res.status(401)
            return res.send('Unauthorized')
        }
        req.user= user
        next()
    }
}

export default authenticateRole;