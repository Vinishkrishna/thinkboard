import ratelimit from "../config/upstash.js"

const rateLimiter = async (req,res,next) => {
    try {
        const {success} = await ratelimit.limit("my-limit-key") //if you have authentication in your application you would put your userid(each user has it separately)
        if(!success) {
            return res.status(429).json({
                message:"Too many requests, please try again later"
            })
        }
        next()//the application is run as expected
    } catch (error) {
        console.log("Rate limit error",error);
        next(error);
    }
}

export default rateLimiter